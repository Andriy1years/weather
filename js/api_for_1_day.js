function getWeeklyWeather(apiKey, city) {
    // Формируем URL запроса к API для получения прогноза на следующие 7 дней
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&cnt=40`;

    // Отправляем запрос к API
    fetch(url)
        .then(response => {
            // Проверяем статус код ответа
            if (!response.ok) {
                throw new Error('Ошибка при получении данных. Проверьте правильность API ключа и название города.');
            }
            // Если запрос успешен, получаем данные о погоде в формате JSON
            return response.json();
        })
        .then(data => {
            // Обрабатываем полученные данные для каждого дня на следующей неделе
            data.list.forEach(dayForecast => {
                const date = new Date(dayForecast.dt * 1000);
                const description = dayForecast.weather[0].description;
                const temperature = dayForecast.main.temp;
                console.log(`Прогноз погоды в городе ${city} на ${date.toLocaleDateString()}:`);
                console.log(`Описание: ${description}`);
                console.log(`Температура: ${temperature}°C`);
                console.log('----------------------------------');
            });
        })
        .catch(error => {
            console.error(`Произошла ошибка: ${error.message}`);
        });
}

const apiKey = '7f616499082a1f88bd07737fbf9768fd';
const city = 'хуст';

getWeeklyWeather(apiKey, city);
