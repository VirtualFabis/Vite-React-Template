/**
 * Removes duplicate values from an array of objects.
 *
 * @param {Array} state - The array to remove duplicates from.
 * @return {Array} An array with unique objects.
 */
export const distinct = (array) => {
  return [...new Set(array)];
};

/**
 * Returns an array with distinct elements based on the specified key selector.
 *
 * @param {Array} array - The array to filter.
 * @param {Function} keySelector - The function used to extract the key from each element.
 * @return {Array} - An array with distinct elements.
 */
export const distinctBy = (array, keySelector) => {
  const uniqueMap = new Map();
  array.forEach((item) => uniqueMap.set(keySelector(item), item));
  return [...uniqueMap.values()];
};

/**
 * Returns the first element of an array if it exists, otherwise returns null.
 *
 * @param {Array} array - The array to retrieve the first element from.
 * @returns {*} The first element of the array, or null if the array is empty or undefined.
 */
export const firstOrDefault = (array) => (array?.length > 0 ? array[0] : null);

/**
 * Returns the last element of an array if it exists, otherwise returns null.
 *
 * @param {Array} array - The array to retrieve the last element from.
 * @returns {*} The last element of the array, or null if the array is empty or undefined.
 */
export const lastOrDefault = (array) => (array?.length > 0 ? array[array.length - 1] : null);

/**
 * Groups an array of items by a given grouping function.
 *
 * @param {Array<T>} array - The array to group.
 * @param {Function<TSource, TResult>} groupingFunction - The function to use for grouping.
 * @return {Array} An array of objects, each containing a key and an array of values.
 */
export const groupBy = (array, groupingFunction) => {
  const groupsMap = groupMapBy(array, groupingFunction);
  return Array.from(groupsMap, ([key, values]) => ({ id: crypto.randomUUID(), key, values }));
};

/**
 * Groups an array of items into a Map based on a grouping function.
 *
 * @param {Array} array - The array of items to be grouped.
 * @param {Function} groupingFunction - The function used to determine the group key for each item.
 * @returns {Map} - A Map object where the keys are the group keys and the values are arrays of items belonging to each group.
 */
export const groupMapBy = (array, groupingFunction) => {
  const groupsMap = new Map();
  for (const item of array) {
    const key = groupingFunction(item);

    if (!groupsMap.has(key)) groupsMap.set(key, []);

    groupsMap.get(key).push(item);
  }
  return groupsMap;
};

/**
 * Groups an array of items by multiple keys in a nested structure.
 *
 * @param {Array} itemsArray - The array of items to group.
 * @param {Array} keysToGroupBy - The keys to group by, in the order of nesting.
 * @returns {Map} A Map that contains the grouped items in nested structures.
 * @throws {Error} If invalid arguments are provided.
 */
export const groupNestedBy = (itemsArray, keysToGroupBy) => {
  if (!Array.isArray(itemsArray) || !Array.isArray(keysToGroupBy) || keysToGroupBy.length === 0) {
    throw new Error(
      'Invalid arguments: both itemsArray and keysToGroupBy must be arrays, and keysToGroupBy must not be empty.',
    );
  }

  const ensureGroupExists = (map, key, initialValue) => {
    if (!map.has(key)) {
      map.set(key, initialValue);
    }
    return map.get(key);
  };

  const recursivelyGroupItems = ({ groupMap, currentItem, groupKeys, depthLevel }) => {
    const groupKey = currentItem[groupKeys[depthLevel]];

    if (depthLevel === groupKeys.length - 1) {
      const group = ensureGroupExists(groupMap, groupKey, []);
      group.push(currentItem);
    } else {
      const nextGroupMap = ensureGroupExists(groupMap, groupKey, new Map());
      recursivelyGroupItems({
        groupMap: nextGroupMap,
        currentItem,
        groupKeys,
        depthLevel: depthLevel + 1,
      });
    }
  };

  return itemsArray.reduce((resultGroupMap, currentItem) => {
    recursivelyGroupItems({
      groupMap: resultGroupMap,
      currentItem,
      groupKeys: keysToGroupBy,
      depthLevel: 0,
    });
    return resultGroupMap;
  }, new Map());
};

/**
 * Converts an array of objects into a dictionary (object) based on a key selector function.
 *
 * @param {Array} array - The array to convert.
 * @param {Function} keySelector - The function used to extract the key from each element.
 * @return {Object} - A dictionary object with keys and corresponding values.
 */
export const toDictionary = (array, keySelector) => {
  return array.reduce((dict, item) => {
    const key = keySelector(item);
    dict[key] = item;
    return dict;
  }, {});
};
