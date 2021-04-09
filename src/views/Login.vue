<template>
    <el-container v-bind:style="fullWidthAndFullHeight">
        <!--        <el-header>Header</el-header>-->
        <!--            <el-aside width="960px" class="login-left-bg"></el-aside>-->
        <el-main
                :class="[this.ruleForm.val==''?'login-ultraman-bg':this.ruleForm.val==1?'login-ultraseven-bg':'login-ultraman-bg']">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm "
                     label-width="100px">
                <el-form-item class="single-checkbox" prop="checkboxlist">
                    <SingleCheckBox v-bind:list="list" @selectVal="selectVal"></SingleCheckBox>
                </el-form-item>

                <el-form-item prop="ultraname" class="username-and-password">
                    <el-input type="text" maxlength="12" v-model="ruleForm.ultraname"></el-input>
                </el-form-item>
                <el-form-item prop="ultrapassword" class="username-and-password">
                    <el-input type="password" v-model="ruleForm.ultrapassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="login-and-reset">
                    <el-button type="primary" @click="submitForm('ruleForm')" style="width: 280px;">进入</el-button>
                    <!--                        <el-button @click="resetForm('ruleForm')">重置</el-button>-->
                </el-form-item>
            </el-form>
            <!--                赛文红#D71A21-->
        </el-main>
        <!--        <el-footer>M78光之国司令警备室</el-footer>-->
    </el-container>
</template>

<script>
    import SingleCheckBox from '../components/SingleCheckBox'

    export default {
        name: "Login",
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请插入奥特钥匙'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    ultraname: 'zero',
                    ultrapassword: '0',
                    val: -1,
                    checkboxlist: []
                },
                rules: {
                    ultrapassword: [
                        {validator: validatePass, trigger: 'blur', required: true},
                    ],
                    ultraname: [
                        {required: true, message: '请写入奥特标识', trigger: 'blur'},
                        {min: 1, max: 12, message: '奥特标识的长度在1-12个奥特字符', trigger: 'blur'},
                    ]
                },
                fullWidth: 'width:' + (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) + 'px',
                fullHeight: 'height:' + (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) + 'px',
                fullWidthAndFullHeight: 'height:' + (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) + 'px;' + 'width:' + (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) + 'px',

                list: [
                    {checked: false, name: '初代系'},
                    {checked: false, name: '赛文系'},
                ]
            }
        },
        components: {
            SingleCheckBox
        },
        watch: {
            fullHeight(val) {//监控浏览器变化
                if (!this.timer) {
                    this.fullHeight = val;
                    this.timer = true;
                    let that = this;
                    setTimeout(function () {
                        that.timer = false
                    }, 400)
                }
            }
        },
        methods: {
            submitForm(formName) {
                const _this = this
                if (_this._data.ruleForm.val == -1) {
                    this.$message({
                        showClose: true,
                        message: '请勾选您偏向的奥特系列',
                        type: 'warning'
                    });
                    return;
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 提交逻辑
                        this.$axios.post('http://localhost:8086/login', this.ruleForm).then((res) => {
                            const token = res.headers['authorization']
                            _this.$store.commit('SET_TOKEN', token)
                            _this.$store.commit('SET_USERINFO', res.data.data)
                            // _this.$router.push("/blogs")
                            debugger;
                            _this.$router.push(
                                {
                                    //跳转路径
                                    path: '/ultra/main',
                                    //跳转传参
                                    // query: {
                                    //     username: res.data.data.username
                                    // }
                                }
                            )
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                debugger;
                this.$refs[formName].resetFields();
            },
            selectVal: function (val) {
                console.log(val);
                this.ruleForm.val = val;
            }
        },
        mounted() {
            // this.$notify({
            //     title: '看这里：',
            //     message: '关注公众号：MarkerHub，回复【vueblog】，领取项目资料与源码',
            //     duration: 1500
            // });
        }
        // mounted() {
        //     this.get_bodyHeight();
        // },
        // methods: {
        //     get_bodyHeight() {
        //         const that = this;
        //         window.onresize = () => {
        //             return (() => {
        //                 window.fullHeight = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        //                 that.fullHeight = window.fullHeight
        //             })()
        //         }
        //     }
        // }
    }
</script>

<style>

    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;

    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
        height: 100%;
        bottom: 0;
        left: 0;
        top: 70px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    body > .el-container {
        margin-bottom: 0px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

    .login-ultraseven-bg {
        background: url(../assets/UltraSeven-min-4k.jpg) center center no-repeat;
        background-size: cover;
        /*left: 10%;*/
        /*top: 50%;*/
        /*margin-top:-200px;*/
    }

    .login-ultraman-bg {
        background: url(../assets/Ultraman-min-4k.jpg) center center no-repeat;
        background-size: cover;
    }

    .single-checkbox {
        margin-right: 700px;
        margin-left: 600px;
        margin-top: 600px;
    }

    .username-and-password {
        margin-right: 800px;
        margin-left: 700px;
    }

    .login-and-reset {
        margin-right: 700px;
        margin-left: 600px;
    }
</style>