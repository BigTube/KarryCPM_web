import React, { Fragment } from 'react';
import { Button, Row, Col, Icon, message, Tree, Card, Input, Upload } from 'antd';
import Result from 'components/Result';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
const TreeNode = Tree.TreeNode;

class Step1 extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }

  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }
  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  }

  render() {
    const { dispatch } = this.props;
    const architecture = [
      {
        title: "无锡片区", key: '0-0-0', child: [
          { title: '常州分公司' },
          { title: '泰州分公司' },
          { title: '嘉兴分公司' },
          { title: '湖州分公司' },
          { title: '南通分公司' },
        ]
      },
      {
        title: "河南及湖北片区", key: '0-1-0', child: [
          { title: '襄阳分公司' },
          { title: '宜昌分公司' },
          { title: '洛阳分公司' },
          { title: '嘉里物流（郑州）' },
          { title: '河南分公司' },
        ]
      },
      {
        title: "青岛片区", child: [
          { title: '青岛分公司' },
          { title: '东营分公司' },
          { title: '淄博分公司' },
          { title: '黄岛物流' },
          { title: '潍坊分公司' },
          { title: '临沂分公司' },
          { title: '前湾嘉里大通' },
        ]
      },
      {
        title: "宁波片区", child: [
          { title: '宁波分公司' },
          { title: '宁波保税子公司' },
          { title: '绍兴分公司' },
        ]
      },
      {
        title: "重点分公司", child: [
          { title: '昆山分公司' },
          { title: '湖北分公司' },
          { title: '山东分公司' },
          { title: '烟台分公司' },
          { title: '安徽分公司' },
          { title: '杭州分公司' },
          { title: '威海分公司' },
          { title: '济宁分公司' },
        ]
      },
    ];
    const extra = (
      <Fragment>
        <Tree
          checkable
          defaultExpandedKeys={['0-0-0', '0-1-0']}
          // defaultSelectedKeys={['0-0-0', '0-0-1']}
          // defaultCheckedKeys={['0-0-0', '0-0-1']}
          onSelect={this.onSelect}
          onCheck={this.onCheck}
        >
          {
            architecture.map((node) => {
              return (
                <TreeNode key={node.key} title={node.title}>
                  {node.child.map(cnode => {
                    return (<TreeNode title={
                      <div>{cnode.title}
                        <span style={{ color: '#1890ff' }}> <a>导出</a> - <a>编辑</a> -  <a>删除</a> </span>
                      </div>
                    } >
                    </TreeNode>)
                  })}
                </TreeNode>
              )
            })
          }
        </Tree>
      </Fragment>
    );


    return (
      <PageHeaderLayout>
        <Card bordered={false} title="组织架构">
          {extra}
        </Card>
      </PageHeaderLayout>
    )
  }
}

export default connect(({ form }) => ({
  form
}))(Step1);