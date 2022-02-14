const COUNTRY_URL = `https://restcountries.com/v3.1`;
const fetchCountries = (name) => {
   return fetch(`${COUNTRY_URL}/name/${name}`).then(response =>response.json()) 
};


export { fetchCountries };