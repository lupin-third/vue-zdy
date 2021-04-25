<template>

    <div :style="fullWidthAndFullHeight"
         :class="[this.$store.getters.getUser.type=='0'?'login-ultraman-bg':'login-ultraseven-bg']">


        <el-form>
            <!--        <div class="head">-->
            <!--            <img src="../assets/head-test.png"/>-->
            <!--        </div>-->
            <div class="upper-right-corner" style="list-style-type: none">
                <li title="欢迎您">Welcome To M78 |{{this.$store.getters.getUser.username}}|</li>
            </div>
            <el-row>
                <el-col :span="24">
                </el-col>
            </el-row>
            <el-row style="margin-top: 10%">
                <el-col :span="2" v-for="(item,index) in this.NavigationBar" :key="index">
                    <div class="grid-content" v-if="index<3||index>8"></div>
                    <div class="grid-content" v-else>
                        <el-button type="primary">{{item}}</el-button>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <div class="div-center margin-bottom-15 font-normal">
                    <span class="span">
                        <div class="">
                            <a href="//www.baidu.com" class="font-normal hover-blue"  target="_blank">
                                <span>动画</span>
                            </a>

                        </div>
                    </span>
                    <span class="span">
                        <div>
                            <a href="//www.baidu.com" class="font-normal hover-blue"  target="_blank">
                                <span>音乐</span>
                            </a>

                        </div>
                    </span>
                    <span class="span">
                        <div>
                            <a href="www.baidu.com" class="font-normal hover-blue"  target="_blank">
                                <span>舞蹈</span>
                            </a>

                        </div>
                    </span>
                    <span class="span">
                        <div>
                            <a href="www.baidu.com" class="font-normal hover-blue"  target="_blank">
                                <span>知识</span>
                            </a>

                        </div>
                    </span>
                    <span class="span">
                        <div>
                            <a href="www.baidu.com" class="font-normal hover-blue"  target="_blank">
                                <span>生活</span>
                            </a>

                        </div>
                    </span>
                    <span class="span">
                        <div>
                            <a href="www.baidu.com" class="font-normal hover-blue"  target="_blank">
                                <span>时尚</span>
                            </a>

                        </div>
                    </span>
                    <span class="span">
                        <div>
                            <a href="www.baidu.com" class="font-normal hover-blue"  target="_blank">
                                <span>娱乐</span>
                            </a>

                        </div>
                    </span>
                    <span class="span">
                        <div>
                            <a href="www.baidu.com" class="font-normal hover-blue"  target="_blank">
                                <span>放映</span>
                            </a>

                        </div>
                    </span>

                </div>
                <div class="div-center ">
                    <span class="span">
                        <div class="">
                            <a href="//www.baidu.com" class="font-normal hover-blue"  target="_blank">
                                <span>番剧</span>
                            </a>

                        </div>
                    </span>
                    <span class="span">
                        <div>
                            <a href="//www.baidu.com" class="font-normal hover-blue"  target="_blank">
                                <span>国创</span>
                            </a>

                        </div>
                    </span>
                    <span class="span">
                        <div>
                            <a href="www.baidu.com" class="font-normal hover-blue" target=" _blank">
                                <span>游戏</span>
                            </a>

                        </div>
                    </span>
                    <span class="span">
                        <div>
                            <a href="www.baidu.com" class="font-normal hover-blue"  target="_blank">
                                <span>数码</span>
                            </a>

                        </div>
                    </span>
                    <span class="span">
                        <div>
                            <a href="www.baidu.com" class="font-normal hover-blue"  target="_blank">
                                <span>鬼畜</span>
                            </a>

                        </div>
                    </span>
                    <span class="span">
                        <div>
                            <a href="www.baidu.com" class="font-normal hover-blue"  target="_blank">
                                <span>资讯</span>
                            </a>

                        </div>
                    </span>
                    <span class="span">
                        <div>
                            <a href="www.baidu.com" class="font-normal hover-blue"  target="_blank">
                                <span>影视</span>
                            </a>

                        </div>
                    </span>
                    <span class="span">
                        <div>
                            <a href="www.baidu.com" class="font-normal hover-blue"  target="_blank">
                                <span>更多</span>
                            </a>

                        </div>
                    </span>
                </div>
            </el-row>
            <!--            <el-row>-->
            <!--                <el-col :span="8">-->
            <!--                    <div class="grid-content bg-purple"></div>-->
            <!--                </el-col>-->
            <!--                <el-col :span="8">-->
            <!--                    <div class="grid-content bg-purple-light"></div>-->
            <!--                </el-col>-->
            <!--                <el-col :span="8">-->
            <!--                    <div class="grid-content bg-purple"></div>-->
            <!--                </el-col>-->
            <!--            </el-row>-->
            <!--            <el-row>-->
            <!--                <el-col :span="6">-->
            <!--                    <div class="grid-content bg-purple"></div>-->
            <!--                </el-col>-->
            <!--                <el-col :span="6">-->
            <!--                    <div class="grid-content bg-purple-light"></div>-->
            <!--                </el-col>-->
            <!--                <el-col :span="6">-->
            <!--                    <div class="grid-content bg-purple"></div>-->
            <!--                </el-col>-->
            <!--                <el-col :span="6">-->
            <!--                    <div class="grid-content bg-purple-light"></div>-->
            <!--                </el-col>-->
            <!--            </el-row>-->
            <!--            <el-row>-->
            <!--                <el-col :span="4">-->
            <!--                    <div class="grid-content bg-purple"></div>-->
            <!--                </el-col>-->
            <!--                <el-col :span="4">-->
            <!--                    <div class="grid-content bg-purple-light"></div>-->
            <!--                </el-col>-->
            <!--                <el-col :span="4">-->
            <!--                    <div class="grid-content bg-purple"></div>-->
            <!--                </el-col>-->
            <!--                <el-col :span="4">-->
            <!--                    <div class="grid-content bg-purple-light"></div>-->
            <!--                </el-col>-->
            <!--                <el-col :span="4">-->
            <!--                    <div class="grid-content bg-purple"></div>-->
            <!--                </el-col>-->
            <!--                <el-col :span="4">-->
            <!--                    <div class="grid-content bg-purple-light"></div>-->
            <!--                </el-col>-->
            <!--            </el-row>-->
        </el-form>
    </div>
