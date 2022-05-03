import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';

const refs = {
    searchInput: document.querySelector("#search-box"),
    coutryList: document.querySelector(".country-list"),
    coutryInfo: document.querySelector(".country-info"),
};

const DEBOUNCE_DELAY = 300;

refs.searchInput.addEventListener('input', debounce(logtext, DEBOUNCE_DELAY));

function logtext(evt) {
    const country = (evt.target.value).trim();
    
    clearMarkup();
    
    if (country) {
    fetchCountries(country)
        .then(countries => { 
            if (countries.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            }
            else if (countries.length >= 2 && countries.length <= 10) {
                countryMarckup(countries)
            }
            else if (countries.length === 1) {
                countryOptionMarckup(countries)
            }
            console.log(countries);
        })
        .catch(error => {
            Notiflix.Notify.failure('Oops, there is no country with that name');
        })
    }
}



function countryMarckup(countries) {
    const markup = countries.map((country) => {
        return `<li class="country-list">
        <span><img src="${country.flags.svg}" width="25" height="15"></span>
        ${country.name.official}
        </li>`
    }).join('');
    refs.coutryList.innerHTML = markup;
}

function countryOptionMarckup(coutry) {
    const markup = coutry.map((info) => {
        return `<h1><span>
        <img src="${info.flags.svg}" width="60" height="30"></span>
        ${info.name.official}</h1>
        <p><span class="info-item">Capital:</span> ${info.capital}</plass=>
        <p><span class="info-item">Population:</span> ${info.population}</pm>
        <p><span class="info-item">Languages:</span> ${Object.values(info.languages)}</pm>`
    }).join('');
    refs.coutryInfo.innerHTML = markup;
}

function clearMarkup() {
    refs.coutryList.innerHTML = "";
    refs.coutryInfo.innerHTML = "";
}