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
                    <center class="margin-top-10"><Page :total="total" @on-page-size-change="pageSizeChange" show-sizer @on-change="changePage"></Page></center>
                </Row>
            </Card>
        </Row>
    </div>
</template>

<script>
import canEditTable from './components/canEditTable.vue';
import { visitorColums } from '@/util/table-columns.js'
import search from '../main-components/search.vue'
import { User } from '@/api'
import addModal from '../main-components/add-modal.vue'
import { imageUrl } from '@/util/env.js' 
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
            currentPage: 1,
            pageSize: 10,
            searchData: {},
        };
    },
    methods: {
        async getData (search) {
            const data = await User.getUsers({pageNo: this.currentPage, pageSize: this.pageSize, types: 1, search});
            this.visitorData = data.datas;
            console.log(this.visitorData);
            for (const item of this.visitorData) {
                if (item.avatar) item.avatar = imageUrl + "/" + item.avatar.substring(6);
                item.adress = item.adress.province + "-" + item.adress.city + "-" + item.adress.community;
            }
            this.total = data.total;
            this.visitorColumns = visitorColums(this, this.visitorData);
        },
        getSearchData(data) {
            this.currentPage = 1;
            this.searchData = data;
            this.getData(data);
        },
        handleActive(index) {
            
        },
        handleDel (val, index) {
            const data = this.visitorData[index];
            User.deleteUser({
                userId: data.id,
                type: data.types
            }).then(result => {
                this.$Message.success('删除成功');
            })
        },
        handleChange (val, index) {
            const data = this.visitorData[index];
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
            this.$router.push({path: '/face/'+this.visitorData[index].id})
        },
        getForm(data) {
            this.visitorData.push(data);
        },
        getVisitorLog(index) {
            this.$router.push({path: '/visitor/self/'+this.visitorData[index].id})
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
