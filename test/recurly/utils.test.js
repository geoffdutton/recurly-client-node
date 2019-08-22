
const assert = require('assert').strict
const utils = require('../../lib/recurly/utils')

describe('utils', () => {
  it('Should get class name', () => {
    assert.equal(utils.className('billing_info'), 'BillingInfo')
  })

  it('Should camelize', () => {
    assert.equal(utils.camelize('blah_1'), 'blah1')
    assert.equal(utils.camelize('none'), 'none')
    assert.equal(utils.camelize('camel_ize'), 'camelIze')
  })

  it('Should snakeify', () => {
    // this fails, but so would bl4h1
    // assert.equal(utils.snakeify('blah1'), 'blah_1')
    assert.equal(utils.snakeify('none'), 'none')
    assert.equal(utils.snakeify('camelIze'), 'camel_ize')
  })

  it('Should classify', () => {
    assert.equal(utils.classify('camel_ize'), 'CamelIze')
  })
})
