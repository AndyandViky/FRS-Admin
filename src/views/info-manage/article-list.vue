<style lang="less">
    @import '../../styles/common.less';
    @import './article-list.less';
</style>

<template>
    <div class="preview-main">
        <Row class="margin-top-20">
            <Col span="18">
                <div>
                    <Card v-for='(item, index) in articleData' :key='index'>
                        <router-link :to='{path: "/article/"+item.id}'><h1 style="color:#666">{{ item.title }}</h1></router-link>
                        <p class="preview-publish-time"><Icon type="android-alarm-clock"></Icon>&nbsp;发布时间：{{ item.created_at }}</p>
                        <div class="preview-tags-con">
                            <b class="preview-tip"><Icon type="ios-pricetags-outline"></Icon>&nbsp;标签：</b><Tag v-for="(tag, index) in item.tag" type="border" color="blue" :key="index">{{ tag }}</Tag>
                        </div>
                        <div class="preview-classifition-con">
                            <b class="preview-tip"><Icon type="navicon-round"></Icon>&nbsp;目录：</b>
                            <a class="preview-classifition-item" v-for="(category, index) in item.category" :key="index">
                                <Icon type="android-folder-open"></Icon>
                                {{ category }}
                            </a>
                        </div>
                    </Card>
                    <center class="margin-top-10 margin-bottom-10"><Page :total="total" @on-page-size-change="pageSizeChange" show-sizer @on-change="changePage"></Page></center>
                </div>
            </Col>
            <Col span="6" class="padding-left-10">
                <div class="margin-top-10">
                    <Card>
                        <p slot="title">
                            <Icon type="paper-airplane"></Icon>
                            最新文章
                        </p>
                        <div class="preview-placeholderCon">
                            <div class="preview-placeholder" v-for='(item, index) in mostNewArticle' :key='index'>
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
import { Article } from '@/api'
export default {
    data () {
        return {
            articleData: [
            ],
            mostNewArticle: [
            ],
            total: 0,
            currentPage: 1,
            pageSize: 10,
        };
    },
    async mounted () {
        // getData
        this.getData();
    },
    methods: {
        changePage(page) {
            this.currentPage = page;
            this.getData();
        },
        pageSizeChange(size) {
            this.pageSize = size;
        },
        async getData() {
            const data = await Article.getArticles({pageNo: this.currentPage, pageSize: this.pageSize});
            this.articleData = [];
            this.articleData = data.datas;
            this.total = data.total;
            for (const item of this.articleData) {
                item.category = item.category.split(',');
                item.tag = item.tag.split(',');
                item.created_at = item.created_at.substring(0, 10);
            }
            const pageLength = parseInt(data.total / this.pageSize);
            const newData = await Article.getArticles({pageNo: pageLength-1, pageSize: 5});
            this.mostNewArticle = newData.datas;
        }
    }
}
</script>
