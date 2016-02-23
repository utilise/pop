var versioned = require('versioned').default
  , expect = require('chai').expect
  , last = require('utilise.last')
  , pop = require('./')

describe('pop', function() {

  it('should pop - vanilla', function() {
    expect(pop(['foo'])).to.be.eql([])
  })

  it('should pop - versioned', function(){
    var changes = []
      , o = versioned(['foo']).on('log', function(diff){ changes.push(diff) })

    expect(o).to.eql(['foo'])
    expect(o.log.length).to.eql(1) 
    expect(last(o.log).diff).to.eql(undefined)
    expect(last(o.log).value.toJS()).to.eql(['foo'])
    expect(changes).to.eql([])

    expect(pop(o)).to.eql(o)
    expect(o).to.eql([])
    expect(o.log.length).to.eql(2)
    expect(last(o.log).diff).to.eql({ key: '0', value: 'foo', type: 'remove' })
    expect(last(o.log).value.toJS()).to.eql([])
    expect(changes).to.eql(o.log.slice(1).map(d => d.diff))
  })
  
  it('should skip gracefully', function(){
    expect(pop(versioned({}))).to.be.eql({})
    expect(pop({})).to.be.eql({})
    expect(pop(true)).to.be.eql(true)
    expect(pop(5)).to.be.eql(5)
  })

})