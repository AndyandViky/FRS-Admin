<style lang="less">
    @import '../../styles/common.less';
    @import '../../styles/table.less';
    .bug_image {
        width: 200px;
        height: 200px;
        cursor: pointer;
        border-radius: 5px;
    }
</style>

<template>
    <div>
        <Row>
            <Card>
                <Row>
                    <Col span="100">
                        <Card>
                            <p slot="title">
                                <Icon type="ios-keypad"></Icon>
                                故障数据处理
                            </p>
                            <Form :model="formItem" :label-width="80">
                                <FormItem label="故障名:">
                                    <p>{{bug.title}}</p>
                                </FormItem>
                                <FormItem label="故障内容:">
                                    <p>{{bug.content}}</p>
                                </FormItem>
                                <div class="ivu-form-item">
                                    <label class="ivu-form-item-label" style="width: 80px;">故障图片:</label>
                                    <img :src="bug.path" class="bug_image"/>
                                </div>
                                <FormItem label="处理内容">
                                    <Input v-model="formItem.result" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="故障回复"></Input>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" @click="operatedBug">提交</Button>
                                </FormItem>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Card>
        </Row>
    </div>
</template>

<script>
import { Bug } from '@/api'
import { imageUrl } from '@/util/env';
export default {
    name: 'bug-detail',
    data () {
        return {
            bug: {
            },
            formItem: {
                bugId: '',
                result: '',
            }
        };
    },
    methods: {
        async operatedBug() {
            if (this.formItem.result === '' || this.formItem.bugId === '') {
                return this.$Message.error("回复内容不能为空");
            }
            await Bug.operatedBug(this.formItem);
            this.$Message.info("处理成功");
            this.$router.go(-1);
        }
    },
    async activated() {
        const id = this.$route.params.id;
        this.formItem.bugId = id;
        this.bug = await Bug.getBug({bugId: id});
        this.formItem.result = this.bug.result;
        if(this.bug.path) this.bug.path = imageUrl + this.bug.path.substring(6);
    }
};
</script>
