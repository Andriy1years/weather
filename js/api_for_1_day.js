const send = document.getElementById('send');
const search = document.getElementById('search');
const error = document.getElementById('error');
const register_menu = document.getElementById('register_menu');

send.addEventListener("click", () => {
    const apiKey = '7f616499082a1f88bd07737fbf9768fd';
    const city = search.value;
    getWeatherForecast(apiKey, city);
});

search.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const apiKey = '7f616499082a1f88bd07737fbf9768fd';
        const city = search.value;
        getWeatherForecast(apiKey, city);
    }
});

function getWeatherForecast(apiKey, city) {
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                send.style.borderColor = "red";
                send.style.borderLeft = "solid 1px #4b4b4b";
                error.style.display = "block";
                search.style.borderColor = "red";
                search.style.borderRight = "solid 1px #4b4b4b";
                throw new Error('Помилка отримання даних. Перевірте правильність ключа API та назви міста.');
            }

            return response.json();
        })
        .then(data => {
            if (!data.list || data.list.length === 0) {
                throw new Error('Дані про прогноз погоди не отримані.');
            }

            // Прогноз на завтра
            const forecast = data.list[0];

            const temperature = forecast.main.temp;
            const rainProbability = forecast.pop * 100;
            const maxTemperature = forecast.main.temp_max;
            const minTemperature = forecast.main.temp_min;
            const description = forecast.weather[0].description;
            const translatedDescription = translateDescription(description);

            const sunrise = new Date(data.city.sunrise * 1000);
            const sunset = new Date(data.city.sunset * 1000);

            const daysOfWeek = ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота'];
            let dayIndex = new Date().getDay() + 1;
            if (dayIndex >= daysOfWeek.length) {
                dayIndex = 0;
            }
            const dayOfWeek = daysOfWeek[dayIndex];

            console.log(`Погода у місті ${city}:`);
            console.log(`День тижня: ${dayOfWeek}`);
            console.log(`Опис: ${translatedDescription}`);
            console.log(`Прогнозована температура: ${temperature.toFixed(2)}°C`);
            console.log(`Максимальна температура: ${maxTemperature.toFixed(2)}°C`);
            console.log(`Мінімальна температура: ${minTemperature.toFixed(2)}°C`);
            console.log(`Час сходу сонця: ${sunrise.toLocaleTimeString()}`);
            console.log(`Час заходу сонця: ${sunset.toLocaleTimeString()}`);
            console.log(`Ймовірність опадів: ${rainProbability.toFixed(2)}%`);
            register_menu.style.display = "none";
        })
        .catch(error => {
            console.error(`Сталася помилка: ${error.message}`);
        });
}

function translateDescription(description) {
    return translationDictionary[description.toLowerCase()] || description;
}

const translationDictionary = {
    "clear sky": "чисте небо",
    "few clouds": "мало хмар",
    "scattered clouds": "розсіяні хмари",
    "broken clouds": "розірвані хмари",
    "shower rain": "зливовий дощ",
    "rain": "дощ",
    "thunderstorm": "гроза",
    "snow": "сніг",
    "mist": "туман",
    "light rain": "слабкий дощ",
    "overcast clouds": "похмуро"
};
