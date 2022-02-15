const COUNTRY_URL = `https://restcountries.com/v3.1/name/`;

const fieldsNames = `?fields=name,capital,population,flags,languages`;

const fetchCountries = (name) => {
   return fetch(`${COUNTRY_URL}${name}${fieldsNames}`).then(response => {
      if (!response.ok) {
         throw new Error(response.message);
      }
      return response.json();
   }) 
};


export { fetchCountries };