import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Alert, Divider } from 'antd';
import { routerRedux } from 'dva/router';
import { digitUppercase } from '../../../utils/utils';
import styles from './style.less';
const { TextArea } = Input;
import numeral from 'numeral';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@Form.create()
class Step3 extends React.PureComponent {
  render() {
    const { form, data, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onPrev = () => {
      dispatch(routerRedux.push('/form/step-form/confirm'));
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
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="该类预算额度">
          ¥{numeral(120000).format('0,0')}
        </Form.Item>
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="该类已使用额度">
          ¥{numeral(80000).format('0,0')}
        </Form.Item>
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="该类预算剩余">
          ¥{numeral(50000).format('0,0')}
        </Form.Item>
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="总预算剩余">
          ¥{numeral(220000).format('0,0')}
        </Form.Item>

        <Form.Item {...formItemLayout} label="预算外信息">
          {getFieldDecorator('client')(<TextArea rows={4} placeholder="预算外信息" />)}
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
          <Button onClick={onPrev} style={{ marginRight: 8 }}>
            上一步
          </Button>
          <Button type="primary" onClick={onValidateForm} loading={submitting}>
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default connect(({ form, loading }) => ({
  submitting: loading.effects['form/submitStepForm'],
  data: form.step,
}))(Step3);
