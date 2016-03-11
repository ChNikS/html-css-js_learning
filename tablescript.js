function sDecrease(i, ii) {
 if (i > ii)
 return -1;
 else if (i < ii)
 return 1;
 else
 return 0;
}
function header() {
	var indicator = document.getElementById('indicator');
    if(indicator.style.display == 'none') {
    	indicator.style.display ='inline';
    }
    else {
    	indicator.style.display = 'none';
    }
}
var timerId = setInterval(header,700);
var conent = document.getElementById('content');
var rows_to_delete = [];
var table = document.getElementById('table');
table.onclick = function edit(event) {
	var target = event.target;
	if (target.tagName == 'INPUT') {
		if(target.checked) {
			while (target != table){
				if(target.tagName == 'TR') {
				rows_to_delete.push(target.rowIndex);
				}
				target = target.parentNode;
			}
		}
	} 
	while (target != table) {
		if((target.tagName == 'TD')&&(target.firstChild.tagName != 'INPUT')) {
			cellEdit(target);		
		}
		target = target.parentNode;
	}

}
function cellEdit(elem) {
	var val = elem.innerHTML;
	elem.innerHTML = '<input type="text" id="edit" value="'+val+'"/>';
	var cell = document.getElementById('edit');
	elem.style.border = "2px solid green";
	cell.focus();
	cell.onblur = function(){
		elem.innerHTML = cell.value;
		elem.style.border = "1px solid black";

	}
}
var checkbox = document.createElement('TD');
checkbox.innerHTML = '<input type="checkbox">';
checkbox.style.width = "50px";
checkbox.style.border ="none";

function addCheckBoxes() {
	for(var i = 0; i < table.children[0].children.length; i++) {
		table.children[0].children[i].insertAdjacentElement("afterBegin", checkbox.cloneNode(true));
	}
}
function hideCheckBoxes() {
	for(i = 0;i < table.children[0].children.length; i++) {
		table.children[0].children[i].removeChild(table.children[0].children[i].children[0]);
	}
}
var del = document.getElementById('delete');
var bool = true;
del.onclick = function(){
	if(bool == true) {
	addCheckBoxes();
	del.classList.remove("tableConteiner");
	del.classList.add("active");
	bool = false;
	}  else {
		rows_to_delete.sort(sDecrease);
		for (i = 0; i < rows_to_delete.length; i++) {
			table.deleteRow(rows_to_delete[i]);
		}
		rows_to_delete.length = 0;
		hideCheckBoxes();
		del.classList.remove("active");
		del.classList.add("tableConteiner");
		bool = true;
	}
}
var add = document.getElementById('add');
add.onclick = function() {
	var add_row = document.createElement('TR');
	if(bool == false) {
		hideCheckBoxes();
		del.classList.remove("active");
		del.classList.add("tableConteiner");
		bool = true;
	}
	var rowHtml="";
	for(i=0; i < table.children[0].children[0].children.length; i++) {
		rowHtml += "<td> </td>";
	}
	add_row.innerHTML = rowHtml;
	table.children[0].insertAdjacentElement("beforeEnd",add_row);
}