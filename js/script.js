




document.querySelectorAll('.nav a').forEach(function(link) {
    link.addEventListener('click', function() {
        document.querySelector('.nav a.active').classList.remove('active');
        this.classList.add('active');
    });
});

// prevent form reload
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
});



let searchInput= document.querySelector('#search'); 

searchInput.addEventListener('keypress', async function(e){
    if(e.key === 'Enter'){
        let city = this.value.trim();
        await getWeatherData(city);
    }
});

// fetching weather details
async function getWeatherData(city){
    let apikey="46e113e7fb5a67f04efd946bfd87abe3";
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    try{
        let response= await fetch(url);
        let data= await response.json();
 console.log(data);
      if(data.cod !== 200){
        alert("City not found");
        return;}
        updateUI(data);
        updateSunriseSunset(data);
    }
    catch(error){
        console.error("Error fetching weather data:", error);
        alert("Failed to fetch weather data. Please try again later.");
    }

        
       
}

function updateUI(data){
    
    document.querySelector('#city').textContent = data.name;
    document.querySelector('#temp').textContent = Math.round(data.main.temp) + "°C";

    document.querySelector('#wind').textContent = data.wind.speed + " m/s";
    document.querySelector('#pressure').textContent = data.main.pressure + " hPa";
    document.querySelector('#humidity').textContent = data.main.humidity + "%";
}
  

let sunrise= document.querySelector('#sunrise');
let sunset= document.querySelector('#sunset');

function updateSunriseSunset(data){
    let sunriseTime = new Date(data.sys.sunrise * 1000);
    let sunsetTime = new Date(data.sys.sunset * 1000);
    sunrise.textContent = sunriseTime.toLocaleTimeString();
    sunset.textContent = sunsetTime.toLocaleTimeString();
}
