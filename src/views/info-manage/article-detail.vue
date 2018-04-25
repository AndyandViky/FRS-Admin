<style lang="less">
    @import '../../styles/common.less';
    @import './article-list.less';
    .article-title{
        color: #666;
        text-align: center;
    }
    .article-content{
        text-indent: 2em;
        line-height: 25px;
        padding: 10px 20px;
    }
</style>

<template>
    <div class="preview-main">
        <Row class="margin-top-20">
            <Col span="18">
                <div>
                    <Card>
                        <h1 class="article-title">弱者普遍</h1>
                        <Input v-model="content" type="textarea" placeholder="请输入文章内容"></Input>
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
                    created_at: '2018-1-1 12:30'
                },
                {
                    id: 2,
                    title: '小区西门拾到一串钥匙',
                    tagsList: [
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
