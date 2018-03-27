<style lang="less">
    @import '../../styles/common.less';
    @import '../../styles/table.less';
</style>

<template>
    <div>
        <Row class="margin-top-10">
            <Col span="100">
                <Card>
                    <search @searchCondition="getSearchData"></search>
                    <p slot="title">
                        <Icon type="android-remove"></Icon>
                        物业人员数据
                    </p>
                    <div class="edittable-table-height-con">
                        <can-edit-table refs="table2" v-model="editInlineData" :columns-list="editInlineColumns"></can-edit-table>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import canEditTable from './components/canEditTable.vue';
import tableData from './components/table_data.js';
import search from '../main-components/search.vue'
export default {
    name: 'editable-table',
    components: {
        canEditTable,
        search
    },
    data () {
        return {
            editInlineColumns: [],
            editInlineData: [],
        };
    },
    methods: {
        getData () {
            this.editInlineColumns = tableData.propertyData;
            this.editInlineData = tableData.editInlineData;
        },
        getSearchData() {
            alert(1);
        }
    },
    created () {
        this.getData();
    }
};
</script>
