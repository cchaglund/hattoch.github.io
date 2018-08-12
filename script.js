
//Entries variables
let entryOrderCounter = 0;
let entryNumber = entryOrderCounter;

let d = new Date();
let day = d.getDate();
let month = (d.getMonth()) + 1;
let year = d.getFullYear();
let date = `${day}/${month}/${year}`;

//Nav variables
let clickedObject = "";


//Content/pages:



let pageDiaries = `
		<div class="form">
        <div class="choices">
          <form>
            <input type="radio" name="type" value="Java" id="radio1">Java
            <input type="radio" name="type" value="HTML" id="radio2">HTML
            <input type="radio" name="type" value="CSS" id="radio3">CSS
            <input type="radio" name="type" value="Sass" id="radio4">Sass
            <input type="radio" name="type" value="JS" id="radio5">JS
          </form>
        </div>
        <div class="entryText">
          Entry:
        </div>
        <div class="entryInput">
          <form>
            <input type="text" name="entry" size="40" id="entryInput">
          </form>
        </div>
          <div class="descriptionText">
            Description: 
          </div>
          <div class="descriptionInput">
            <form>
              <textarea id="descriptionInput" rows="1" cols="40"></textarea>
              <!--<input type="text" name="description" size="40" id="descriptionInput">-->
            </form>
          </div>
          <div class="submit">
            <button onclick="submitInput()">Submit</button>
          </div>
      </div>
      <div class="entries" id="entries">
        <!-- Entries made in js go here -->
      </div>
      `;
	

const submitInput = () => {

	
	let entry = document.getElementById("entryInput").value;
	let description = document.getElementById("descriptionInput").value;
	let oldEntries = document.getElementById("entries").innerHTML;

	const checkRadioSelection = () => {

		for (i = 1; i < 6; i++) {
			let result = document.getElementById(`radio${i}`).checked;
			if (result === true) {
				let answer = i - 1;
				let array = ["Java", "HTML", "CSS", "Sass", "JS"];
				let type = array[answer];
				return type;
				break;
			} else if (!result && i === 5) {
				alert("Please select language");
				let type = null;
				return;
			}
		}
	}

	let type = checkRadioSelection();


	const checkFieldsFilled = () => {
		
		if (type && entry && description) {
			return "ok";
		} else {
			alert("Some fields are empty");
		}
	}

	const runCardCreation = () => {
		
		entryOrderCounter++;

		let entryCard = `
		<div class="entry" id="${entryNumber}">
	          <p class="date">${date}</p>
	          <p class="type">${type}</p>
	          <p class="entryActual" id="entryText${entryNumber}" contenteditable="false">${entry}</p>
	          <p class="edit">
	          	<button onclick="editEntry(${entryNumber})" id="buttonText${entryNumber}">
	          	  Edit
	          	</button>
	          </p>
	          <p class="delete">
	            <button onclick="deleteEntry(${entryNumber})">
	              Del
	            </button>
	          </p>
	          <p class="description" id="descriptionText${entryNumber}" contenteditable="false">${description}</p>
	        </div>
		${oldEntries}`;

		document.getElementById("entries").innerHTML = entryCard;
		document.getElementById("entryInput").value = "";
		document.getElementById("descriptionInput").value = "";	

	}

	if (checkFieldsFilled() === "ok") {
		runCardCreation();
	}

	entryNumber = entryOrderCounter;
}



let editState = false;

const editEntry = (entryNumber) => {
	editState = !editState;
	
	if (editState === true) {
		//When button says edit
		document.getElementById(`buttonText${entryNumber}`).innerHTML = "Save";
		//Makes the content editable
		document.getElementById(`entryText${entryNumber}`).setAttribute("contenteditable", true);
		document.getElementById(`descriptionText${entryNumber}`).setAttribute("contenteditable", true);
		
	} else {
		//When button says save
		document.getElementById(`buttonText${entryNumber}`).innerHTML = "Edit";
		//Removes editable content attribute
		document.getElementById(`entryText${entryNumber}`).setAttribute("contenteditable", false);
		document.getElementById(`descriptionText${entryNumber}`).setAttribute("contenteditable", false);
	}
}

const deleteEntry = (entryNumber) => {
	document.getElementById(`${entryNumber}`).style.display = "none";
}



// This is navigation bar stuff which should ideally be in a diff module



/* -- HTML code to inject into index.html browser div -- */



//The color of unhighlighted nav areas
const defaultNavColor = "#9c97a8";
//The color of highlighted nav areas
const highlightedNavColor = "#ada6b8";

//Ideally the above two shouldn't be required. The js should use two defined css variable for default/highlight color

/* -- Navigation highlighting flair: -- */

//Keeps track of where the click happened. Helps to paint it the default when a new area is clicked


navigationBar.onclick = function(event) {
	//if this is first time a click happens, highlight element
	if (clickedObject === "") {
		clickedObject = event.target;
		clickedObject.style.backgroundColor = highlightedNavColor;
	  	navFlairController(clickedObject.className);
	  	let section = document.getElementById("section");
	  	section.style.backgroundColor = highlightedNavColor;
	//else, turn previous element to default, highlight new element  	
	} else {
		clickedObject.style.backgroundColor = defaultNavColor;
  		clickedObject = event.target;
	  clickedObject.style.backgroundColor = highlightedNavColor;
	  navFlairController(clickedObject.className);
	}
}

//Highlights the nav flairs to the right depending on what element was clicked
const navFlairController = (className) => {

	if (className === "link 2") {
		document.getElementById("contentContainer").innerHTML = pageDiaries;
	}

	//Which row (i.e. linkNumber) are we on?
	let linkNumber = className.charAt(5);
	let totalLinksInNavLinksDiv = document.getElementById("navLinks").children.length;
	//Resets all navFlairs to default
	for (i = 1; i <= totalLinksInNavLinksDiv; i++) {
		document.getElementById("navFlair" + i).style.backgroundColor = defaultNavColor;
	}
	//Highlights the navFlairs to the side of element and up to top
	for (i = 1; i <= linkNumber; i++) {
		document.getElementById("navFlair" + i).style.backgroundColor = highlightedNavColor;
	}
}

