export const deleteMail = async (token, id) => {
  const response = await fetch(`${process.env.REACT_APP_API}/auth/deleteMail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-auth-token": token,
    },
    body: JSON.stringify({ id: id }),
  });

  const data = await response.json();
  return data;
};
