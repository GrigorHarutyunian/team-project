function clear(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function changeText(element, event) {
    event.stopPropagation();
    const input = document.getElementById('filter');
    input.value = element.textContent;
    filterSearch();
}

function levenshteinDistance(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  
    for (let i = 0; i <= m; i++) {
      for (let j = 0; j <= n; j++) {
        if (i === 0) {
          dp[i][j] = j;
        } else if (j === 0) {
          dp[i][j] = i;
        } else {
          dp[i][j] = Math.min(
            dp[i - 1][j - 1] + (str1[i - 1] !== str2[j - 1] ? 1 : 0),
            dp[i - 1][j] + 1,
            dp[i][j - 1] + 1
          );
        }
      }
    }
    return dp[m][n];
}

function filterSearch() {
    const input = document.getElementById('filter');
    const filter = input.value;
    const title = document.querySelectorAll('.country .content h3');
    const autocomplete = document.getElementById('autocomplete');
    let countryNames = [];
    clear(autocomplete);

    for (i = 0; i < title.length; i++) {
        title_text = title[i].textContent.toUpperCase();

        if (title_text.indexOf(filter.toUpperCase()) > -1 ) {
            title[i].closest('.country').style.display = "";
            countryNames.push(title[i].textContent);
        } else {
            title[i].closest('.country').style.display = 'none';
        }
    }

    function compareByLevenshtein(a, b) {
        const distanceA = levenshteinDistance(a, filter);
        const distanceB = levenshteinDistance(b, filter);
        return distanceA - distanceB;
    }
        
    countryNames.sort(compareByLevenshtein);

    for (let c = 0; c < countryNames.length; ++c) {
        const name = document.createElement('p');
        name.innerText = countryNames[c];
        name.setAttribute('onclick', 'changeText(this, event)');
        autocomplete.append(name);
    }
}

document.addEventListener('click', () => {
    const autocomplete = document.getElementById('autocomplete');
    const filter = document.getElementById('filter');
    filter.value = '';
    filterSearch();
    clear(autocomplete);
})

document.getElementById('filter').addEventListener('click', e => {
  e.stopImmediatePropagation();
})