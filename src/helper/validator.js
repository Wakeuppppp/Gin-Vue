const telephoneValidator = (value) => /^1[345789]{1}\d{9}$/.test(value);
const passwordValidator = (value) => /[A-Z]+/g.test(value) && /[a-z]+/g.test(value) && /[0-9]+/g.test(value) && /[-+!@#$%^&*()(.)]+/g.test(value);
export default {
  telephoneValidator,
  passwordValidator,
};
