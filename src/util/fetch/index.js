const call = (method, api, data = null) => new Promise((res, rej) => {
  fetch(`api/${api}`,
    {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: data ? JSON.stringify(data) : null,
    })
    .then((r) => {
      r.json()
        .then(r.status === 200 ? res : rej);
    });
});
const put = (api, data) => call('PUT', api, data);
const post = (api, data) => call('POST', api, data);
const get = (api) => call('GET', api);

module.exports = {
  post, put, get,
};
