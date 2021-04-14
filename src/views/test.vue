<template>
    <el-form>
    <Verify
            @succes="'success'"
            :mode="'pop'"
            :captchaType="'blockPuzzle'"
            :imgSize="{width:'330px',height:'155px'}"
            ref="verify">
    </Verify>
    <!--    mode="pop"模式-->
    <button @click="useVerify">调用验证组件</button>
    </el-form>
</template>

<script>
    import Verify from "../components/verifition/Verify.vue";
    export default {
        name: 'app',
        components:{
            Verify
        },
        methods:{
            success(params){

            },
            useVerify(){
                this.$refs.verify.show()
            }
        },

    }
</script>

<style>

</style>