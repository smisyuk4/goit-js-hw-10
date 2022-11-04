export default function countryCard(country) {
    const {flag, name, capital, population, languages} = country

    return `<div class="country-card">
                <div class="title">
                    <img class="flag" src="${ flag }" alt="${ name } min-width="40" height="30"">
                        <h1 class="name">${ name }</h1>
                </div>                                    
                <ul class="description-list">
                    <li><span class="capital">capital:  </span> ${ capital }</li>
                    <li><span class="population">population:  </span> ${ population }</li>
                    <li><span class="languages">languages:  </span> ${ languages }</li>
                </ul>
            </div>`
}