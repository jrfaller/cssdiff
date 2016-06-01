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

		var siblings = el.parentNode.childNodes;
		if (siblings.length > 1) {
			var pos = -1;
			var nb = 0;
			for (var i = 0; i < siblings.length; ++i) {
				var sibling = siblings[i];
				if (sibling.nodeType == 1 && sibling.tagName == el.tagName) {
					if (sibling == el)
						pos = nb;
					nb++;
				}
			}
			if (nb > 1)
				name += "/" + pos;
		}

		names.unshift(name);
		el = el.parentNode;
	}
	return names.join(" ");
}
