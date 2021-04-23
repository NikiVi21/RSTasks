const time = document.getElementById("time"),
  greeting = document.getElementById("greeting"),
  name = document.getElementById("name"),
  focus = document.getElementById("focus"),
  date = document.getElementById("date"),
  blockquote = document.querySelector("blockquote"),
  figcaption = document.querySelector("figcaption"),
  btn_blockquote = document.querySelector(".btn_blockquote"),
  weatherIcon = document.querySelector(".weather-icon"),
  temperature = document.querySelector(".temperature"),
  weatherDescription = document.querySelector(".weather-description"),
  city = document.querySelector(".city"),
  windSpeed = document.querySelector(".windSpeed"),
  humidity = document.querySelector(".humidity");

function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();
  //OUTPUT TIME
  time.innerHTML = `${addZero(hour)}:${addZero(min)}:${addZero(sec)}`;

  setTimeout(showTime, 1000);
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}

function showDate() {
  let today = new Date(),
    week = today.getDay(),
    month = today.getMonth(),
    day = today.getDate();

  const strWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const strMonth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  week = strWeek[week];
  month = strMonth[month];

  //OUTPUT DATE
  date.innerHTML = `${week}, ${day} ${month}`;
}

function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();
  if (hour >= 6 && hour < 12) {
    //Morning
    greeting.textContent = "Good Morning";
  } else if (hour >= 12 && hour < 18) {
    //Day
    greeting.textContent = "Good Day";
  } else if (hour >= 18 && hour < 24) {
    //Evening
    greeting.textContent = "Good Evening";
  } else if (hour >= 0 && hour < 6) {
    //Night
    greeting.textContent = "Good Night";
  }
}

// Get Name
function getName() {
  if (localStorage.getItem("name") === null || localStorage["name"] === "") {
    name.textContent = "[Enter Name]";
    localStorage.setItem("name", name.textContent);
  } else {
    name.textContent = localStorage.getItem("name");
  }
}

// Set Name
function setName(e) {
  if (e.type === "click") name.textContent = "";
  if (e.type === "keypress") {
    if (e.which == 13 || e.keyCode == 13) {
      if (name.textContent !== "") {
        localStorage.setItem("name", e.target.innerText);
        name.blur();
      } else name.textContent = localStorage.getItem("name");
    }
  } else if (e.type === "blur") {
    if (name.textContent !== "")
      localStorage.setItem("name", e.target.innerText);
    else name.textContent = localStorage.getItem("name");
  }
}

// Get Focus
function getFocus() {
  if (
    localStorage.getItem("focus") === null ||
    localStorage.getItem("focus") === ""
  ) {
    focus.textContent = "[Enter Focus]";
    localStorage.setItem("focus", focus.textContent);
  } else {
    focus.textContent = localStorage.getItem("focus");
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === "click") focus.textContent = "";
  if (e.type === "keypress") {
    if (e.which == 13 || e.keyCode == 13) {
      if (focus.textContent !== "") {
        localStorage.setItem("focus", e.target.innerText);
        focus.blur();
      } else focus.textContent = localStorage.getItem("focus");
    }
  } else if (e.type === "blur") {
    if (focus.textContent !== "")
      localStorage.setItem("focus", e.target.innerText);
    else focus.textContent = localStorage.getItem("focus");
  }
}

//Weather
async function getWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=02fe995f4cf70a1d73445ea0a91c0c82&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
    windSpeed.textContent = `Wind:${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity:${Math.round(data.main.humidity)}%`;
  } catch (e) {
    alert("Enter the correct city name");
  }
}

function getCity() {
  if (
    localStorage.getItem("city") === null ||
    localStorage.getItem("city") === ""
  ) {
    city.textContent = "[Enter City]";
    localStorage.setItem("city", city.textContent);
  } else {
    city.textContent = localStorage.getItem("city");
  }
}

function setCity(e) {
  if (e.type === "click") city.textContent = "";
  if (e.type === "keypress") {
    if (e.which == 13 || e.keyCode == 13) {
      if (city.textContent !== "") {
        localStorage.setItem("city", e.target.innerText);
        getWeather();
        city.blur();
      } else city.textContent = localStorage.getItem("city");
    }
  } else if (e.type === "blur") {
    if (city.textContent !== "")
      localStorage.setItem("city", e.target.innerText);
    else city.textContent = localStorage.getItem("city");
  }
}

