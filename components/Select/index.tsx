import * as React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  ScaleFade,
  InputRightElement,
  useColorMode,
  IconButton,
} from '@chakra-ui/react';
import { ChevronDownIcon, CloseIcon } from '@chakra-ui/icons';
import useSelect from './useSelect';
import Option from './Option';
import { checkSelectProps } from './utils';
import SelectLoading from './Loading';
import { SelectProps } from './types';

/**
 * @todo
 * 👍 Active selection
 * 👍 Add search
 * 👍 Add clear button when selected
 * 👍 Max height on option list
 * 👍 Fix focus on list bug
 * 👍 Find solution to support light and dark theme
 * 👍 Add multiple (with checked, create other component, create BaseSelect ?)
 * 👍 Add option template
 * 👍 Add template for empty result
 * 👍 Add focus event
 * 👍 Add blur event
 * 👍 Add custom Icon (right)
 * - Rename it to Autocomplete
 * - Add test
 */
function Select<T>(props: SelectProps<T>) {
  const {
    label,
    placeholder,
    gutter = 2,
    options = [],
    onSearch,
    onChange,
    onFocus,
    onBlur,
    filterWith,
    multiple,
    optionTemplate,
    emptyTemplate,
    loadingTemplate,
    rightIcon,
    loading,
  } = checkSelectProps(props);

  const {
    isOpen,
    handleFocusInput,
    handleBlurInput,
    selectOption,
    selectedOptions,
    filteredOptions,
    handleMouseEnterList,
    handleMouseLeaveList,
    inputRef,
    isSelected,
    setQuery,
    clear,
  } = useSelect<T>({
    options,
    onChange,
    filterWith,
    multiple,
  });

  const { colorMode } = useColorMode();

  return (
    <FormControl onBlur={handleBlurInput}>
      {label && <FormLabel>{label}</FormLabel>}
      <InputGroup>
        <Input
          autoComplete='off'
          ref={inputRef}
          onFocus={() => {
            handleFocusInput();
            if (onFocus) onFocus();
          }}
          placeholder={placeholder}
          onChange={(e) => {
            if (onSearch) {
              onSearch(e.target.value);
            } else {
              setQuery(e.target.value);
            }

            clear(true);
          }}
          onBlur={onBlur}
        />
        <InputRightElement
          children={
            <React.Fragment>
              {selectedOptions?.length ? (
                <IconButton
                  size="xs"
                  variant="ghost"
                  icon={<CloseIcon />}
                  onClick={() => clear()}
                />
              ) : (
                <React.Fragment>
                  {rightIcon ? rightIcon() : <ChevronDownIcon />}
                </React.Fragment>
              )}
            </React.Fragment>
          }
        />
      </InputGroup>
      <ScaleFade
        initialScale={0.9}
        in={isOpen}
        unmountOnExit
        style={{
          position: 'absolute',
          zIndex: 999,
          left: 0,
          right: 0,
        }}
      >
        <Box
          p={2}
          color="white"
          mt={gutter}
          rounded="xl"
          border="1px"
          borderColor={colorMode === 'dark' ? 'whiteAlpha.300' : 'gray.200'}
          bg={colorMode === 'dark' ? 'gray.800' : 'white'}
          maxHeight={200}
          onMouseLeave={handleMouseLeaveList}
          onMouseEnter={handleMouseEnterList}
          sx={{
            overflowY: 'scroll',
          }}
        >
          {loading ? (
            <React.Fragment>
              {loadingTemplate ? loadingTemplate() : <SelectLoading />}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {filteredOptions.length ? (
                <React.Fragment>
                  {filteredOptions.map((option, index) => (
                    <Option
                      key={index}
                      value={option.value}
                      selected={isSelected(option)}
                      onClick={() => selectOption(option)}
                      multiple={multiple}
                    >
                      {optionTemplate ? (
                        optionTemplate(option)
                      ) : (
                        <React.Fragment>{option?.label}</React.Fragment>
                      )}
                    </Option>
                  ))}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {emptyTemplate ? (
                    emptyTemplate()
                  ) : (
                    <Option disabled>No results</Option>
                  )}
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </Box>
      </ScaleFade>
    </FormControl>
  );
}

export default Select;
