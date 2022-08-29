export const forwardMailService = async (token, values) => {
  const response = await fetch(
    `${process.env.REACT_APP_API}/auth/forwardMail`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(values),
    }
  );

  const data = await response.json();
  return data;
};
