import * as axios from 'axios';

const BASE_URL = 'http://localhost:8030';

function upload (formData) {
  const url = `${BASE_URL}/file`;
  return axios.post(url, formData)
  // get data
    .then(x => x.data)
  // add url field
    .then(x => x.map(img => Object.assign({},
      img, {url: `${BASE_URL}/file/${img.id}`})));
}

export { upload }
