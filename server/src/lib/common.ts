function isInteger (str: string | number) {
  return /^\+?(0|[1-9]\d*)$/.test(str.toString());
}

export const Lib = {
  isInteger,
};