import './css/styles.css';
import { fetchCountries } from './resp';
import debounce from 'lodash.debounce';

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.js-list');
const BASE_URL = 'https://restcountries.com/v3.1';

searchBox.addEventListener('input', debounce(handleSearch, 300));

async function handleSearch() {
  const searchTerm = searchBox.value.trim();

  if (searchTerm === '') {
    countryList.innerHTML = '';
    return;
  }

  try {
    const countries = await fetchCountries(searchTerm);

    const countryItems = countries
      .map(country => {
        const flagSrc = country.flags?.svg ?? '';
        const countryName = country.name?.common ?? '';
        const alpha3Code = country.cca3 ?? '';
        return `
        <li class="country-item" data-country-code="${alpha3Code}">
          <img src="${flagSrc}" alt="${countryName} flag" class="country-flag" />
          <h2 class="country-name">${countryName}</h2>
        </li>
      `;
      })
      .join('');

    countryList.innerHTML = countryItems;
  } catch (error) {
    console.error(error);
  }
}
