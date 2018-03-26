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
                <search @searchCondition="getSearchData"></search>
                <Row>
                    <Col span="100">
                        <Card>
                            <p slot="title">
                                <Icon type="ios-keypad"></Icon>
                                当前摄像头数据
                                <Icon type="refresh" class="reload-camera" title="刷新" @click="reloadCamera"></Icon>
                            </p>
                            <div>
                                <Table border :columns="cameraColums" :data="cameraData" refs="camera"></Table>
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
export default {
    name: 'camera-manage',
    components: {
        search
    },
    data () {
        return {
            cameraData: [
                {
                    cameraNum: '0001',
                    isOpen: 1,
                    isOperated: 1
                },
                {
                    cameraNum: '0002',
                    isOpen: 0,
                    isOperated: 0
                },
                {
                    cameraNum: '0003',
                    isOpen: 1,
                    isOperated: 0
                }
            ],
            cameraColums: [],
            searchConName: '',
            isSuperManage: false,
            areaSelect: '',
            dateFilter: '',
            adress: [],
            cameraLoading: false,
            loadingText: '',
        };
    },
    created() {
        this.cameraColums = cameraColums(this);
        if(this.$store.state.user.auth === 2) {
            // 此处判断用户权限
            this.isSuperManage = true;
            // 获取地区数据
            this.adress = [
                {
                    value: '1',
                    label: '幸福花园小区1'
                },
                {
                    value: '2',
                    label: '幸福花园小区2'
                },
                {
                    value: '3',
                    label: '幸福花园小区3'
                }
            ]
        }
    },
    methods: {
        handleCamera (cameraNum) {
            const camera = this.getCamera(cameraNum)
            this.cameraLoading = true;
            setTimeout(() => {
                this.cameraLoading = false;
            }, 2000)
            if (camera.isOpen === 1) {
                camera.isOpen = 0;
                camera.isOperated = 0;
                this.loadingText = "关闭中, 请稍后...";
            } else {
                camera.isOpen = 1;
                this.loadingText = "开启中, 请稍后...";
            }
        },
        getCamera (cameraNum) {
            for(let i=0; i<this.cameraData.length; i++) {
                if(this.cameraData[i].cameraNum === cameraNum) return this.cameraData[i]
            }
            return null
        },
        reloadCamera () {
            
        },
        getSearchData() {
            alert(1);
        }
    }
};
</script>
