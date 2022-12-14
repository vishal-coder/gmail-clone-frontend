export const getUserProfile = async (token) => {
  const response = await fetch(
    `${process.env.REACT_APP_API}/auth/getUserProfile`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-auth-token": token,
      },
    }
  );

  const data = await response.json();
  return data;
};
