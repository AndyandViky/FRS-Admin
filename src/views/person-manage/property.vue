<style lang="less">
    @import '../../styles/common.less';
    @import '../../styles/table.less';  
</style>

<template>
    <div>
        <Row>
            <Card class="card">
                <Modal
                    v-model="modal"
                    title="增加物业人员"
                    @on-ok="postForm">
                    <Form :model="formItem" :label-width="80">
                        <FormItem label="姓名">
                            <Input v-model="formItem.name" placeholder="Enter something..."></Input>
                        </FormItem>
                        <FormItem label="年龄">
                            <Input v-model="formItem.age" placeholder="Enter something..."></Input>
                        </FormItem>
                        <FormItem label="性别">
                            <Select v-model="formItem.gender">
                                <Option value="1">女</Option>
                                <Option value="0">男</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="地区">
                            <areaLink></areaLink>
                        </FormItem>
                        <FormItem label="所属地" v-if="checkAuth === 2">
                            <Select v-model="formItem.comminity">
                                <Option value="幸福花园小区">幸福花园小区</Option>
                                <Option value="幸福花园小区">幸福花园小区</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="邮箱">
                            <Input v-model="formItem.email" placeholder="Enter something..."></Input>
                        </FormItem>
                        <FormItem label="手机号">
                            <Input v-model="formItem.phone" placeholder="Enter something..."></Input>
                        </FormItem>
                    </Form>
                </Modal>
                <Button type="primary" class="addButton" @click.native="addItem">增加</Button>
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
import areaLink from '../main-components/area-link.vue'
export default {
    name: 'property',
    components: {
        canEditTable,
        search,
        areaLink,
    },
    data () {
        return {
            propertyColumns: [],
            propertyData: [],
            modal: false,
            formItem: {

            }
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
            
        },
        handleDel (val, index) {
            this.$Message.success('删除了第' + (index + 1) + '行数据');
        },
        handleChange (val, index) {
            this.$Message.success('修改了第' + (index + 1) + '行数据');
        },
        getFaceModel(index) {
            this.$router.push({path: '/face/'+this.propertyData[index].id})
        },
        addItem() {
            this.modal = true;
        },
        postForm() {

        }
    },
    created () {
        this.getData();
    },
    computed: {
        checkAuth() {
            return this.$store.state.user.auth;
        }
    }
};
</script>
