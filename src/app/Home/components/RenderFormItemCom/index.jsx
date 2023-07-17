import React, { memo } from 'react';
import { Form } from 'antd-mobile';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './index.less';
import CustomerLabel from '../CustomerLabel';

const { Item } = Form;
const FromItem = memo((props) => {
  const { name, rules, wrapperClassName, isDisabled, className, ...resProps } = props;

  return (
    <Item
      {...resProps}
      label={<CustomerLabel title={resProps?.label} isRequired={resProps?.required} />}
      name={name}
      className={`${name} ${className}`}
      rules={
        !_.isEmpty(rules) ? rules : [{ required: resProps?.required || false, message: `${resProps.label}是必填项` }]
      }
    >
      {props.children}
    </Item>
  );
});

FromItem.propTypes = {
  name: PropTypes.string,
  wrapperClassName: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  rules: PropTypes.array,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
};

FromItem.defaultProps = {
  name: '',
  children: null,
  rules: [],
  wrapperClassName: '',
  isDisabled: false,
  className: '',
};

export default FromItem;
