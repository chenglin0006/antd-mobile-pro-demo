/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

function Index({ title, isRequired = true }) {
  return (
    <span className="customerName-label">
      {title}
      {isRequired && <span className="required-span">*</span>}
    </span>
  );
}
Index.propTypes = {
  title: PropTypes.string,
  isRequired: PropTypes.bool,
};
Index.defaultProps = {
  title: null,
  isRequired: false,
};
export default Index;
