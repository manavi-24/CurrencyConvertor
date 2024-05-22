let button=document.querySelector(".btn");
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
let msg=document.querySelector(".msg");


let baseUrl="https://v6.exchangerate-api.com/v6/2e8a2170e965ccbb32821bc1/pair";

let select=document.querySelectorAll(".select");
for (let option of select){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        option.append(newOption);
        }
   option.addEventListener("change", updateFlag);
    }

document.querySelector(".from").value = "USD";
document.querySelector(".to").value = "INR";


function updateFlag(){
    let fromCurrCode = document.querySelector(".from select").value;
    let toCurrCode = document.querySelector(".to select").value; 
    
    let fromCountryCode = countryList[fromCurrCode]; 
    let toCountryCode = countryList[toCurrCode]; 
    
    let fromFlagUrl = `https://flagsapi.com/${fromCountryCode}/flat/64.png`; 
    let toFlagUrl = `https://flagsapi.com/${toCountryCode}/flat/64.png`; 
    
    document.querySelector(".fromflag").src = fromFlagUrl;
    document.querySelector(".toflag").src = toFlagUrl; 
}

document.querySelectorAll(".select").forEach(select => {
    select.addEventListener("change", updateFlag);
});

updateFlag();


button.addEventListener("click", async(evt)=>{
    evt.preventDefault();
    let amount = document.querySelector("#inputamt").value;
    if (amount < 0) {
        alert("Invalid input! Please enter a positive value.");
        console.log("Invalid input! Please enter a positive value.");
    }
    let URL=`${baseUrl}/${fromCurr.value}/${toCurr.value}`;
    let response=await fetch(URL);
    let data=await response.json();
    let rate = data.conversion_rate;
    console.log(rate);
    let finalAmount=amount*rate;
    msg.innerText = `${amount} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});

