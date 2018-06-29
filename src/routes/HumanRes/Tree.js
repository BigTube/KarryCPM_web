import React, { Fragment } from 'react';
import {
  Button,
  Row,
  Col,
  Icon,
  message,
  Tree,
  Card,
  Input,
  Upload,
  Modal,
  Form,
  Checkbox,
} from 'antd';
import Result from 'components/Result';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
const TreeNode = Tree.TreeNode;
const CheckboxGroup = Checkbox.Group;
import styles from './Tree.less';

const treeData = [
  {
    title: '无锡片区',
    key: '0-0',
    children: [
      {
        title: '常州分公司',
        key: '0-0-0',
        children: [
          { title: '财务: 王XX', key: '0-0-0-0' },
          { title: '行政: 李XX', key: '0-0-0-1' },
          { title: '库管: 齐XX', key: '0-0-0-2' },
        ],
      },
      {
        title: '泰州分公司',
        key: '0-0-1',
        children: [
          { title: '财务: 王XX', key: '0-0-1-0' },
          { title: '行政: 李XX', key: '0-0-1-1' },
          { title: '库管: 齐XX', key: '0-0-1-2' },
        ],
      },
      {
        title: '嘉兴分公司',
        key: '0-0-2',
        children: [{ title: '财务: 王XX', key: '0-0-2-0' }],
      },
      {
        title: '湖州分公司',
        key: '0-0-3',
        children: [{ title: '财务: 王XX', key: '0-0-3-0' }],
      },
      {
        title: '南通分公司',
        key: '0-0-4',
        children: [{ title: '财务: 王XX', key: '0-0-4-0' }],
      },
    ],
  },
  {
    title: '河南及湖北片区',
    key: '0-1',
    children: [
      {
        title: '襄阳分公司',
        key: '0-1-0',
      },
      {
        title: '宜昌分公司',
        key: '0-1-1',
      },
      {
        title: '洛阳分公司',
        key: '0-1-2',
      },
      {
        title: '嘉里物流（郑州）',
        key: '0-1-3',
      },
      {
        title: '河南分公司',
        key: '0-1-4',
      },
    ],
  },
  {
    title: '青岛片区',
    key: '0-3',
    children: [{ title: 'xx分公司', key: '0-3-0' }],
  },
  {
    title: '宁波片区',
    key: '0-4',
    children: [{ title: 'xx分公司', key: '0-4-0' }],
  },
  {
    title: '重点分公司',
    key: '0-5',
    children: [{ title: 'xx分公司', key: '0-5-0' }],
  },
];

const plainOptions = ['采购权', '审批权', '人事权'];

@Form.create()
class Demo extends React.Component {
  state = {
    expandedKeys: ['0-0-0', '0-0-1'],
    autoExpandParent: true,
    checkedKeys: ['0-0-0'],
    selectedKeys: [],
    visible: false,
    modalBVisible: false,
    confirmLoading: false,
  };
  onExpand = expandedKeys => {
    // console.log('onExpand', arguments);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };
  onCheck = checkedKeys => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  };
  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    if (info.node.getNodeChildren().length > 0) {
      this.setState({
        selectedKeys,
        modalBVisible: true,
      });
    } else {
      this.setState({
        selectedKeys,
        visible: true,
      });
    }
  };

  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
        modalBVisible: false,
      });
    }, 2000);
  };
  handleCancel = () => {
    this.setState({
      visible: false,
      modalBVisible: false,
    });
  };
  renderTreeNodes = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode
            title={
              <span style={{ color: '#333' }}>
                {' '}
                {item.title}{' '}
                <span className={styles.actions}>
                  <a>导出</a> - <a>导入替换</a>{' '}
                </span>{' '}
              </span>
            }
            key={item.key}
            dataRef={item}
          >
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          {...item}
          title={
            <span style={{ color: '#666' }}>
              {' '}
              {item.title}{' '}
              <span className={styles.actions}>
                <a>编辑</a> - <a>删除</a>{' '}
              </span>
            </span>
          }
        />
      );
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <PageHeaderLayout>
        <Card bordered={false} title="组织架构">
          <Tree
            checkable
            onExpand={this.onExpand}
            expandedKeys={this.state.expandedKeys}
            autoExpandParent={this.state.autoExpandParent}
            onCheck={this.onCheck}
            checkedKeys={this.state.checkedKeys}
            onSelect={this.onSelect}
            selectedKeys={this.state.selectedKeys}
          >
            {this.renderTreeNodes(treeData)}
          </Tree>
        </Card>
        <Modal
          title="编辑"
          visible={this.state.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
        >
          <Form>
            <Form.Item {...formItemLayout} label="姓名">
              <Input value="李xx" />
            </Form.Item>
            <Form.Item {...formItemLayout} label="电话">
              <Input type="text" value="18611009876" />
            </Form.Item>
            <Form.Item {...formItemLayout} label="邮箱">
              <Input type="text" value="ziqi.liu@kerry.com.cn" />
            </Form.Item>
            <Form.Item {...formItemLayout} label="权限">
              <CheckboxGroup options={plainOptions} defaultValue={['采购权']} />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="导入新人员信息"
          visible={this.state.modalBVisible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
        >
          <p>批量导入人员信息</p>
          <Button>
            <Icon type="upload" /> 上传
          </Button>
        </Modal>
      </PageHeaderLayout>
    );
  }
}

export default connect(({ form }) => ({}))(Demo);
