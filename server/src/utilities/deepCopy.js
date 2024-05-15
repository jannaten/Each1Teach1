function deepCopy(target, source) {
  const result = {};
  for (let [key, value] of Object.entries(target)) {
    if (key in source) {
      if (
        value !== null &&
        typeof value === 'object' &&
        !Array.isArray(value)
      ) {
        result[key] = deepCopy(value, source[key]);
      } else {
        result[key] = source[key];
      }
    } else {
      result[key] = value;
    }
  }
  return result;
}

module.exports = deepCopy;
