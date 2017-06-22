import childProcess from 'child_process';
import projPath from 'proj-path';
import binaryFetch from '../src/binary-fetch';
import browserSync from 'browser-sync';

export default async function start() {
  await binaryFetch('https://raw.githubusercontent.com/jamrizzi/examples/master/json/hello-world.json', {
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
  browserSync({
    port: 8888,
    notify: false,
    logPrefix: 'BF',
    snippetOptions: {
      rule: {
        match: '<span id="browser-sync-binding"></span>',
        fn: (snippet) => {
          return snippet;
        }
      }
    },
    server: {
      baseDir: ['./', './example']
    }
  });
}
