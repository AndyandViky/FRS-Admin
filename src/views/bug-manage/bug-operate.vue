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
                <center class="margin-top-10"><Page :total="total" @on-page-size-change="pageSizeChange" show-sizer @on-change="changePage"></Page></center>
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
            total: 0,
            currentPage: 1,
            pageSize: 10,
            searchData: {},
        };
    },
    methods: {
        async getData (search) {
            const result = await Bug.getBugs({pageNo: this.currentPage, pageSize: this.pageSize, search});
            this.bugData = result.datas;
            this.total = result.total;
            for(const item of this.bugData) {
                item.area = "幸福花园小区";
                item.belong = "15-622";
            }
            this.bugColumns = bugColums(this, this.bugData);
        },
        getSearchData(data) {
            this.currentPage = 1;
            this.searchData = data;
            this.getData(data);
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
        changePage(page) {
            this.currentPage = page;
            this.getData(this.searchData);
        },
        pageSizeChange(size) {
            this.pageSize = size;
        }
    },
    created () {
        this.getData();
    }
};
</script>
