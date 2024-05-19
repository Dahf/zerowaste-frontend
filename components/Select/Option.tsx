import * as React from 'react';
import { Button, useColorMode, Checkbox } from '@chakra-ui/react';

export type OptionProps<T = any> = {
  value?: T;
  children: React.ReactNode;
  onClick?(): any;
  disabled?: boolean;
  selected?: boolean;
  multiple?: boolean;
};

function Option<T>(props: OptionProps<T>) {
  const { onClick, children, disabled, selected, multiple } = props;
  const { colorMode } = useColorMode();

  const isDark = colorMode === 'dark';

  function getBackgroundColor() {
    if (selected && !multiple) {
      return isDark ? 'blue.500' : 'blue.500';
    }

    return 'transparent';
  }

  function getColor() {
    return isDark ? 'white' : 'black';
  }

  return (
    <Button
      p={2}
      rounded="md"
      w="100%"
      variant="ghost"
      color={isDark ? 'white' : 'black'}
      justifyContent="flex-start"
      fontWeight={400}
      onClick={onClick}
      sx={{
        pointerEvents: disabled ? 'none' : 'all',
        color: getColor(),
        backgroundColor: getBackgroundColor(),
        '&:hover': {
          backgroundColor: 'blue.500',
          color: 'white',
        },
      }}
      isActive={selected && !multiple}
    >
      {multiple && <Checkbox isChecked={selected} mr={3} />}
      {children}
    </Button>
  );
}

export default Option;
