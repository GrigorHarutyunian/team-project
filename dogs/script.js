document.addEventListener("DOMContentLoaded", function () {
  const breedSelect = document.getElementById("breedSelect");

  fetch("https://dog.ceo/api/breeds/list/all")
    .then(response => response.json())
    .then(data => {
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.text = "-- Select a breed --";
      defaultOption.disabled = true;
      defaultOption.selected = true;
      breedSelect.appendChild(defaultOption);

      const breeds = Object.keys(data.message);
      breeds.forEach(breed => {
        const option = document.createElement("option");
        option.value = breed;
        option.text = breed.charAt(0).toUpperCase() + breed.slice(1);
        breedSelect.appendChild(option);
      });
    })
    .catch(error => console.error("Error fetching dog breeds:", error));

  breedSelect.addEventListener("change", loadDogImage);

  function loadDogImage() {
    const selectedBreed = breedSelect.value;

    if (selectedBreed) {
      const apiUrl = `https://dog.ceo/api/breed/${selectedBreed}/images/random`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const dogImage = document.getElementById("dogImage");
          dogImage.src = data.message;
        })
        .catch(error => console.error("Error fetching dog image:", error));
    }
  }
});
