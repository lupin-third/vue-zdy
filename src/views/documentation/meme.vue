<template>
        <el-form>
            <div>
                <UltramanHeader></UltramanHeader>
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
</style>