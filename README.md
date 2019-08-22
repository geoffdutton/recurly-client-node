# Recurly
[![Build Status](https://travis-ci.com/geoffdutton/recurly-client-node.svg?branch=3_0_0_beta)](https://travis-ci.com/geoffdutton/recurly-client-node)
[![codecov](https://codecov.io/gh/geoffdutton/recurly-client-node/branch/3_beta-tests/graph/badge.svg)](https://codecov.io/gh/geoffdutton/recurly-client-node)

[![Greenkeeper badge](https://badges.greenkeeper.io/geoffdutton/recurly-client-node.svg)](https://greenkeeper.io/)

Warning:
This library does not use the V2 API. If you are attempting to build an integration with V2, please see [https://dev.recurly.com/](https://dev.recurly.com/).

This repository contains the node client for Recurly's V3 API (or "partner api").
It's currently Beta software and is not yet an official release. Documentation for the HTTP API can be found [here](https://partner-docs.recurly.com/).

## Getting Started

### Documentation

Docs and example code can be found here: [https://recurly.github.io/recurly-client-node](https://recurly.github.io/recurly-client-node).
Reference docs for the underlying V3 JSON API can be found here: [https://partner-docs.recurly.com](https://partner-docs.recurly.com).

### Installing

This library is published on npm under the name `recurly`.

We recommend manually inserting the dependency into the `dependencies` section of your `package.json`:

```
{
  // ...
  "recurly" : "3.0.0-beta.4"
  // ...
}
```


Install via the command line:
```
npm install recurly@3.0.0-beta.4 --save-prod
```

### Creating a client

A client object represents a connection to the Recurly API. The client implements
each `operation` that can be performed in the API as a method.

To initialize a client, give it an API key and a subdomain:

```js
const recurly = require('recurly')
// You should store your api key somewhere safe
// and not in plain text if possible
const myApiKey = '<myapikey>'
const mySubdomain = '<mysubdomain>'
const client = new recurly.Client(myApiKey, `subdomain-${mySubdomain}`)
```

### Operations

All operations are `async` and return promises (except the `list*` methods which return `Pager`s).
You can handle the promises directly with `then` and `catch` or use await:

```js
client.getAccount('code-benjamin')
  .then(account => console.log(account.id))
  .catch(err => console.log(err.msg))
```

```js
async myFunc () {
  try {
    let account = await client.getAccount('code-benjamin')
  } catch (err) {
    // handle err from client
  }
}
```

### Creating Resources

For creating or updating resources, pass a json object to one of the create* or update* methods.
Keep in mind that the api accepts snake-cased keys but this library expects camel-cased keys.
We do the translation for you so this library can conform to js style standards.

```js
client.createAccount({
    code: 'new-account-code',
    firstName: 'Benjamin',
    lastName: 'Du Monde'
  })
  .then(account => console.log(account.id))
  .catch(console.log)
```

### Pagination

All `list*` methods on the client return a `Pager`. They
are not `async` because they are lazy and do not make any
network requests until they are iterated over. There are
two methods on `Pager` that return async iterators `each` and `eachPage`:

* `each` will give you an iterator over each item that matches your query.
* `eachPage` will give you an iterator over each page that is returned. The result is an array of resources.

TODO: Need to fully test and document error handling

```js
async function eachAccount (accounts) {
  try {
    for await (const acct of accounts.each()) {
      console.log(acct.id)
    }
  } catch (err) {
    // err is bubbled up from recurly client
  }
}

async function eachPageOfAccounts (accounts) {
  try {
    for await (const page of accounts.eachPage()) {
      page.forEach(acct => console.log(acct.id))
    }
  } catch (err) {
    // err is bubbled up from recurly client
  }
}

const accounts = client.listAccounts({
    beginTime: '2018-12-01T00:00:00Z',
    sort: 'updated_at'
  })

eachAccount(accounts)
// or 
eachPageOfAccounts(accounts)
```

#### Efficiently Fetch the First or Last Resource

The Pager class implements a `first` method which allows you to fetch just the first or last resource from the server.
On top of being a convenient abstraction, this is implemented efficiently by only asking the server for the 1 item you want.

```js
const accounts = client.listAccounts({
    beginTime: '2018-12-01T00:00:00Z',
    subscriber: true,
    order: 'desc'
  })

const firstAccount = await accounts.first()
```

If you want to fetch the last account in this scenario, invert the order from `desc` to `asc`

```js
const accounts = client.listAccounts({
    beginTime: '2018-12-01T00:00:00Z',
    subscriber: true,
    order: 'asc'
  })

const lastAccount = await accounts.first()
```

#### Counting Resources

The Pager class implements a `count` method which allows you to count the resources the pager would return.
It does so by calling the endpoint with `HEAD` and parsing and returning the `Recurly-Total-Records` header. This
method respects any filtering parameters you apply to the pager, but the sorting parameters will have no effect.

```js
const accounts = client.listAccounts({
    beginTime: '2018-12-01T00:00:00Z',
    subscriber: true
  })

const count = await accounts.count()
// => 573
```

### HTTP Metadata

Sometimes you might want to get some additional information about the underlying HTTP request and response. Instead of
returning this information directly and forcing the programmer to unwrap it, we inject this metadata into the top level
resource that was returned. You can access the response by calling `getResponse()` on any Resource.

**Warning**: Do not log or render whole requests or responses as they may contain PII or sensitive data.


```js
const account = await client.getAccount("code-benjamin")
const response = account.getResponse()
response.rateLimitRemaining // 1985
response.requestId // "0av50sm5l2n2gkf88ehg"
response.request.path // "/sites/subdomain-mysite/accounts/code-benjamin"
response.request.body // null
```

This also works on Empty responses:

```js
const result = await client.removeLineItem("a959576b2b10b012")
const response = result.getResponse()
```

And it can be captured on exceptions through the ApiError object:

```js
try {
  const account = await client.getAccount(account_id)
} catch (err) {
  if (err instanceof recurly.errors.NotFoundError) {
    // You can also get the Response here
    const response = err.getResponse()
  } else {
    console.log('Unknown Error: ', err)
  }
}
```

### Contributing

Please see our [Contributing Guide](CONTRIBUTING.md).
