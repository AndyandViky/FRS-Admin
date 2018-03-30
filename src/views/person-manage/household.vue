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
                                住户人员数据
                            </p>
                            <div>
                                <can-edit-table refs="household" @on-delete="handleDel" @on-change="handleChange" v-model="householdData" :columns-list="householdColumns"></can-edit-table>
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
import { householdColums } from '@/util/table-columns.js'
import search from '../main-components/search.vue'
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
            householdColumns: [],
            householdData: [],
        };
    },
    methods: {
        getData () {
            this.householdData = tableData.householdData;
            this.householdColumns = householdColums(this, this.householdData);
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
            this.$router.push({path: '/face/'+this.householdData[index].id})
        },
        getForm(data) {
            this.propertyData.push(data);
        }
    },
    created () {
        this.getData();
    }
};
</script>
