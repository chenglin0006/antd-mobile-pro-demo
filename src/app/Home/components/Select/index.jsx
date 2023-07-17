import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CheckList, Popup } from 'antd-mobile';
import { RightOutline } from 'antd-mobile-icons';
import PopupHeader from '../PopupHeader';
import './index.less';

function Select({ placeholder, multiple, options, value, onChange, disabled }) {
  const [visible, setVisible] = useState(false);
  const [_value, setValue] = useState([]);
  const [showLabel, setShowLabel] = useState([]);

  function _setShowLabel(v) {
    if (!v || !v.length || (v.length === 1 && !v[0])) {
      setShowLabel([]);
      return;
    }
    console.log(v);
    const d = options.filter((item) => v.indexOf(item.value) >= 0);
    setShowLabel(d.map((item) => item.label));
  }
  useEffect(() => {
    if (visible) {
      if (Array.isArray(value)) {
        setValue([...value]);
        _setShowLabel(value);
      } else if (value || value === 0) {
        setValue([value]);
        _setShowLabel([value]);
      } else {
        setValue([]);
        setShowLabel([]);
      }
    }
  }, [value, visible]);

  function onConfirm() {
    setVisible(false);
    _setShowLabel(_value);
    if (onChange) onChange(multiple ? _value : _value[0]);
  }

  return (
    <div className="entry-select">
      <div
        className="input"
        onClick={() => {
          setVisible(true);
        }}
      >
        {showLabel && showLabel.length ? showLabel.join() : <span className="placeholder">{placeholder}</span>}
        <RightOutline />
      </div>
      <Popup visible={visible} bodyStyle={{ height: '40vh' }} onMaskClick={() => setVisible(false)}>
        <PopupHeader onClose={() => setVisible(false)} onConfirm={onConfirm} />
        <div className="select-popup-box">
          <CheckList
            disabled={disabled}
            multiple={multiple}
            value={_value}
            onChange={(val) => {
              setValue(val);
            }}
          >
            {options.map((item) => (
              <CheckList.Item key={item.value} value={item.value}>
                {item.label}
              </CheckList.Item>
            ))}
          </CheckList>
        </div>
      </Popup>
    </div>
  );
}

Select.propTypes = {
  placeholder: PropTypes.string, // 占位符
  multiple: PropTypes.bool, // 多选
  options: PropTypes.array, // 选项数组
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

Select.defaultProps = {
  placeholder: '请选择',
  multiple: false,
  options: [],
  value: [],
  disabled: false,
  onChange: () => {},
};

export default Select;
