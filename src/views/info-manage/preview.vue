<style lang="less">
    @import '../../styles/common.less';
    @import './preview.less';
</style>

<template>
    <div class="preview-main">
        <Row class="margin-top-20">
            <Col span="14" offset="5">
                <div>
                    <Card>
                        <h1>{{ articleTitle }}</h1>
                        <p class="preview-publish-time"><Icon type="android-alarm-clock"></Icon>&nbsp;发布时间：{{ publishTime }}</p>
                        <div class="preview-tags-con">
                            <b class="preview-tip"><Icon type="ios-pricetags-outline"></Icon>&nbsp;标签：</b><Tag v-for="item in tagsList" type="border" color="blue" :key="item">{{ item }}</Tag>
                        </div>
                        <div class="preview-content-con" v-html="content"></div>
                        <div class="preview-classifition-con">
                            <b class="preview-tip"><Icon type="navicon-round"></Icon>&nbsp;目录：</b>
                            <a class="preview-classifition-item" v-for="item in classificationSelected" :key="item">
                                <Icon type="android-folder-open"></Icon>
                                {{ item }}
                            </a>
                        </div>
                    </Card>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    data () {
        return {
            articleTitle: '',
            tagsList: '',
            classificationSelected: [],
            content: '',
            publishTime: ''
        };
    },
    mounted () {
        this.articleTitle = localStorage.articleTitle;
        this.tagsList = localStorage.tagsList ? JSON.parse(localStorage.tagsList) : [];
        this.classificationSelected = localStorage.classificationSelected ? JSON.parse(localStorage.classificationSelected) : [];
        this.content = localStorage.content;
        this.publishTime = localStorage.publishTime;
    }
};
</script>
