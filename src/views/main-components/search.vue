<style lang="less">

</style>

<template>
    <Row class="search">
        <Select v-model="searchCondition.areaSelect" v-show="isSuperManage" style="width:200px">
            <Option v-for="item in adress" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <DatePicker type="daterange" split-panels v-model="dateFilter" placeholder="请选择时间..." style="width: 200px"></DatePicker>
        <Input v-model="searchCondition.searchConName" placeholder="请输入关键字搜搜..." style="width: 200px" />
        <span @click="handleSearch" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
    </Row>
</template>

<script>
export default {
    name: 'search',
    data () {
        return {
            isSuperManage: false,
            dateFilter: '',
            adress: [],
            searchCondition: {
                searchConName: '',
                begin: '',
                end: '',
                areaSelect: '',
            },
        };
    },
    created() {
        if(this.$store.state.user.auth === 2) {
            // 此处判断用户权限
            this.isSuperManage = true;
            // 获取地区数据
            this.adress = [
                {
                    value: '1',
                    label: '幸福花园小区1'
                },
                {
                    value: '2',
                    label: '幸福花园小区2'
                },
                {
                    value: '3',
                    label: '幸福花园小区3'
                }
            ]
        }
    },
    methods: {
        handleSearch() {
            // ... 将时间字符串转换
            this.$emit("searchCondition", this.searchCondition)
        }
    }
};
</script>
