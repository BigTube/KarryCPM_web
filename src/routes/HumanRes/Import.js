import React, { Fragment } from 'react';
import { Button, Row, Col, Icon, message, Steps, Card, Input, Upload } from 'antd';
import Result from 'components/Result';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';

const { Step } = Steps;

class Step1 extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }

    render() {
      const {  dispatch } = this.props;
        const uploadprops = {
            name: 'file',
            action: '//jsonplaceholder.typicode.com/posts/',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    // message.error(`${info.file.name} file upload failed.`);
                    dispatch(routerRedux.push('/human/tree'));
                }
            },
        };

        const extra = (
            <Fragment>
                <div
                    style={{
                        fontSize: 16,
                        color: 'rgba(0, 0, 0, 0.85)',
                        fontWeight: '500',
                        marginBottom: 20,
                        textAligh: 'center'
                    }}
                >
                    <Upload {...uploadprops}>
                        <Button>
                            <Icon type="upload" /> 上传
                      </Button>
                    </Upload>
                </div>
            </Fragment>
        );

        const actions = (
            <Fragment>
                <Button type="primary">提交</Button>
            </Fragment>
        );

        return (
            <PageHeaderLayout>
                <Card bordered={false}>
                    <Result
                        title="上传人事架构Excel"
                        extra={extra}
                        actions={actions}
                        style={{ marginTop: 48, marginBottom: 16 }}
                    />
                </Card>
            </PageHeaderLayout>
        )
    }
}

export default connect(({ form }) => ({
    form
}))(Step1);