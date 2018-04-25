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
                    <Col span="18">
                        <Table :data="tableData" :columns="visitorRecordColums" stripe ref="tableExcel"></Table>
                    </Col>
                    <Col span="6" class="padding-left-20">
                        <div class="margin-bottom-10">
                            <span>输入文件名：</span>
                            <Input v-model="imageName" icon="document" placeholder="请输入图片名" style="width: 190px"/>
                        </div>
                        <Button type="primary" @click="exportImage">导出表格为图片</Button>
                        <div class="show-image margin-top-20">
                            <img id="exportedImage" />
                        </div>
                    </Col>
                    <Col span='6' class="padding-left-10">
                        <div class="margin-top-10 margin-left-10">
                            <span>输入文件名：</span>
                            <Input v-model="excelFileName" icon="document" placeholder="请输入文件名" style="width: 190px" />
                        </div>
                        <div class="margin-left-10 margin-top-20">
                            <a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>
                            <Button type="primary" size="large" @click="exportExcel">下载表格数据</Button>
                        </div>
                    </Col>
                </Row>
            </Card>
        </Row>
    </div>
</template>

<script>
import html2canvas from 'html2canvas';
import table2excel from '@/libs/table2excel.js';
import { visitorLogColums } from '@/util/table-columns.js'
import search from '../main-components/search.vue'
import { User } from '@/api'
export default {
    name: 'table-to-image',
    components: {
        search
    },
    data () {
        return {
            tableData: [],
            imageName: '',
            extentionTime: 1,
            excelFileName: '',
            tableExcel: {},
            visitorRecordColums: [],
            total: 0,
        };
    },
    async created() {
        const userId = this.$route.params.id;
        const data = await User.getVisitorRecord({
            pageNo: 1,
            pageSize: 10,
            userId
        });
        this.tableData = data.datas;
        for(const item of this.tableData) {
            item.name = item.people.name;
            item.belong = '15-622';
            item.adress = '幸福花园小区';
        }
        this.total = data.total;
        this.visitorRecordColums = visitorLogColums(this, this.tableData)
    },
    methods: {
        exportImage () {
            let vm = this;
            let table = this.$refs.table.$el;
            /* 这部分代码用来解决生成的图片不清晰的问题 */
            let tableWidth = table.offsetWidth;
            let tableHeight = table.offsetHeight;
            let canvas = document.createElement('canvas');
            canvas.width = tableWidth * 2;
            canvas.height = tableHeight * 2;
            canvas.style.width = tableWidth + 'px';
            canvas.style.height = tableHeight + 'px';
            document.body.appendChild(canvas);
            var context = canvas.getContext('2d');
            context.scale(2, 2);
            /* 这部分代码用来解决生成的图片不清晰的问题 */
            html2canvas(table, {
                // canvas: canvas,
                onrendered (image) {
                    var url = image.toDataURL();
                    document.getElementById('exportedImage').src = url;
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = vm.imageName ? vm.imageName : '未命名';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    // document.body.removeChild(canvas);
                }
            });
        },
        exportExcel () {
            table2excel.transform(this.$refs.tableExcel, 'hrefToExportTable', this.excelFileName);
        },
        getSearchData() {
            alert(1);
        },
        handleExtension(val, index) {
            this.$Modal.confirm({
                onOk: () => {
                    if (this.extentionTime <= 0 || this.extentionTime > 30) {
                        this.$Message.error('输入天数必须大于0 小于 30');
                        return;
                    }
                    User.addVisiteTime({
                        deadline: this.extentionTime,
                        recordId: this.tableData[index].id
                    }).then(result => {
                        val.pass_time = Date.now();
                        val.deadline = parseInt(val.deadline+this.extentionTime);
                        this.$Message.info('延期成功');
                    });
                },  
                render: (h) => {
                    return h('Input', {
                        props: {
                            value: this.extentionTime,
                            autofocus: true,
                            placeholder: '请输入延期天数, 最大30天, 最少1天...'
                        },
                        on: {
                            input: (val) => {
                                this.extentionTime = val;
                            },
                            ok: () => {
                                this.$Message.info("延期成功");
                            }
                        }
                    })
                }
            })
        },
    }
};
</script>
