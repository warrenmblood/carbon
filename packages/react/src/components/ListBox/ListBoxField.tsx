/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { type HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import { usePrefix } from '../../internal/usePrefix';

// TODO: When can this code be deleted?
// No longer used, left export for backward-compatibility
export const translationIds = {};

export interface ListBoxFieldProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Specify if the parent <ListBox> is disabled
   */
  disabled?: boolean;
}

/**
 * `ListBoxField` is responsible for creating the containing node for valid
 * elements inside of a field. It also provides a11y-related attributes like
 * `role` to make sure a user can focus the given field.
 */
function ListBoxField({
  children,
  disabled,
  tabIndex,
  ...rest
}: ListBoxFieldProps) {
  const prefix = usePrefix();

  return (
    <div
      className={`${prefix}--list-box__field`}
      tabIndex={(!disabled && tabIndex) || -1}
      {...rest}>
      {children}
    </div>
  );
}

ListBoxField.propTypes = {
  /**
   * Typically set by `getToggleButtonProps`, this should specify whether the
   * field has a popup.
   */
  'aria-haspopup': PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  /**
   * Provide the contents of your ListBoxField
   */
  children: PropTypes.node,

  /**
   * Specify if the parent <ListBox> is disabled
   */
  disabled: PropTypes.bool,

  /**
   * The role for the component, should be set by `getToggleButtonProps` coming
   * from Downshift
   */
  role: PropTypes.string,

  /**
   * Optional prop to specify the tabIndex of the <ListBox> trigger button
   */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export type ListBoxFieldComponent = React.FC<ListBoxFieldProps>;

export default ListBoxField as ListBoxFieldComponent;
