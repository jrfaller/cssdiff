require('shelljs/global');

var assert = require('chai').assert;
describe('cssdump', function() {
	it('should extract css information from a website', function () {
		this.timeout(10000);
		var stdout = exec('casperjs cssdump.js test/plan.json', {silent: true}).stdout;
		var res = JSON.parse(stdout);
		assert.deepEqual(Object.keys(res), ['site']);
	});
});
