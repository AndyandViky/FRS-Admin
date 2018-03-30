<style lang="less">

</style>

<template>
    <span>
        <al-selector v-model="res1" level="1"/>
    </span>
</template>

<script>
import Vue from 'vue';
import iviewArea from 'iview-area';
Vue.use(iviewArea);
export default {
    name: 'area',
    data () {
        return {
            res1: [],
            showRes: [],
        };
    },
    watch: {
        res1 (val) {
            this.showRes = val;
        }
    }
};
</script>
