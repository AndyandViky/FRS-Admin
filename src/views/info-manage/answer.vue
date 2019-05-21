<style lang="less">
    @import '../../styles/common.less';
    @import '../../styles/table.less';
</style>

<template>
    <div>
        <Row>
            <Card>
                <Modal
                    v-model="modal"
                    title="增加回答"
                    @on-ok="postForm"
                    :scrollable="true">
                    <Form :model="formItem" :label-width="80" :rules="inforValidate" ref="forms">
                        <FormItem label="内容" prop="content">
                            <Input v-model="formItem.content" placeholder="请输入内容..."></Input>
                        </FormItem>
                    </Form>
                </Modal>
                <Button type="primary" class="addButton" @click="addItem">增加</Button>
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
            modal: false,
            formItem: {
                content: '',
                question_id: this.$route.params.id,
            },
            inforValidate: {
                content: [
                    { required: true, message: '请输入内容', trigger: 'blur' }
                ],
            },
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
            console.log(this.tableData);
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
        postForm() {
            this.$refs['forms'].validate((valid) => {
                if (valid) {
                    Question.addAnswer(this.formItem).then(result => {
                        this.$Message.info("添加成功");
                        this.getData();
                    })
                } else this.$Message.warning("添加失败, 输入错误");
            });
        },
        addItem() {
            this.modal = true;
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
