const call = (method, api, data = null) => new Promise((res, rej) => {
  fetch(`api/${api}`,
    {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: data ? JSON.stringify(data) : null,
    })
    .then((r) => {
      r.json()
        .then((d) => {
          if (r.status === 200) {
            window.error(null);
            res(d);
          } else {
            window.error(d.err);
            rej(d);
          }
        });
    });
});

export const put = (api, data) => call('PUT', api, data);
export const post = (api, data) => call('POST', api, data);
export const destroy = (api, data) => call('DELETE', api, data);
export const get = (api) => call('GET', api);
