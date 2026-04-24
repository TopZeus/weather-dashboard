// OpenWeatherMap API Configuration
const API_KEY = 'YOUR_API_KEY_HERE'; // Get free key from https://openweathermap.org/api
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const currentWeatherSection = document.getElementById('currentWeather');
const forecastSection = document.getElementById('forecastSection');
const loadingDiv = document.getElementById('loading');
const initialState = document.getElementById('initialState');
const errorMessage = document.getElementById('errorMessage');

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});
locationBtn.addEventListener('click', handleGeolocation);

// Main Functions
async function handleSearch() {
    const city = cityInput.value.trim();
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    await getWeatherByCity(city);
}

async function handleGeolocation() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser');
        return;
    }

    showLoading(true);
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            await getWeatherByCoords(latitude, longitude);
        },
        (error) => {
            showLoading(false);
            showError('Unable to access your location');
        }
    );
}

async function getWeatherByCity(city) {
    showLoading(true);
    clearError();
    
    try {
        const response = await fetch(
            `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        await displayCurrentWeather(data);
        await getForecast(data.coord.lat, data.coord.lon);
    } catch (error) {
        showError(error.message);
    } finally {
        showLoading(false);
    }
}

async function getWeatherByCoords(lat, lon) {
    showLoading(true);
    clearError();
    
    try {
        const response = await fetch(
            `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error('Unable to fetch weather data');
        }

        const data = await response.json();
        cityInput.value = data.name;
        await displayCurrentWeather(data);
        await getForecast(lat, lon);
    } catch (error) {
        showError(error.message);
    } finally {
        showLoading(false);
    }
}

async function getForecast(lat, lon) {
    try {
        const response = await fetch(
            `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error('Unable to fetch forecast');
        }

        const data = await response.json();
        displayForecast(data.list);
    } catch (error) {
        console.error('Forecast error:', error);
    }
}

function displayCurrentWeather(data) {
    // Update DOM with current weather
    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('date').textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const temp = Math.round(data.main.temp);
    document.getElementById('temperature').textContent = `${temp}°C`;
    document.getElementById('description').textContent = data.weather[0].description;
    
    // Weather icon from OpenWeatherMap
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    document.getElementById('weatherIcon').src = iconUrl;
    
    // Additional details
    document.getElementById('feelsLike').textContent = `${Math.round(data.main.feels_like)}°C`;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;
    document.getElementById('pressure').textContent = `${data.main.pressure} mb`;
    document.getElementById('visibility').textContent = `${(data.visibility / 1000).toFixed(1)} km`;
    
    // UV Index (requires separate API call if needed)
    document.getElementById('uvIndex').textContent = 'N/A';
    
    // Show sections
    initialState.classList.add('hidden');
    currentWeatherSection.classList.remove('hidden');
}

function displayForecast(forecastList) {
    const forecastGrid = document.getElementById('forecast');
    forecastGrid.innerHTML = '';
    
    // Get forecast for every 24 hours (every 8th item in the 3-hour interval list)
    const dailyForecasts = {};
    
    forecastList.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
        
        if (!dailyForecasts[date]) {
            dailyForecasts[date] = item;
        }
    });
    
    Object.values(dailyForecasts).slice(0, 5).forEach(item => {
        const card = document.createElement('div');
        card.className = 'forecast-card';
        
        const date = new Date(item.dt * 1000).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
        
        const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
        const maxTemp = Math.round(item.main.temp_max);
        const minTemp = Math.round(item.main.temp_min);
        
        card.innerHTML = `
            <div class="date">${date}</div>
            <img src="${iconUrl}" alt="${item.weather[0].main}">
            <div class="temp">${maxTemp}°C</div>
            <div class="temp-range">Low: ${minTemp}°C</div>
        `;
        
        forecastGrid.appendChild(card);
    });
    
    forecastSection.classList.remove('hidden');
}

function showLoading(show) {
    if (show) {
        loadingDiv.classList.remove('hidden');
    } else {
        loadingDiv.classList.add('hidden');
    }
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    currentWeatherSection.classList.add('hidden');
    forecastSection.classList.add('hidden');
    initialState.classList.remove('hidden');
}

function clearError() {
    errorMessage.textContent = '';
    errorMessage.classList.remove('show');
}

// Initial state
showLoading(false);