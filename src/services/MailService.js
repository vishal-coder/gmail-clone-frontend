export const getMailList = async (token, options) => {
  const response = await fetch(`${process.env.REACT_APP_API}/auth/getMails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-auth-token": token,
    },
    body: JSON.stringify(options),
  });

  const data = await response.json();
  return data;
};
