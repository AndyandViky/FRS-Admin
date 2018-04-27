<style lang="less">

</style>

<template>
    <Row class="search">
        <!-- <Col span="4">
            <Cascader :data="adress" v-model="searchCondition.adress"></Cascader>
        </Col> -->
        <DatePicker type="daterange" split-panels v-model="searchCondition.dateFilter" placeholder="请选择时间..." style="width: 200px"></DatePicker>
        <Input v-model="searchCondition.searchName" placeholder="请输入关键字搜搜..." style="width: 200px" />
        <span @click="handleSearch" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
    </Row>
</template>

<script>
export default {
    name: 'search',
    data () {
        return {
            isSuperManage: false,
            provinceIndex: -1,
            cityIndex: -1,
            conmunityIndex: -1,
            adress: [
                {
                    value: '北京',
                    label: '北京',
                    children: [
                        {
                            value: '幸福小区1',
                            label: '幸福小区1'
                        },
                        {
                            value: '幸福小区2',
                            label: '幸福小区2'
                        },
                        {
                            value: '幸福小区3',
                            label: '幸福小区3'
                        }
                    ]
                }, {
                    value: '江苏',
                    label: '江苏',
                    children: [
                        {
                            value: '南京',
                            label: '南京',
                            children: [
                                {
                                    value: '幸福小区4',
                                    label: '幸福小区4',
                                }
                            ]
                        },
                        {
                            value: '苏州',
                            label: '苏州',
                            children: [
                                {
                                    value: '幸福小区5',
                                    label: '幸福小区5',
                                },
                                {
                                    value: '幸福小区6',
                                    label: '幸福小区6',
                                }
                            ]
                        }
                    ],
                }
            ],
            searchCondition: {
                searchName: '',
                dateFilter: [],
                // adress: [],
            },
        };
    },
    created() {
        if(this.$store.state.user.auth === 2) {
            // 此处判断用户权限
            this.isSuperManage = true;
        }
    },
    methods: {
        handleSearch() {
            // ... 将时间字符串转换
            if (this.searchCondition.searchName === '' && this.searchCondition.dateFilter.length < 2) {
                return this.$Message.warning('请输入搜索信息');
            }
            this.$emit("searchCondition", this.searchCondition)
        }
    },
    watch: {
        provinceIndex(val) {
            this.cityIndex = -1;
            this.conmunityIndex = -1;
        }
    }
};
</script>
