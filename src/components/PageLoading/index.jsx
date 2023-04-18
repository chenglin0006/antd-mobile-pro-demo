/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import './index.less';

export default () => {
  const [show] = useState(true);

  // useEffect(() => {
  //   const timeout = setTimeout(() => { setShow(true); }, 300);
  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, []);

  return (
    show && (
      <div className="bnq-loadding-container">
        <div className="bnq-loadding-tips">正在加载...</div>
      </div>
    )
  );
};
