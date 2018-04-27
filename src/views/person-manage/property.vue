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
                                物业人员数据
                            </p>
                            <div>
                                <can-edit-table @on-delete="handleDel" @on-change="handleChange" refs="property" v-model="propertyData" :columns-list="propertyColumns"></can-edit-table>
                            </div>  
                        </Card>
                    </Col>
                    <center class="margin-top-10"><Page :total="total" @on-page-size-change="pageSizeChange" show-sizer @on-change="changePage"></Page></center>
                </Row>
            </Card>
        </Row>
    </div>
</template>

<script>
import canEditTable from './components/canEditTable.vue'
import { propertyColums } from '@/util/table-columns.js'
import search from '../main-components/search.vue'
import addModal from '../main-components/add-modal.vue'
import { User } from '@/api' 
export default {
    name: 'property',
    components: {
        canEditTable,
        search,
        addModal,
    },
    data () {
        return {
            propertyColumns: [],
            propertyData: [],
            total: 0,
            currentPage: 1,
            pageSize: 10,
            searchData: {},
        };
    },
    methods: {
        async getData (search) {
            const data = await User.getUsers({pageNo: this.currentPage, pageSize: this.pageSize, types: 3, search});
            this.propertyData = data.datas;
            for (const item of this.propertyData) {
                item.adress = item.adress.province + "-" + item.adress.city + "-" + item.adress.community;
            }
            this.total = data.total;
            this.propertyColumns = propertyColums(this, this.propertyData);
        },
        getSearchData(data) {
            this.currentPage = 1;
            this.searchData = data;
            this.getData(data);
        },
        handleActive(index) {
            
        },
        handleDel (val, index) {
            const data = this.propertyData[index];
            User.deleteUser({
                userId: data.id,
                type: data.types
            }).then(result => {
                this.$Message.success('删除成功');
            })
        },
        handleChange (val, index) {
            const data = this.propertyData[index];
            User.changeUserInfo({
                email: data.email,
                name: data.name,
                phone: data.phone,
                gender: data.gender,
                age: data.age,
                userId: data.id,
            }).then(result => {
                this.$Message.success('修改成功');
            })
        },
        getFaceModel(index) {
            this.$router.push({path: '/face/'+this.propertyData[index].id})
        },
        getForm(data) {
            this.propertyData.push(data);
        },
        getVisitorLog(index) {
            this.$router.push({path: '/visitor/property/'+this.propertyData[index].id})
        },
        changePage(page) {
            this.currentPage = page;
            this.getData(this.searchData);
        },
        pageSizeChange(size) {
            this.pageSize = size;
        }
          
    },
    created () {
        this.getData();
    }
};
</script>
