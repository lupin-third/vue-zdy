<template>
    <el-form>
        <div>

        </div>
        <div class="upper-right-corner" style="list-style-type: none">
            <li title="欢迎您">Welcome To M78 |{{this.$store.getters.getUser.username}}|</li>
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