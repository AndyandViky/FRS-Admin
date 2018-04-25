import { formatDate } from '@/libs/common.js';
const cameraRecordColums = function (tableData) {
    return [
        {
            title: '地区',
            key: 'name',
            width: 120
        },
        {
            title: '所属地区',
            key: 'belong',
            width: 100
        },
        {
            title: '人员类别',
            align: 'center',
            width: 100,
            key: 'types',
            render: (h, params) => {
                const row = params.row;
                const text = row.types === 1 ? '访客' : row.types === 2 ? '业主' : row.types === 3 ? '物业' : '管理员';
                return h('span', {
                    style: {
                        padding: '0 4px'
                    }
                }, text);
            }
        },
        {
            title: '门禁类别',
            key: 'type',
            width: 100,
            align: 'center',
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
                    return row.type < 1;
                } else if (value === 2) {
                    return row.type > 0;
                }
            },
            render: (h, params) => {
                const row = params.row;
                const color = row.type === 0 ? 'green' : 'red';
                const text = row.type === 0 ? 'camera' : 'app';

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
            key: 'face_img',
            render: (h, params) => {
                const row = params.row;
                return h('Poptip', {
                    props: {
                        trigger: 'hover',
                        placement: 'bottom'
                    }
                }, [
                    h('img', {
                        domProps: {
                            src: row.face_img
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
                                src: row.face_img
                            }
                        })
                    ])
                ]);
            }
        },
        {
            title: '进入人数',
            sortable: true,
            key: 'count',
            align: 'center',
            width: 130,
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
                    return row.count < 2;
                } else if (value === 2) {
                    return row.count > 3;
                }
            },
            render: (h, params) => {
                return h('div', params.row.count + ' 人');
            }
        },
        {
            title: '进入时间',
            width: 120,
            sortable: true,
            key: 'create',
            render: (h, params) => {
                return h('div', params.row.created_at.substring(0, 10));
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
            key: 'camera_num',
            width: 200
        },
        {
            title: '开启状态',
            align: 'center',
            key: 'status',
            render: (h, params) => {
                const row = params.row;
                const color = row.status === 1 ? 'green' : 'red';
                const text = row.status === 1 ? '开启' : '关闭';

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
            key: 'is_operated',
            render: (h, params) => {
                const row = params.row;
                const color = row.is_operated === 1 ? 'green' : 'red';
                const text = row.is_operated === 1 ? '处理中' : '未处理';

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
                const text = row.status === 1 ? '关闭' : '开启';
                const color = row.status === 1 ? 'error' : 'primary';
                return h('Poptip', {
                    props: {
                        confirm: true,
                        title: `您确认${text}这台摄像头吗？`,
                        transfer: true
                    },
                    on: {
                        'on-ok': () => {
                            self.handleCamera(row.camera_num);
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
            key: 'adress',
            width: 200,
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
            editable: true,
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
                const color = row.is_active === 1 ? '#666' : 'red';
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
                            cursor: 'pointer',
                            color: color
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
                            src: tableData[params.index].avatar,
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
            title: '查看当前访客',
            width: 200,
            align: 'center',
            render: (h, params) => {
                return h('span', {
                    domProps: {
                        title: '查看访问记录'
                    },
                    style: {
                        cursor: 'pointer'
                    },
                    on: {
                        'click': () => {
                            self.getVisitorLog(params.index);
                        }
                    }
                }, '查看访问记录');
            }
        },
        {
            title: '人脸图像',
            align: 'center',
            width: 200,
            render: (h, params) => {
                return h('span', {
                    domProps: {
                        title: '查看人脸图像'
                    },
                    style: {
                        cursor: 'pointer'
                    },
                    on: {
                        'click': () => {
                            self.getFaceModel(params.index);
                        }
                    }
                }, '查看人脸图像');
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
    const base = baseColums(self, tableData);
    base.splice(-3, 0, {
        title: '业主证明',
        key: 'identity_pic',
        width: 200,
        align: 'center',
        render: (h, params) => {
            return h('Poptip', {
                props: {
                    trigger: 'hover',
                    placement: 'bottom'
                }
            }, [
                h('img', {
                    domProps: {
                        src: tableData[params.index].identity_pic
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
                            src: tableData[params.index].identity_pic
                        }
                    })
                ])
            ]);
        }
    });
    base.splice(-3, 0, {
        title: '身份证正面',
        key: 'card_front',
        width: 200,
        align: 'center',
        render: (h, params) => {
            return h('Poptip', {
                props: {
                    trigger: 'hover',
                    placement: 'bottom'
                }
            }, [
                h('img', {
                    domProps: {
                        src: tableData[params.index].card_front
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
                            src: tableData[params.index].card_front
                        }
                    })
                ])
            ]);
        }
    });
    base.splice(-3, 0, {
        title: '身份证反面',
        key: 'identity_pic',
        width: 200,
        align: 'center',
        render: (h, params) => {
            return h('Poptip', {
                props: {
                    trigger: 'hover',
                    placement: 'bottom'
                }
            }, [
                h('img', {
                    domProps: {
                        src: tableData[params.index].card_opposite
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
                            src: tableData[params.index].card_opposite
                        }
                    })
                ])
            ]);
        }
    });
    base.splice(-1, 0, {
        title: '审核',
        width: 80,
        fixed: 'right',
        align: 'center',
        render: (h, params) => {
            const row = params.row;
            const text = row.is_verify === 1 ? '已审核' : '审核';
            const color = row.is_verify === 1 ? 'success' : 'primary';
            return h('div', [
                h('Button', {
                    props: {
                        type: color
                    },
                    on: {
                        click: () => {
                            if (row.is_verify === 0) {
                                self.activeResident(params.index);
                            }
                        }
                    }
                }, text)
            ]);
        }
    });
    return base;
};

const visitorColums = function (self, tableData) {
    const base = baseColums(self, tableData);
    base.splice(-3, 1);
    return base;
};

const visitorLogColums = function (self, tableData) {
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
            align: 'center'
        },
        {
            title: '户主地址',
            key: 'belong',
            align: 'center'
        },
        {
            title: '姓名',
            align: 'center',
            key: 'name'
        },
        {
            title: '状态',
            key: 'deadline',
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
                const isUse = parseInt(row.pass_time + row.deadline * 3600 * 24 * 1000);
                if (value === 1) {
                    return isUse > Date.now();
                } else if (value === 2) {
                    return isUse < Date.now();
                }
            },
            render: (h, params) => {
                const row = params.row;
                const isUse = parseInt(row.pass_time + row.deadline * 3600 * 24 * 1000);
                const color = isUse > Date.now() ? '#666' : 'red';
                const text = isUse > Date.now() ? '生效' : '失效';
                const title = isUse > Date.now() ? '' : '点击延期';
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
                            self.handleExtension(row, params.index);
                        }
                    }
                }, text);
            }
        }
    ];
};

