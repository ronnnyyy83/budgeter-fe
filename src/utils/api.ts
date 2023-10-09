/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response  A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
 function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.status);

  return response.json().then(({ message }) => {
    error.message = `${response.status}: ${message}`;
    throw error;
  });
}

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object} The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  } else if (response.headers.get('Content-Type').split(';')[0] === 'application/json') {
    return response.json();
  }

  return response;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url  The URL we want to request
 * @param  {object} opts The options we want to pass to "fetch"
 *
 * @return {object} The response data
 */
export async function request(url, opts) {

  return (async function () {
    const options = opts || {};

    if ((!options.headers || !options.headers.Authorization)) {
      options.headers = { ...options.headers };
    }

    return await fetch(url, options)
      .then(checkStatus)
      .then(parseJSON);
  })();
}

export function makeAPIRequest(url, method, params, isFormData?, additionalHeaders?) {
  const credentials = 'same-origin';
  let headers = { ...additionalHeaders };
  let body;

  if (params && method !== 'GET') {
    if (isFormData) {
      body = params;
      headers = {
        ...headers,
        'Content-Type': 'multipart/form-data; charset=utf-8; boundary="another cool boundary";',
      };
    } else {
      headers = {
        ...headers,
        'Content-Type': 'application/json',
      };
      body = JSON.stringify(params);
    }

  }

  const opts = { method, headers, body, credentials };

  return request(url, opts);
}

export function makeAPIRequestWithToken(url, method, params, token, additionalHeaders?) {
  // console.log('url, token, language, method, params, additionalHeaders========>', url, token, language, method, params, additionalHeaders);
  const headers = { 'Content-Type': 'application/json', 'token': token, ...additionalHeaders };
  const opts = { method, headers };

  // if (params) {
  //   opts.body = JSON.stringify(params);
  // }
  console.log('endpoint, opts', url, opts);
  return request(url, opts);
}