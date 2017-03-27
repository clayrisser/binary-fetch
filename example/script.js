ready(function() {
  binaryFetch('./hello-world.txt', {
    method: 'GET'
  }, function(res) {
    return res.arrayBuffer().then((body) => {
      console.log('progress body =>');
      console.log(body);
    });
  }).then(function(res) {
    console.log('loaded res =>');
    console.log(res);
    return res.arrayBuffer();
  }).then(function(body) {
    console.log('loaded body =>');
    console.log(body);
  }).catch(function(err) {
    console.error(err);
  });
});

function ready(cb) {
  if (document.readyState === 'complete') return cb();
  return document.addEventListener('readystatechange', function() {
    if (document.readyState === 'complete') return cb();
    return null;
  });
};
