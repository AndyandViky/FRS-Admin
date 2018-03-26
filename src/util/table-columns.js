import { formatDate } from '@/libs/common.js';
const cameraRecordColums = function (tableData) {
    return [
        {
            title: '地区',
            key: 'name'
        },
        {
            title: '门禁类别',
            key: 'types',
            filters: [
                {
                    label: '识别进入',
                    value: 1
                },
                {
                    label: 'app进入',
                    value: 2
                }
            ],
            filterMultiple: false,
            filterMethod (value, row) {
                if (value === 1) {
                    return row.status < 2;
                } else if (value === 2) {
                    return row.status > 1;
                }
            },
            render: (h, params) => {
                const row = params.row;
                const color = row.status === 1 ? 'green' : 'red';
                const text = row.status === 1 ? '识别进入' : 'app进入';

                return h('Tag', {
                    props: {
                        type: 'dot',
                        color: color
                    },
                    style: {
                        padding: '0 4px'
                    }
                }, text);
            }
        },
        {
            title: '门禁图',
            key: 'image',
            render: (h, params) => {
                return h('Poptip', {
                    props: {
                        trigger: 'hover',
                        placement: 'bottom'
                    }
                }, [
                    h('img', {
                        domProps: {
                            src: tableData[params.index].image
                        },
                        style: {
                            width: '32px',
                            height: '24px'
                        }
                    }),
                    h('div', {
                        slot: 'content'
                    }, [
                        h('img', {
                            style: {
                                width: '320px',
                                height: '240px'
                            },
                            domProps: {
                                src: tableData[params.index].image
                            }
                        })
                    ])
                ]);
            }
        },
        {
            title: '进入人数',
            sortable: true,
            key: 'people',
            filters: [
                {
                    label: '一人进入',
                    value: 1
                },
                {
                    label: '大于3人',
                    value: 2
                }
            ],
            filterMultiple: false,
            filterMethod (value, row) {
                if (value === 1) {
                    return row.people < 2;
                } else if (value === 2) {
                    return row.people > 3;
                }
            },
            render: (h, params) => {
                return h('div', params.row.people + ' 人');
            }
        },
        {
            title: '进入时间',
            sortable: true,
            key: 'create',
            render: (h, params) => {
                return h('div', formatDate(tableData[params.index].create));
            }
        }
    ];
};

const cameraColums = function (self) {
    return [
        {
            title: '序号',
            type: 'index',
            width: 80,
            align: 'center'
        },
        {
            title: '摄像头编号',
            align: 'center',
            key: 'cameraNum',
            width: 200
        },
        {
            title: '开启状态',
            align: 'center',
            key: 'isOpen',
            render: (h, params) => {
                const row = params.row;
                const color = row.isOpen === 1 ? 'green' : 'red';
                const text = row.isOpen === 1 ? '开启' : '关闭';

                return h('Tag', {
                    props: {
                        type: 'dot',
                        color: color
                    },
                    style: {
                        padding: '0 4px'
                    }
                }, text);
            }
        },
        {
            title: '处理状态',
            align: 'center',
            width: 300,
            key: 'isOperated',
            render: (h, params) => {
                const row = params.row;
                const color = row.isOperated === 1 ? 'green' : 'red';
                const text = row.isOperated === 1 ? '处理中' : '未处理';

                return h('Tag', {
                    props: {
                        type: 'dot',
                        color: color
                    },
                    style: {
                        padding: '0 4px'
                    }
                }, text);
            }
        },
        {
            title: '操作',
            align: 'center',
            width: 200,
            key: 'handle',
            render: (h, params) => {
                const row = params.row;
                const text = row.isOpen === 1 ? '关闭' : '开启';
                const color = row.isOpen === 1 ? 'error' : 'primary';
                return h('Poptip', {
                    props: {
                        confirm: true,
                        title: `您确认${text}这台摄像头吗？`,
                        transfer: true
                    },
                    on: {
                        'on-ok': () => {
                            self.handleCamera(row.cameraNum);
                        }
                    }
                }, [
                    h('Button', {
                        props: {
                            type: color,
                            size: 'default'
                        },
                        style: {
                            marginRight: '5px'
                        }
                    }, text)
                ]);
            }
        }
    ];
};

export {
    cameraRecordColums,
    cameraColums
};
