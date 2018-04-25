<style lang="less">
    @import '../../styles/common.less';
    @import '../../styles/table.less';
</style>

<template>
    <div>
        <Row>
            <Card>
                <addModal @postForm="getForm"></addModal>
                <search @searchCondition="getSearchData"></search>
                <Row>
                    <Col span="100">
                        <Card>
                            <p slot="title">
                                <Icon type="ios-keypad"></Icon>
                                访客数据
                            </p>
                            <div>
                                <can-edit-table refs="visitor" @on-delete="handleDel" @on-change="handleChange" v-model="visitorData" :columns-list="visitorColumns"></can-edit-table>
                            </div>  
                        </Card>
                    </Col>
                </Row>
            </Card>
        </Row>
    </div>
</template>

<script>
import canEditTable from './components/canEditTable.vue';
import tableData from './components/table_data.js';
import { visitorColums } from '@/util/table-columns.js'
import search from '../main-components/search.vue'
import { User } from '@/api'
import addModal from '../main-components/add-modal.vue'
export default {
    name: 'property',
    components: {
        canEditTable,
        search,
        addModal
    },
    data () {
        return {
            visitorColumns: [],
            visitorData: [],
            total: 0,
        };
    },
    methods: {
        async getData () {
            const data = await User.getUsers({pageNo: 1, pageSize: 10, types: 1});
            this.visitorData = data.datas;
            for (const item of this.visitorData) {
                item.adress = item.adress.province + "-" + item.adress.city + "-" + item.adress.community;
            }
            this.total = data.total;
            this.visitorColumns = visitorColums(this, this.visitorData);
        },
        getSearchData(data) {
            alert(1);
        },
        handleActive(index) {
            
        },
        handleDel (val, index) {
            this.$Message.success('删除了第' + (index + 1) + '行数据');
        },
        handleChange (val, index) {
            this.$Message.success('修改了第' + (index + 1) + '行数据');
        },
        getFaceModel(index) {
            this.$router.push({path: '/face/'+this.visitorData[index].id})
        },
        getForm(data) {
            this.visitorData.push(data);
        },
        getVisitorLog(index) {
            this.$router.push({path: '/visitor/self/'+this.visitorData[index].id})
        }
    },
    created () {
        this.getData();
    }
};
</script>
