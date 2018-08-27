import React, { PureComponent } from 'react';
import numeral from 'numeral';
import { connect } from 'dva';
import { Row, Col, Input, Form, Card, Modal,Select, Icon, Avatar, List, Tooltip, Dropdown, Menu, Button, Checkbox } from 'antd';

import TagSelect from 'components/TagSelect';
import StandardFormRow from 'components/StandardFormRow';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { routerRedux } from 'dva/router';

import styles from './ProductList.less';

const { Option } = Select;
const FormItem = Form.Item;

const formatWan = val => {
  const v = val * 1;
  if (!v || isNaN(v)) return '';

  let result = val;
  if (val > 10000) {
    result = Math.floor(val / 10000);
    result = (
      <span>
        {result}
        <em className={styles.wan}>万</em>
      </span>
    );
  }
  return result;
};

/* eslint react/no-array-index-key: 0 */
@Form.create()
@connect(({ list, purchase, loading }) => ({
  list,
  purchase,
  loading: loading.models.list,
}))

export default class FilterCardList extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'list/fetch',
      payload: {
        count: 6,
      },
    });
  }

  handleFormSubmit = () => {
    const { form, dispatch } = this.props;
    // setTimeout 用于保证获取表单值是在所有表单字段更新完毕的时候
    setTimeout(() => {
      dispatch(routerRedux.push('/form/step-form/info'));
    }, 100);
  };

  showModal = () => {
    Modal.confirm({
      title: '提示',
      content: '加入收藏成功',
      okText: '确认',
      cancelText: '取消',
    });
  }
  showDeleteModal = () => {
    Modal.confirm({
      title: '删除',
      content: '是否从购物车中删除',
      okText: '确认',
      cancelText: '取消',
    });
  }

  


  render() {
    console.log(this.props)
    const { list: {list}, purchase, loading, form  } = this.props;
    const { getFieldDecorator } = form;

    const CardInfo = ({ serialNumber, newUser }) => (
      <div className={styles.cardInfoShoppingCart}>
        <div>
          <p>价格: <span className={styles.price}>{newUser}</span>元</p>
          <p>型号: <span>{serialNumber}</span></p>
        </div>
      </div>
    );

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const goSearch = () => {
      console.log('search')
    }

    return (
      <PageHeaderLayout
        title="购物车"
        content="选择商品加入采购单"
      >
        <List
          rowKey="id"
          itemLayout="horizontal"
          grid={{ gutter: 24, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
          loading={loading}
          dataSource={list}
          renderItem={item => (
            <List.Item key={item.id}
              style={{ padding: 12, borderBottom: '1px solid #ccc' }} 
              actions={[<Checkbox>选择</Checkbox>, <a onClick={this.showDeleteModal}>删除</a>, <a onClick={this.showModal}>加入收藏</a>]}  
            >
              <List.Item.Meta
                avatar={<Avatar size="large" src={item.avatar} />}
                title={<a href="#">{item.title}</a>}
                description={<span>价格:{item.priceStr} -  型号:{item.serialNumber} </span>}
              />
              
              <Input addonBefore="数量" style={{ width: 100 }} defaultValue={3} />
            </List.Item>
          )}
        />

        <div style={{ marginTop: 32 }}>
          <Button type="primary" htmlType="submit" onClick={this.handleFormSubmit} size="large">
            发起采购申请
          </Button>
        </div>

      </PageHeaderLayout>
    );
  }
}
