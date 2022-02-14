import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './services/fetchCountries'

const refs = {
  inputRef: document.querySelector('#search-box'),
  listRef: document.querySelector('.country-list'),
  infoRef: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

const findCountries = e => {
   e.preventDefault();
   const form = e.currentTarget;
   const country = form.elements.country.value.trim();
   console.log(form);
      console.log(country);
   if (!country) {
      Notiflix.Notify.warning('Enter country');
      return;
   }
   fetchCountries(country)
      .then(countries => renderCountry(countries))
      .catch(err => console.log(err));
};

const renderCountry = countries => {
   const markup = createMarkup(countries);
   refs.listRef.innerHTML = markup;
}
const createMarkup = ({ name }) =>
   `<li>${name.offical}</li>`;


refs.inputRef.addEventListener('input', debounce(findCountries, 300));
