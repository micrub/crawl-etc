const {expect} = require('chai');
const {genUrls} = require('../');

describe('lib', function (){
  describe('genUrl function', function() {
    describe('it should return array of ten urls', function() {
      console.log(genUrls());
       expect(genUrls().length).to.be.eq(10);
    });
  });
})
