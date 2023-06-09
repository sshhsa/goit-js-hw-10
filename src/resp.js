// const BASE_URL = 'https://restcountries.com/v3.1';

// export function fetchCountries(name) {
//   const url = `${BASE_URL}/name/${name}?fields=name,capital,flags,population,languages`;
//   return fetch(url)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.statusText);
//       }
//       return response.json();
//     })
//     .then(data => {
//       return data;
//     })
//     .catch(error => {
//       console.error(error);
//     });
// }

function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v3.1/name/';
  return fetch(
    `${BASE_URL}${name}?fields=name,capital,flags,population,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
export { fetchCountries };
