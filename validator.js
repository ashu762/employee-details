export function validateName(name, type) {
  if (!name || name.length === 0) {
    return { error: true, message: `Please enter your ${type}` };
  }
  if (name.includes(" ")) {
    return { error: true, message: `${type} should not contain spaces` };
  }

  return { error: false, message: "No error" };
}
