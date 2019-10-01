
const assert = require('assert').strict
const Pager = require('../../lib/recurly/Pager')

describe('Pager', () => {
  let mockClient

  it('Should set initial props', () => {
    const pgr = new Pager('client')
    assert.equal(pgr.client, 'client')
  })
})
