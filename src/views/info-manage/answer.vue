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
import { Question } from '@/api'
export default {
    name: 'answer',
    data () {
        return {
            tableData: [],
            answerColums: [],
        };
    },
    created() {
        this.getData();
        this.answerColums = answerColums(this, this.tableData)
    },
    methods: {
        async getData () {
            const questionId = this.$route.params.id;
            const data = await Question.getQuestion({ questionId });
            this.tableData = data.answers;
            for(const item of this.tableData) {
                item.title = data.question.title;
            }
        },
        showModal(val, index) {
            this.$Modal.confirm({
                title: "编辑数据",
                onOk: () => {
                    Question.changeAnswer({
                        answerId: val.id,
                        content: val.content
                    }).then(result => {
                        this.$Message.info("修改成功");
                    })
                },
                render: (h) => {
                    return h('div', [
                        h('p', {
                            style: {
                                marginTop: '20px'
                            },
                        }, val.title),
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
        removeAnswer(index) {
            this.$Modal.confirm({
                title: "删除数据",
                content: "是否删除此条数据?",
                onOk: () => {
                    Question.deleteAnswer({
                        answerId: this.tableData[index].id
                    }).then(result => {
                        this.tableData.splice(index, 1);
                        this.$Message.info("删除成功");
                    })
                }
            })
        }
    }
};
</script>
