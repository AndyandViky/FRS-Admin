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
        </div>
        <div class="message-content-con">
            <transition name="view-message">
                <div v-if="showMesTitleList" class="message-title-list-con">
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
            currentMesList: [],
            unsendMesList: [],
            hassendMesList: [],
            recyclebinList: [],
            currentMessageType: 'unsend',
            showMesTitleList: true,
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
            }
            this.currentMessageType = type;
            if (type === 'hassend') {
                this.noDataText = '暂无已发送通知';
                this.currentMesList = this.hassendMesList;
            } else if (type === 'unsend') {
                this.noDataText = '暂无未发送通知';
                this.currentMesList = this.unsendMesList;
            } else {
                this.noDataText = '回收站无通知';
                this.currentMesList = this.recyclebinList;
            }
        },
        getContent (index) {
            // you can write ajax request here to get message content
            let mesContent = '';
            switch (this.currentMessageType + index) {
                case 'send0': mesContent = '这是您点击的《欢迎登录iView-admin后台管理系统，来了解他的用途吧》的相关内容。'; break;
                case 'send1': mesContent = '这是您点击的《使用iView-admin和iView-ui组件库快速搭建你的后台系统吧》的相关内容。'; break;
                case 'send2': mesContent = '这是您点击的《喜欢iView-admin的话，欢迎到github主页给个star吧》的相关内容。'; break;
                case 'unsend0': mesContent = '这是您点击的《这是一条您已经读过的通知》的相关内容。'; break;
                default: mesContent = '这是您点击的《这是一条被删除的通知》的相关内容。'; break;
            }
            this.mes.content = mesContent;
        }
    },
    mounted () {
        this.currentMesList = this.unsendMesList = [
            {
                title: '欢迎登录iView-admin后台管理系统，来了解他的用途吧',
                time: 1507390106000
            },
            {
                title: '使用iView-admin和iView-ui组件库快速搭建你的后台系统吧',
                time: 1507390106000
            },
            {
                title: '喜欢iView-admin的话，欢迎到github主页给个star吧',
                time: 1507390106000
            }
        ];
        this.hassendMesList = [
            {
                title: '这是一条您已经发送的通知',
                time: 1507330106000
            }
        ];
        this.recyclebinList = [
            {
                title: '这是一条被删除的通知',
                time: 1506390106000
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

