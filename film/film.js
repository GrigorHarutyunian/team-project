const parentDiv = document.querySelector(".parentDiv");

async function createElem() {
  try {
    let response = await fetch(
      "https://gist.githubusercontent.com/Urdzik/de477f8e3d7baf4366c9d797cfe63531/raw/38c6afa2937ef222323392cc34c8c8c77e02fc40/Movie.json"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    data.splice(6, 1);
    data.forEach((obj) => {
      console.log(obj);
      const elem = document.createElement("div");
      elem.setAttribute("class", "elemClass");

      const titleInElem = document.createElement("span");
      titleInElem.setAttribute("class", "spanStyleInElem");
      titleInElem.innerText =
        obj.Title.length > 15 ? obj.Title.slice(0, 15) + "..." : obj.Title;

      const divInElem = document.createElement("div");
      divInElem.setAttribute("class", "divStyleInElem");

      const picInElem = document.createElement("img");
      picInElem.setAttribute("class", "picStyleInElem");
      picInElem.src = obj.Poster;

      divInElem.append(picInElem);

      const divInElemForButton = document.createElement("div");
      divInElemForButton.setAttribute("class", "divForButtonStyleInElem");

      const buttonInElem = document.createElement("button");
      buttonInElem.setAttribute("class", "buttonStyleInElem");
      buttonInElem.innerText = "More";

      divInElemForButton.append(buttonInElem);

      elem.append(titleInElem, divInElem, divInElemForButton);
      parentDiv.append(elem);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
createElem();
