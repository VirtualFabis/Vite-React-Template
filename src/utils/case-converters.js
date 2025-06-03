/**
 * Converts the keys of an object to lowercase recursively.
 * @param {Object} obj - The object whose keys need to be converted to lowercase.
 * @returns {Object} - The new object with lowercase keys.
 */
export const convertKeysToLowerCase = (obj) => {
  if (typeof obj !== 'object') return obj;
  const newObj = {};
  for (let key in obj) {
    if (key in obj) {
      const newKey = key.toLowerCase();
      newObj[newKey] = convertKeysToLowerCase(obj[key]);
    }
  }
  return newObj;
};

/**
 * Capitalizes the first letter of a given string and converts the rest to lowercase.
 *
 * @param {string} string - The string to be converted.
 * @returns {string} The converted string with the first letter capitalized and the rest in lowercase.
 */
export const capitalizeFirstLetter = (string) => {
  if (typeof string !== 'string' || string.length === 0) {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
