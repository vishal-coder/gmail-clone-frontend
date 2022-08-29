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
    }
  );

  const data = await response.json();
  return data;
};

export const updateMailLabels = async (token, values) => {
  const response = await fetch(
    `${process.env.REACT_APP_API}/auth/updateMailLabels`,
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
