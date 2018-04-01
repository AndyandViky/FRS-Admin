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
        getData () {
            this.bugData = [
                {
                    id: 1,
                    name: '小区门禁识别不了',
                    area: '幸福花园小区',
                    belong: '15-311',
                    status: 1,
                    created_at: new Date(),
                },
                {
                    id: 2,
                    name: '小区门禁识别不了',
                    area: '幸福花园小区',
                    belong: '15-311',
                    status: 0,
                    created_at: new Date(),
                },
                {
                    id: 3,
                    name: '小区门禁识别不了',
                    area: '幸福花园小区',
                    belong: '15-311',
                    status: 1,
                    created_at: new Date(),
                }
            ];
            this.bugColumns = bugColums(this, this.bugData);
        },
        getSearchData(data) {
            alert(1);
        },
        handle (val, index) {
            if (this.bugData[index].status === 0) {
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
