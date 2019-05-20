<style lang="less">
    @import '../../styles/common.less';
    @import '../../styles/table.less';
</style>

<template>
    <div>
        <Row>
            <Card>
                <Row>
                    <Col span="18" style="min-height: 250px;">
                        <Table :data="tableData" :columns="notRegisterColums" stripe ref="tableExcel"></Table>
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
                <center class="margin-top-10"><Page :total="total" @on-page-size-change="pageSizeChange" show-sizer @on-change="changePage"></Page></center>
            </Card>
        </Row>
    </div>
</template>

<script>
import html2canvas from 'html2canvas';
import table2excel from '@/libs/table2excel.js';
import { notRegisterColums } from '@/util/table-columns.js'
import { User } from '@/api'
import { imageUrl } from '@/util/env'
export default {
    name: 'table-to-image',
    data () {
        return {
            tableData: [],
            imageName: '',
            excelFileName: '',
            tableExcel: {},
            notRegisterColums: [],
            total: 0,
            currentPage: 1,
            pageSize: 10,
        };
    },
    created() {
        this.getData();
    },
    methods: {
        async getData () {
            const data = {
                pageNo: this.currentPage,
                pageSize: this.pageSize,
                userId: -1,
            }
            const result = await User.getNotRgisterRecord(data);
            this.total = result.total;
            if (result.datas.length > 0) {
                this.tableData = result.datas.map(item => {
                    item.belong = "幸福花园小区";
                    item.age="暂无";
                    item.gender="暂无";
                    item.face_img = item.face_img.substring(6);
                    item.face_img = imageUrl+item.face_img;
                    return item;
                });
            }
            this.notRegisterColums = notRegisterColums(self, this.tableData);
        },
        exportImage () {
            let vm = this;
            let table = this.$refs.tableExcel.$el;
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
        changePage(page) {
            this.currentPage = page;
            this.getData();
        },
        pageSizeChange(size) {
            this.pageSize = size;
        }
    }
};
</script>
