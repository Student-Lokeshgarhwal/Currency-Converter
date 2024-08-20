const apikey = "58c1accdfd-a3914799b6";

let BASE_URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies`;

let dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
let fromcurr = document.querySelector(".from select");
let tocurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");

for(let selects of dropdown){
    for( currcode in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;
        if(selects.name === "from" && currcode === "USD"){
            newoption.selected = "selected";
        }else if(selects.name === "to" && currcode === "INR"){
            newoption.selected = "selected";
        }
        selects.append(newoption);
        // console.log(newoption);
    }
    selects.addEventListener("change",(evt)=>{
        updateflag(evt.target);
        // console.log(evt.target);
    })
}
const updateflag=((element)=>{
   let currcode = element.value;
   let countrycode = countryList[currcode];
   let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`
   let img = element.parentElement.querySelector("img");
   img.src = newsrc;
});
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountvalue = amount.value;
    // console.log(amountvalue);
    if(amountvalue === "" || amountvalue <1){
        amount.value ="1";
        amountvalue = 1;
    }
    // console.log(fromcurr.value,tocurr.value);
    const url = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;
   let response = await fetch(url);
        let data =await response.json();
        // console.log(data);
        let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
        // console.log(rate);
        let finalamount = amountvalue*rate;
        // msg.innerText =`1USD = 80INR`;
        msg.innerText =`${amountvalue} ${fromcurr.value} = ${finalamount} ${tocurr.value}`;
        // console.log(msg);
})