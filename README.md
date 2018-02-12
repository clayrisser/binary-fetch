# binary-fetch _Beta_
Fetch incremental binary packets from a browser

Currently, the only way to access the progress from a request or upload in a browser is with the [XMLHttpRequest API](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest). However, the the progress data from the XMLHttpRequest API does not give you access to the actual binary data that has been recieved.

Binary fetch solves this problem by giving you immediate access to the binary data while it is being recieved.

Binary fetch is loosely based on the [JavaScript fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

```bash
npm install --save binary-fetch
```

```js
import binaryFetch from 'binary-fetch';

binaryFetch('http://example.com/file.binary', {
  method: 'GET'
}, (res) => { // fires 1 or more times during request
  return res.arrayBuffer().then((body) => {
    console.log('binary data recieved so far =>');
    console.log(body);
  });
}).then((res) => { // fires when request is finished
  return res.arrayBuffer().then((body) => {
    console.log('all binary data recieved =>');
    console.log(body);
  });
});
```

## Support on Beerpay
Hey dude! Help me out for a couple of :beers:!

[![Beerpay](https://beerpay.io/jamrizzi/binary-fetch/badge.svg?style=beer-square)](https://beerpay.io/jamrizzi/binary-fetch)  [![Beerpay](https://beerpay.io/jamrizzi/binary-fetch/make-wish.svg?style=flat-square)](https://beerpay.io/jamrizzi/binary-fetch?focus=wish)