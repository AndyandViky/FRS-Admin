<style lang="less">
    @import '../../styles/common.less';
    @import '../../styles/table.less';
</style>

<template>
    <div>
        <Row>
            <Card>
                <search @searchCondition="getSearchData"></search>
                <Row>
                    <Col span="100">
                        <Card>
                            <p slot="title">
                                <Icon type="ios-keypad"></Icon>
                                物业人员数据
                            </p>
                            <div>
                                <can-edit-table @on-delete="handleDel" @on-change="handleChange" refs="property" v-model="propertyData" :columns-list="propertyColumns"></can-edit-table>
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
import { propertyColums } from '@/util/table-columns.js'
import search from '../main-components/search.vue'
export default {
    name: 'property',
    components: {
        canEditTable,
        search
    },
    data () {
        return {
            propertyColumns: [],
            propertyData: [],
        };
    },
    methods: {
        getData () {
            this.propertyData = tableData.propertyData;
            this.propertyColumns = propertyColums(this, this.propertyData);
        },
        getSearchData(data) {
            alert(1);
        },
        handleActive(index) {
            alert(1);
        },
        handleDel (val, index) {
            this.$Message.success('删除了第' + (index + 1) + '行数据');
        },
        handleChange (val, index) {
            this.$Message.success('修改了第' + (index + 1) + '行数据');
        }
    },
    created () {
        this.getData();
    }
};
</script>
