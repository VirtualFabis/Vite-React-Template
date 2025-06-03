import { useCallback, useRef, useState } from 'react';

/**
 * Custom hook to manage the state of a popover component.
 *
 * @returns {Object} An object containing:
 * - `anchorRef` {React.RefObject}: A reference to the anchor element.
 * - `handleClose` {Function}: Function to close the popover.
 * - `handleOpen` {Function}: Function to open the popover.
 * - `handleToggle` {Function}: Function to toggle the popover state.
 * - `open` {boolean}: Boolean indicating whether the popover is open.
 */
export default function usePopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleToggle = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  return {
    anchorRef,
    handleClose,
    handleOpen,
    handleToggle,
    open,
  };
}
