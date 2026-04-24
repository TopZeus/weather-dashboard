# Weather Dashboard

A modern, responsive weather dashboard that fetches real-time weather data from the OpenWeatherMap API.

## Features

- 🔍 Search weather by city name
- 📍 Get weather for your current location
- 🌡️ Display current temperature, humidity, wind speed, and more
- 📅 5-day weather forecast
- 📱 Fully responsive design
- 🎨 Beautiful gradient UI with smooth animations
- ⚡ Real-time data updates

## Getting Started

### Prerequisites

- Modern web browser
- Free API key from [OpenWeatherMap](https://openweathermap.org/api)

### Setup

1. Clone or download this project

2. Get a free API key:
   - Visit [https://openweathermap.org/api](https://openweathermap.org/api)
   - Sign up for a free account
   - Create an API key for the "Current Weather Data" API

3. Update the API key in `script.js`:
   ```javascript
   const API_KEY = 'YOUR_API_KEY_HERE';
   ```

4. Open `index.html` in your web browser

## Usage

### Search by City
- Type a city name in the search bar
- Click "Search" or press Enter
- View current weather and 5-day forecast

### Use Current Location
- Click the "📍" button to use your device's location
- Browser will ask for permission
- Weather data for your location will be displayed

## API Endpoints Used

- **Current Weather**: `/weather?q={city}&units=metric&appid={API_KEY}`
- **Forecast**: `/forecast?lat={lat}&lon={lon}&units=metric&appid={API_KEY}`

## Technologies

- HTML5
- CSS3 (Flexbox, Grid, Gradients, Animations)
- Vanilla JavaScript (ES6+)
- OpenWeatherMap API

## Weather Data Displayed

### Current Weather
- Temperature and "feels like" temperature
- Weather description
- Humidity percentage
- Wind speed
- Atmospheric pressure
- Visibility
- Weather icon

### 5-Day Forecast
- Date
- High/Low temperatures
- Weather condition icon

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Attribution

- Weather data: [OpenWeatherMap](https://openweathermap.org/)
- Icons: OpenWeatherMap weather icons

## Tips

- Free OpenWeatherMap API allows up to 1,000 calls/day
- Data updates every 10 minutes
- Works offline after initial data fetch (until page refresh)
- Geolocation requires HTTPS in production