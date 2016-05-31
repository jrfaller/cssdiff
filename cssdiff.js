var fsrc = process.argv[2];
var fdst = process.argv[3];

var src = require("./" + fsrc);
var dst = require("./" + fdst);

var res = {};

function diffSnapshot(srcSnapshot, dstSnapshot) {
	var res = {};
	for(var selector in srcSnapshot) {
		if (dstSnapshot.hasOwnProperty(selector)) {
			var diff = diffSelector(srcSnapshot[selector], dstSnapshot[selector]);
			if (diff.length > 0)
				res[selector] = diff;
		}
		//TODO handle missing selectors?
	}
	return res;
}

function diffSelector(srcSelector, dstSelector) {
	var patch = [];
	for(var property in srcSelector) {
		if (!dstSelector.hasOwnProperty(property))
			patch.push({
				action: "removed",
				property: property,
				value: srcSelector[property]
			});
		else if (dstSelector[property] != srcSelector[property])
			patch.push({
				action: "changed",
				property: property,
				value: dstSelector[property]
		});
	}
	for(var property in dstSelector) {
		if (!srcSelector.hasOwnProperty(property))
			patch.push({
				action: "added",
				property: property,
				value: dstSelector[property]
			});
	}
	return patch;
}

var res = {};
for (var snapshot in src) {
	//TODO handle missing snapshots?
	var diff = diffSnapshot(src[snapshot], dst[snapshot]);
	if (Object.keys(diff).length > 0)
		res[snapshot] = diff;
}

console.log(JSON.stringify(res));
