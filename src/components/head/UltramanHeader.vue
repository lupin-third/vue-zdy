<template>
    <el-form>
    <div class="upper-right-corner" style="list-style-type: none">
        <li title="欢迎您">Welcome To M78 |{{this.$store.getters.getUser.username}}|</li>
    </div>
    <div class="head-picture">
        此处为图片
    </div>
    </el-form>
</template>
<script>
    export default {
        data() {
            return {}
        },

    }
</script>
<style>
    @import "../../assets/css/zdyForm.css";
</style>