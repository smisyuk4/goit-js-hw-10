// https://restcountries.com/
// https://restcountries.com/#api-endpoints-v3-name

// 1+. Напиши функцію fetchCountries(name), яка робить HTTP-запит на ресурс name 
// і повертає проміс з масивом країн - результатом запиту.

// 2+. Винеси її в окремий файл fetchCountries.js і зроби іменований експорт.

// 3+. У відповіді від бекенду повертаються об'єкти. 
// Щоб скоротити обсяг переданих даних, 
// додай рядок параметрів запиту - таким чином цей бекенд реалізує фільтрацію полів.
// Ознайомся з документацією синтаксису фільтрів.
// https://restcountries.com/#filter-response

// Тобі потрібні тільки наступні властивості:
// name.official - повна назва країни
// capital - столиця
// population - населення
// flags.svg - посилання на зображення прапора
// languages - масив мов

// 4+. Назву країни для пошуку користувач вводить у текстове поле input#search - box.
// HTTP - запити виконуються при введенні назви країни, тобто на події input.
// Але робити запит з кожним натисканням клавіші не можна, 
// оскільки одночасно буде багато запитів і вони будуть виконуватися в непередбачуваному порядку.

// 5+. Необхідно застосувати прийом Debounce на обробнику події і робити HTTP-запит 
// через 300мс після того, як користувач перестав вводити текст.
// Використовуй пакет lodash.debounce.
// https://www.npmjs.com/package/lodash.debounce

// 6+. Якщо користувач повністю очищає поле пошуку, то HTTP-запит не виконується, 
// а розмітка списку країн або інформації про країну зникає.

// 7+. Виконай санітизацію введеного рядка методом trim(), 
// це вирішить проблему, коли в полі введення тільки пробіли, 
// або вони є на початку і в кінці рядка.

// 8+. Якщо у відповіді бекенд повернув більше ніж 10 країн, 
// в інтерфейсі з'являється повідомлення про те, що назва повинна бути специфічнішою. 
// Для повідомлень використовуй бібліотеку notiflix і виводь такий рядок 
// "Too many matches found. Please enter a more specific name.".
// https://github.com/notiflix/Notiflix#readme

// 9+. Якщо бекенд повернув від 2-х до 10-и країн, 
// під тестовим полем відображається список знайдених країн. 
// Кожен елемент списку складається з прапора та назви країни.

// 10+. Якщо результат запиту - це масив з однією країною, 
// в інтерфейсі відображається розмітка картки з даними про країну: 
// прапор, назва, столиця, населення і мови.

// 11+. Якщо користувач ввів назву країни, якої не існує, бекенд поверне не порожній масив, 
// а помилку зі статус кодом 404 - не знайдено.
// Якщо це не обробити, то користувач ніколи не дізнається про те, 
// що пошук не дав результатів.
// Додай повідомлення "Oops, there is no country with that name" у разі помилки, 
// використовуючи бібліотеку notiflix.

// 12. Зробити шаблони розмітки
// https://handlebarsjs.com/installation/#npm-or-yarn-recommended
// npm uninstall handlebars


import './css/styles.css';
const debounce = require('lodash.debounce'); 
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css'
import fetchContries from '../src/fetchCountries.js'
import countryCard from '../src/template/country-card.js'
import countryList from '../src/template/country-list.js'

const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info'),
}

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(findCountry, DEBOUNCE_DELAY))

function findCountry(event) {
    let name = event.target.value
    name = name.trim()

    fetchContries(name).then(response => {
        return response;
    })
    .then(result => {
        clearPage()

        if (result.length === 1) {
            const country = {
                name: result[0].name.official,
                flag: result[0].flags.svg,
                capital: result[0].capital,
                population: result[0].population,
                languages: Object.values(result[0].languages).join(', '),
            }

            refs.info.insertAdjacentHTML('beforeend', countryCard(country))
        }

        if (result.length > 2 && result.length <= 10) {
            const markup = result.map(item => {
                const country = {
                    name: item.name.official,
                    flag: item.flags.svg,                
                }               

                return countryList(country)                
            }).join('')
        
            refs.list.insertAdjacentHTML('beforeend', markup)
        }
        
        if (result.length > 10) {
            Notify.info('Too many matches found. Please enter a more specific name.');
        }
    })
    .catch(error => {
        clearPage()
        Notify.failure('Oops, there is no country with that name.');
        Notify.failure(`${error}`);
    })
}

function clearPage() {
    refs.list.innerHTML = ""
    refs.info.innerHTML = ""
}