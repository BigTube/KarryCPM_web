import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Avatar, Select, Divider, Card, List, Checkbox } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './style.less';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@Form.create()
class Step1 extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      amount: 7800,
    };
    this.calcAmount.bind(this);
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'list/fetch',
      payload: {
        count: 6,
      },
    });
  }
  calcAmount(e, id) {
    const { list: { list } } = this.props;
    if (!e.target.value) return;
    let amount = 0;
    list.forEach(element => {
      let count = element.id === id ? e.target.value : element.count;
      amount += element.price * parseInt(count);
    });
    this.setState({
      amount,
    });
  }

  render() {
    const { list: { list }, form, dispatch, data, loading } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'form/saveStepFormData',
            payload: values,
          });
          dispatch(routerRedux.push('/form/step-form/confirm'));
        }
      });
    };

    return (
      <Fragment>
        <Card title="商品列表" bordered={false}>
          <List
            rowKey="id"
            itemLayout="horizontal"
            grid={{ gutter: 24, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
            loading={loading}
            dataSource={list}
            renderItem={item => (
              <List.Item key={item.id} style={{ padding: 10 }} actions={[<a>删除</a>]}>
                <List.Item.Meta
                  avatar={<Avatar size="small" src={item.avatar} />}
                  title={
                    <a href="#">
                      {item.title} [ 型号: {item.serialNumber} ]
                    </a>
                  }
                  description={
                    <span>
                      单价:{item.price} - 配置: {item.detail}{' '}
                    </span>
                  }
                />
                <Input
                  addonBefore="数量"
                  onChange={e => {
                    this.calcAmount(e, item.id);
                  }}
                  style={{ width: 120 }}
                  defaultValue={item.count}
                />
              </List.Item>
            )}
          />
        </Card>

        <Divider style={{ margin: '10px 0' }} />

        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout} label="商品总计">
            {getFieldDecorator('amount', {
              initialValue: this.state.amount,
              rules: [
                { required: true, message: '请输入转账金额' },
                {
                  pattern: /^(\d+)((?:\.\d+)?)$/,
                  message: '请输入合法金额数字',
                },
              ],
            })(<Input prefix="￥" placeholder="请输入金额" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} className={styles.stepFormText} label="申购人姓名">
            {data.receiverName}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span,
              },
            }}
            label=""
          >
            <Button type="primary" onClick={onValidateForm}>
              下一步
            </Button>
          </Form.Item>
        </Form>
      </Fragment>
    );
  }
}

export default connect(({ list, form, loading }) => ({
  list,
  data: form.step,
  loading: loading.models.list,
}))(Step1);
