
const assert = require('assert').strict
const Http = require('../../lib/recurly/Http')

describe('Http', () => {
  describe('#Request', () => {
    it('Should create request', () => {
      const req = new Http.Request('get', '')
      assert.equal(req.path, '')
    })
  })
  describe('#Response', () => {
    it('Should create response', () => {
      const req = new Http.Request('get', '')
      const res = new Http.Response({
        statusCode: 200,
        headers: {}
      }, '', req)
      assert.equal(res.status, 200)
    })

    it('Should create response with body and record count', () => {
      const req = new Http.Request('get', '')
      const res = new Http.Response({
        statusCode: 200,
        headers: {
          'recurly-total-records': 34
        }
      }, [`{ "some": "body" }`], req)
      assert.deepEqual(res.body, {
        some: 'body'
      })
      assert.equal(res.recordCount, 34)
    })
  })
})
