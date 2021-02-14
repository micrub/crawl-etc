const {expect} = require('chai');
const {genUrls,parseUrl} = require('../');

describe('lib', function (){
  describe('genUrl function', function() {
    describe('it should return array of ten urls', function() {
       expect(genUrls().length).to.be.eq(10);
    });
    describe('it should return a mock of parsed web page with sublinks', function() {
      let parsed = parseUrl("http://example.com/some/dir");
       expect(parsed).to.be.instanceOf(Object);
       expect(parsed.links).to.be.not.empty;
    });
  });
})