const notRegisterColums = function (self, tableData) {
    return [
        {
            title: '地区',
            key: 'belong',
            align: 'center'
        },
        {
            title: '性别',
            align: 'center',
            key: 'gender',
            sortable: true,
            render: (h, params) => {
                const text = '暂无';
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
            key: 'face_img',
            render: (h, params) => {
                const row = params.row;
                return h('Poptip', {
                    props: {
                        trigger: 'hover',
                        placement: 'bottom'
                    }
                }, [
                    h('img', {
                        domProps: {
                            src: row.face_img
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
                                src: row.face_img
                            }
                        })
                    ])
                ]);
            }
        },
        {
            title: '人数',
            sortable: true,
            key: 'count',
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
                    return row.count < 2;
                } else if (value === 2) {
                    return row.count > 3;
                }
            },
            render: (h, params) => {
                return h('div', params.row.count + ' 人');
            }
        },
        {
            title: '记录时间',
            sortable: true,
            key: 'created_at',
            render: (h, params) => {
                return h('div', params.row.created_at.substring(0, 10));
            }
        }
    ];
};

const bugColums = function (self, tableData) {
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
            title: '所属地区',
            align: 'center',
            key: 'belong',
            width: 150
        },
        {
            title: '故障名',
            align: 'center',
            key: 'title',
            width: 200
        },
        {
            title: '状态',
            align: 'center',
            sortable: true,
            width: 150,
            render: (h, params) => {
                const row = params.row;
                const color = row.result ? 'green' : 'red';
                const text = row.result ? '已处理' : '未处理';

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
            title: '申请时间',
            align: 'center',
            sortable: true,
            key: 'created_at',
            render: (h, params) => {
                return h('div', params.row.created_at.substring(0, 10));
            }
        },
        {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
                const row = params.row;
                const type = row.result ? 'error' : 'primary';
                const text = row.result ? '删除' : '处理';
                return h('div', [
                    h('Button', {
                        props: {
                            type
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                self.handle(tableData, params.index);
                            }
                        }
                    }, text)
                ]);
            }
        }
    ];
};

const questionColums = function (self, tableData) {
    return [
        {
            title: '序号',
            type: 'index',
            width: 80,
            align: 'center',
            fixed: 'left'
        },
        {
            title: '标题',
            align: 'center',
            ellipsis: true,
            width: 450,
            key: 'title'
        },
        {
            title: '点赞数',
            width: 80,
            align: 'center',
            key: 'like'
        },
        {
            title: '查看当前回答',
            width: 150,
            align: 'center',
            render: (h, params) => {
                return h('span', {
                    domProps: {
                        title: '查看当前回答'
                    },
                    style: {
                        cursor: 'pointer'
                    },
                    on: {
                        'click': () => {
                            self.getAnswer(params.index);
                        }
                    }
                }, '查看当前回答');
            }
        },
        {
            title: '发布时间',
            width: 150,
            align: 'center',
            key: 'create_at',
            render: (h, params) => {
                return h('div', params.row.created_at.substring(0, 10));
            }
        },
        {
            title: '操作',
            width: 200,
            align: 'center',
            render: (h, params) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'primary'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                self.showModal(params.row, params.index);
                            }
                        }
                    }, '修改'),
                    h('Button', {
                        props: {
                            type: 'error'
                        },
                        on: {
                            click: () => {
                                self.remove(tableData, params.index);
                            }
                        }
                    }, '删除')
                ]);
            }
        }
    ];
};

const answerColums = function (self, tableData) {
    return [
        {
            title: '序号',
            type: 'index',
            width: 80,
            align: 'center',
            fixed: 'left'
        },
        {
            title: '标题',
            align: 'center',
            ellipsis: true,
            width: 200,
            key: 'title'
        },
        {
            title: '内容',
            align: 'center',
            ellipsis: true,
            key: 'content'
        },
        {
            title: '回答时间',
            width: 150,
            align: 'center',
            key: 'create_at',
            render: (h, params) => {
                return h('div', params.row.created_at.substring(0, 10));
            }
        },
        {
            title: '操作',
            width: 200,
            align: 'center',
            render: (h, params) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'primary'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                self.showModal(params.row, params.index);
                            }
                        }
                    }, '修改'),
                    h('Button', {
                        props: {
                            type: 'error'
                        },
                        on: {
                            click: () => {
                                self.remove(tableData, params.index);
                            }
                        }
                    }, '删除')
                ]);
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
    notRegisterColums,
    bugColums,
    visitorLogColums,
    questionColums,
    answerColums
};
