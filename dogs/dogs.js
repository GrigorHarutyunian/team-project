function clear(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function handleImageError(element) {
  element.src = "images/imageByError.jpg";
}

function mainBreedClick(element, event) {
  event.stopPropagation();
}

function getImageByAPI(url) {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      const imageByError = document.createElement("img");
      imageByError.setAttribute("src", "images/imageByError.jpg");
      const errorImage = document.getElementById("dogImgByError");
      const dog = document.getElementById("dog");
      clear(dog);
      clear(errorImage);
      errorImage.append(imageByError);
      const select = document.querySelector(".select");
      select.innerText = "MY DOG";
      return "Not found";
    })
    .then((data) => {
      if (data !== "Not found") {
        const src = data["message"];
        const image = document.createElement("img");
        image.setAttribute("onerror", "handleImageError(this);");
        image.setAttribute("src", src);
        const dog = document.getElementById("dog");
        const errorImage = document.getElementById("dogImgByError");
        clear(dog);
        clear(errorImage);
        dog.append(image);
      }
    });
}

function getImage(element, event) {
  event.stopPropagation();
  const breedName = element.querySelector("p").textContent;
  const select = document.querySelector(".select");
  const options = document.querySelector(".dogs_section");
  options.style.display = "none";
  select.innerText = `${breedName}`;
  let imageApi = `https://dog.ceo/api/breed/${breedName.toLowerCase()}/images/random`;
  getImageByAPI(imageApi);
}

function getSubBreedImage(element, event) {
  const options = document.querySelector(".dogs_section");
  options.style.display = "none";
  const mainBreed = element.parentElement;
  const childElement = element.querySelector("p");
  const mainBreedName = mainBreed.querySelector("p").textContent;
  const subBreedName = childElement.textContent;
  const select = document.querySelector(".select");
  const mainCategory = mainBreed.parentElement.querySelector("p").textContent;
  select.innerText = `${mainCategory} ${subBreedName}`;
  const subBreedImageApi = `https://dog.ceo/api/breed/${mainBreedName.toLowerCase()}/images/random`;
  getImageByAPI(subBreedImageApi);
}

function getBreeds() {
  fetch("https://dog.ceo/api/breeds/list/all")
    .then((data) => data.json())
    .then((data) => {
      const breeds = data["message"];
      const parent = document.querySelector(".parentDiv");
      const dogs = document.createElement("div");
      dogs.setAttribute("class", "dogs_section scroll");
      dogs.setAttribute("id", "dogs");
      for (let br in breeds) {
        if (breeds[br].length) {
          const mainBreed = document.createElement("div");
          mainBreed.setAttribute("class", "main_breed");
          mainBreed.setAttribute("id", "mainBreed");
          mainBreed.setAttribute("onclick", "mainBreedClick(this, event);");
          const mainBreedName = document.createElement("p");
          mainBreedName.innerText = br.toUpperCase();
          mainBreed.append(mainBreedName);
          const subBreedsList = document.createElement("div");
          subBreedsList.setAttribute("class", "sub_breeds_list");
          mainBreed.append(subBreedsList);
          for (b of breeds[br]) {
            const subBreed = document.createElement("div");
            subBreed.setAttribute("class", "sub_breed");
            subBreed.setAttribute("onclick", "getSubBreedImage(this, event);");
            const subBreedName = document.createElement("p");
            subBreedName.innerText = b.toUpperCase();
            subBreed.append(subBreedName);
            subBreedsList.append(subBreed);
          }
          dogs.append(mainBreed);
        } else {
          const breed = document.createElement("div");
          breed.setAttribute("class", "breed");
          breed.setAttribute("onclick", "getImage(this, event);");
          const breedName = document.createElement("p");
          breedName.innerText = br.toUpperCase();
          breed.append(breedName);
          dogs.append(breed);
        }
      }
      parent.append(dogs);
    });
}

function mySelect(element, event) {
  event.stopPropagation();
  const options = document.querySelector(".dogs_section");
  options.style.display = "block";
}

document.body.addEventListener("click", () => {
  const options = document.querySelector(".dogs_section");
  const select = document.querySelector(".select");
  select.innerText = "SELECT A BREED";
  options.style.display = "none";
});

getBreeds();

function load() {
  const load = document.getElementById("loading");
  load.style.display = "none";
  document.body.style.overflowY = "scroll";
}

window.onload = function () {
  setTimeout(load, 500);
};
