<style lang="less">
    @import '../../styles/common.less';
    @import '../../styles/table.less';
    @import '../../styles/loading.less';
    .reload-camera{
        float: right;
        cursor: pointer;
        padding-right: 20px;
    }
</style>

<template>
    <div>
        <Spin fix v-show="cameraLoading">
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>{{loadingText}}</div>
        </Spin>
        <Row>
            <Card>
                <Modal
                    v-model="modal"
                    title="增加摄像头数据"
                    @on-ok="postForm"
                    :scrollable="true">
                    <Form :model="formItem" :label-width="80" :rules="inforValidate" ref="forms">
                        <FormItem label="编号" prop="cameraNum">
                            <Input v-model="formItem.cameraNum" placeholder="请输入摄像头编号..."></Input>
                        </FormItem>
                    </Form>
                </Modal>
                <Button type="primary" class="addButton" @click="addItem">增加</Button>
                <search @searchCondition="getSearchData"></search>
                <Row>
                    <Col span="100">
                        <Card>
                            <p slot="title">
                                <Icon type="ios-keypad"></Icon>
                                当前摄像头数据
                                <Icon type="refresh" class="reload-camera" title="刷新" @click.native="reloadCamera"></Icon>
                            </p>
                            <div>
                                <Table border :columns="cameraColums" :data="cameraData" refs="cameraTable"></Table>
                            </div>  
                        </Card>
                    </Col>
                </Row>
            </Card>
        </Row>
    </div>
</template>

<script>
import { cameraColums } from '@/util/table-columns.js'
import search from '../main-components/search.vue'
import {User} from '@/api'
export default {
    name: 'camera-manage',
    components: {
        search
    },
    data () {
        return {
            modal: false,
            formItem: {
                cameraNum: '',
                isOpen: 0,
                isOperated: 0,
            },
            inforValidate: {
                cameraNum: [
                    { required: true, message: '请输入摄像头编号', trigger: 'blur' }
                ],
            },
            cameraData: [
            ],
            cameraColums: [],
            cameraLoading: false,
            loadingText: '',
        };
    },
    async created() {
        this.cameraColums = cameraColums(this);
        this.cameraData = await User.getAllCamera();
        console.log(this.cameraData)
    },
    methods: {
        async handleCamera (cameraNum) {
            const camera = this.getCamera(cameraNum)
            this.cameraLoading = true;
            setTimeout(() => {
                this.cameraLoading = false;
            }, 2000)
            if (camera.status === 1) {
                this.loadingText = "关闭中, 请稍后...";
                User.closeCamera({cameraNum :camera.camera_num}).then((result) => {
                    camera.status = 0;
                    camera.is_operated = 0;
                })
                .catch((e)=> {
                    this.$Message.warning("关闭失败");
                });

            } else {
                this.loadingText = "开启, 请稍后...";
                User.openCamera({cameraNum :camera.camera_num}).then((result) => {
                    camera.status = 1;
                    camera.is_operated = 1;
                })
                .catch((e)=> {
                    this.$Message.warning("开启失败");
                });
            }
        },
        getCamera (cameraNum) {
            for(let i=0; i<this.cameraData.length; i++) {
                if(this.cameraData[i].camera_num === cameraNum) return this.cameraData[i]
            }
            return null
        },
        reloadCamera () {
            this.cameraLoading = true;
            this.loadingText = "刷新中, 请稍后...";
            setTimeout(() => {
                this.cameraLoading = false;
            }, 2000)
        },
        getSearchData() {
            alert(1);
        },
        addItem() {
            this.modal = true;
        },
        postForm() {
            this.$refs['forms'].validate((valid) => {
                if (valid) {
                    this.cameraData.push(this.formItem);
                    this.$Message.info("添加成功");
                } else this.$Message.warning("添加失败, 输入错误");
            });
        }
    }
};
</script>
