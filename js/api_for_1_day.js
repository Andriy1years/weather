function getWeatherForecast(apiKey, city) {
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Помилка отримання даних. Перевірте правильність ключа API та назви міста.');
            }
            return response.json();
        })
        .then(data => {
            if (!data.list || data.list.length === 0) {
                throw new Error('Дані про прогноз погоди не отримані.');
            }
            const forecast = data.list[0];
            const temperature = forecast.main.temp;
            const rainProbability = forecast.pop * 100;
            const maxTemperature = forecast.main.temp_max;
            const minTemperature = forecast.main.temp_min;
            const description = forecast.weather[0].description;
            const sunrise = new Date(forecast.sys.sunrise * 1000);
            const sunset = new Date(forecast.sys.sunset * 1000);
           
            console.log(`Погода у місті ${city}:`);
            console.log(`Опис: ${description}`);
            console.log(`Прогнозована температура: ${temperature}°C`);
            console.log(`Максимальна температура: ${maxTemperature}°C`);
            console.log(`Мінімальна температура: ${minTemperature}°C`);
            console.log(`Час сходу сонця: ${sunrise.toLocaleTimeString()}`);
            console.log(`Час заходу сонця: ${sunset.toLocaleTimeString()}`);
            console.log(`Ймовірність опадів: ${rainProbability}%`); 
        })
        .catch(error => {
            console.error(`Сталася помилка: ${error.message}`);
        });
}

const apiKey = '7f616499082a1f88bd07737fbf9768fd';
const city = 'хуст';

getWeatherForecast(apiKey, city);
