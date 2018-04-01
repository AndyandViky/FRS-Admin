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
                        <Table :data="tableData" :columns="answerColums" stripe ref="table"></Table>
                    </Col>
                </Row>
            </Card>
        </Row>
    </div>
</template>

<script>
import { answerColums } from '@/util/table-columns.js'
export default {
    name: 'table-to-image',
    data () {
        return {
            tableData: this.mockTableData1(),
            answerColums: [],
        };
    },
    created() {
        this.answerColums = answerColums(this, this.tableData)
    },
    methods: {
        mockTableData1 () {
            let data = [];
            for (let i = 0; i < 20; i++) {
                data.push({
                    title: '这是我的标题',
                    content: '大家好, 这是我的标题我的标题, 我的标题, 大家好, 这是我的标题我的标题, 我的标题,大家好, 这是我的标题我的标题, 我的标题',
                    create_at: new Date()
                });
            }
            return data;
        },
        showModal(val, index) {
            this.$Modal.confirm({
                title: "编辑数据",
                onOk: () => {
                    this.$Message.info("修改成功");
                },
                render: (h) => {
                    return h('div', [
                        h('Input', {
                            props: {
                                value: val.title,
                                autofocus: true,
                                placeholder: '请输入标题'
                            },
                            style: {
                                marginTop: '20px'
                            },
                            on: {
                                input: (value) => {
                                    val.title = value;
                                }
                            }
                        }),
                        h('Input', {
                            props: {
                                value: val.content,
                                autofocus: true,
                                placeholder: '请输入内容',
                                type: 'textarea',
                            },
                            style: {
                                marginTop: '20px'
                            },
                            on: {
                                input: (value) => {
                                    val.content = value;
                                }
                            }
                        }),
                    ])
                }
            })
        },
        remove(tableData, index) {
            this.$Modal.confirm({
                title: "删除数据",
                content: "是否删除此条数据?",
                onOk: () => {
                    tableData.splice(index, 1);
                    this.$Message.info("删除成功");
                }
            })
        }
    }
};
</script>
