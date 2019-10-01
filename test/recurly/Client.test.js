
const assert = require('assert').strict
const nock = require('nock')
const Client = require('../../lib/recurly').Client

describe('Client', () => {
  let client

  beforeEach(() => {
    nock('partner-api.recurly.com')
      .get('/something')
      .reply(200, ['{ "yay": true }'])
    client = new Client('api-key-me', 'subdomain-something')
  })

  afterEach(() => {
    // nock.restore()
  })

  it('Should set up the client', async () => {
    assert.equal(client.siteId, 'subdomain-something')
    const res = await client._makeRequest('GET', '/something')
    console.log(res)
    assert(res)
  })
})
