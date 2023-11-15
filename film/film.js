const parentDiv = document.querySelector(".parentDiv");
const url = "https://65522b955c69a7790329a384.mockapi.io/movie/movie";

async function createElemsInMenu(url) {
  try {
    let response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

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
      return parentDiv.append(elem);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
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
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

function showModalVideo(list) {
  const modal = document.createElement("div");
  modal.setAttribute("class", "myModalVideo");
  modal.style.display = "block";
  modal.innerHTML = `<iframe heigth="70px" width="300px" src=${list.video}></iframe>`;
  const divForModalText = document.querySelector(".divForModalText");
  divForModalText.append(modal);
  const divForVideo = document.querySelector(".divForVideo");
  divForVideo.style.display = "none";
}

async function init(url) {
  await createElemsInMenu(url);
  const elems = document.querySelectorAll(".elemClass");
  elems.forEach((elem, i) => {
    elem.addEventListener("click", async () => {
      const uniqueData = await fetch(`${url}/${i + 1}`);
      const uniqueElemList = await uniqueData.json();
      const modal = showModal();
      parentDiv.prepend(modal);
      document.body.style.overflow = "hidden";

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

init(url);
