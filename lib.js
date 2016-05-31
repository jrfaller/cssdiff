function fullPath(el){
	var names = [];
	while (el.parentNode){
		if (el.id){
			names.unshift('#' + el.id);
			break;
		} else {
			if (el == el.ownerDocument.documentElement) names.unshift(el.tagName);
			else {
				for (var c = 1, e = el; e.previousElementSibling; e = e.previousElementSibling, c++);
				names.unshift(el.tagName + ":nth-child(" + c + ")");
			}
			el = el.parentNode;
		}
	}
	return names.join(" > ");
}

function myFullPath(el) {
	var names = [];
	while (el.parentNode){
		name = el.tagName.toLowerCase();
		if (el.className != "") {
			var classes = el.className.split(' ')
			if (classes.length > 0)
				for (var id in classes)
					name += '.' + el.className.split(' ')[id];
		}
		if (el.id)
			name += '#' + el.id;
		names.unshift(name);
		el = el.parentNode;
	}
	return names.join(" ");
}