</template>
<script>

    export default {
        created() {
            this.getParams();
        },
        name: "UltraMain",
        data() {
            return {
                NavigationBar: ['', '', '', '', '', '', '', '', '', '', '', ''],
                username: '',
                fullWidthAndFullHeight: 'height:' + (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) + 'px;' + 'width:' + (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) + 'px',


            }
        },
        methods: {
            //跳转前页面发送数据到后端经过处理再发送到跳转前页面，在跳转前页面通过 _this.$router.push的方式将跳转的url及数据传到此处111
            getParams() {
                const routerParams = this.$route.query.username;
                this.username = routerParams;
            },
        },
        watch: {
            '$route': 'getParams'
        }
    }
</script>
<style>
@import "../assets/css/zdyDiv.css";
@import "../assets/css/zdySpan.css";
@import "../assets/css/zdyForm.css";
    .upper-right-corner {
        line-height: 50px;
        height: 50px;
        padding-left: 20px;
        margin-left: 10px;
        position: absolute;
        right: 10px;
        top: 0;
        font-family: "微软雅黑", "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1";
        color: #fff;
        text-shadow: 0 1px 1px 0;
        white-space: nowrap;
    }
    .fontStyle{
        font-family: "微软雅黑", "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1";
        color: #212121;
    }
    .head {
        width: 100%;
        height: 180px;
    }

    .el-row {
        margin-bottom: 20px;

        /*&*/
        /*:last-child {*/
        /*    margin-bottom: 0;*/
        /*}*/

    }

    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .grid-content-head {
        border-radius: 4px;
        height: 180px;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .navigationFont{
        display: flex;
        height: 34px;
    }

</style>
