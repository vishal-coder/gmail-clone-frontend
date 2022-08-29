export const logoutUser = async (token, email) => {
  const response = await fetch(`${process.env.REACT_APP_API}/auth/logoutUser`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-auth-token": token,
    },
  });

  const data = await response.json();

  return data;
};
