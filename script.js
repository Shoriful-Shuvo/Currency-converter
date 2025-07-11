const Url ="https://latest.currency-api.pages.dev/v1/currencies";

let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("button");
let FromCurr =document.querySelector(".selecte select");
let ToCurr =document.querySelector(".selecte2 select");
let amount = document.querySelector(".amount input");
let msg = document.querySelector(".msg");


for (let select of dropdowns) {
    for ( currCode in countryList) {
        let newOption =document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
        if (select.name ==="From" && currCode === "USD") {
           newOption.selected = select;
        }
        else if (select.name ==="TO" && currCode === "BDT") {
           newOption.selected = select;
        }
    }
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag = (element)=>{
let code = element.value;
let countryCode = countryList[code];
let newUrl =`https://flagsapi.com/${countryCode}/flat/64.png`
let img = element.parentElement.querySelector("img")
img.src = newUrl
}



btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amoVal = amount.value;
    if (amoVal === "" || amoVal < 1) {
        amoVal ="1";
        amount.value = 1;
    } 
    const URL = `${Url}/${FromCurr.value.toLowerCase() }.json`
    let response = await fetch(URL)
    console.log(response);
    let Data = await response.json()     
    let to = ToCurr.value.toLowerCase()
    let toCurr = Data[FromCurr.value.toLowerCase()][to];    
     let result = toCurr*amoVal
     msg.innerHTML = `${amoVal} ${FromCurr.value}  = ${result} ${ToCurr.value}`
})

