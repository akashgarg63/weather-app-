async function getWeather() {
  const city = document.getElementById("city").value;

  if (city.trim() === "") {
    alert("Enter city name");
    return;
  }

  document.getElementById("weather").innerHTML = "Loading...";

  try {
    // STEP 1: Convert city → coordinates
    const geoUrl = `https://nominatim.openstreetmap.org/search?city=${city}&format=json`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (geoData.length === 0) {
      document.getElementById("weather").innerHTML = "City not found ❌";
      return;
    }

    const lat = geoData[0].lat;
    const lon = geoData[0].lon;

    // STEP 2: Get weather from Open-Meteo
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

      const temp = weatherData.current_weather.temperature;
       if (temp < 15) {
         document.body.style.background =
           "linear-gradient(135deg, #00c6ff, #0072ff)";
       } else if (temp < 30) {
         document.body.style.background =
           "linear-gradient(135deg, #f7971e, #ffd200)";
       }
        
        else {
         document.body.style.background =
           "linear-gradient(135deg, #ff4242, #ff0000)";
       }
    const wind = weatherData.current_weather.windspeed;

    // Emoji logic
    let emoji = "☀️";
    if (temp < 15) emoji = "❄️";
    else if (temp < 25) emoji = "🌤️";
    else emoji = "🔥";

    document.getElementById("weather").innerHTML = `
  <h2>${city}</h2>
  <h1>${temp}°C</h1>
  <p>${emoji} Weather</p>
  <p>💨 Wind: ${wind} km/h</p>
`;
  } catch (error) {
    document.getElementById("weather").innerHTML = "Error ⚠️";
    }
    
   
    

}

// ENTER key support
document.getElementById("city").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});

 

 
