const url = "https://dog.ceo/api/breeds/list/all";
const urlImg = "https://dog.ceo/api/breed";
const parentDiv = document.querySelector(".parentDiv");
const obj = {};
async function getApiInfo(url) {
  try {
    const allNames = await fetch(url);
    let dataDogs = await allNames.json();

    return dataDogs;
  } catch (err) {
    console.log(err);
  }
}

function addselectInput(data) {
  const select = document.createElement("select");
  select.setAttribute("class", "dogsSelect");
  const optgroupBig = document.createElement("optgroup");
  optgroupBig.label = "Dogs";
  select.append(optgroupBig);
  for (let key in data) {
    if (data[key].length === 0) {
      const option = document.createElement("option");
      option.setAttribute("class", "optionClass");
      option.innerText = key;
      select.append(option);
      parentDiv.append(select);
    } else {
      const optionWithNested = document.createElement("option");
      optionWithNested.setAttribute("class", "optionWithNested");
      optionWithNested.innerText = key;
      optionWithNested.style.color = "red";
      obj[key] = [];
      data[key].forEach((val) => {
        obj[key].push(val);
      });
      select.append(optionWithNested);
      parentDiv.append(select);
    }
  }
}

function onchanged(url) {
  const select = document.querySelector(".dogsSelect");
  const divForImg = document.createElement("div");
  divForImg.setAttribute("class", "divImgClass");
  select.addEventListener("change", async (evt) => {
    const data = await fetch(`${url}/${select.value}/images`);
    const newListImg = await data.json();
    const imgArr = newListImg.message;
    const randomIndex = Math.ceil(Math.random() * imgArr.length - 1);
    divForImg.style.backgroundImage = `url(${imgArr[randomIndex]})`;
  });
  parentDiv.append(divForImg);
}

function nestedOptions() {
  const optionWithNested = document.querySelectorAll(".optionWithNested");
  optionWithNested.forEach((val) => {
    val.addEventListener("mauseenter", () => {
      alert(1);
    });
  });
}

async function init(url, urlImg) {
  const allDogs = await getApiInfo(url);
  const allDogsList = allDogs.message;
  addselectInput(allDogsList);
  onchanged(urlImg);
  nestedOptions();
}

init(url, urlImg);


function load() {
  const load = document.getElementById("loading");
  load.style.display = "none";
}

window.onload = function () {
  setTimeout(load, 500);
};