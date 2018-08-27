import React, { PureComponent } from 'react';
import numeral from 'numeral';
import { connect } from 'dva';
import {
  Row,
  Col,
  Input,
  Form,
  Card,
  Select,
  Icon,
  Avatar,
  List,
  Tooltip,
  Dropdown,
  Modal,
  Popconfirm,
  message,
  Menu,
  Button,
} from 'antd';

import TagSelect from 'components/TagSelect';
import StandardFormRow from 'components/StandardFormRow';

import styles from './ProductList.less';
import { routerRedux } from 'dva/router';

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
        count: 12,
      },
    });
  }

  handleFormSubmit = () => {
    const { form, dispatch } = this.props;
    // setTimeout 用于保证获取表单值是在所有表单字段更新完毕的时候
    setTimeout(() => {
      form.validateFields(err => {
        if (!err) {
          // eslint-disable-next-line
          dispatch({
            type: 'list/fetch',
            payload: {
              count: 8,
            },
          });
        }
      });
    }, 0);
  };

  handleCollect = () => {
    message.success('加入收藏成功');
  };
  handleCart = () => {
    message.success('加入购物车成功');
  };

  render() {
    const { list: { list }, purchase, loading, form, dispatch } = this.props;

    const { getFieldDecorator } = form;

    const CardInfo = ({ serialNumber, newUser }) => (
      <div className={styles.cardInfo}>
        <div>
          <p>
            价格: <span className={styles.price}>{newUser}</span>元
          </p>
          <p>
            型号: <span>{serialNumber}</span>
          </p>
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
      console.log('search');
    };

    const itemMenu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
            1st menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
            2nd menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
            3d menu item
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className={styles.filterCardList}>
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
              <FormItem>
                {getFieldDecorator('category')(
                  <TagSelect onChange={this.handleFormSubmit}>
                    <TagSelect.Option value="cat1">电脑</TagSelect.Option>
                    <TagSelect.Option value="cat2">软件</TagSelect.Option>
                    <TagSelect.Option value="cat3">扫描枪</TagSelect.Option>
                    <TagSelect.Option value="cat4">包装盒</TagSelect.Option>
                    <TagSelect.Option value="cat5">包装箱</TagSelect.Option>
                    <TagSelect.Option value="cat6">填充物</TagSelect.Option>
                    <TagSelect.Option value="cat7">车辆相关</TagSelect.Option>
                  </TagSelect>
                )}
              </FormItem>
            </StandardFormRow>
            <StandardFormRow title="筛选" grid last>
              <Row gutter={16}>
                <Col lg={8} md={8} sm={8} xs={24}>
                  <FormItem {...formItemLayout} label="名称">
                    {getFieldDecorator('product', {
                      initialValue: purchase.search.productName,
                      rules: [{ required: false, message: '请输入商品名称' }],
                    })(<Input placeholder="请输入商品名称" />)}
                  </FormItem>
                </Col>
                <Col lg={8} md={8} sm={8} xs={24}>
                  <FormItem {...formItemLayout} label="供应商">
                    {getFieldDecorator('author', {})(
                      <Select
                        onChange={this.handleFormSubmit}
                        placeholder="不限"
                        style={{ maxWidth: 200, width: '100%' }}
                      >
                        <Option value="dell">Dell</Option>
                        <Option value="deli">得力</Option>
                        <Option value="baozhuang">xx包装</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col lg={6} md={6} sm={6} xs={24}>
                  <Button type="primary" onClick={goSearch}>
                    搜索
                  </Button>
                </Col>
              </Row>
            </StandardFormRow>
          </Form>
        </Card>
        <List
          rowKey="id"
          style={{ marginTop: 24 }}
          grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
          loading={loading}
          dataSource={list}
          renderItem={item => (
            <List.Item key={item.id}>
              <Card
                hoverable
                bodyStyle={{ paddingBottom: 20 }}
                actions={[
                  <Tooltip title="收藏">
                    <Icon type="plus-square-o" onClick={this.handleCollect} />
                  </Tooltip>,
                  <Tooltip title="加入购物车">
                    <Icon type="shopping-cart" onClick={this.handleCart} />
                  </Tooltip>,
                ]}
              >
                <Card.Meta avatar={<Avatar size="big" src={item.avatar} />} title={item.title} />
                <div className={styles.cardItemContent}>
                  <CardInfo
                    serialNumber={item.serialNumber}
                    newUser={numeral(item.newUser).format('0,0')}
                  />
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  }
}
