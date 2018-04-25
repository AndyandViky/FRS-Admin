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
                            <img :src="item.path" class="face-image"/>
                        </center>
                    </Card>
                </Col>
            </CheckboxGroup>
        </Row>
    </div>
</template>

<script>
export default {
    data () {
        return {
            imageData: [
                {
                    id: 1,
                    path: "http://localhost:8000/images/face/8EyQv8rnWG-M4yCVDLrHkzid.jpg",
                },
                {
                    id: 2,
                    path: "http://localhost:8000/images/face/24wOVJgOE5bywIGsg4KF7_2d.jpg",
                },
                {
                    id: 3,
                    path: "http://localhost:8000/images/face/KJmJqH9TILRviQhs-aNJrjAq.jpg",
                },
            ],
            chooseBox: [1],
            disable: false,
            showCheckBox: false,
            buttonText: '编辑'
        };
    },
    methods: {
        chooseImage() {
            if(this.showCheckBox === true) {
                this.showCheckBox = false;
                this.buttonText = "编辑";
                this.$Message.info("修改完成")
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
                    console.log(this.chooseBox)
                    break;
                }
            }
        }
    },
    mounted () {
        // getData
    },
    watch: {
        chooseBox(val, old) {
            if (val.length > 3) {
                this.chooseBox.splice(3, 1)
                this.$Message.warning("最多只能选择三张图片");
            }
        }
    }
}
</script>
