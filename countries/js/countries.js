fetch('https://restcountries.com/v3.1/independent?fields=name,flags').then(data => data.json()).then(data => {
  for (i in data) {
    const countries = document.getElementById('countriesList');
    const country = document.createElement('div');
    const countryContent = document.createElement('div');
    const countryFlag = document.createElement('div');
    const flag = document.createElement('img')
    const countryName = document.createElement('h3');
    const countryDetail = document.createElement('a');

  
    const flagPng = data[i]['flags']['png'];
    const name = data[i]['name']['official'];

    countryDetail.innerText = name;

    countryContent.setAttribute('class', "content");
    country.setAttribute('class', 'country');
    countryFlag.setAttribute('class', 'flag');
    countryDetail.setAttribute('href', `./country.html?name=${name}`)
    flag.setAttribute('src', flagPng);
    
    countryFlag.append(flag)
    country.append(countryFlag);
    countryName.append(countryDetail);
    countryContent.append(countryName);
    country.append(countryContent);
    countries.append(country);
  }

})