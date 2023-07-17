/* eslint-disable import/extensions */
/* eslint-disable no-unused-expressions */
import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, TextArea, Input } from 'antd-mobile';
import { Tools } from '@/util';
import LoadingSelf from '@/components/LoadingSelf/index';
import PageWrapper from './components/BasePageWrapper';
import FormItem from './components/RenderFormItemCom';
import Upload from './components/Upload';
import Select from './components/Select';
import DatePicker from './components/DatePicker';
import './index.less';

const Entry = memo((props) => {
  const { history } = props;
  const [submitLoading] = useState(false);
  const [activeId, setActiveInputId] = useState(false);
  const [form] = Form.useForm();
  const firstText = Tools.getUrlArg('firstText');
  const secondText = Tools.getUrlArg('secondText');

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      console.log(values);
    });
    return null;
  };

  const backFun = () => {
    history.goBack();
  };

  const bottomElement = () => {
    return (
      <div className="btn-bottom-fixed">
        <Button color="primary" loading={submitLoading} loadingText="提交" onClick={handleSubmit}>
          提交
        </Button>
      </div>
    );
  };

  const handleFocus = (idName) => {
    if (Tools.isAndroid()) {
      const targetEle = document.getElementsByClassName(idName)[0];
      setTimeout(() => {
        setActiveInputId(idName);
        targetEle.scrollIntoView();
        targetEle.scrollIntoViewIfNeeded();
      }, 100);
    }
  };

  const handleBlur = () => {
    setActiveInputId('');
  };

  return (
    <PageWrapper className="help-wrapper-form" title="填写反馈" backFun={backFun} bottomElement={bottomElement()}>
      <LoadingSelf>
        <div className={`content-div ${activeId}`}>
          <div className="ques-type">
            {decodeURIComponent(firstText)}-{decodeURIComponent(secondText)}
          </div>
          <Form form={form} layout="vertical" className="complaint-wrapper-form">
            <FormItem
              label="问题描述"
              name="problemDesc"
              rules={[
                { required: true, message: '问题描述是必填项' },
                () => ({
                  validator(_, value) {
                    const reg = /[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g;
                    if (value && reg.test(value)) {
                      return Promise.reject(new Error('不能输入表情包'));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <TextArea
                placeholder="请填写您现在遇到的具体问题描述，以及供应商名称，供应商编号，联系方式，以便我们提供更好的服务"
                maxLength={200}
                showCount
                onFocus={() => handleFocus('problemDesc')}
                id="problemDesc"
                autoSize
                rows={6}
              />
            </FormItem>
            <FormItem label="上传凭证" name="attachmentList" valuePropName="taskAttachmentList">
              <Upload size={20} maxCount={6} limit={6} />
            </FormItem>
            <FormItem
              label="联系电话"
              name="phone"
              extra=""
              rules={[
                { required: true, message: '请输入手机号' },
                () => ({
                  validator(v, value) {
                    if (value && !/^[0-9]*$/.test(value)) {
                      return Promise.reject(new Error('请输入正确的手机号'));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input
                onBlur={() => {
                  setTimeout(() => {
                    handleBlur();
                  }, 100);
                }}
                id="phone"
                maxLength={20}
                onFocus={() => handleFocus('phone')}
                placeholder="请填写您的手机号码"
              />
            </FormItem>
            <FormItem name="selectSingle" label="测试单选" rules={[{ required: true, message: '请选择' }]}>
              <Select
                multiple={false}
                options={[
                  { label: '1', value: 1 },
                  { label: '2', value: 2 },
                ]}
              />
            </FormItem>
            <FormItem name="selectMultiple" label="测试多选" rules={[{ required: true, message: '请选择' }]}>
              <Select
                multiple
                options={[
                  { label: '1', value: 1 },
                  { label: '2', value: 2 },
                ]}
              />
            </FormItem>

            <FormItem name="date" label="date" rules={[{ required: true, message: '请选择' }]}>
              <DatePicker />
            </FormItem>
          </Form>
        </div>
      </LoadingSelf>
    </PageWrapper>
  );
});

Entry.propTypes = {
  history: PropTypes.object,
};

Entry.defaultProps = {
  history: {},
};

export default Entry;
