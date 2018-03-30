<template>
    <div style="width:100%;height:100%;" id="oepn_door_data"></div>
</template>

<script>
import echarts from 'echarts';

const option = {
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
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'识别进入',
            type:'line',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310]
        }
    ]
};

export default {
    name: 'openDoorData',
    mounted () {
        let openDoor = echarts.init(document.getElementById('oepn_door_data'));
        openDoor.setOption(option);

        window.addEventListener('resize', function () {
            openDoor.resize();
        });
    }
};
</script>
