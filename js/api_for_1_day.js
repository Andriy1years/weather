const send = document.getElementById('send');
const search = document.getElementById('search');
const error = document.getElementById('error');
const register_menu = document.getElementById('register_menu');
const misto = document.getElementById('misto');
const degree = document.getElementById('degree');
const day = document.getElementById('day');
const text = document.getElementById('text');
const max_degree = document.getElementById('max_degree');
const min_degree = document.getElementById('min_degree');
const rain = document.getElementById('rain');
const up_p = document.getElementById('up_p');
const down_p = document.getElementById('down_p')

//week
const DayElement = document.getElementById("nuul_day");
const DayDegreeElement = document.getElementById("day_degree");
const oneDayElement = document.getElementById("one_day");
const oneDayDegreeElement = document.getElementById("one_day_degree");
const twoDayElement = document.getElementById("two_day");
const twoDayDegreeElement = document.getElementById("two_day_degree");
const threeDayElement = document.getElementById("three_day");
const threeDayDegreeElement = document.getElementById("three_day_degree");
const fourDayElement = document.getElementById("four_day");
const fourDayDegreeElement = document.getElementById("four_day_degree");
const fiveDayElement = document.getElementById("five_day");
const fiveDayDegreeElement = document.getElementById("five_day_degree");
let forecast_number = 0

send.addEventListener("click", () => {
    const apiKey = '7f616499082a1f88bd07737fbf9768fd';
    const city = search.value;
    getWeatherForecast(apiKey, city);
});

search.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {

    }
});

const apiKey = '7f616499082a1f88bd07737fbf9768fd';
//const city = search.value;
const city = "хуст"
getWeatherForecast(apiKey, city);

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
            const forecast1 = data.list[1];
            const forecast2 = data.list[2];
            const forecast3 = data.list[3];
            const forecast4 = data.list[4];
            const forecast5 = data.list[5];



            const temperature = forecast.main.temp;
            const rainProbability = forecast.pop * 100;
            const maxTemperature = forecast.main.temp_max;
            const minTemperature = forecast.main.temp_min;
            const description = forecast.weather[0].description;
            const translatedDescription = translateDescription(description);

            const sunrise = new Date(data.city.sunrise * 1000);
            const sunset = new Date(data.city.sunset * 1000);

            const daysOfWeek = ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота'];
            let dayIndex = new Date().getDay() + 0;
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
            //city
            misto.innerHTML = city;
            //day
            day.innerHTML = dayOfWeek;
            DayElement.innerHTML = dayOfWeek;
            oneDayElement.innerHTML = daysOfWeek[(dayIndex + 1) % daysOfWeek.length];
            twoDayElement.innerHTML = daysOfWeek[(dayIndex + 2) % daysOfWeek.length];
            threeDayElement.innerHTML = daysOfWeek[(dayIndex + 3) % daysOfWeek.length];
            fourDayElement.innerHTML = daysOfWeek[(dayIndex + 4) % daysOfWeek.length];
            fiveDayElement.innerHTML = daysOfWeek[(dayIndex + 5) % daysOfWeek.length];
            //temperature
            DayDegreeElement.innerHTML = Math.round(forecast.main.temp) + "°C";
            degree.innerHTML = Math.round(forecast.main.temp) + "°C";
            oneDayDegreeElement.innerHTML = Math.round(forecast1.main.temp) + "°C";
            twoDayDegreeElement.innerHTML = Math.round(forecast2.main.temp) + "°C";
            threeDayDegreeElement.innerHTML = Math.round(forecast3.main.temp) + "°C";
            fourDayDegreeElement.innerHTML = Math.round(forecast4.main.temp) + "°C";
            fiveDayDegreeElement.innerHTML = Math.round(forecast5.main.temp) + "°C";
            //translatedDescription
            text.innerHTML = translatedDescription;
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
