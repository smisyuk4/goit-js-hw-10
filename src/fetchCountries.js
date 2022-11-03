export default function fetchCountries(name) {
    const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;

    return fetch(url).then(
                    (response) => {
                    if (!response.ok) {
                        throw new Error(response.status);
                    }
                    return response.json();
                    }
                );
}

        

        
        

        
        
    // .then(response => {
    //     return response.json();
    // })
    // .then(response => {
    //     // console.log(response)

    //     // nameOfficial = response[0].name.official
    //     // capital = response[0].capital[0]
    //     // population = response[0].population
    //     // flagsSvg = response[0].flags.svg
    //     // languages = Object.values(response[0].languages)
    //     // console.log(languages)

    // })
    // .catch(error => {
    //     console.log(error)
    // })
// }

