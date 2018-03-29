<style lang="less">
    @import '../../styles/common.less';
    @import '../info-manage/article-list.less';
</style>

<template>
    <div class="preview-main">
        <Row class="margin-top-20">
            <Col span="18">
                <div>
                    <Card v-for='item in articleData' :key='item'>
                        <router-link :to='{path: "/article/"+item.id}'><h1 style="color:#666">{{ item.title }}</h1></router-link>
                        <p class="preview-publish-time"><Icon type="android-alarm-clock"></Icon>&nbsp;发布时间：{{ item.created_at }}</p>
                        <div class="preview-tags-con">
                            <b class="preview-tip"><Icon type="ios-pricetags-outline"></Icon>&nbsp;标签：</b><Tag v-for="tag in item.tagsList" type="border" color="blue" :key="tag">{{ tag }}</Tag>
                        </div>
                        <div class="preview-classifition-con">
                            <b class="preview-tip"><Icon type="navicon-round"></Icon>&nbsp;目录：</b>
                            <a class="preview-classifition-item" v-for="catalog in item.catalogs" :key="catalog">
                                <Icon type="android-folder-open"></Icon>
                                {{ catalog }}
                            </a>
                        </div>
                    </Card>
                </div>
            </Col>
            <Col span="6" class="padding-left-10">
                <div>
                    <Card>
                        <p slot="title">
                            <Icon type="paper-airplane"></Icon>
                            热门文章
                        </p>
                        <div class="preview-placeholderCon">
                            <div class="preview-placeholder" v-for='item in articleData' :key='item'>
                                <router-link :to='{path: "/article/"+item.id}' style="color: #666">
                                    {{item.title}}
                                </router-link>
                            </div>
                        </div>
                    </Card>
                </div>
                <div class="margin-top-10">
                    <Card>
                        <p slot="title">
                            <Icon type="paper-airplane"></Icon>
                            最新文章
                        </p>
                        <div class="preview-placeholderCon">
                            <div class="preview-placeholder" v-for='item in articleData' :key='item'>
                                <router-link :to='{path: "/article/"+item.id}' style="color: #666">
                                    {{item.title}}
                                </router-link>
                            </div>
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
            articleData: [
                {
                    id: 1,
                    title: '15-311发现200块钱',
                    tagsList: [
                        '失物招领'
                    ],
                    catalogs: [
                        '失物招领',
                        '失物招领'
                    ],
                    created_at: '2018-1-1 12:30'
                },
                {
                    id: 2,
                    title: '小区西门拾到一串钥匙',
                    tagsList: [
                        '失物招领'
                    ],
                    catalogs: [
                        '失物招领',
                        '失物招领'
                    ],
                    created_at: '2018-1-1 12:30'
                },
                {
                    id: 3,
                    title: '小区组长开始竞选啦 ! ! !',
                    tagsList: [
                        '小区动态'
                    ],
                    catalogs: [
                        '失物招领',
                        '失物招领'
                    ],
                    created_at: '2018-1-1 12:30'
                }
            ]
        };
    },
    mounted () {
        // getData
    }
}
</script>
