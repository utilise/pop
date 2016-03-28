var expect = require('chai').expect
  , last = require('utilise.last')
  , set = require('utilise.set')
  , pop = require('./')

describe('pop', function() {

  it('should pop - vanilla', function() {
    expect(pop(['foo'])).to.be.eql([])
  })

  it('should pop - versioned', function(){
    var o = set()(['foo'])

    expect(pop(o)).to.equal(o)
    expect(o).to.eql([])
    expect(o.log.length).to.eql(2)
    expect(last(o.log)).to.eql({ key: '0', value: 'foo', type: 'remove', time: 1 })
  })
  
  it('should skip gracefully', function(){
    expect(pop(set()({}))).to.be.eql({})
    expect(pop({})).to.be.eql({})
    expect(pop(true)).to.be.eql(true)
    expect(pop(5)).to.be.eql(5)
  })

})