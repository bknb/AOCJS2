export const remove = (str, regex) =>
  str.replace(regex, '');

export const getAllChars = (str) =>
  [...new Set(str.split(''))]