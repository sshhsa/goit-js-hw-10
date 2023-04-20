// import './css/styles.css';
// import { fetchCountries } from './resp';
// import debounce from 'lodash.debounce';
// import Notiflix from 'notiflix';

// const searchBox = document.querySelector('#search-box');
// const countryList = document.querySelector('.js-list');
// const BASE_URL = 'https://restcountries.com/v3.1';

// searchBox.addEventListener('input', debounce(handleSearch, 300));

// async function handleSearch() {
//   const searchTerm = searchBox.value.trim();

//   if (searchTerm === '') {
//     countryList.innerHTML = '';
//     return;
//   }

//   try {
//     const countries = await fetchCountries(searchTerm);

//     if (countries.length > 10) {
//       Notiflix.Notify.info(
//         'Too many matches found. Please enter a more specific name.'
//       );
//       return;
//     }

//     const countryItems = countries
//       .map(country => {
//         const flagSrc = country.flags?.svg ?? '';
//         const countryName = country.name?.common ?? '';
//         const alpha3Code = country.cca3 ?? '';
//         return `
//         <li class="country-item" data-country-code="${alpha3Code}">
//           <img src="${flagSrc}" alt="${countryName} flag" class="country-flag" />
//           <h2 class="country-name">${countryName}</h2>
//         </li>
//       `;
//       })
//       .join('');

//     countryList.innerHTML = countryItems;
//   } catch (error) {
//     console.error(error);
//   }
// }

import './css/styles.css';
import { fetchCountries } from './resp';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.js-list');

searchBox.addEventListener('input', debounce(handleSearch, 300));

async function handleSearch() {
  const searchTerm = searchBox.value.trim();

  if (searchTerm === '') {
    countryList.innerHTML = '';
    return;
  }

  try {
    const countries = await fetchCountries(searchTerm);

    if (countries.length > 10) {
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
      return;
    }

    const countryItems = countries
      .map(country => {
        const flagSrc = country.flags?.svg ?? '';
        const countryName = country.name?.official ?? '';
        const alpha3Code = country.alpha3Code ?? '';
        const population = country.population ?? '';
        const capital = country.capital?.[0] ?? '';
        const languages = country.languages ?? '';
        const languagesValues = Object.values(languages).join(', ');

        return `
          <li class="country-item" data-country-code="${alpha3Code}">
            <img src="${flagSrc}" alt="${countryName} flag" class="country-flag" />
            <div class="country-info">
              <h2 class="country-name">${countryName}</h2>
              <p><span class="country-info__label">Capital:</span> <span class="country-info__value">${capital}</span></p>
              <p><span class="country-info__label">Population:</span> <span class="country-info__value">${population}</span></p>
              <p><span class="country-info__label">Languages:</span> <span class="country-info__value">${languagesValues}</span></p>
            </div>
          </li>
        `;
      })
      .join('');

    if (countries.length === 0) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    }

    countryList.innerHTML = countryItems;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    } else {
      console.error(error);
    }
  }
}
