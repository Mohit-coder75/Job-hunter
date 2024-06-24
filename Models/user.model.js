export const users = [
    { id: 1, name: "vivek", email: "krvivi28@gmail.com", password: "vivek28@" },
  ];
  
  export const registerUser = (user) => {
    users.push(user);
  };
  
  export const authenticateUser = (reqUser) => {
    const { email, password } = reqUser;
    return users.some(user => user.email === email && user.password === password);
  };
  