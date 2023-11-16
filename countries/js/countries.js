fetch('https://restcountries.com/v3.1/all').then(data => data.json()).then(data => {
  for (i in data) {
    const countries = document.getElementById('countriesList');
    const country = document.createElement('div');
    country.setAttribute('class', 'country');
    countries.append(country);
    const name = data[i]['name']['official'];

    const countryFlag = document.createElement('div');
    countryFlag.setAttribute('class', 'flag');
    const flagSvg = data[i]['flags']['svg'];
    const flag = document.createElement('img');
    flag.setAttribute('src', flagSvg);
    countryFlag.append(flag);
    countryFlag.setAttribute('onclick', 'openModal(this, event)');
    const cNameBox = document.createElement('div');
    cNameBox.setAttribute('class', 'country_name_box');
    const cNmae = document.createElement('h3');
    cNmae.innerText = name;
    cNameBox.append(cNmae);
    countryFlag.append(cNameBox);
    country.append(countryFlag);

    const modal = document.createElement('div');
    modal.setAttribute('class', 'modal');
    country.append(modal);

    const modalFlag = document.createElement('div');
    modalFlag.setAttribute('class', 'modalFlag');
    modalFlag.setAttribute('onclick', 'closeModal(this, event)');
    const modalFlagSvg = document.createElement('img');
    modalFlagSvg.setAttribute('src', flagSvg);
    modalFlag.append(modalFlagSvg);
    modal.append(modalFlag);

    const closeButton = document.createElement('div');
    closeButton.setAttribute('class', 'close_modal');
    closeButton.setAttribute('onclick', 'closeModal(this, event)');
    const closeIcon = document.createElement('i');
    closeIcon.setAttribute('class', 'fa-solid fa-xmark');
    closeButton.append(closeIcon);
    modal.append(closeButton);

    const countryContent = document.createElement('div');
    countryContent.setAttribute('class', "content");
    modal.append(countryContent);

    const countryName = document.createElement('h3');
    countryName.innerText = name;
    countryContent.append(countryName);

    let capital = data[i]['capital'];
    if (capital) {
      capital = capital.join('');
      const countryCapital = document.createComment('span');
      countryCapital.innerText = `Capital - ${capital}`;
      countryContent.append(countryCapital);
    }    

    if (typeof data[i]['currencies'] === 'object') {
      const curr = Object.values(data[i]['currencies'])[0];
      const currency = `${curr['symbol']} ${curr['name']}`;
      const countryCurrency = document.createElement('span')
      countryCurrency.innerText = `Currency - ${currency}`;
      countryContent.append(countryCurrency);
    } 

    const region = data[i]['region'];
    if (region) {
      const countryRegion = document.createElement('span');
      countryRegion.innerText = `Region - ${region}`;
      countryContent.append(countryRegion);
    }

    const subregion = data[i]['subregion'];
    if (subregion) {
        const countrySubRegion = document.createElement('span');
        countrySubRegion.innerText = `Subregeon - ${subregion}`;
        countryContent.append(countrySubRegion);
    }

    let languages = data[i]['languages'];
    if (languages) {
      languages = Object.values(languages).join(', ');
      const countryLanguages = document.createElement('span');
      countryLanguages.innerText = `Languages - ${languages}`;
      countryContent.append(countryLanguages);
    }

    const latlng = data[i]['latlng'].join(', ');
    const countryLatLng = document.createElement('span');
    countryLatLng.innerText = `Latitude & Longitude - ${latlng}`;
    countryContent.append(countryLatLng);

    const area = data[i]['area'];
    if (area) {
        const countryArea = document.createElement('span');
        countryArea.innerText = `Area - ${area}`;
        countryContent.append(countryArea);
    }

    const population = data[i]['population'];
    if (population) {
        const countryPopulation = document.createElement('span');
        countryPopulation.innerText = `Population - ${population}`;
        countryContent.append(countryPopulation);
    }
    
    const timezones = data[i]['timezones'].join(', ');
    const countryTimezones = document.createElement('span');
    countryTimezones.innerText = `Timezones - ${timezones}`;
    countryContent.append(countryTimezones);

    const continents = data[i]['continents'][0];
    const countryContinents = document.createElement('span');
    countryContinents.innerText = `Continents - ${continents}`;
    countryContent.append(countryContinents);

    const startOfWeek = data[i]['startOfWeek'];
    const countryStartOfWeek = document.createElement('span');
    countryStartOfWeek.innerText = `Start of week - ${startOfWeek}`;
    countryContent.append(countryStartOfWeek);

    let googleMaps = data[i]['maps']['googleMaps'];
    const countryGoogleMaps = document.createElement('a');
    countryGoogleMaps.setAttribute('href', googleMaps);
    countryGoogleMaps.setAttribute('target', 'blank');
    countryGoogleMaps.innerText = 'Map';
    countryContent.append(countryGoogleMaps);
  }
});
