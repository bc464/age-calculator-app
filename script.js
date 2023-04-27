const submitBtn = document.querySelector(".btn");
let day = document.querySelector(".day-input");
let month = document.querySelector(".month-input");
let year = document.querySelector(".year-input");

let inputBox = document.getElementsByClassName(".input-box")

let resultYear = document.querySelector(".result-year")
let resultMonth = document.querySelector(".result-month")
let resultDay = document.querySelector(".result-day")
let dashesIcons = document.querySelectorAll(".dashes-icon")
let errorMsg = document.querySelectorAll(".error-msg")

let h1 = document.getElementsByTagName("h1");
let errorInputBorder = document.getElementsByTagName("input")


submitBtn.addEventListener("click", ()=> {

    let enteredDay = day.value;
    let enteredMonth = month.value;
    let enteredYear = year.value;

    const a = new Date(`${enteredYear}-${enteredMonth}-${enteredDay}`);
    let b = new Date();   

    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let differenceDays = dateDiffInDays(a, b);
    let differenceMonths = monthDiff(a,b) 
    let years = new Date(new Date() - new Date(a)).getFullYear() - 1970;

    if (enteredYear % 400 == 0 || (enteredYear % 100 != 0 && enteredYear % 4 == 0)) {
        daysInMonth[1] = 29;
     }
    
     if (enteredDay === "" && enteredMonth === "" && enteredYear === "") {
        for (let i = 0; i < 3; i++) {
            
            h1[i].style.color = "#ff5959";            
            errorMsg[i].textContent = "This field is required"
            errorInputBorder[i].style.border = "1px solid #ff5959"
        }
    }

    if (enteredDay != "" && enteredMonth != "" && enteredYear != ""  ) { 


        if ((enteredDay < 1 || enteredDay > daysInMonth[enteredMonth - 1])  ||(enteredMonth < 1 || enteredMonth > 12 ) || (enteredYear > 2023 || enteredYear === "") ) { 
            for (let i = 0; i < 3; i++) {
                h1[i].style.color = "#ff5959";            
          errorMsg[0].textContent = "Must be a valid day";
          errorMsg[1].textContent = "Must be a valid month";
          errorMsg[2].textContent = "Must be in the past";
          errorInputBorder[i].style.border = "1px solid #ff5959";
            }

        } else {
            for (let i = 0; i < 3; i++) {
            h1[i].style.color = "#716f6f";
            errorMsg[i].textContent = "";
            errorInputBorder[i].style.border = "1px solid #dcdcdc";
            resultDay.textContent = differenceDays
            resultMonth.textContent = differenceMonths
            resultYear.innerHTML = years
           }
        }

        if (errorMsg[0].textContent != ""  ||
            errorMsg[1].textContent != "" || errorMsg[2].textContent != "") {
                resultDay.textContent = "--";
                resultMonth.textContent = "--";
                resultYear.textContent = "--";
            }
        }
})

function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}
  
function monthDiff(a, b) {
    var months;
    months = (b.getFullYear() - a.getFullYear()) * 12;
    months -= a.getMonth() + 1;
    months += b.getMonth();
    return months <= 0 ? 0 : months;
}
function yearDiff(a, b) {
    var years;
    years = (b.getFullYear() - a.getFullYear());
    years -= a.getFullYear() +1;
    years += b.getFullYear();
    return years <= 0 ? 0 : years;
}