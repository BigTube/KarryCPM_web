import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button, Row, Col } from 'antd';
import { routerRedux } from 'dva/router';
import Result from 'components/Result';
import styles from './style.less';

class Step4 extends React.PureComponent {
  render() {
    const { dispatch, data } = this.props;
    const onFinish = () => {
      dispatch(routerRedux.push('/form/step-form'));
    };
    const information = (
      <div className={styles.information}>
        <Row>
          <Col span={8} className={styles.label}>
            订单ID:
          </Col>
          <Col span={16}>{data.orderId}</Col>
        </Row>
        <Row>
          <Col span={8} className={styles.label}>
            部门:
          </Col>
          <Col span={16}>{data.department}</Col>
        </Row>
        <Row>
          <Col span={8} className={styles.label}>
            申请人:
          </Col>
          <Col span={16}>{data.receiverName}</Col>
        </Row>
        <Row>
          <Col span={8} className={styles.label}>
            总金额：
          </Col>
          <Col span={16}>
            <span className={styles.money}>{data.amount}</span> 元
          </Col>
        </Row>
      </div>
    );
    const actions = (
      <Fragment>
        <Button type="primary" onClick={onFinish}>
          再申请一笔
        </Button>
      </Fragment>
    );
    return (
      <Result
        type="success"
        title="操作成功"
        description="预计4天内可以采购成功"
        extra={information}
        actions={actions}
        className={styles.result}
      />
    );
  }
}

export default connect(({ form }) => ({
  data: form.step,
}))(Step4);
