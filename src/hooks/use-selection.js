import { useCallback, useEffect, useState } from 'react';

/**
 * Custom hook to manage selection state.
 *
 * @param {Array} items - The initial list of items.
 * @returns {Object} An object containing selection handlers and the selected items.
 * @returns {Function} handleSelectAll - Function to select all items.
 * @returns {Function} handleSelectOne - Function to select a single item.
 * @returns {Function} handleDeselectAll - Function to deselect all items.
 * @returns {Function} handleDeselectOne - Function to deselect a single item.
 * @returns {Array} selected - The list of currently selected items.
 */
const useSelection = (items = []) => {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelected([]);
  }, [items]);

  const handleSelectAll = useCallback(() => {
    setSelected([...items]);
  }, [items]);

  const handleSelectOne = useCallback((item) => {
    setSelected((prevState) => [...prevState, item]);
  }, []);

  const handleDeselectAll = useCallback(() => {
    setSelected([]);
  }, []);

  const handleDeselectOne = useCallback((item) => {
    setSelected((prevState) => {
      return prevState.filter((_item) => _item !== item);
    });
  }, []);

  return {
    handleDeselectAll,
    handleDeselectOne,
    handleSelectAll,
    handleSelectOne,
    selected,
  };
};
export default useSelection;
