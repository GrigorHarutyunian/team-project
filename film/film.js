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

      const picInElem = document.createElement("img");
      picInElem.setAttribute("class", "picStyleInElem");
      picInElem.src = obj.image;

      const titleInElem = document.createElement("span");
      titleInElem.setAttribute("class", "spanStyleInElem");
      titleInElem.innerText =
        obj.title.length > 15 ? obj.title.slice(0, 15) + "..." : obj.title;

      elem.append(picInElem, titleInElem);
      return parentDiv.append(elem);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

createElemsInMenu(url);
