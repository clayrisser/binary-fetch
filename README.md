# binary-fetch _Beta_
Fetch binary data with incremental progress

Currently, the only way to access the progress from a request or upload in a browser is with the [XMLHttpRequest API](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest). However, the the progress data from the XMLHttpRequest API does not give you access to the actual binary data that has been recieved.

Binary fetch solves this problem by giving you immediate access to the binary data while it is being recieved.

Binary fetch is loosely based on the [JavaScript fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

```js
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
