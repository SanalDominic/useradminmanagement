const login = (email, password) => {
  let errors = {};

  if (!email) {
    errors.email = "E-mail required";
  }
  if (!password) {
    errors.password = "Password required";
  } else if (password.length <= 3) {
    errors.password = "Password length should be > 3";
  }
  return errors;
};

const register = (name, email, password) => {
  let errors = {};
  if (!name) {
    errors.name = "Name is required";
  }
  if (!email) {
    errors.email = "E-mail is required";
  }
  if (!password) {
    errors.password = "Password is required";
  }

  return errors;
};

export { login, register };
