


let submitInput = () => {
	let oldEntries = document.getElementById("entries").innerHTML;
	let entry = document.getElementById("entryInput").value;
	let description = document.getElementById("descriptionInput").value;
	document.getElementById("entries").innerHTML = `<span>${entry}</span><span>${description}</span>${oldEntries}`;
}

