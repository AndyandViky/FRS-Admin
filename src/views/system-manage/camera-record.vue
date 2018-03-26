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
                        <Table :data="tableData1" :columns="cameraRecordColums" stripe ref="tableExcel"></Table>
                    </Col>
                    <Col span="6" class="padding-left-20">
                        <div id="showImage" class="margin-bottom-10">
                            <span>输入文件名：</span>
                            <Input v-model="imageName" icon="document" placeholder="请输入图片名" style="width: 190px"/>
                        </div>
                        <Button type="primary" @click="exportImage">导出表格为图片</Button>
                        <div id="showImage" class="show-image margin-top-20">
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
import { cameraRecordColums } from '@/util/table-columns.js'
import search from '../main-components/search.vue'
export default {
    name: 'table-to-image',
    components: {
        search
    },
    data () {
        return {
            tableData1: this.mockTableData1(),
            imageName: '',
            excelFileName: '',
            tableExcel: {},
            cameraRecordColums: [],
            searchConName: '',
            isSuperManage: false,
            areaSelect: '',
            dateFilter: '',
            adress: [],
        };
    },
    created() {
        this.cameraRecordColums = cameraRecordColums(this.tableData1)
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
        mockTableData1 () {
            let data = [];
            for (let i = 0; i < 20; i++) {
                data.push({
                    name: '幸福花园小区',
                    status: Math.floor(Math.random() * 2 + 1),
                    image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522044096773&di=71390fc035a383de557dbc9d54adc0ef&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F120727%2F201995-120HG1030762.jpg',
                    people: Math.floor(Math.random() * 7 + 1),
                    time: Math.floor(Math.random() * 7 + 1),
                    create: new Date()
                });
            }
            return data;
        },
        exportImage () {
            let vm = this;
            let table = this.$refs.table2image.$el;
            /* 这部分代码用来解决生成的图片不清晰的问题 */
            // let tableWidth = table.offsetWidth;
            // let tableHeight = table.offsetHeight;
            // let canvas = document.createElement('canvas');
            // canvas.width = tableWidth * 2;
            // canvas.height = tableHeight * 2;
            // canvas.style.width = tableWidth + 'px';
            // canvas.style.height = tableHeight + 'px';
            // document.body.appendChild(canvas);
            // var context = canvas.getContext('2d');
            // context.scale(2, 2);
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
        }
    }
};
</script>
