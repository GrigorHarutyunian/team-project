const breedSelect = document.getElementById('breedSelect');
const dogContainer = document.getElementById('dogContainer');
const dogImage = document.getElementById('dogImage');

breedSelect.addEventListener('change', fetchDogImage);

function fetchDogImage() {
  const selectedBreed = breedSelect.value;

  if (selectedBreed) {
    fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`)
      .then(response => response.json())
      .then(data => {
        dogImage.src = data.message;
        dogImage.style.display = 'block';
      })
      .catch(error => console.error('Error fetching dog image:', error));
  } else {
    dogImage.style.display = 'none';
  }
}
