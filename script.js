const apiKey = '2ae4a8e8466eec7f2cbcc421da0631a1';
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const weatherIcon = document.querySelector('.weather-icon i');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weather-description');
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');

// Theme Toggle
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-theme');
  body.classList.toggle('light-theme');
  const isDarkTheme = body.classList.contains('dark-theme');
  themeToggle.innerHTML = isDarkTheme ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
});

// Fetch Weather Data
async function fetchWeather(city) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
  const data = await response.json();
  return data;
}

// Update Weather UI
function updateWeatherUI(data) {
  cityName.textContent = data.name;
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;

  const iconMap = {
    '01d': 'sun',
    '01n': 'moon',
    '02d': 'cloud-sun',
    '02n': 'cloud-moon',
    '03d': 'cloud',
    '03n': 'cloud',
    '04d': 'cloud',
    '04n': 'cloud',
    '09d': 'cloud-rain',
    '09n': 'cloud-rain',
    '10d': 'cloud-sun-rain',
    '10n': 'cloud-moon-rain',
    '11d': 'bolt',
    '11n': 'bolt',
    '13d': 'snowflake',
    '13n': 'snowflake',
    '50d': 'smog',
    '50n': 'smog',
  };

  const icon = iconMap[data.weather[0].icon] || 'sun';
  weatherIcon.className = `fas fa-${icon}`;
}

// Handle Form Submission
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    try {
      const weatherData = await fetchWeather(city);
      updateWeatherUI(weatherData);
    } catch (error) {
      alert('City not found. Please try again.');
    }
  }
});

// Default City on Load
fetchWeather('London').then(updateWeatherUI);