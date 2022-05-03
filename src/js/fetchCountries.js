const params = 'name,capital,population,flags,languages';

export function fetchCountries(name){
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=${params}`)
    .then(response => {
        if (!response.ok) throw new Error(response.status);

        return response.json()
    });
};
