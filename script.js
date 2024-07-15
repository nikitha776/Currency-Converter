const BASIC_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
let dropdowns = document.querySelectorAll("select");
let btn = document.querySelector(".btn");
let amount = document.querySelector("input");
let from = document.querySelector(".from select");
let to = document.querySelector(".to select");
let msg = document.querySelector(".msg");

for(select of dropdowns) {
    for(code in countryList) {
        let newOption = document.createElement("option");
        newOption.value = code;
        newOption.innerText = code;
        if(select.name == "from" && code == "USD") {
            newOption.selected = "selected";
        }
        if(select.name == "to" && code == "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    });
}

function updateFlag(element) {
    console.log(element.value);
    let img = element.parentElement.querySelector("img");
    let newSrc = `https://flagsapi.com/${countryList[element.value]}/flat/64.png`;
    img.src = newSrc;
}

async function updateExchangeRate() {
    let amt = amount.value;
    if(amt === "" || amt < 0) {
        amt = 1;
        amount.value = 1;
    }
    let URL = `${BASIC_URL}/${from.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let exchangeAmt = amt*(data[from.value.toLowerCase()][to.value.toLowerCase()]);
    msg.innerText = `${amt} ${from.value} = ${exchangeAmt} ${to.value}`;
}

btn.addEventListener("click",async (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load",async (evt) => {
    updateExchangeRate();
});