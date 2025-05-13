# ❄️ Snow Day Calculator

A beautiful, interactive web application that calculates the probability of a snow day based on real-time weather data. The application uses the OpenWeatherMap API to fetch current weather conditions and provides an engaging user interface with animated snowfall effects.

## 🌟 Features

- Real-time weather data fetching
- Beautiful snowfall animation
- Responsive design
- Interactive UI with smooth transitions
- Snow day probability calculation based on multiple factors:
  - Temperature
  - Snowfall amount
  - Wind speed

## 🚀 Getting Started

### Prerequisites

- A modern web browser
- OpenWeatherMap API key (free tier available)

### Setup

1. Clone the repository:
```bash
git clone [your-repository-url]
```

2. Create a config.js file from the template:
```bash
cp config.sample.js config.js
```

3. Open `config.js` and replace `YOUR_API_KEY_HERE` with your OpenWeatherMap API key:
```javascript
const config = {
    API_KEY: "your-api-key-here"
};
```

4. Open `index.html` in your web browser to run the application.

> Note: The `config.js` file is ignored by git to keep your API key secure. Never commit your actual API key to version control.


### GitHub Pages Deployment
1. Fork or clone this repository
2. Go to repository Settings → Secrets and variables → Actions
3. Add a new repository secret:
   - Name: `OPENWEATHER_API_KEY`
   - Value: Your OpenWeatherMap API key
4. Go to Settings → Pages
5. Set source to "GitHub Actions"
6. Push changes to the main branch to trigger deployment

> Note: Never commit your `.env` file or expose your API key in the code.

## 📱 How to Use

1. Enter your city name in the location input field
2. Click "Get Current Weather" to fetch real-time weather data
3. The application will automatically populate:
   - Current temperature
   - Wind speed
   - Expected snowfall (if any)
4. Click "Calculate Chance of Snow Day" to see the probability

## 🛠️ Technical Details

### Files Structure

- `index.html` - Main HTML structure
- `styles.css` - CSS styling and animations
- `script.js` - JavaScript logic and API integration

### Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- OpenWeatherMap API

### Features Implementation

- **Weather Data**: Fetched using OpenWeatherMap API
- **Animations**: CSS keyframes for snowfall effect
- **Responsive Design**: Flexbox layout
- **Interactive Elements**: Dynamic updates and smooth transitions

## 🌐 API Integration

The application uses the OpenWeatherMap API to fetch current weather data:
- Temperature in Fahrenheit
- Wind speed in MPH
- Snowfall data (when available)

## 🎨 Design Features

- Smooth gradient background
- Animated snowfall effect
- Responsive layout
- User-friendly interface
- Clear visual feedback

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](your-issues-url).

## 👨‍💻 Author

Created by Damsithcoder

---

⭐️ If you found this project helpful, please give it a star!
