<style lang="less">
    @import '../../styles/common.less';
    @import '../info-manage/article-list.less';
    .card{
        height: 290px;
        position: relative;
    }
    .face-image{
        width: 320px;
        height: 240px;
    }
    .choose-box{
        position: absolute;
        bottom: 5px;
        z-index: 100;
        right: -3px;
    }
    .delete-icon{
        position: absolute;
        top: 3px;
        font-size: 14px;
        z-index: 100;
        right: 5px;
        color: #999;
        cursor: pointer;
    }
</style>

<template>
    <div class="preview-main">
        <Button type="primary" @click="chooseImage">{{buttonText}}</Button>
        <Row class="margin-top-10">
            <CheckboxGroup v-model="chooseBox">
                <Col span="8" v-for="(item, index) in imageData" :key="index">
                    <Icon type="close-round" class="delete-icon" v-show="showCheckBox" @click.native="deleteFaceImage(index)"></Icon>
                    <Checkbox class="choose-box" size="large" :label="item.id" v-show="showCheckBox">
                    </Checkbox>
                    <Card class="card">
                        <center>
                            <img :src="item.model_image" class="face-image"/>
                        </center>
                    </Card>
                </Col>
            </CheckboxGroup>
        </Row>
    </div>
</template>

<script>
import { User } from '@/api'
import { imageUrl } from '@/util/env'
export default {
    data () {
        return {
            imageData: [
            ],
            chooseBox: [],
            isAvtive: 0,
            disable: false,
            showCheckBox: false,
            buttonText: '编辑'
        };
    },
    methods: {
        chooseImage() {
            const userId = this.$route.params.id;
            if(this.showCheckBox === true) {
                this.showCheckBox = false;
                this.buttonText = "编辑";
                if (this.chooseBox.length === 0 && this.isAvtive === 0) {
                    return;
                } else if (this.chooseBox.length === 1 && this.isAvtive === this.chooseBox[0]) { 
                    return;
                }
                let modelId = 0;
                if (this.chooseBox.length === 1) modelId = this.chooseBox[0];
                User.activeModel({
                    userId,
                    modelId
                }).then(result => {
                    if (this.chooseBox.length === 1) {
                        this.isAvtive = this.chooseBox[0];
                    } else this.isAvtive = 0;
                    this.$Message.info("修改完成")
                })
            } else {
                this.showCheckBox = true;
                this.buttonText = "完成";
            }
        },
        deleteFaceImage(index) {
            this.$Modal.confirm({
                title: '删除数据',
                content: '<p>是否删除此条数据?</p>',
                onOk: () => {
                    this.deleteCheckBox(this.imageData[index].id)
                    this.imageData.splice(index, 1);
                    this.$Message.info('删除成功');
                }
            });
        },
        deleteCheckBox(id) {
            for (let i=0; i<this.chooseBox.length; i++) {
                if (this.chooseBox[i] === id) {
                    this.chooseBox.splice(i, 1);
                    break;
                }
            }
        }
    },
    async mounted () {
        // getData
        const userId = this.$route.params.id;
        const data = await User.getFace({userId});
        for (const item of data) {
            if (item.is_active === 1) {
                this.chooseBox.push(item.id);
                this.isAvtive = item.id;
            }
            item.model_image = imageUrl + item.model_image.substring(6);
        }
        this.imageData = data;
    },
    watch: {
        chooseBox(val, old) {
            if (val.length>1) {
                const id = val[val.length-1];
                this.chooseBox = [];
                this.chooseBox.push(id);
            }
        }
    }
}
</script>
