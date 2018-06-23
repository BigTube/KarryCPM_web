import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Alert, Divider, Select } from 'antd';
import { routerRedux } from 'dva/router';
import { digitUppercase } from '../../../utils/utils';
import styles from './style.less';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@Form.create()
class Step2 extends React.PureComponent {
  render() {
    const { form, data, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onPrev = () => {
      dispatch(routerRedux.push('/form/step-form'));
    };
    const onNext = () => {
      dispatch(routerRedux.push('/form/step-form/budget'));
    };
    const onValidateForm = e => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'form/submitStepForm',
            payload: {
              ...data,
              ...values,
            },
          });
        }
      });
    };
    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <Alert closable showIcon message="申购信息填写后,将不能修改, 请认真填写. " />
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="申购人姓名">
          {data.receiverName}
        </Form.Item>
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="申购部门">
          {data.department}
        </Form.Item>
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="条线">
          {data.line}
        </Form.Item>

        <Form.Item {...formItemLayout} className={styles.stepFormText} label="采购类型">
          {getFieldDecorator('publicUsers')(
            <Select
              mode="multiple"
              placeholder="公开给"
              style={{
                margin: '8px 0',
                display: getFieldValue('public') === '2' ? 'block' : 'none',
              }}
            >
              <Option value="1">同事甲</Option>
              <Option value="2">同事乙</Option>
              <Option value="3">同事丙</Option>
            </Select>
          )}
        </Form.Item>
        <Divider style={{ margin: '24px 0' }} />

        <Form.Item
          style={{ marginBottom: 8 }}
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
          label=""
        >
          <Button type="primary" onClick={onNext} loading={submitting}>
            下一步
          </Button>
          <Button onClick={onPrev} style={{ marginLeft: 8 }}>
            上一步
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default connect(({ form, loading }) => ({
  submitting: loading.effects['form/submitStepForm'],
  data: form.step,
}))(Step2);
