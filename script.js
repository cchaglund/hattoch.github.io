let entryOrderCounter = 0;


let checkRadioSelection = () => {
		for (i = 1; i < 6; i++) {
			let result = document.getElementById(`radio${i}`).checked;
			if (result === true) {
				let answer = i - 1;
				let array = ["Java", "HTML", "CSS", "Sass", "JS"];
				let typeSelection = array[answer];
				return typeSelection;

				break;
			} else if (!result && i === 5) {
				alert("Please select language");
			}
		}
	}

let submitInput = () => {
	entryOrderCounter++;
	let entryNumber = entryOrderCounter;

	let d = new Date();
	let day = d.getDate();
	let month = (d.getMonth()) + 1;
	let year = d.getFullYear();

	let date = `${day}/${month}/${year}`;
	let type = checkRadioSelection();
	let entry = document.getElementById("entryInput").value;
	let description = document.getElementById("descriptionInput").value;
	let oldEntries = document.getElementById("entries").innerHTML;
	
	checkRadioSelection();

	document.getElementById("entries").innerHTML = `
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

	document.getElementById("entryInput").value = "";
	document.getElementById("descriptionInput").value = "";	

	console.log(entryNumber);
}

let editState = false;


let editEntry = (entryNumber) => {
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

let deleteEntry = (entryNumber) => {
	document.getElementById(`${entryNumber}`).style.display = "none";
}