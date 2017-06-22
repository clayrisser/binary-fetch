ready(() => {
  binaryFetch('https://raw.githubusercontent.com/jamrizzi/examples/master/json/hello-world.json', {
    method: 'GET'
  }, (res) =>{
    return res.arrayBuffer().then((body) => {
      console.log('progress body =>');
      console.log(body);
    });
  }).then((res) => {
    console.log('loaded res =>');
    console.log(res);
    return res.arrayBuffer();
  }).then((body) => {
    console.log('loaded body =>');
    console.log(body);
  }).catch((err) => {
    console.error(err);
  });
});

function ready(cb) {
  if (document.readyState === 'complete') return cb();
  return document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') return cb();
    return null;
  });
};
