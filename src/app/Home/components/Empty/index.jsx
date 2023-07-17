import React, { memo } from 'react';
import emptyIcon from '../../images/empty.png';
import './index.less';

const Index = memo(() => {
  return (
    <div className="empty-div">
      <img src={emptyIcon} alt="" />
    </div>
  );
});

export default Index;
