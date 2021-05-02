<template>
        <el-form>
            <div class="animated flash">
                <UltramanHeader></UltramanHeader>
            </div>
            <div>
                <img src="../../assets/images/logo.png" class="lx02">
            </div>
            <div>
                <span class="spanboll" style="top: 230.991px; left: 1834.49px; box-shadow: rgb(223, 153, 32) 0px 0px 2rem inset;">

                </span>
            </div>

        </el-form>
</template>
<script>
    import UltramanHeader from "../../components/head/UltramanHeader";
    export default {
        name:'meme',
        data(){
            return{
            }
        },
        components:{
            UltramanHeader
        },

    }
</script>
<style>
    @import "../../assets/css/zdyForm.css";
    @import "../../assets/css/zdySpan.css";
    .lx02{
        animation: my_02 2.5s ease infinite;
        animation-duration: 2.5s;
        animation-timing-function: ease;
        animation-delay: 0s;
        animation-iteration-count: infinite;
        animation-direction: normal;
        animation-fill-mode: none;
        animation-play-state: running;
        animation-name: my_02;
        right: 10px;
        top: -45px;
        position: absolute;
    }
    .spanboll{
        transform: translate(-50%, -50%);
        border-radius: 9rem;
        height: 9rem;
        width: 9rem;
        display: block;
        position: absolute;
        opacity: 1;
        transition: box-shadow .5s ease-in-out, transform .07s ease-out, opacity .04s ease-in;
        transition-property: box-shadow, transform, opacity;
        transition-duration: 0.5s, 0.07s, 0.04s;
        transition-timing-function: ease-in-out, ease-out, ease-in;
        transition-delay: 0s, 0s, 0s;
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        user-select: none;
    }
</style>