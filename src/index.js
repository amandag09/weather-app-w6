let now = new Date();

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let monthName = [
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
let day = weekDays[now.getDay()];
let month = monthName[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();
let min = now.getMinutes();

function formatDate(currentDate) {
  if (currentDate === now) {
    let today = document.querySelector("#current-day");
    today.innerHTML = `${day}<br/>${date} ${month}<br />${hour}:${min}`;
  }
}

formatDate(now);

function getCityTemp(event) {
  event.preventDefault();
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let city = document.querySelector("#search-input").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showCityTemp);
}

function showCityTemp(response) {
  let cityInput = document.querySelector("#search-input");
  let cityName = document.querySelector("#city-name");
  let degrees = document.querySelector(".degrees");
  let temperature = Math.round(response.data.main.temp);
  cityName.innerHTML = `${cityInput.value}`;
  degrees.innerHTML = `${temperature}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getCityTemp);

function findPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function showWeather(response) {
  let degrees = document.querySelector(".degrees");
  let temperature = Math.round(response.data.main.temp);
  let currentCity = document.querySelector("#city-name");
  let currentName = response.data.main.name;
  degrees.innerHTML = `${temperature}`;
  currentCity.innerHTML = `${currentName}`;
}

let currentButton = document.querySelector("#current-btn");
currentButton.addEventListener("click", findPosition);
