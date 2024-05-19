import React = require('react');

export type Option<T> = {
  label: string;
  value?: T;
  disabled?: boolean;
};

export type SelectProps<T> = {
  /**
   * Label displayed above the input
   */
  label?: string;

  /**
   * Placeholder displayed into the input
   */
  placeholder?: string;

  /**
   * Margin between the input and dropdown list
   */
  gutter?: number;

  /**
   * Static option list
   */
  options?: Option<T>[];

  /**
   * Multiple or single selection
   */
  multiple?: boolean;

  /**
   * Execute when user change query, disable static search
   */
  onSearch?(query: string): any;

  /**
   * Execute when user change the selection value
   */
  onChange?(value: T | T[]): any;

  /**
   * Execute when user focus the input
   */
  onFocus?(): any;

  /**
   * Execute when user blur the input
   */
  onBlur?(): any;

  /**
   * Execute when user clear the field
   */
  onClear(): void;

  /**
   * Custom filter for search process (use this when you provide complex type value like Object, Array, etc.)
   */
  filterWith?(option: Option<T>, query: string): boolean;

  /**
   * Custom element for option display
   */
  optionTemplate?(option?: Option<T>): React.ReactNode;

  /**
   * Custom element for empty template
   */
  emptyTemplate?(): React.ReactNode;

  /**
   * Custom element for loading template
   */
  loadingTemplate?(): React.ReactNode;

  /**
   * Custom element for right icon
   */
  rightIcon?(): React.ReactNode;

  /**
   * state to display loading template
   */
  loading?: boolean;
};
