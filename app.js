// // const BASE_URL =  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
// const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@{date}/{apiVersion}/{endpoint}"

//   const dropdowns = document.querySelectorAll(".dropdown select");
//   const btn = document.querySelector("form button");
//   const fromCurr = document.querySelector(".from select");
//   const toCurr = document.querySelector(".to select");
//   const msg = document.querySelector(".msg")
  
//   for(let select of dropdowns)
//   {
//     for(currCode in countryList)
//     {
//         let newOption = document.createElement("option");
//         newOption.innerText = currCode;
//         newOption.value = currCode;
//         if ( select.name === "from" && currCode === "USD")
//         {
//             newOption.selected="selected"
//         }
//         else if ( select.name === "to" && currCode === "INR")
//             {
//                 newOption.selected="selected"
//             }
//         select.append(newOption);
//     }
//     select.addEventListener("change", (evt) => {
//         updateFlag(evt.target);
//     });
//   }


// const updateFlag = (element) => {
//     let currCode = element.value;
//     let countryCode = countryList[currCode];
//     let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
//     let img = element.parentElement.querySelector("img");
//     img.src = newSrc;
//   };
  
// btn.addEventListener("click", async (evt) => {
//     evt.preventDefault();
//     let amount = document.querySelector(".amount input");
//     let amtVal = amount.value;
//     if(amtVal === "" || amtVal<1)
//     {
//         amtVal=1;
//         amount.value="1";
//     }
    
//     // const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
//     // const URL = `${BASE_URL}/currencies/${toCurr.value.toLowerCase()}`
//    //const URL =`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/inr.json`
//    const URL="https://v6.exchangerate-api.com/v6/082f73d35e94ac3667538e22/pair/USD/INR"

//     let response = await fetch(URL);
//     let data = await response.json();
//     let rate = data[toCurr.value.toLowerCase()]
//     console.log(rate)
// });




const BASE_URL =
"https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")

for (let select of dropdowns) {
for (currCode in countryList) {
let newOption = document.createElement("option");
newOption.innerText = currCode;
newOption.value = currCode;
if (select.name === "from" && currCode === "USD") {
newOption.selected = "selected";
} else if (select.name === "to" && currCode === "INR") {
newOption.selected = "selected";
}
select.append(newOption);
}
select.addEventListener("change", (evnt) => {
updateFlag(evnt.target);
});
}

const updateFlag = (element) => {
let currCode = element.value;
let countryCode = countryList[currCode];
let newSrc =` https://flagsapi.com/${countryCode}/flat/64.png`;
let img = element.parentElement.querySelector("img");
img.src = newSrc;
};

btn.addEventListener("click", async (evnt) => {
evnt.preventDefault();
let amount = document.querySelector(".amount input");
let amtVal = amount.value;
if (amtVal === "" || amtVal < 1) {
amtVal = 1;
amount.value = "1";
}

const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

try {
let response = await fetch(URL);
if (!response.ok) {
throw new Error("Network response was not ok");
}
let data = await response.json();

let fromCurrency = fromCurr.value.toLowerCase();
let toCurrency = toCurr.value.toLowerCase(); // Assuming you have toCurr element

/* console.log(fromCurrency,toCurrency)
console.log(data[fromCurrency][toCurrency]) */

let rate;
if (data[fromCurrency] && data[fromCurrency][toCurrency]) {
  rate = data[fromCurrency][toCurrency];
  console.log(rate);
} else {
  console.error("Currency data not found in the response");
  rate = 1; // Fallback rate to avoid further errors
}

let finalAmount = amtVal * rate; // Use amtVal here
msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
} catch (error) {
console.error("Error fetching or processing data: ", error);
}
});

//try this code