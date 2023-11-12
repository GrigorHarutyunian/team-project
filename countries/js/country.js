const name = new URLSearchParams(window.location.search).get('name');

fetch(`https://restcountries.com/v3.1/name/${name}`).then(data => data.json()).then(data => {
    const countryDetail = document.getElementById('countryDetail');
    const country = document.createElement('div');
    country.setAttribute('class', "country");
    countryDetail.append(country);
    const flagsSvg = data[0]['flags']['svg'];
    const flagBlock = document.createElement('div');
    flagBlock.setAttribute('class', 'flag');
    const flagSvg = document.createElement('img')
    flagSvg.setAttribute('src', flagsSvg);
    flagBlock.append(flagSvg);
    country.append(flagBlock);

    const content = document.createElement('div')
    content.setAttribute('class', 'content');
    country.append(content);
    const countryName = document.createElement('h2');
    countryName.innerText = name;
    content.append(countryName);

    if (typeof data[0]['currencies'] === 'object') {
      const curr = Object.values(data[0]['currencies'])[0];
      const currency = `${curr['symbol']} ${curr['name']}`;
      const countryCurrency = document.createElement('span')
      countryCurrency.innerText = `Currency - ${currency}`;
      content.append(countryCurrency);
    } 

    let capital = data[0]['capital'];
    if (capital) {
      capital = capital.join('');
      const countryCapital = document.createComment('span');
      countryCapital.innerText = `Capital - ${capital}`;
      content.append(countryCapital);
    }


    const region = data[0]['region'];
    if (region) {
      const countryRegion = document.createElement('span');
      countryRegion.innerText = `Region - ${region}`;
      content.append(countryRegion);
    }
  
    const subregion = data[0]['subregion'];
    if (subregion) {
        const countrySubRegion = document.createElement('span');
        countrySubRegion.innerText = `Subregeon - ${subregion}`;
        content.append(countrySubRegion);
    }

    let languages = data[0]['languages'];
    if (languages) {
      languages = Object.values(languages).join(', ');
      const countryLanguages = document.createElement('span');
      countryLanguages.innerText = `Languages - ${languages}`;
      content.append(countryLanguages);
    }

    const latlng = data[0]['latlng'].join(', ');
    const countryLatLng = document.createElement('span');
    countryLatLng.innerText = `Latitude & Longitude - ${latlng}`;
    content.append(countryLatLng);

    const area = data[0]['area'];
    if (area) {
        const countryArea = document.createElement('span');
        countryArea.innerText = `Area - ${area}`;
        content.append(countryArea);
    }
      
    const population = data[0]['population'];
    if (population) {
        const countryPopulation = document.createElement('span');
        countryPopulation.innerText = `Population - ${population}`;
        content.append(countryPopulation);
    } 

    const timezones = data[0]['timezones'].join(', ');
    const countryTimezones = document.createElement('span');
    countryTimezones.innerText = `Timezones - ${timezones}`;
    content.append(countryTimezones);

    const continents = data[0]['continents'][0];
    const countryContinents = document.createElement('span');
    countryContinents.innerText = `Continents - ${continents}`;
    content.append(countryContinents);

    const startOfWeek = data[0]['startOfWeek'];
    const countryStartOfWeek = document.createElement('span');
    countryStartOfWeek.innerText = `Start of week - ${startOfWeek}`;
    content.append(countryStartOfWeek);

    let googleMaps = data[0]['maps']['googleMaps'];
    const countryGoogleMaps = document.createElement('a');
    countryGoogleMaps.setAttribute('href',googleMaps);
    countryGoogleMaps.innerText = 'Map';
    content.append(countryGoogleMaps);
})