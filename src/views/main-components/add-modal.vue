<style lang="less">

</style>

<template>
    <Row class="addModal">
        <Modal
            v-model="modal"
            title="增加物业人员"
            @on-ok="postForm"
            :scrollable="true">
            <Form :model="formItem" :label-width="80" :rules="inforValidate" ref="forms">
                <FormItem label="姓名" prop="name">
                    <Input v-model="formItem.name" placeholder="请输入姓名..."></Input>
                </FormItem>
                <FormItem label="年龄" prop="age">
                    <Input v-model="formItem.age" placeholder="请输入年龄..."></Input>
                </FormItem>
                <FormItem label="性别" prop="gender">
                    <Select v-model="formItem.gender">
                        <Option value="1">女</Option>
                        <Option value="0">男</Option>
                    </Select>
                </FormItem>
                <FormItem label="所属地" v-if="checkAuth === 2" prop="adress">
                    <Cascader :data="adress" v-model="formItem.adress"></Cascader>
                </FormItem>
                <FormItem label="邮箱" prop="email">
                    <Input v-model="formItem.email" placeholder="请输入邮箱..."></Input>
                </FormItem>
                <FormItem label="手机号" prop="phone">
                    <Input v-model="formItem.phone" placeholder="请输入手机号..."></Input>
                </FormItem>
            </Form>
        </Modal>
        <Button type="primary" class="addButton" @click.native="addItem">增加</Button>
    </Row>
</template>

<script>
export default {
    name: 'addModal',
    data () {
        const validePhone = (rule, value, callback) => {
            var re = /^1[0-9]{10}$/;
            if (!re.test(value)) {
                callback(new Error('请输入正确格式的手机号'));
            } else {
                callback();
            }
        };
        return {
            modal: false,
            adress: [
                {
                    value: '北京',
                    label: '北京',
                    children: [
                        {
                            value: '幸福小区1',
                            label: '幸福小区1'
                        },
                        {
                            value: '幸福小区2',
                            label: '幸福小区2'
                        },
                        {
                            value: '幸福小区3',
                            label: '幸福小区3'
                        }
                    ]
                }, {
                    value: '江苏',
                    label: '江苏',
                    children: [
                        {
                            value: '南京',
                            label: '南京',
                            children: [
                                {
                                    value: '幸福小区4',
                                    label: '幸福小区4',
                                }
                            ]
                        },
                        {
                            value: '苏州',
                            label: '苏州',
                            children: [
                                {
                                    value: '幸福小区5',
                                    label: '幸福小区5',
                                },
                                {
                                    value: '幸福小区6',
                                    label: '幸福小区6',
                                }
                            ]
                        }
                    ],
                }
            ],
            formItem: {
                id: 6,
                name: '',
                gender: '',
                age: '',
                adress: [],
                email: '',
                phone: '',
                is_active: 0,
            },
            inforValidate: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入手机号码' },
                    { validator: validePhone }
                ],
                gender: [
                    { required: true, message: '请输入性别', trigger: 'focus' }
                ],
                age: [
                    { required: true, message: '请输入年龄', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' }
                ]
            },
        };
    },
    methods: {
        postForm() {
            this.$refs['forms'].validate((valid) => {
                if (valid) {
                    this.$emit("postForm", this.formItem)
                    this.$Message.info("添加成功")
                } else this.$Message.warning("添加失败, 输入错误")
            });
        },
        addItem() {
            this.modal = true;
        }
    },
    computed: {
        checkAuth() {
            return this.$store.state.user.auth;
        }
    }
};
</script>
