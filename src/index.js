import './css/styles.css';
import { fetchCountries } from './resp';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

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

    if (countries.length === 0) {
      Notiflix.Notify.info('Oops, there is no country with that name');
      return;
    }

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
        const capital = country.capital?.[0] ?? '';
        const population = country.population ?? '';
        const languages = country.languages
          ? Object.values(country.languages).join(', ')
          : '';
        return `
          <li class="country-item">
  <div class="country-details">
    <div class="container-image-country">
      <img
        src="${flagSrc}"
        alt="${countryName} flag"
        class="country-flag"
        width="40"
        height="30"
      />
      <h2 class="country-name">${countryName}</h2>
    </div>
    <div class="container-addition-text">
        <p><span class="country-label">Capital:</span> ${capital}</p>
        <p><span class="country-label">Population:</span> ${population}</p>
        <p><span class="country-label">Languages:</span> ${languages}</p>
    </div>
  </div>
</li>

        `;
      })
      .join('');

    countryList.innerHTML = countryItems;
  } catch (error) {
    if (error.status === 404) {
      Notiflix.Notify.warning('Oops, there is no country with that name');
    } else {
      Notiflix.Notify.failure('Something went wrong. Please try again later.');
    }
  }
}

async function fetchCountries(name) {
  const url = `${BASE_URL}/name/${name}?fields=name;capital;population;flags.svg;languages`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}
