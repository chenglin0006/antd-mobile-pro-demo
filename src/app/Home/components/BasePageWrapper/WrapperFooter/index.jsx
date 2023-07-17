import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

function AppFooter({ children }) {
  return <div className="base-entry-page-footer">{children}</div>;
}
AppFooter.propTypes = {
  children: PropTypes.element,
};
AppFooter.defaultProps = {
  children: null,
};
export default AppFooter;
