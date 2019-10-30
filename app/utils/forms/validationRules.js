const ValidationRules = (value, rules, form) => {
  let valid = true;
  for (let rule in rules) {
    switch (rule) {
      case "isRequired":
        valid = valid && validateRequired(value);
        break;
      case "isEmail":
        valid = valid && validateEmail(value);
        break;
      case "minLength":
        valid = valid && validateMinLength(value, rules[rule]);
        break;
      case "maxLength":
        valid = valid && validateMaxLength(value, rules[rule]);
        break;
      case "confirmPass":
        valid =
          valid && validateConfirmPassword(value, form[rules[rule]].value);
        break;
    }
  }
  return valid;
};

const validateRequired = value => {
  return value !== "";
};

const validateEmail = email => {
  const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return expression.test(String(email).toLowerCase());
};

const validateMinLength = (value, ruleValue) => {
  return value.length >= ruleValue;
};

const validateMaxLength = (value, ruleValue) => {
  return value.length <= ruleValue;
};

const validateConfirmPassword = (confirmPass, pass) => {
  return confirmPass === pass;
};

export default ValidationRules;
