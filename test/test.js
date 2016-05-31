require('shelljs/global');

var assert = require('chai').assert;
describe('cssdump', function() {
	it('should extract css information from a website', function () {
		this.timeout(10000);
		var stdout = exec('casperjs cssdump.js test/plan.json --local', {silent: true}).stdout;
		var res = JSON.parse(stdout);
		assert.deepEqual(Object.keys(res), ['site']);
		assert.sameMembers(Object.keys(res['site']),
			[ 'HTML',
				'HTML > BODY:nth-child(2)',
				'HTML > BODY:nth-child(2) > H1:nth-child(1)',
				'HTML > BODY:nth-child(2) > P:nth-child(2)',
				'HTML > HEAD:nth-child(1)',
				'HTML > HEAD:nth-child(1) > STYLE:nth-child(2)',
				'HTML > HEAD:nth-child(1) > TITLE:nth-child(1)'
			]);
	});
});
