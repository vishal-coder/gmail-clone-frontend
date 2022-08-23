export const getLabelList = async (token) => {
  const response = await fetch(
    `${process.env.REACT_APP_API}/auth/getLabelList`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-auth-token": token,
      },
      // body: JSON.stringify(values),
    }
  );

  const data = await response.json();
  //   const profile = await data;
  return data;
};
