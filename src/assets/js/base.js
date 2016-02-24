$.get('/assets/images/icons.svg', function(data) {
	var div = document.createElement("div");
	div.style.display = 'none';
	div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
	document.body.insertBefore(div, document.body.childNodes[0]);
});