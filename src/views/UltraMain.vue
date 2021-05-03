<template>

    <div :style="fullWidthAndFullHeight"
         :class="[this.$store.getters.getUser.type=='0'?'login-ultraman-bg':'login-ultraseven-bg']">


        <el-form>
            <div>
                <MainHeader></MainHeader>
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
                            <a href="meme" class="font-normal hover-blue"  target="_blank">
                                <span>名梗</span>
                            </a>

                        </div>
                    </span>
                    <span class="span">
                        <div>
                            <a href="encyclopedia" class="font-normal hover-blue"  target="_blank">
                                <span>百科</span>
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
        </el-form>
    </div>
</template>
<script>

    import SingleCheckBox from "../components/checkbox/SingleCheckBox";
    import Verify from "../components/verifition/Verify";
    import MainHeader from '../components/head/MainHeader'

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
        },
        components: {
            MainHeader
        },
    }
</script>
<style>
@import "../assets/css/zdyDiv.css";
@import "../assets/css/zdySpan.css";
@import "../assets/css/zdyForm.css";
</style>
