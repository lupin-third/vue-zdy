<template>
    <el-container class="el-container">
        <el-header style="background-color: #A6D2FF">
            <UltramanHeader></UltramanHeader>
        </el-header>
        <div>
            <el-row class="el-row-h1">
                <span style="font-size: 36px;">ULTRAMAN</span>
<!--                <span>&nbsp;初代奥特曼</span>-->
            </el-row>
            <el-row class="el-row-image">
                <img src="../../assets/images/ultraman/GRLJYIK6Q}HXXDZAEMB88SM.png">
            </el-row>
            <el-row class="el-row-h2">
                <span style="font-size: 26px;">科学特搜队</span>
                <!--                <span>&nbsp;初代奥特曼</span>-->
            </el-row>
            <el-row class="el-row-image">
                <el-col><img src="../../assets/images/ultraman/tesoudui.png"></el-col>
                <el-col>111</el-col>
            </el-row>
        </div>
        <div>
            <el-row class="el-row-h1">
                <span style="font-size: 36px;">ULTRA SEVEN</span>
            </el-row>
        </div>

    </el-container>
</template>
<script>
    import UltramanHeader from '../../components/head/UltramanHeader'

    export default {
        name: 'encyclopedia',
        data() {
            return {
                //设置调用封装头部模板时是否显示模板自定义图片 0为不显示其他都为显示
                showImageOrHideImage: 0
            }
        },
        components: {
            UltramanHeader
        }
    }
</script>
<style>
    @import "../../assets/css/zdyFont.css";
    @import "../../assets/css/zdyForm.css";

    .el-container {
        height: 100%;
    }

    .el-main {
        background-color: #f3f5f4;
    }

</style>