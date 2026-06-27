export const getToken = () => {
  return localStorage.getItem("token");
};

export const getUser = () => {
  const user = localStorage.getItem("user");

  return user
    ? JSON.parse(user)
    : null;
};

export const getUserId = () => {
  const user = getUser();

  return user?.id || null;
};

export const saveAuth = (
  token,
  userId,
  email
) => {

  localStorage.setItem(
    "token",
    token
  );

  localStorage.setItem(
    "user",
    JSON.stringify({
      id: userId,
      email: email,
    })
  );

};

export const logout = () => {

  localStorage.removeItem(
    "token"
  );

  localStorage.removeItem(
    "user"
  );

};

export const isAuthenticated = () => {
  return !!getToken();
};