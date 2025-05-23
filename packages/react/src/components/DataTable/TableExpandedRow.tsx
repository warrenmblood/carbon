/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useRef, type HTMLAttributes } from 'react';
import TableCell from './TableCell';
import { usePrefix } from '../../internal/usePrefix';

export interface TableExpandedRowProps
  extends HTMLAttributes<HTMLTableRowElement> {
  /**
   * The width of the expanded row's internal cell
   */
  colSpan: number;
}

const TableExpandedRow = ({
  className: customClassName,
  children,
  colSpan,
  ...rest
}: TableExpandedRowProps) => {
  const rowRef = useRef<HTMLTableRowElement>(null);
  const prefix = usePrefix();
  const className = cx(`${prefix}--expandable-row`, customClassName);

  const toggleParentHoverClass = (eventType: 'enter' | 'leave') => {
    if (rowRef && rowRef.current && rowRef.current.previousElementSibling) {
      const parentNode = rowRef.current.previousElementSibling;
      if (eventType === 'enter') {
        parentNode.classList.add(`${prefix}--expandable-row--hover`);
      } else {
        parentNode.classList.remove(`${prefix}--expandable-row--hover`);
      }
    }
  };

  return (
    <tr
      ref={rowRef}
      onMouseEnter={() => toggleParentHoverClass('enter')}
      onMouseLeave={() => toggleParentHoverClass('leave')}
      {...rest}
      className={className}
      data-child-row>
      <TableCell colSpan={colSpan}>
        <div className={`${prefix}--child-row-inner-container`}>{children}</div>
      </TableCell>
    </tr>
  );
};

TableExpandedRow.propTypes = {
  /**
   * Pass in the contents for your TableExpandedRow
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * The width of the expanded row's internal cell
   */
  colSpan: PropTypes.number.isRequired,
};

export default TableExpandedRow;
