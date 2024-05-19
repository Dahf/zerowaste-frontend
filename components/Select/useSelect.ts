import * as React from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { Option } from './types';
import isString from '../../utils/isString';
import isNumber from '../../utils/isNumber';

type UseSelectProps<T = any> = {
  /**
   * Options provided by the developer
   */
  options: Option<T>[];
  /**
   * Multiple selection or not
   */
  multiple?: boolean;
  /**
   * OnChange event when the selection changes
   */
  onChange?(value: T | T[]): any;
  /**
   * Custom filter when input value changes
   */
  filterWith?(option: Option<T>, query: string): boolean;
};

type UseSelectReturn<T = any> = {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
  setQuery: React.Dispatch<string>;
  handleFocusInput(): void;
  handleBlurInput(): void;
  selectOption(option: Option<T>): void;
  selectedOptions: Option<T>[];
  handleMouseEnterList(): void;
  handleMouseLeaveList(): void;
  filteredOptions: Option<T>[];
  inputRef: React.MutableRefObject<any>;
  isSelected(option: Option<T>): boolean;
  clear(keepFieldValue?: boolean): void;
};

/**
 * Hook to create Selection process (single and multiple)
 */
function useSelect<T = any>(props: UseSelectProps<T>): UseSelectReturn<T> {
  const { options, onChange, filterWith, multiple } = props;

  /**
   * Used for open and close process for the dropdown list
   */
  const { isOpen, onOpen, onClose } = useDisclosure();

  /**
   * Used to detect if user focus on list or not
   */
  const [focusOnList, setFocusOnList] = React.useState(false);

  /**
   * Query used to filter list
   */
  const [query, setQuery] = React.useState(null);

  /**
   * Options used inner the hook to avoid edit the original
   */
  const innerOptions = React.useMemo(() => {
    return options;
  }, [options]);

  /**
   * Options filtered when user search
   */
  const filteredOptions = React.useMemo(() => {
    if (query) {
      return innerOptions.filter((option) => {
        if (isString(option.value)) {
          return option.value.startsWith(query);
        } else if (isNumber(option.value)) {
          return +option.value === +query;

          // Search with another type of value like Object, Array, etc.
        } else {
          if (!filterWith) {
            console.warn(
              `If you provide value like Object or Array, please provide filterWith function`
            );
            return true;
          }

          // Search with custom filter provided by the developer
          return filterWith(option, query);
        }
      });
    }

    return options;
  }, [options, query]);

  /**
   * Used to return the selection (onChange)
   */
  const [selectedOptions, setSelectedOptions] = React.useState<Option<T>[]>([]);

  /**
   * Reference of the DOM element used for the selection
   */
  const inputRef = React.useRef(null);

  /**
   * Process to select option
   */
  function selectOption(option: Option<T>) {
    if (multiple) {
      // If multiple toggle value inside the array and update input display joined by comma
      const newOptions = isSelected(option)
        ? selectedOptions.filter((opt) => opt.value !== option.value)
        : [...selectedOptions, option];

      setSelectedOptions(newOptions);

      inputRef.current.value = newOptions.map((opt) => opt.label).join(', ');
    } else {
      // For single, add option and update input display
      setSelectedOptions([option]);
      onClose();

      inputRef.current.value = option.label;
    }
  }

  /**
   * When input is focused, open the dropdown list
   */
  function handleFocusInput() {
    onOpen();
  }

  /**
   * When input is blurred and list isn't focused, close the dropdown list
   */
  function handleBlurInput() {
    if (focusOnList) return;
    onClose();
  }

  function handleMouseEnterList() {
    setFocusOnList(true);
  }

  function handleMouseLeaveList() {
    setFocusOnList(false);
  }

  /**
   * Check if option is already selected
   */
  function isSelected(option: Option<T>) {
    return selectedOptions?.some((opt) => {
      return option.value === opt.value;
    });
  }

  /**
   * Clear selection and clear field value
   */
  function clear(keepFieldValue = false) {
    setSelectedOptions([]);

    if (!keepFieldValue) {
      inputRef.current.value = null;
    }
  }

  /**
   * When selectedOptions changes, the event onChange provided by the developer launch
   */
  React.useEffect(() => {
    if (!onChange) return;

    if (multiple) {
      onChange(selectedOptions.map((opt) => opt.value));
    } else {
      onChange(selectedOptions[0]?.value);
    }
  }, [selectedOptions]);

  return {
    isOpen,
    onOpen,
    onClose,
    setQuery,
    handleFocusInput,
    handleBlurInput,
    selectOption,
    selectedOptions,
    handleMouseEnterList,
    handleMouseLeaveList,
    filteredOptions,
    inputRef,
    isSelected,
    clear,
  };
}

export default useSelect;
