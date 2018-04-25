<style lang="less">
    @import '../../styles/common.less';
    @import '../../styles/table.less';
</style>

<template>
    <div>
        <Row>
            <Card>
                <search @searchCondition="getSearchData"></search>
                <Row>
                    <Col span="100">
                        <Card>
                            <p slot="title">
                                <Icon type="ios-keypad"></Icon>
                                故障申报数据
                            </p>
                            <div>
                                <Table border :columns="bugColumns" :data="bugData" refs="bug"></Table>
                            </div>  
                        </Card>
                    </Col>
                </Row>
            </Card>
        </Row>
    </div>
</template>

<script>
import { bugColums } from '@/util/table-columns.js'
import search from '../main-components/search.vue'
import { Bug } from '@/api'
export default {
    name: 'bug-apply',
    components: {
        search
    },
    data () {
        return {
            bugColumns: [],
            bugData: [],
            modal: false,
        };
    },
    methods: {
        async getData () {
            const result = await Bug.getBugs({pageNo: 1, pageSize: 10});
            console.log(result);
            this.bugData = result.datas;
            for(const item of this.bugData) {
                item.area = "幸福花园小区";
                item.belong = "15-622";
            }
            this.bugColumns = bugColums(this, this.bugData);
        },
        getSearchData(data) {
            alert(1);
        },
        handle (val, index) {
            if (!this.bugData[index].result) {
                this.$router.push({path: '/bug/operate/'+this.bugData[index].id})
            } else {
                this.$Modal.confirm({
                    title: "删除数据",
                    content: "是否删除此条数据?",
                    onOk: () => {
                        val.splice(index, 1);
                        this.$Message.info("删除成功");
                    }
                })
            }
        },
    },
    created () {
        this.getData();
    }
};
</script>
