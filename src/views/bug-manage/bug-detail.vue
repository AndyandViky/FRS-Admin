<style lang="less">
    @import '../../styles/common.less';
    @import '../../styles/table.less';
</style>

<template>
    <div>
        <Row>
            <Card>
                <Row>
                    <Col span="100">
                        <Card>
                            <p slot="title">
                                <Icon type="ios-keypad"></Icon>
                                故障数据处理
                            </p>
                            <Form :model="formItem" :label-width="80">
                                <FormItem label="故障名:">
                                    <p>{{bug.name}}</p>
                                </FormItem>
                                <FormItem label="故障内容:">
                                    <p>{{bug.content}}</p>
                                </FormItem>
                                <FormItem label="处理内容">
                                    <Input v-model="formItem.recall" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="故障回复"></Input>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary">提交</Button>
                                </FormItem>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Card>
        </Row>
    </div>
</template>

<script>
export default {
    name: 'bug-detail',
    data () {
        return {
            bug: {
                name: '小区门禁开不了',
                content: '多次走到小区门, 门自动打开失败!',
            },
            formItem: {
                recall: '',
            }
        };
    },
    methods: {

    }
};
</script>
