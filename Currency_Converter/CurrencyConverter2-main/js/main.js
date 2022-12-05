const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menuItem");
const hamburger = document.querySelector(".hamburger");
const closeIcon = document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");


closeIcon.style.display = "none";
function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    menu.classList.add("showMenu");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
  }
}
menuItems.forEach(
  function (menuItem) {
    menuItem.addEventListener("click", toggleMenu);
  }
)
hamburger.addEventListener("click", toggleMenu);


let input = document.querySelector(".starting")
let output = document.querySelector(".ending")

let fromCurrency = 'RUB', toCurrency = 'USD'
input.addEventListener('input', getData1)
output.addEventListener('input', getData2)

let leftBtn = document.querySelectorAll(".currencies1 button")
leftBtn.forEach((item) =>
  item.addEventListener('click', () => {
    leftBtn.forEach(item => {
      item.classList.remove("active")
    });
    item.classList.add("active");
    fromCurrency = item.innerHTML
    getData2()
    available()
  }))

let rightBtn = document.querySelectorAll(".currencies2 button")
rightBtn.forEach((item) =>
  item.addEventListener('click', () => {
    rightBtn.forEach(item => {
      item.classList.remove("active")
    });
    item.classList.add("active");
    toCurrency = item.innerHTML
    getData1()
    available()
  }))

function getData1() {
  fetch(`https://api.exchangerate.host/latest?base=${fromCurrency}&symbols=${toCurrency}`)
    .then(response => response.json())
    .then(data => {
      if (input.value == "") {
        output.value = ""
      } else {
        output.value = input.value.replace(/ /g, "") * Number(data.rates[Object.keys(data.rates)[0]])
      }
    })
    .catch(error => {
      console.log(`Error: ${error.message}`);
    })
}

function getData2() {
  fetch(`https://api.exchangerate.host/latest?base=${toCurrency}&symbols=${fromCurrency}`)
    .then(response => response.json())
    .then(data => {
      if (output.value == "") {
        input.value = ""
      } else {
        input.value = output.value.replace(/ /g, "") * Number(data.rates[Object.keys(data.rates)[0]])
      }
    })
    .catch(error => {
      console.log(`Error: ${error.message}`);
    })
}

let p1 = document.getElementById("left")
let p2 = document.getElementById("right")

function available() {
  fetch(`https://api.exchangerate.host/latest?base=${fromCurrency}&symbols=${toCurrency}`)
    .then(response => response.json())
    .then(data => {
      p1.innerHTML = `1 ${fromCurrency} = ${data.rates[Object.keys(data.rates)[0]]} ${toCurrency}`
    })
    .catch(error => {
      console.log(`Error: ${error.message}`);
    })

  fetch(`https://api.exchangerate.host/latest?base=${toCurrency}&symbols=${fromCurrency}`)
    .then(response => response.json())
    .then(data => {
      p2.innerHTML = `1 ${toCurrency} = ${data.rates[Object.keys(data.rates)[0]]} ${fromCurrency}`
    })
    .catch(error => {
      console.log(`Error: ${error.message}`);
    })
}

available()
getData1()