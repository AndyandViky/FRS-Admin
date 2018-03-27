import { formatDate } from '@/libs/common.js';
const cameraRecordColums = function (tableData) {
    return [
        {
            title: '地区',
            key: 'name'
        },
        {
            title: '所属地区',
            key: 'belong'
        },
        {
            title: '人员类别',
            key: 'type'
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
const baseColums = function (self, tableData) {
    return [
        {
            title: '序号',
            type: 'index',
            width: 80,
            align: 'center',
            fixed: 'left'
        },
        {
            title: '所属地',
            key: 'area',
            width: 150,
            align: 'center'
        },
        {
            title: '姓名',
            align: 'center',
            key: 'name',
            width: 150,
            editable: true
        },
        {
            title: '性别',
            align: 'center',
            key: 'gender',
            width: 100,
            filters: [
                {
                    label: '男',
                    value: 1
                },
                {
                    label: '女',
                    value: 2
                }
            ],
            filterMultiple: false,
            filterMethod (value, row) {
                if (value === 1) {
                    return row.gender < 1;
                } else if (value === 2) {
                    return row.gender > 0;
                }
            },
            render: (h, params) => {
                const row = params.row;
                const text = row.gender === 1 ? '女' : '男';
                return h('span', text);
            }
        },
        {
            title: '年龄',
            align: 'center',
            sortable: true,
            key: 'age',
            width: 100,
            filters: [
                {
                    label: '20岁以下',
                    value: 1
                },
                {
                    label: '20-30',
                    value: 2
                },
                {
                    label: '30岁以上',
                    value: 3
                }
            ],
            filterMultiple: false,
            filterMethod (value, row) {
                if (value === 1) {
                    return row.age < 20;
                } else if (value === 2) {
                    return row.age >= 20 && row.age < 30;
                } else return row.age >= 30;
            }
        },
        {
            title: '邮箱',
            align: 'center',
            key: 'email',
            width: 200,
            editable: true
        },
        {
            title: '手机号',
            align: 'center',
            key: 'phone',
            width: 200,
            editable: true
        },
        {
            title: '是否激活',
            align: 'center',
            key: 'is_active',
            width: 200,
            filters: [
                {
                    label: '已激活',
                    value: 1
                },
                {
                    label: '未激活',
                    value: 2
                }
            ],
            filterMultiple: false,
            filterMethod (value, row) {
                if (value === 1) {
                    return row.is_active > 0;
                } else if (value === 2) {
                    return row.is_active < 1;
                }
            },
            render: (h, params) => {
                const row = params.row;
                const text = row.is_active === 1 ? '已激活' : '未激活';
                const title = row.is_active === 1 ? '取消激活' : '激活';
                return h('Poptip', {
                    props: {
                        confirm: true,
                        title: title,
                        transfer: true,
                        placement: 'bottom'
                    },
                    on: {
                        'on-ok': () => {
                            if (row.is_active === 0) {
                                self.$Message.info('激活成功');
                                row.is_active = 1;
                            } else {
                                self.$Message.info('取消激活成功');
                                row.is_active = 0;
                            }
                            self.handleActive(params.index);
                        }
                    }
                }, [
                    h('span', {
                        domProps: {
                            title: '点击切换激活状态'
                        },
                        style: {
                            padding: '0 4px',
                            cursor: 'pointer'
                        }
                    }, text)
                ]);
            }
        },
        {
            title: '头像',
            align: 'center',
            key: 'avatar',
            width: 200,
            render: (h, params) => {
                return h('Poptip', {
                    props: {
                        trigger: 'click',
                        transfer: true,
                        placement: 'bottom'
                    }
                }, [
                    h('img', {
                        domProps: {
                            src: tableData[params.index].image,
                            title: '点击更换头像'
                        },
                        style: {
                            width: '32px',
                            height: '24px',
                            cursor: 'pointer'
                        }
                    }),
                    h('Row', {
                        slot: 'content',
                        props: {
                            type: 'flex',
                            justify: 'center',
                            align: 'middle',
                            class: 'height-100'
                        }
                    }, [
                        h('Upload', {
                            props: {
                                action: '//jsonplaceholder.typicode.com/posts/',
                                'format': ['jpg', 'png', 'jpeg', 'gif', 'bmp', 'svg'],
                                'on-format-error': () => {
                                    self.$Message.warning('文件格式错误');
                                }
                            }
                        }, [
                            h('Button', {
                                domProps: {
                                    type: 'ghost',
                                    icon: 'ios-cloud-upload-outline'
                                }
                            }, '上传图片')
                        ])
                    ])
                ]);
            }
        },
        {
            fixed: 'right',
            title: '操作',
            align: 'center',
            width: 190,
            key: 'handle',
            handle: ['edit', 'delete']
        }
    ];
};
const propertyColums = function (self, tableData) {
    return baseColums(self, tableData);
};

const householdColums = function (self, tableData) {
    return baseColums(self, tableData);
};

const visitorColums = function (self, tableData) {
    const base = baseColums(self, tableData);
    base.splice(2, 0, {
        title: '户主地址',
        key: 'belong',
        width: 150,
        align: 'center'
    });
    base.splice(-2, 0, {
        title: '状态',
        key: 'deadline',
        width: 150,
        align: 'center',
        filters: [
            {
                label: '已生效',
                value: 1
            },
            {
                label: '未生效',
                value: 2
            }
        ],
        filterMultiple: false,
        filterMethod (value, row) {
            if (value === 1) {
                return row.deadline > Date.now();
            } else if (value === 2) {
                return row.deadline < Date.now();
            }
        },
        render: (h, params) => {
            const row = params.row;
            const color = row.deadline > Date.now() ? '#666' : 'red';
            const text = row.deadline > Date.now() ? '生效' : '失效';
            const title = row.deadline > Date.now() ? '' : '点击延期';
            return h('span', {
                domProps: {
                    title: title
                },
                style: {
                    padding: '0 4px',
                    color: color,
                    cursor: 'pointer'
                },
                on: {
                    'click': () => {
                        self.handleExtension(params.index);
                    }
                }
            }, text);
        }
    });
    return base;
};

const notRegisterColums = function (self, tableData) {
    return [
        {
            title: '地区',
            key: 'name'
        },
        {
            title: '性别',
            align: 'center',
            key: 'gender',
            sortable: true,
            render: (h, params) => {
                const row = params.row;
                const text = row.gender === 1 ? '女' : '男';
                return h('span', text);
            }
        },
        {
            title: '年龄',
            sortable: true,
            key: 'age',
            filters: [
                {
                    label: '20岁以下',
                    value: 1
                },
                {
                    label: '20-30',
                    value: 2
                },
                {
                    label: '30岁以上',
                    value: 3
                }
            ],
            filterMultiple: false,
            filterMethod (value, row) {
                if (value === 1) {
                    return row.age < 20;
                } else if (value === 2) {
                    return row.age >= 20 && row.age < 30;
                } else return row.age >= 30;
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
            title: '人数',
            sortable: true,
            key: 'people',
            filters: [
                {
                    label: '一人',
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
            title: '记录时间',
            sortable: true,
            key: 'create',
            render: (h, params) => {
                return h('div', formatDate(tableData[params.index].create));
            }
        }
    ];
};

export {
    cameraRecordColums,
    cameraColums,
    propertyColums,
    householdColums,
    visitorColums,
    notRegisterColums
};
