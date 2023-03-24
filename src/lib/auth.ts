const checkSession = async (cookies: Partial<{ [key: string]: string }>) => {
  const token = cookies['session-token'];
  console.log(token);
  if (token) {
    return true;
  }
  return false;
};

const authenticate = async () => {};

const logout = async () => {};

export { checkSession, authenticate };
