<template>
    <div style="width:100%;height:100%;" id="oepn_door_data"></div>
</template>

<script>
import echarts from 'echarts'

export default {
    name: 'openDoorData',
    props: {
        dataApp: {
            type: Array,
            default: [],
        },
        dataCamera: {
            type: Array,
            default: [],
        }
    },
    mounted () {
        let openDoor = echarts.init(document.getElementById('oepn_door_data'));
        openDoor.setOption(this.init());

        window.addEventListener('resize', function () {
            openDoor.resize();
        });
    },
    methods: {
        init() {
            return {
                title: {
                    text: '折线图堆叠'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['app进入','识别进入']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一','周二','周三','周四','周五','周六','周日']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:'app进入',
                        type:'line',
                        stack: '总量',
                        data:this.dataApp
                    },
                    {
                        name:'识别进入',
                        type:'line',
                        stack: '总量',
                        data:this.dataCamera
                    }
                ]
            }
        }
    }
};
</script>
