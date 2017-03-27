class BinaryFetch {
  constructor(src, options) {
    this.src = src;
    this.options = options;
  }

  fetch() {
    let xhr = new XMLHttpRequest();
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
    xhr.onerror = (e, source, lineNumber, colNumber, err) => {
      this.reject(err);
    };
    xhr.send(this.options.body);
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
    headersArray.map((header) => {
      let key = header.substring(0, header.indexOf(':'));
      if (key.length > 0) {
        headers[key] = header.substring(header.indexOf(':') + 2, header.length - 1);
      }
    });
    return headers;
  }

  arrayBuffer(uInt8Array) {
    return new Promise((resolve, reject) => {
      let arrayBuffer = new ArrayBuffer(uInt8Array.length);
      uInt8Array.map((i, value) => {
        arrayBuffer[i] = value;
      });
      resolve(arrayBuffer);
    });
  }

  blob(uInt8Array) {
    return this.arrayBuffer(uInt8Array).then((arrayBuffer) => {
      return new Blob([arrayBuffer]);
    });
  }
}

export default function binaryFetch(src, options, progress) {
  return new Promise((resolve, reject) => {
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
    let binaryFetch = new BinaryFetch(src, options);
    binaryFetch.progress = progress;
    binaryFetch.resolve = resolve;
    binaryFetch.reject = reject;
    binaryFetch.fetch();
  });
}
