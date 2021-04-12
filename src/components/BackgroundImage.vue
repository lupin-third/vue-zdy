<template>
    <div class="bg" >
        <div class="img_box">
            <img src="src/assets/images/Ultraman-min-1k.jpg" width="fullWidth"/>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                fullWidth: 'width:' + (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) + 'px',
                fullHeight: 'height:' + (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) + 'px',
                fullWidthAndFullHeight: 'height:' + (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) + 'px;' + 'width:' + (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) + 'px',
                //以下两个暂时不用
                curWidth: '',
                curHeight: ''
            }
        },
        created() {
            //添加监听，监听设备宽高
            window.addEventListener('resize', this.handleResize);
        },
        beforeDestroy:function () {
            //销毁监听
            window.removeEventListener('resize', this.handleResize);
        },
        computed:{
            //处理设备宽高
        },
        methods:{
            handleResize(event){
                this.fullWidth = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) - 16
                this.fullHeight = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) - 16
                this.curWidth = this.fullWidth + 'px'
                this.curHeight = this.fullHeight + 'px'
                console.log('curWidth=' + this.curWidth +',curHeight=' + this.curHeight)

            }
        }
    }
</script>
<style>
    .bg{
        padding: 0;
        margin: 0;
    }
    .bg .img_box{
        /*width: 100%;height: 100%;*/
        /*background-size: cover;*/
    }
    .bg .img_box img{
        /*position: fixed; !* 固定图片位置 *!*/
        background: center center no-repeat;
        background-size: cover;
    }
    .login-ultraseven-bg{
        background: url(../assets/images/UltraSeven-min-4k.jpg) center center no-repeat;
        background-size: cover;
        /*left: 10%;*/
        /*top: 50%;*/
        /*margin-top:-200px;*/
    }
    .login-ultraman-bg{
        background: url(../assets/images/Ultraman-min-4k.jpg) center center no-repeat;
        background-size: 100% 100%;
        width: 100%;
        height: 100%;
        position: fixed;
    }
</style>