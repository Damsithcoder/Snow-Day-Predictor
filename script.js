document.addEventListener('DOMContentLoaded', () => {
    // API key is loaded from config.js
    const API_KEY = config.API_KEY;
    const locationInput = document.getElementById('location');
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    const weatherInfo = document.getElementById('weatherInfo');
    const temperatureInput = document.getElementById('temperature');
    const snowfallInput = document.getElementById('snowfall');
    const windSpeedInput = document.getElementById('windSpeed');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDiv = document.getElementById('result');
    const snowflakesContainer = document.getElementById('snowflakes');

    // Snowflake animation
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        // Random starting position
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.animationDuration = `${Math.random() * 10 + 5}s`;
        snowflake.style.opacity = Math.random();
        snowflake.style.width = `${Math.random() * 5 + 2}px`;
        
        snowflakesContainer.appendChild(snowflake);
        
        // Remove snowflake after animation
        setTimeout(() => {
            snowflake.remove();
        }, 15000);
    }

    // Create continuous snowfall
    function startSnowfall() {
        setInterval(createSnowflake, 200);
    }

    // Fetch weather data from OpenWeatherMap API
    async function getWeatherData(city) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            
            // Update weather information
            const temp = Math.round(data.main.temp);
            const windSpeed = Math.round(data.wind.speed);
            
            // Estimate snowfall based on weather conditions
            let snowfall = 0;
            if (data.snow && data.snow['1h']) {
                snowfall = data.snow['1h'] / 25.4; // Convert mm to inches
            }
            
            // Update input fields
            temperatureInput.value = temp;
            windSpeedInput.value = windSpeed;
            snowfallInput.value = snowfall;
            
            // Display weather info
            weatherInfo.innerHTML = `
                <p>Current Weather in ${data.name}:</p>
                <p>Temperature: ${temp}°F</p>
                <p>Conditions: ${data.weather[0].description}</p>
                <p>Wind Speed: ${windSpeed} mph</p>
            `;
            weatherInfo.style.display = 'block';
            
            return true;
        } catch (error) {
            weatherInfo.innerHTML = `Error: ${error.message}`;
            weatherInfo.style.display = 'block';
            return false;
        }
    }

    // Get weather button click handler
    getWeatherBtn.addEventListener('click', async () => {
        const location = locationInput.value.trim();
        if (location) {
            await getWeatherData(location);
        } else {
            weatherInfo.innerHTML = 'Please enter a valid location';
            weatherInfo.style.display = 'block';
        }
    });

    // Snow day probability calculation
    function calculateSnowDayProbability(temp, snowfall, windSpeed) {
        // Base conditions for a snow day
        let probability = 0;

        // Temperature factor (lower is better)
        if (temp <= 32) {
            probability += 30;
        } else if (temp <= 40) {
            probability += 10;
        }

        // Snowfall factor
        if (snowfall >= 6) {
            probability += 40;
        } else if (snowfall >= 3) {
            probability += 20;
        } else if (snowfall >= 1) {
            probability += 10;
        }

        // Wind speed factor (high winds reduce probability)
        if (windSpeed <= 10) {
            probability += 20;
        } else if (windSpeed <= 20) {
            probability += 10;
        }

        // Cap probability between 0 and 100
        probability = Math.min(Math.max(probability, 0), 100);

        return probability;
    }

    // Display result with animation
    function displayResult(probability) {
        resultDiv.style.opacity = 1;
        
        if (probability >= 70) {
            resultDiv.innerHTML = `🎉 Snow Day Confirmed! ${probability}% Chance`;
            resultDiv.className = 'result-box result-success';
        } else if (probability >= 40) {
            resultDiv.innerHTML = `🤔 Possible Snow Day: ${probability}% Chance`;
            resultDiv.className = 'result-box result-success';
        } else {
            resultDiv.innerHTML = `❌ Low Chance of Snow Day: ${probability}% Chance`;
            resultDiv.className = 'result-box result-failure';
        }
    }

    // Validate inputs
    function validateInputs(temp, snowfall, windSpeed) {
        if (isNaN(temp) || isNaN(snowfall) || isNaN(windSpeed)) {
            resultDiv.innerHTML = '❌ Please enter valid location';
            resultDiv.className = 'result-box result-failure';
            resultDiv.style.opacity = 1;
            return false;
        }
        return true;
    }

    // Calculate button event listener
    calculateBtn.addEventListener('click', () => {
        const temperature = parseFloat(temperatureInput.value);
        const snowfall = parseFloat(snowfallInput.value);
        const windSpeed = parseFloat(windSpeedInput.value);

        if (validateInputs(temperature, snowfall, windSpeed)) {
            const probability = calculateSnowDayProbability(temperature, snowfall, windSpeed);
            displayResult(probability);
        }
    });

    // Start snowfall animation
    startSnowfall();
});
