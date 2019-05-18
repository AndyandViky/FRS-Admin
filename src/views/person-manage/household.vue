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
                    <center class="margin-top-10"><Page :total="total" @on-page-size-change="pageSizeChange" show-sizer @on-change="changePage"></Page></center>
                </Row>
            </Card>
        </Row>
    </div>
</template>

<script>
import canEditTable from './components/canEditTable.vue';
import { householdColums } from '@/util/table-columns.js'
import search from '../main-components/search.vue'
import addModal from '../main-components/add-modal.vue'
import { User } from '@/api'
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
            householdColumns: [],
            householdData: [],
            total: 0,
            currentPage: 1,
            pageSize: 10,
            searchData: {},
        };
    },
    methods: {
        async getData (search) {
            const result = await User.getUsers({pageNo: this.currentPage, pageSize: this.pageSize, types: 2, search});
            this.householdData = result.datas;
            this.total = result.total;
            console.log(this.householdData);
            for(const item of this.householdData) {
                item.adress = item.adress.province + "-" + item.adress.city + "-" + item.adress.community;
                item.is_verify = item.user.is_verify;
                if (item.avatar) item.avatar = imageUrl + "/" + item.avatar.substring(6);
                if (item.user.identity_pic) item.identity_pic = imageUrl + "/" + item.user.identity_pic.substring(6);
                if (item.user.card_front) item.card_front = imageUrl + "/" + item.user.card_front.substring(6);
                if (item.user.card_opposite) item.card_opposite = imageUrl + "/" + item.user.card_opposite.substring(6);
            }
            this.householdColumns = householdColums(this, this.householdData);
        },
        getSearchData(data) {
            this.currentPage = 1;
            this.searchData = data;
            this.getData(data);
        },
        handleActive(index) {
            const id = this.householdData[index].id;   
        },
        activeResident(index) {
            const id = this.householdData[index].id;
            this.$Modal.confirm({
                title: "业主认证",
                content: "是否通过业主认证?",
                onOk: () => {
                    User.approveRedident({userId: id}).then(result => {
                        this.$Message.info("认证成功");
                    })
                    .catch(e => {
                        this.$Message.info("认证成功");
                    })
                }
            })
        },
        handleDel (val, index) {
            const data = this.householdData[index];
            User.deleteUser({
                userId: data.id,
                type: data.types
            }).then(result => {
                this.$Message.success('删除成功');
            })
        },
        handleChange (val, index) {
            const data = this.householdData[index];
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
            this.$router.push({path: '/face/'+this.householdData[index].id})
        },
        getForm(data) {
            this.propertyData.push(data);
        },
        getVisitorLog(index) {
            this.$router.push({path: '/visitor/household/'+this.householdData[index].id})
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
