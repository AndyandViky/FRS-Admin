<style lang="less">
    @import './community-notice.less';
</style>

<template>
    <div class="message-main-con">
        <div class="message-mainlist-con">
            <div>
                <Button @click="setCurrentMesType('unread')" size="large" long type="text"><transition name="mes-current-type-btn"><Icon v-show="currentMessageType === 'unread'" type="checkmark"></Icon></transition><span class="mes-type-btn-text">未读</span><Badge class="message-count-badge-outer" class-name="message-count-badge" :count="unreadCount"></Badge></Button>
            </div>
            <div>
                <Button @click="setCurrentMesType('hassend')" size="large" long type="text"><transition name="mes-current-type-btn"><Icon v-show="currentMessageType === 'hassend'" type="checkmark"></Icon></transition><span class="mes-type-btn-text">已发送</span><Badge class="message-count-badge-outer" class-name="message-count-badge" :count="hassendCount"></Badge></Button>
            </div>
            <div>
                <Button @click="setCurrentMesType('recyclebin')" size="large" long type="text"><transition name="mes-current-type-btn"><Icon v-show="currentMessageType === 'recyclebin'" type="checkmark"></Icon></transition><span class="mes-type-btn-text">回收站</span><Badge class="message-count-badge-outer" class-name="message-count-badge" :count="recyclebinCount"></Badge></Button>
            </div>
            <div>
                <Button @click="setCurrentMesType('create')" size="large" long type="text"><transition name="mes-current-type-btn"><Icon v-show="currentMessageType === 'create'" type="checkmark"></Icon></transition><span class="mes-type-btn-text">创建通知</span><Badge class="message-count-badge-outer" class-name="message-count-badge"></Badge></Button>
            </div>
        </div>
        <div class="message-content-con">
            <transition name="view-message">
                <div v-if="showMesTitleList && !showCreate" class="message-title-list-con">
                    <Table ref="messageList" :columns="mesTitleColumns" :data="currentMesList" :no-data-text="noDataText"></Table>
                </div>
            </transition>
            <transition name="back-message-list">
                <div v-if="!showMesTitleList" class="message-view-content-con">
                    <div class="message-content-top-bar">
                        <span class="mes-back-btn-con"><Button type="text" @click="backMesTitleList"><Icon type="chevron-left"></Icon>&nbsp;&nbsp;返回</Button></span>
                        <h3 class="mes-title">{{ mes.title }}</h3>
                    </div>
                    <p class="mes-time-con"><Icon type="android-time"></Icon>&nbsp;&nbsp;{{ mes.time }}</p>
                    <div class="message-content-body">
                        <p class="message-content">{{ mes.content }}</p>
                    </div>
                </div>
            </transition>
            <transition name="view-message">
                <div v-if="showCreate">
                    <Form :model="formItem" :label-width="60" style="margin: 30px 40px 0 10px;">
                        <FormItem label="户主">
                            <Select v-model="formItem.houseId">
                                <Option value="1">15-311</Option>
                                <Option value="2">15-312</Option>
                                <Option value="3">15-313</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="标题">
                            <Input v-model="formItem.title" placeholder="请输入通知内容"></Input>
                        </FormItem>
                        <FormItem label="内容">
                            <Input v-model="formItem.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入通知内容"></Input>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="sendNotice">发送</Button>
                        </FormItem>
                    </Form>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import { Notice } from '@/api'
