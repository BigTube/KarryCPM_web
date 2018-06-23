import React from 'react';
import { connect } from 'dva';
import { Form, Input, DatePicker, Button, Alert, Divider, Select } from 'antd';
import { routerRedux } from 'dva/router';
import { digitUppercase } from '../../../utils/utils';
import styles from './style.less';
const { TextArea } = Input;

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
        <Alert
          closable
          showIcon
          message="申购信息填写后,将不能修改, 请认真填写."
          style={{ marginBottom: '24px' }}
        />
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="申购人姓名">
          {data.receiverName}
        </Form.Item>
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="申购部门">
          {data.department}
        </Form.Item>
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="条线">
          {data.line}
        </Form.Item>

        <Form.Item {...formItemLayout} label="时间要求">
          {getFieldDecorator('author', {})(
            <DatePicker style={{ maxWidth: 200 }} placeholder="时间要求" />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="采购类型">
          {getFieldDecorator('author', {})(
            <Select onChange={this.handleFormSubmit} placeholder="请选择" style={{ maxWidth: 200 }}>
              <Option value="1">集中采购</Option>
              <Option value="2">中央采购</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="固定资产类型">
          {getFieldDecorator('author', {})(
            <Select onChange={this.handleFormSubmit} placeholder="请选择" style={{ maxWidth: 200 }}>
              <Option value="1">IT</Option>
              <Option value="2">固定</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="采购理由">
          {getFieldDecorator('client')(<TextArea rows={4} placeholder="采购理由" />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="采购建议">
          {getFieldDecorator('client')(<Input placeholder="采购建议" />)}
        </Form.Item>

        <Form.Item {...formItemLayout} className={styles.stepFormText} label="总金额">
          <span className={styles.money}>{data.amount}</span>
          <span className={styles.uppercase}>（{digitUppercase(data.amount)}）</span>
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
          <Button onClick={onPrev} style={{ marginRight: 10 }}>
            上一步
          </Button>

          <Button type="primary" onClick={onNext} loading={submitting}>
            下一步
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
