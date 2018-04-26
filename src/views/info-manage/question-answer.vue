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
                        <Table :data="tableData" :columns="questionColums" stripe ref="table"></Table>
                    </Col>
                </Row>
            </Card>
        </Row>
    </div>
</template>

<script>
import { questionColums } from '@/util/table-columns.js'
import { Question } from '@/api'
export default {
    name: 'table-to-image',
    data () {
        return {
            tableData: [],
            questionColums: [],
        };
    },
    async created() {
        const data = await Question.getQuestions({pageNo: 1, pageSize: 10});
        this.tableData = data.datas;
        this.questionColums = questionColums(this, this.tableData)
    },
    methods: {
        getAnswer(index) {
            this.$router.push({path: '/question/'+this.tableData[index].id})
        },
        showModal(val, index) {
            const questionId = this.$route.params.id;
            this.$Modal.confirm({
                title: "编辑数据",
                onOk: () => {
                    Question.changeQuestion({
                        questionId,
                        title: val.title,
                        like: val.like
                    }).then(result => {
                        this.$Message.info("修改成功");
                    })
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
                                value: val.like,
                                autofocus: true,
                                placeholder: '请输入点赞数'
                            },
                            style: {
                                marginTop: '20px'
                            },
                            on: {
                                input: (value) => {
                                    val.like = value;
                                }
                            }
                        }),
                    ])
                }
            })
        },
        remove(tableData, index) {
            const questionId = this.$route.params.id;
            this.$Modal.confirm({
                title: "删除数据",
                content: "是否删除此条数据?",
                onOk: () => {
                    Question.deleteQuestion({ questionId }).then(result => {
                        tableData.splice(index, 1);
                        this.$Message.info("删除成功");
                    })
                }
            })
        }
    }
};
</script>
