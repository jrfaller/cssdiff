require('shelljs/global');

var assert = require('chai').assert;

describe('cssdump', function() {
	it('should extract css information from a website', function () {
		this.timeout(10000);
		var stdout = exec('casperjs cssdump.js test/plan.json --local', {silent: true}).stdout;
		var res = JSON.parse(stdout);
		assert.deepEqual(Object.keys(res), ['site']);
		assert.sameMembers(Object.keys(res['site']),
			["html","html body","html body h1.foo#bar","html body p/0","html body p/0 em/0","html body p/0 em/1","html body p/1","html head","html head style","html head title"]
		);
		var h1 = res['site']['html body h1.foo#bar'];
		assert.property(h1, 'font-size');
		assert.propertyVal(h1, 'font-size', '12px');
		var body = res['site']['html body'];
		assert.property(body, 'margin-top');
		assert.propertyVal(body, 'margin-top', '10px');
	});
});

describe('cssdiff', function() {
	it('should diff two css dumps', function () {
		this.timeout(10000);
		var stdout = exec('node cssdiff.js test/v0.json test/v1.json', {silent: true}).stdout;
		var res = JSON.parse(stdout);
		var expected = JSON.parse('{"site":{"html":[{"action":"changed","property":"border","value":"10px"},{"action":"removed","property":"font-size","value":"10pt"}],"ul":[{"action":"changed","property":"border","value":"2px"},{"action":"added","property":"color","value":"black"}]}}');
		assert.deepEqual(res, expected);
	});
});
