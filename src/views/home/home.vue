<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <Row :gutter="10">
            <Col :md="24" :lg="8">
                <Row class-name="home-page-row1" :gutter="10">
                    <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
                        <Card>
                            <Row type="flex" class="user-infor">
                                <Col span="8">
                                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                                        <img class="avator-img" :src="avatorPath" />
                                    </Row>
                                </Col>
                                <Col span="16" style="padding-left:6px;">
                                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                                        <div>
                                            <b class="card-user-infor-name">Andy</b>
                                            <p>super admin</p>
                                        </div>
                                    </Row>
                                </Col>
                            </Row>
                            <div class="line-gray"></div>
                            <Row class="margin-top-8">
                                <Col span="8"><p class="notwrap">上次登录时间:</p></Col>
                                <Col span="16" class="padding-left-8">2019.05.22-13:32:20</Col>
                            </Row>
                            <Row class="margin-top-8">
                                <Col span="8"><p class="notwrap">上次登录地点:</p></Col>
                                <Col span="16" class="padding-left-8">绍兴</Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
                        <Card>
                            <p slot="title" class="card-title">
                                <Icon type="android-checkbox-outline"></Icon>
                                待办事项
                            </p>
                            <a type="text" slot="extra" @click.prevent="addNewToDoItem">
                                <Icon type="plus-round"></Icon>
                            </a>
                            <Modal
                                v-model="showAddNewTodo"
                                title="添加新的待办事项"
                                @on-ok="addNew"
                                @on-cancel="cancelAdd">
                                <Row type="flex" justify="center">
                                    <Input v-model="newToDoItemValue" icon="compose" placeholder="请输入..." style="width: 300px" />
                                </Row>
                                <Row slot="footer">
                                    <Button type="text" @click="cancelAdd">取消</Button>
                                    <Button type="primary" @click="addNew">确定</Button>
                                </Row>
                            </Modal>
                            <div class="to-do-list-con">
                                <div v-for="(item, index) in toDoList" :key="'todo-item' + (toDoList.length - index)" class="to-do-item">
                                    <to-do-list-item :content="item.title"></to-do-list-item>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col :md="24" :lg="16">
                <Row :gutter="5" v-if="count.peopleCount >= 0">
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="user_created_count"
                            :end-val="count.peopleCount"
                            iconType="android-person-add"
                            color="#2d8cf0"
                            intro-text="今日新增用户"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="visit_count"
                            :end-val="count.browser"
                            iconType="ios-eye"
                            color="#64d572"
                            :iconSize="50"
                            intro-text="今日浏览量"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="collection_count"
                            :end-val="count.dataCatch"
                            iconType="upload"
                            color="#ffd572"
                            intro-text="今日数据采集量"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="transfer_count"
                            :end-val="count.server"
                            iconType="shuffle"
                            color="#f25e43"
                            intro-text="今日服务调用量"
                        ></infor-card>
                    </Col>
                </Row>
                <Row>
                    <Card :padding="0">
                        <p slot="title" class="card-title">
                            <Icon type="map"></Icon>
                            今日服务调用地理分布
                        </p>
                        <div class="map-con">
                            <Col span="10">
                                <map-data-table :cityData="cityData" height="281" :style-obj="{margin: '12px 0 0 11px'}"></map-data-table>
                            </Col>
                            <Col span="14" class="map-incon">
                                <Row type="flex" justify="center" align="middle">
                                    <home-map :city-data="cityData"></home-map>
                                </Row>
                            </Col>
                        </div>
                    </Card>
                </Row>
            </Col>
        </Row>
        <Row :gutter="10" class="margin-top-10" v-if="count.appRecordToday >= 0">
            <Col :md="24" :lg="8" :style="{marginBottom: '10px'}">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="ios-pulse-strong"></Icon>
                        今日开门统计
                    </p>
                    <div class="data-source-row">
                        <data-source-pie :id="'tody_open'" :data="[count.appRecordToday, count.cameraRecordToday]"></data-source-pie>
                    </div>
                </Card>
            </Col>
            <Col :md="24" :lg="8" :style="{marginBottom: '10px'}">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="ios-pulse-strong"></Icon>
                        本周开门统计
                    </p>
                    <div class="data-source-row">
                        <data-source-pie :id="'week_open'" :data="[count.appRecordWeek, count.cameraRecordWeek]"></data-source-pie>
                    </div>
                </Card>
            </Col>
            <Col :md="24" :lg="8" :style="{marginBottom: '10px'}">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="ios-pulse-strong"></Icon>
                        本月开门统计
                    </p>
                    <div class="data-source-row">
                        <data-source-pie :id="'month_open'" :data="[count.appRecordMonth, count.cameraRecordMonth]"></data-source-pie>
                    </div>
                </Card>
            </Col>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="ios-shuffle-strong"></Icon>
                    本周每日开门方式曲线图
                </p>
                <div class="line-chart-con" style="height: 300px" v-if="count.appLastWeeks">
                    <open-door-data :dataApp="count.appLastWeeks" :dataCamera="count.cameraLastWeeks"></open-door-data>
                </div>
            </Card>
        </Row>
    </div>
</template>

<script>
import cityData from './map-data/get-city-value.js';
import homeMap from './components/map.vue';
import dataSourcePie from './components/dataSourcePie.vue';
import inforCard from './components/inforCard.vue';
import mapDataTable from './components/mapDataTable.vue';
import toDoListItem from './components/toDoListItem.vue';
import openDoorData from './components/openDoorData.vue';
import { User } from '@/api';
export default {
    name: 'home',
    components: {
        homeMap,
        dataSourcePie,
        inforCard,
        mapDataTable,
        toDoListItem,
        openDoorData
    },
    data () {
        return {
            toDoList: [
                {
                    title: '将摄像头记录导出未表格文件'
                },
                {
                    title: '处理当天的故障申请'
                },
                {
                    title: '系统安全测试'
                }
            ],
            count: {},
            cityData: cityData,
            showAddNewTodo: false,
            newToDoItemValue: ''
        };
    },
    async created() {
        this.count = await User.getIndexData();
        this.cityData[0].value = this.count.server;
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
    methods: {
        addNewToDoItem () {
            this.showAddNewTodo = true;
        },
        addNew () {
            if (this.newToDoItemValue.length !== 0) {
                this.toDoList.unshift({
                    title: this.newToDoItemValue
                });
                setTimeout(() => {
                    this.newToDoItemValue = '';
                }, 200);
                this.showAddNewTodo = false;
            } else {
                this.$Message.error('请输入待办事项内容');
            }
        },
        cancelAdd () {
            this.showAddNewTodo = false;
            this.newToDoItemValue = '';
        }
    }
};
</script>
