export const mapRegisterData = (data) => {
  return {
    name: data.name,
    email: data.email,
    password: data.password,
    password_confirm: data.passwordConfirm,
  };
};
