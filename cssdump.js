var fs = require('fs');
var casper = require('casper').create({
	clientScripts: ["lib.js"]
});
var x = require('casper').selectXPath;
var utils = require('utils');
var plan = require(casper.cli.args[0]);

var dump = {};
var snapshot = function(name, dump) {
	var res = {};
	var elements = document.getElementsByTagName("*");
	for (var i = 0; i < elements.length; i++) {
		var e = elements[i];
		var css = {}
		var style = window.getComputedStyle(e);
		for (var j = 0; j < style.length; j++) {
			var prop = style.item(j);
			css[prop] = style.getPropertyValue(prop);
		}
		res[myFullPath(e)] = css;
	}
	dump[name] = res;
	return dump;
}

function l(path) {
	if (casper.cli.options["local"] == true)
		return 'file://' + fs.absolute(path);
	else
		return path;
}

var current = plan.shift();
var action = Object.keys(current).shift();
var value = current[action];
casper.start(l(value));
while (plan.length > 0) {
	current = plan.shift();
	action = Object.keys(current).shift();
	value = current[action];
	switch (action) {
		case "open":
			casper.thenOpen(l(value));
			break;
		case "snapshot":
			(function(value) {
				casper.then(function() {
					dump = this.evaluate(snapshot, value, dump);
				});
			})(value);
			break;
		case "click":
			(function(value) {
				casper.then(function() {
					this.click(value);
				});
			})(value);
			break;
		default:
			console.log("Erreur!");
	}
}

casper.run(function() {
	console.log(JSON.stringify(dump));
	this.exit();
});
