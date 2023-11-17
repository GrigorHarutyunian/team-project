const parentDiv = document.querySelector(".parentDiv");
const url = "https://65522b955c69a7790329a384.mockapi.io/movie/movie/";

async function getDataFromApi(url) {
  try {
    let response = await fetch(url);
    let data = response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return data;
  } catch (error) {
    parentDiv.style.background = "red";
    parentDiv.style.margin = "300px";
    parentDiv.innerText = "Please reload the page, something went wrong";
    document.body.append(parentDiv);
  }
}

function createElemsInMenu(data) {
  function drawAmenu(data) {
    data.forEach((obj) => {
      const elem = document.createElement("div");
      elem.setAttribute("class", "elemClass");

      const divPic = document.createElement("div");
      divPic.setAttribute("class", "divForPic");
      divPic.style.backgroundImage = `url(${obj.image})`;

      const titleInElem = document.createElement("span");
      titleInElem.setAttribute("class", "spanStyleInElem");
      titleInElem.innerText =
        obj.title.length > 15 ? obj.title.slice(0, 15) + "..." : obj.title;
      elem.append(divPic, titleInElem);
      parentDiv.append(elem);

      elem.addEventListener("click", async () => {
        const uniqueData = await fetch(`${url}/${obj.id}`);
        const uniqueElemList = await uniqueData.json();
        const modal = showModal();
        parentDiv.prepend(modal);

        const divModalImg = document.querySelector(".divForModalImg");
        const modalText = document.querySelector(".modalText");
        const modalTextYear = document.querySelector(".modalTextYear");
        const modalButton = document.querySelector(".modalCloseButton");
        const divForVideo = document.querySelector(".divForVideo");
        divModalImg.style.backgroundImage = `url(${uniqueElemList.big})`;
        modalText.innerText = uniqueElemList.description;
        modalTextYear.innerText = uniqueElemList.year;
        modalButton.addEventListener("click", () => hideModal());
        divForVideo.addEventListener("click", () =>
          showModalVideo(uniqueElemList)
        );
      });
    });
  }

  drawAmenu(data);
  let searcText = "";
  const searchInput = document.querySelector(".searchInputClass");
  searchInput.addEventListener("keyup", async (evt) => {
    searcText = evt.target.value;
    refresh();
  });
  let id;
  function refresh() {
    if (id !== undefined) {
      clearTimeout(id);
    }
    id = setTimeout(() => {
      render();
    }, 500);
  }

  async function render() {
    let data = await getDataFromApi(url);
    data = data.filter((val) => {
      return (
        val.title.toLocaleLowerCase().search(searcText.toLocaleLowerCase()) !==
        -1
      );
    });
    parentDiv.innerHTML = "";
    drawAmenu(data);
  }
}

function navBar() {
  const navBar = document.createElement("nav");
  navBar.setAttribute("class", "nav");
  const iconForBackManu = document.createElement("a");
  iconForBackManu.href = "../index.html";
  const imgBack = document.createElement("img");
  imgBack.setAttribute("class", "imgBackClass");
  imgBack.src =
    "../images/kisspng-website-house-home-world-wide-web-computer-icons-house-clip-art-5ab036bbf19551.9166615015214977879895.png";
  iconForBackManu.append(imgBack);
  const searchInput = document.createElement("input");
  searchInput.setAttribute("class", "searchInputClass");
  searchInput.type = "search";
  searchInput.placeholder = "search";
  navBar.append(iconForBackManu, searchInput);
  return navBar;
}

function showModal() {
  const modal = document.createElement("div");
  modal.setAttribute("class", "myModal");
  modal.style.display = "block";

  const modalContent = document.createElement("div");
  modalContent.setAttribute("class", "modalContent");

  const divForModalImg = document.createElement("div");
  divForModalImg.setAttribute("class", "divForModalImg");

  const modalCloseButton = document.createElement("button");
  modalCloseButton.setAttribute("class", "modalCloseButton");
  modalCloseButton.innerHTML = `<i class="fa-solid fa-xmark"></i>`;

  const modalText = document.createElement("span");
  modalText.setAttribute("class", "modalText");

  const divForModalText = document.createElement("div");
  divForModalText.setAttribute("class", "divForModalText");

  const modalTextYear = document.createElement("span");
  modalTextYear.setAttribute("class", "modalTextYear");

  const divForVideo = document.createElement("div");
  divForVideo.setAttribute("class", "divForVideo");
  divForVideo.innerHTML = `<i class="fa-brands fa-youtube fa-beat fa-2xl" style="color: #ff0033;"></i>`;

  divForModalText.append(
    modalText,
    modalTextYear,
    modalCloseButton,
    divForVideo
  );
  modalContent.append(divForModalImg, divForModalText);
  modal.append(modalContent);

  return modal;
}

function hideModal() {
  const modal = document.querySelector(".myModal");
  modal.classList.add("closing");
  setTimeout(() => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    modal.remove();
  }, 1000);
}

function showModalVideo(list) {
  const modal = document.createElement("iframe");
  modal.setAttribute("class", "myModalVideo");
  modal.style.display = "block";
  modal.src = list.video;
  const divForModalText = document.querySelector(".divForModalText");
  divForModalText.append(modal);
  const divForVideo = document.querySelector(".divForVideo");
  divForVideo.style.display = "none";
}

async function init(url) {
  document.body.prepend(navBar());
  const data = await getDataFromApi(url);
  createElemsInMenu(data);
}

init(url);

function load() {
  const load = document.getElementById("loading");
  load.style.display = "none";
}

window.onload = function () {
  setTimeout(load, 500);
};