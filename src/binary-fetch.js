if (!global._babelPolyfill) require('babel-polyfill');

class BinaryFetch {
  constructor(src, options) {
    this.src = src;
    this.options = options;
  }

  fetch() {
    const XHR = typeof XMLHttpRequest === 'undefined' ? eval('require')('xhr2') : XMLHttpRequest;
    const xhr = new XHR();
    xhr.open(this.options.method ? this.options.method : 'GET', this.src);
    xhr.overrideMimeType('text\/plain; charset=x-user-defined');
    for (var key in this.options.headers) {
      if (obj.hasOwnProperty(key)) {
        xhr.setRequestHeader(key, this.options.headers[key]);
      }
    }
    if (this.options.timeout) xhr.timeout = this.options.timeout;
    xhr.onprogress = (e) => {
      let uInt8Array = this.strToUint8Array(xhr.responseText);
      this.progress({
        timeStamp: e.timeStamp,
        total: e.total,
        type: e.type,
        loaded: e.loaded,
        status: xhr.status,
        headers: this.getResponseHeaders(xhr),
        arrayBuffer: () => this.arrayBuffer(uInt8Array),
        arrayBufferView: () => Promise.resolve(uInt8Array),
        blob: () => this.blob(uInt8Array),
        text: () => Promise.resolve(xhr.responseText)
      });
    };
    xhr.onload = (e) => {
      let uInt8Array = this.strToUint8Array(xhr.responseText);
      this.resolve({
        timeStamp: e.timeStamp,
        total: e.total,
        type: e.type,
        loaded: e.loaded,
        status: xhr.status,
        headers: this.getResponseHeaders(xhr),
        arrayBuffer: () => this.arrayBuffer(uInt8Array),
        arrayBufferView: () => Promise.resolve(uInt8Array),
        blob: () => this.blob(uInt8Array),
        text: () => Promise.resolve(xhr.responseText),
        json: () => Promise.resolve(JSON.parse(xhr.responseText))
      });
    };
    xhr.ontimeout = (e) => {
      let err = new Error('Timeout');
      err.context = e;
      this.reject(err);
    };
    xhr.onerror = (e) => {
      let err = new Error('Fetch error');
      err.context = e;
      this.reject(err);
    };
    xhr.send(this.options.body);
    return xhr;
  }

  strToUint8Array(str) {
    let uInt8Array = new Uint8Array(new ArrayBuffer(str.length));
    for(var i = 0; i < str.length; i++) {
      uInt8Array[i] = str.charCodeAt(i) & 0xff;
    }
    return uInt8Array;
  }

  getResponseHeaders(xhr) {
    let headersRaw = xhr.getAllResponseHeaders();
    let headersArray = headersRaw.split('\n');
    let headers = {};
    for (let i = 0; i < headersArray.length; i++) {
      let header = headersArray[i];
      let key = header.substring(0, header.indexOf(':'));
      if (key.length > 0) {
        headers[key] = header.substring(header.indexOf(':') + 2, header.length - 1);
      }
    }
    return headers;
  }

  arrayBuffer(uInt8Array) {
    return new Promise((resolve, reject) => {
      let arrayBuffer = new ArrayBuffer(uInt8Array.length);
      for (let i = 0; i < uInt8Array.length; i++) {
        let value = uInt8Array[i];
        arrayBuffer[i] = value;
      }
      resolve(arrayBuffer);
    });
  }

  blob(uInt8Array) {
    return this.arrayBuffer(uInt8Array).then((arrayBuffer) => {
      return new Blob([arrayBuffer]);
    });
  }
}

module.exports = function binaryFetch(src, options, progress) {
  const _binaryFetch = new BinaryFetch(src, options);
  let xhr = null;
  let promise = new Promise((resolve, reject) => {
    switch(arguments.length) {
    case 0:
      reject(new Error('Missing src argument'));
      break;
    case 1:
      options = {};
      progress = () => {};
      break;
    case 2:
      if (typeof arguments[1] === 'function') {
        options = {};
        progress = arguments[1];
      } else {
        progress = () => {};
      }
      break;
    }
    _binaryFetch.progress = progress;
    _binaryFetch.resolve = resolve;
    _binaryFetch.reject = reject;
    xhr = _binaryFetch.fetch();
  });
  promise.terminate = () => {
    if (xhr) xhr.abort();
    return _binaryFetch.resolve(false);
  };
  return promise;
};
