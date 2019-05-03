
<style lang="less">
    @import '../../styles/common.less';
    @import './article-list.less';
    .article-title{
        color: #666;
        margin-bottom: 20px;
    }
    .article-content{
        line-height: 25px;
    }
</style>

<template>
    <div class="preview-main">
        <Row class="margin-top-20">
            <Col span="24" class="article-box">
                <div>
                    <Card>
                        <Form :label-width="80">
                            <FormItem label="文章标题">
                                <Input v-model="title" icon="android-list"/>
                            </FormItem>
                        </Form>
                        <textarea id="articleChange"></textarea>
                        <Button type="primary" class="margin-top-10" @click="changeArticleInfo">提交修改</Button>
                    </Card>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
import tinymce from 'tinymce';
import { Article } from "@/api"
export default {
    data () {
        return {
            title: '',
            content: '',
            articleData: []
        };
    },
    async mounted () {
        // getData
        tinymce.init({
            selector: '#articleChange',
            branding: false,
            elementpath: false,
            height: 600,
            language: 'zh_CN.GB2312',
            menubar: 'edit insert view format table tools',
            theme: 'modern',
            plugins: [
                'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
                'searchreplace visualblocks visualchars code fullscreen fullpage',
                'insertdatetime media nonbreaking save table contextmenu directionality',
                'emoticons paste textcolor colorpicker textpattern imagetools codesample'
            ],
            toolbar1: ' newnote print fullscreen preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample',
            autosave_interval: '20s',
            image_advtab: true,
            table_default_styles: {
                width: '100%',
                borderCollapse: 'collapse'
            }
        });
        const articleId = this.$route.params.id;
        const data = await Article.getArticle({articleId});
        if (data) {
            this.title = data.title;
            this.content = data.content;
        }
        setTimeout(() => {
            tinymce.activeEditor.setContent(this.content);
        }, 1000)
    },
    methods: {
        changeArticleInfo() {
            const articleId = this.$route.params.id;
            if (this.title === '' || this.content === '') {
                return this.$Message.warning('文章信息不能为空');
            }
            Article.changeArticleInfo({
                articleId,
                title: this.title,
                content: tinymce.activeEditor.getContent(),
                status: 1,
            }).then(result => {
                return this.$Message.success('修改成功');
            })
        }
    },
    destroyed () {
        tinymce.get('articleChange').destroy();
    }
}
</script>
