export const useFetch = async ({ url, method, body }: any): Promise<any> => {
  if (body) {
    body = JSON.stringify(body);
  }

  return await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer 0703454364`,
    },
    body,
  })
    .then((response) => {
      if (response.status === 202) {
        return {};
      }
      if (response.ok) {
        return response.json();
      }

      throw new Error(response?.status as unknown as string);
    })
    .catch((error) => {
      console.log(error);
      throw new Error("Internal Server Error:" + error);
    });
};
export const useFetchRealWorks = async ({ url, method, body }: any): Promise<any> => {
  if (body) {
    body = JSON.stringify(body);
  }

  return await fetch(`${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `rwauth 9d24c72c-38e6-4715-acef-45fa273c5e9c`,
    },
    body,
  })
    .then((response) => {
      if (response.status === 202) {
        return {};
      }
      if (response.ok) {
        return response.json();
      }

      throw new Error(response?.status as unknown as string);
    })
    .catch((error) => {
      console.log(error);
      throw new Error("Internal Server Error:" + error);
    });
};