import axios from 'axios';

export const useHttpClient = () => {
  const baseUrl = 'https://enigmatic-atoll-46738.herokuapp.com/api';

  const handleResponses = (response) => {
    if (response.data.message === "Token expired") {
      localStorage.setItem('isAuthenticated', false);
      localStorage.setItem('role', null);
      window.location.reload();
    } else {
      return response
    }
  }

  const post = async (uri, body, tokenStr = "") => {
    const payload = { uri, body, tokenStr }
    return await axios.post(baseUrl + uri, body, { headers: false ? { "Authorization": `Bearer ${tokenStr}` } : {} })
      .then(function (response) {
        console.log({ payload, response });
        return handleResponses(response);
      })
      .catch(function (error) {
        console.log(payload, error);
        return error
      });
  };

  const get = async (uri, body, tokenStr = "") => {
    const payload = { uri, body, tokenStr }
    return await axios.get(baseUrl + uri, { headers: false ? { "Authorization": `Bearer ${tokenStr}` } : {} })
      .then(function (response) {
        console.log({ payload, response });
        return handleResponses(response);
      })
      .catch(function (error) {
        console.log(payload, error);
        return error
      });
  };

  const put = async (uri, body, tokenStr = "") => {
    const payload = { uri, body, tokenStr }
    return await axios.put(baseUrl + uri, body, { headers: false ? { "Authorization": `Bearer ${tokenStr}` } : {} })
      .then(function (response) {
        console.log({ payload, response });
        return handleResponses(response);
      })
      .catch(function (error) {
        console.log(payload, error);
        return error
      });
  };

  const del = async (uri, body, tokenStr = "") => {
    const payload = { uri, body, tokenStr }
    return await axios.delete(baseUrl + uri, {
      headers: {
        Authorization: `Bearer ${tokenStr}`
      },
      data: body,
    })
      .then(function (response) {
        console.log({ payload, response });
        return handleResponses(response);
      })
      .catch(function (error) {
        console.log(payload, error);
        return error
      });
  };

  return { post, get, put, del };
};
