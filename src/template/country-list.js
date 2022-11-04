export default function countryList(country) {
    const { flag, name } = country
    
    return `<li class="country-item">
                <img class="flag" src="${ flag }" alt="${ name } min-width="40" height="30"">
                <span class="name-official">${ name }</span>
            </li>`
}
                