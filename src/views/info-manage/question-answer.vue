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
                    title="增加问题"
                    @on-ok="postForm"
                    :scrollable="true">
                    <Form :model="formItem" :label-width="80" :rules="inforValidate" ref="forms">
                        <FormItem label="标题" prop="title">
                            <Input v-model="formItem.title" placeholder="请输入标题..."></Input>
                        </FormItem>
                    </Form>
                </Modal>
                <Button type="primary" class="addButton" @click="addItem">增加</Button>
                <search @searchCondition="getSearchData"></search>
                <Row>
                    <Col span="100">
                        <Table :data="tableData" :columns="questionColums" stripe ref="table"></Table>
                    </Col>
                </Row>
                <center class="margin-top-10"><Page :total="total" @on-page-size-change="pageSizeChange" show-sizer @on-change="changePage"></Page></center>
            </Card>
        </Row>
    </div>
</template>

<script>
import { questionColums } from '@/util/table-columns.js'
import search from '../main-components/search.vue'
import { Question } from '@/api'
export default {
    name: 'table-to-image',
    components: {
        search
    },
    data () {
        return {
            modal: false,
            formItem: {
                title: '',
            },
            inforValidate: {
                title: [
                    { required: true, message: '请输入标题', trigger: 'blur' }
                ],
            },
            tableData: [],
            questionColums: [],
            total: 0,
            currentPage: 1,
            pageSize: 10,
            searchData: {},
        };
    },
    async created() {
        this.getData();
    },
    methods: {
        async getData(search) {
            const data = await Question.getQuestions({pageNo: this.currentPage, pageSize: this.pageSize, search});
            this.tableData = data.datas;
            this.total = data.total;
            this.questionColums = questionColums(this, this.tableData)
        },
        getAnswer(index) {
            this.$router.push({path: '/question/'+this.tableData[index].id})
        },
        getSearchData(data) {
            this.currentPage = 1;
            this.searchData = data;
            this.getData(data);
        },
        showModal(val, index) {
            this.$Modal.confirm({
                title: "编辑数据",
                onOk: () => {
                    Question.changeQuestion({
                        questionId: val.id,
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
        postForm() {
            this.$refs['forms'].validate((valid) => {
                if (valid) {
                    Question.addQuestion(this.formItem).then(result => {
                        this.$Message.info("添加成功");
                        this.getData();
                    })
                } else this.$Message.warning("添加失败, 输入错误");
            });
        },
        addItem() {
            this.modal = true;
        },
        remove(tableData, index) {
            const questionId = tableData[index].id;
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
        },
        changePage(page) {
            this.currentPage = page;
            this.getData(this.searchData);
        },
        pageSizeChange(size) {
            this.pageSize = size;
        }
    }
};
</script>
