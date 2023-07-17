import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DatePickerView, Popup } from 'antd-mobile';
import { RightOutline } from 'antd-mobile-icons';
import moment from 'moment';
import PopupHeader from '../PopupHeader';

import './index.less';

const min = new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 66); // 最小值可选择66年前

function DateSelect({ placeholder, value, onChange }) {
  const [visible, setVisible] = useState(false);
  const [_value, setValue] = useState(null);
  const [viewValue, setViewValue] = useState(null);
  useEffect(() => {
    setValue(value ? new Date(value) : new Date());
    setViewValue(value || null);
  }, [value]);
  function onConfirm() {
    setVisible(false);
    setViewValue(_value);
    if (onChange) onChange(moment(_value).format('YYYY-MM-DD HH:mm:ss'));
  }

  return (
    <div className="entry-select">
      <div className="input" onClick={() => setVisible(true)}>
        {viewValue ? moment(viewValue).format('YYYY-MM-DD') : <span className="placeholder">{placeholder}</span>}
        <RightOutline />
      </div>
      <Popup visible={visible} bodyStyle={{ height: '40vh' }} onMaskClick={() => setVisible(false)}>
        <PopupHeader onClose={() => setVisible(false)} onConfirm={onConfirm} />
        <DatePickerView
          value={_value}
          min={min}
          onChange={(val) => {
            setValue(val);
          }}
        />
      </Popup>
    </div>
  );
}

DateSelect.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.object,
  onChange: PropTypes.func,
};

DateSelect.defaultProps = {
  placeholder: '请选择',
  value: '',
  onChange: (v) => {
    console.log(v);
  },
};

export default DateSelect;
