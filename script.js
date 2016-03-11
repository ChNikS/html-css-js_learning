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
function loadTable(element) {
	var url = element.innerHTML + ".json";//олько если через json, как отправить sql
	var xhr = XMLHttpRequest();
	xhr.open('GET',url,false);
	xhr.send();
	if(xhr.status != 200) {
		alert('error'+xhr.status+': '+xhr.statusText);
	} else {
		alert(xhr.responseText);
		//здесь вставка
	}
}