// Blockquote
async function getQuote() {
  const url = `https://favqs.com/api/qotd`;
  const res = await fetch(url);
  const data = await res.json();
  blockquote.textContent = data.quote.body;
  figcaption.textContent = data.quote.author;
}

name.addEventListener("keypress", setName);
name.addEventListener("blur", setName);
name.addEventListener("click", setName);
focus.addEventListener("keypress", setFocus);
focus.addEventListener("blur", setFocus);
focus.addEventListener("click", setFocus);

document.addEventListener("DOMContentLoaded", getQuote);
btn_blockquote.addEventListener("click", getQuote);

document.addEventListener("DOMContentLoaded", getWeather);
city.addEventListener("keypress", setCity);
city.addEventListener("blur", setCity);
city.addEventListener("click", setCity);

//=========================================================
const baseNight = "/nikivi21-JS2020Q3/momentum/assets/images/night/";
const baseMorning = "/nikivi21-JS2020Q3/momentum/assets/images/morning/";
const baseDay = "/nikivi21-JS2020Q3/momentum/assets/images/day/";
const baseEvening = "/nikivi21-JS2020Q3/momentum/assets/images/evening/";
const baseAll = "/nikivi21-JS2020Q3/momentum/assets/images/";
const images = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "05.jpg",
  "06.jpg",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
  "19.jpg",
  "20.jpg",
];
let i = 0;

const night = "night/";
const morning = "morning/";
const day = "day/";
const evening = "evening/";

let arrSix = [];
function randomImage() {
  const i = Math.floor(Math.random() * images.length);
  let j = i;
  let array = [];

  j > 13 ? (j = j - 7) : true;

  for (let o = j; o < images.length; o++) {
    if (o >= 19 || images[o] === undefined) {
      o = o - 10;
      array.push(images[o]);
    } else {
      array.push(images[o]);
    }
  }

  let k = 0;
  while (k < 6) {
    arrSix.push(array[k]);
    k++;
  }
  return arrSix;
}
randomImage();

const arr24 = [...arrSix, ...arrSix, ...arrSix, ...arrSix];

window.onload = function firstBackground() {
  let imageSrc = "";
  let today = new Date();
  let hour = today.getHours();
  let index = Math.floor(Math.random() * arrSix.length);
  if (hour < 6) {
    imageSrc = baseNight + arrSix[index];
  } else if (hour < 12) {
    imageSrc = baseMorning + arrSix[index];
  } else if (hour < 18) {
    imageSrc = baseDay + arrSix[index];
  } else if (hour < 24) {
    imageSrc = baseEvening + arrSix[index];
  }

  viewBgImage(imageSrc);
};

function viewBgImage(data) {
  const body = document.querySelector("body");
  const src = data;
  const img = document.createElement("img");
  img.src = src;
  img.onload = () => {
    body.style.backgroundImage = `url(${src})`;
  };
}
function getImage() {
  let imageSrc = "";
  let today = new Date();
  let hour = today.getHours();

  let position = hour + i;

  if (position >= 24) {
    i = i - position;
  }

  console.log(position + " pos");
  if (position < 6 || position === 24) {
    imageSrc = baseAll + night + arr24[position - 1];
    console.log("night");
  } else if (position < 12) {
    imageSrc = baseAll + morning + arr24[position];
    console.log("morning");
  } else if (position < 18) {
    imageSrc = baseAll + day + arr24[position];
    console.log("day");
  } else if (position < 24) {
    imageSrc = baseAll + evening + arr24[position];
    console.log("evening");
  }

  viewBgImage(imageSrc);
  i++;

  btn.disabled = true;
  setTimeout(function () {
    btn.disabled = false;
  }, 1000);
}
const btn = document.querySelector(".btn");
btn.addEventListener("click", getImage);
//RUN
showTime();
showDate();
setBgGreet();
getName();
getFocus();
getCity();
// getWeather();
