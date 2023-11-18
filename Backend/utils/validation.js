function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  return password.length >= 8;
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim() !== "";
}

module.exports = {
  isValidEmail,
  isValidPassword,
  isNonEmptyString,
};
