const apiKey = '2bd6e98174b96089060318dfe819be6klnkjdnjn544'; //expired_token

document.addEventListener("DOMContentLoaded", function () {
    
    const dataInput = document.getElementById("dataInput");
    const sendButton = document.getElementById("sendButton");
    const cityNameElement= document.getElementById("city-name");
    const greetingM= document.getElementById("greeting");
    const temp= document.getElementById("temp");
    const weatherC= document.getElementById("weather-condition");
    const element = document.getElementById("weather-main");
    const currentHour = new Date().getHours();
    let greetingText;
    if (currentHour >= 5 && currentHour < 12) {
        greetingText = "Good Morning 🌞";
    } else if (currentHour >= 12 && currentHour < 17) {
        greetingText = "Good Afternoon ☀️";
    } else if (currentHour >= 17 && currentHour < 20) {
        greetingText = "Good Evening 🌆";
    } else {
        greetingText = "Good Night 🌙";
    }
    greetingM.textContent = greetingText;
    element.style.backgroundImage = 'url("assets/time-lapse-night.gif")';
    sendButton.addEventListener("click", updateCityName);
    dataInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            updateCityName();
        }
    });
  
    function updateCityName() {
        
        const enteredData = dataInput.value || "Kolkata";
        const city=dataInput.value
        

       
        const capitalizedData = enteredData.charAt(0).toUpperCase() + enteredData.slice(1);
    
        console.log("Entered Data: " + enteredData);
        cityNameElement.textContent = capitalizedData;
    
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        fetch(apiUrl)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Failed to fetch weather data: ${response.status} ${response.statusText}`);
            }
        })
        .then((data) => {
            console.log(null, data);
            temp.textContent = String(data.main.temp).substring(0,2)+"."+String(data.main.temp)[2];
            const image = document.createElement("img");
            weatherC.textContent = data.weather[0].description ;
            image.src = "https://openweathermap.org/img/wn/"+String(data.weather[0].icon)+"@2x.png";
            weatherC.appendChild(image);
            if (data.weather[0].main=="Clouds"){
                element.style.backgroundImage = 'url("assets/cloudy.gif")';
            }
            else if (data.weather[0].main=="Thunderstorm"){
                element.style.backgroundImage = 'url("assets/thunderstorm.gif")';
            }
            else if (data.weather[0].main=="Haze"){
                element.style.backgroundImage = 'url("assets/hz.gif")';
            }
            else if (data.weather[0].main=="Wind"){
                element.style.backgroundImage = 'url("assets/wind.gif")';
            }
            else if (data.weather[0].main=="Drizzle" || data.weather[0].main=="Rain"){
                element.style.backgroundImage = 'url("assets/drizzle.gif")';
            }
            else{
                element.style.backgroundImage = 'url("assets/mist.gif")';
            }
        })
        .catch((error) => {
            console.log(error, null);
            element.style.backgroundImage = 'url("assets/sad.gif")';
        });
    
        dataInput.value = "";
    }
});