export default {
    name: 'message_index',
    data () {
        const markAssendBtn = (h, params) => {
            return h('Button', {
                props: {
                    size: 'small'
                },
                on: {
                    click: () => {
                        this.hassendMesList.unshift(this.currentMesList.splice(params.index, 1)[0]);
                    }
                }
            }, '发送');
        };
        const deleteMesBtn = (h, params) => {
            return h('Button', {
                props: {
                    size: 'small',
                    type: 'error'
                },
                on: {
                    click: () => {
                        this.recyclebinList.unshift(this.hassendMesList.splice(params.index, 1)[0]);
                    }
                }
            }, '删除');
        };
        const restoreBtn = (h, params) => {
            return h('Button', {
                props: {
                    size: 'small'
                },
                on: {
                    click: () => {
                        this.hassendMesList.unshift(this.recyclebinList.splice(params.index, 1)[0]);
                    }
                }
            }, '还原');
        };
        return {
            formItem: {
                title: '',
                content: '',
            },
            currentMesList: [],
            hassendMesList: [],
            recyclebinList: [],
            unreadMesList: [],
            currentMessageType: 'hassend',
            showMesTitleList: true,
            showCreate: false,
            hassendCount: 0,
            recyclebinCount: 0,
            unreadCount: 0,
            noDataText: '暂无通知',
            mes: {
                title: '',
                time: '',
                content: ''
            },
            mesTitleColumns: [
                // {
                //     type: 'selection',
                //     width: 50,
                //     align: 'center'
                // },
                {
                    title: ' ',
                    key: 'title',
                    align: 'left',
                    ellipsis: true,
                    render: (h, params) => {
                        return h('a', {
                            on: {
                                click: async () => {
                                    this.showMesTitleList = false;
                                    await Notice.noticed({ noticeId: params.row.id });
                                    this.unreadMesList.splice(params.index, 1)[0];
                                    this.mes.title = params.row.title;
                                    this.mes.time = params.row.created_at;
                                    this.getContent(params.index);
                                }
                            }
                        }, params.row.title);
                    }
                },
                {
                    title: ' ',
                    key: 'time',
                    align: 'center',
                    width: 180,
                    render: (h, params) => {
                        return h('span', [
                            h('Icon', {
                                props: {
                                    type: 'android-time',
                                    size: 12
                                },
                                style: {
                                    margin: '0 5px'
                                }
                            }),
                            h('span', {
                                props: {
                                    type: 'android-time',
                                    size: 12
                                }
                            }, params.row.created_at)
                        ]);
                    }
                },
                {
                    title: ' ',
                    key: 'assend',
                    align: 'center',
                    width: 100,
                    render: (h, params) => {
                        if (this.currentMessageType === 'hassend') {
                            return h('div', [
                                deleteMesBtn(h, params)
                            ]);
                        } else if (this.currentMessageType === 'unread') {
                            return h('div', [
                                deleteMesBtn(h, params)
                            ]);
                        } else {
                            return h('div', [
                                restoreBtn(h, params)
                            ]);
                        }
                    }
                }
            ]
        };
    },
    methods: {
        backMesTitleList () {
            this.showMesTitleList = true;
        },
        setCurrentMesType (type) {
            if (this.currentMessageType !== type) {
                this.showMesTitleList = true;
                this.showCreate = false;
            }
            this.currentMessageType = type;
            if (type === 'hassend') {
                this.noDataText = '暂无已发送通知';
                this.currentMesList = this.hassendMesList;
            } else if (type === 'create') {
                this.showCreate = true;
            } else if (type === 'unread') {
                this.noDataText = '暂无已未读消息';
                this.currentMesList = this.unreadMesList;
            } else {
                this.noDataText = '回收站无通知';
                this.currentMesList = this.recyclebinList;
            }
        },
        getContent (index) {
            // you can write ajax request here to get message content
            this.mes.content = this.currentMesList[index].content;
        },
        sendNotice() {
            if (this.formItem.title === '' || this.formItem.content === '') {
                return this.$Message.warning("请输入通知信息");
            }
            this.formItem.time = Date.now();
            this.hassendMesList.push(this.formItem);
            this.currentMesList = this.hassendMesList;
            this.currentMessageType = 'hassend';
            this.showCreate = false;
            this.$Message.info("发送成功");
        },
    },
    async mounted () {
        const data = await Notice.getNotices({pageNo: 1, pageSize: 100});
        console.log(data.datas)
        for (const item of data.datas) {
            if (item.deletedAt) {
                this.recyclebinList.push(item);
            } else {
                if(item.status === 0) {
                    this.unreadMesList.push(item);
                }
                this.hassendMesList.push(item);
            }
        }
        this.currentMesList = this.hassendMesList;
        this.hassendCount = this.hassendMesList.length;
        this.recyclebinCount = this.recyclebinList.length;
    },
    watch: {
        hassendMesList (arr) {
            this.hassendCount = arr.length;
        },
        recyclebinList (arr) {
            this.recyclebinCount = arr.length;
        },
        unreadMesList (arr) {
            this.unreadCount = arr.length;
        }
    }
};
</script>

