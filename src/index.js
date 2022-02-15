import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './services/fetchCountries'

const DEBOUNCE_DELAY = 300;

const refs = {
  inputRef: document.querySelector('#search-box'),
  listRef: document.querySelector('.country-list'),
  infoRef: document.querySelector('.country-info'),
};

const findCountries = (e) => {
   const country = e.target.value.trim();
   if (!country) {
      Notiflix.Notify.warning('Enter country');
      clearInfo();
      return;
   }
   fetchCountries(country)
      .then(countries => {
         clearInfo();
         if (countries.length === 1) {
            renderInfo(countries);
            return;
         }else if (10 < countries.length > 1) {
            renderCountry(countries);
         } else if(countries.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
         } else {
            renderCountry(countries);
         }
      })
      .catch(error => Notiflix.Notify.failure('Oops, there is no country with that name'));
};

const renderCountry = arr => {
   const markup = arr.map(({ name, flags }) => {
      return `<li class="country__item">
      <img src="${flags.svg}" alt="${name.common}" width="30" height="30"><h2 class="country__name">${name.official}</h2></li>`;
   }).join('');
   refs.listRef.insertAdjacentHTML('afterbegin', markup);
}
 
const renderInfo = arr => {
   const markup = arr.map(({
      name, capital, population, languages, flags
   }) => {
      return `<div class="country__wrapper">
      <img src="${flags.svg}" alt="${name.common}" width = "30" height="30">
      <h2>${name.official}</h2>
      <p>
      <span>Capital:</span>${capital}</p>
      <p><span>Population:</span>${population}</p><p><span>Languages:</span>${Object.values(languages).join(', ')}</p></div>`
   })
      .join('');
   refs.infoRef.insertAdjacentHTML('afterbegin', markup);
}
const clearInfo = () => {
   refs.listRef.innerHTML = '';
   refs.infoRef.innerHTML = '';
}


refs.inputRef.addEventListener('input', debounce(findCountries, 300));




