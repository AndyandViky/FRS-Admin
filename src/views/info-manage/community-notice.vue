<style lang="less">
    @import './community-notice.less';
</style>

<template>
    <div class="message-main-con">
        <div class="message-mainlist-con">
            <div>
                <Button @click="setCurrentMesType('unsend')" size="large" long type="text"><transition name="mes-current-type-btn"><Icon v-show="currentMessageType === 'unsend'" type="checkmark"></Icon></transition><span class="mes-type-btn-text">草稿箱</span><Badge class="message-count-badge-outer" class-name="message-count-badge" :count="unsendCount"></Badge></Button>
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
                            <Button type="ghost" @click="saveNotice" style="margin-left: 8px">保存为草稿</Button>
                        </FormItem>
                    </Form>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
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
                        this.$store.commit('setMessageCount', this.unsendMesList.length);
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
            unsendMesList: [],
            hassendMesList: [],
            recyclebinList: [],
            currentMessageType: 'unsend',
            showMesTitleList: true,
            showCreate: false,
            unsendCount: 0,
            hassendCount: 0,
            recyclebinCount: 0,
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
                                click: () => {
                                    this.showMesTitleList = false;
                                    this.mes.title = params.row.title;
                                    this.mes.time = this.formatDate(params.row.time);
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
                            }, this.formatDate(params.row.time))
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
                        } else if (this.currentMessageType === 'unsend') {
                            return h('div', [
                                markAssendBtn(h, params)
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
        formatDate (time) {
            let date = new Date(time);
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hour = date.getHours();
            let minute = date.getMinutes();
            let second = date.getSeconds();
            return year + '/' + month + '/' + day + '  ' + hour + ':' + minute + ':' + second;
        },
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
            } else if (type === 'unsend') {
                this.noDataText = '暂无未发送通知';
                this.currentMesList = this.unsendMesList;
            } else if (type === 'create') {
                this.showCreate = true;
            } else {
                this.noDataText = '回收站无通知';
                this.currentMesList = this.recyclebinList;
            }
        },
        getContent (index) {
            // you can write ajax request here to get message content
            let mesContent = '';
            switch (this.currentMessageType + index) {
                case 'send0': mesContent = '门禁系统识别手机通过率增加警告: 尊敬的管理员, 检测到当前系统的识别率过低, 为48%, 请尽快查看系统运行状态'; break;
                case 'send1': mesContent = '这是您点击的《使用iView-admin和iView-ui组件库快速搭建你的后台系统吧》的相关内容。'; break;
                case 'send2': mesContent = '这是您点击的《喜欢iView-admin的话，欢迎到github主页给个star吧》的相关内容。'; break;
                case 'unsend0': mesContent = '门禁系统识别手机通过率增加警告: 尊敬的管理员, 检测到当前系统的识别率过低, 为48%, 请尽快查看系统运行状态'; break;
                default: mesContent = '注册通知: 欢迎注册智能门禁系统......'; break;
            }
            this.mes.content = mesContent;
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
        saveNotice() {
            this.currentMessageType = 'unsend';
            this.currentMesList = this.unsendMesList;
            this.showCreate = false;
            this.$Message.info("保存成功");
        }
    },
    mounted () {
        this.currentMesList = this.unsendMesList = [
            {
                title: '门禁系统识别手机通过率增加警告',
                time: 1523464232768
            },
            {
                title: '用户{杨林}提交了故障申报',
                time: 1523434132768
            },
            {
                title: '用户{王婉瑾}提交了故障申报',
                time: 1523263232768
            }
        ];
        this.hassendMesList = [
            {
                title: '注册通知: 欢迎注册智能门禁系统......',
                time: 1523434132768
            }
        ];
        this.recyclebinList = [
            {
                title: '用户{夏证}提交了故障申报',
                time: 1523263232768
            }
        ];
        this.unsendCount = this.unsendMesList.length;
        this.hassendCount = this.hassendMesList.length;
        this.recyclebinCount = this.recyclebinList.length;
    },
    watch: {
        unsendMesList (arr) {
            this.unsendCount = arr.length;
        },
        hassendMesList (arr) {
            this.hassendCount = arr.length;
        },
        recyclebinList (arr) {
            this.recyclebinCount = arr.length;
        }
    }
};
</script>

