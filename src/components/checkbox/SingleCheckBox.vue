<template>
<!--    可复用单选组件，在父组件里写参数传入list，参数格式{checked: false,name:'初代系'},最终在父组件调用此子组件时使用v-bind绑定list-->
    <el-checkbox-group v-model="checkList" @change="changeCheck" class="el-checkbox__label">
        <el-checkbox v-for="(item,index) in list" :key="index" :label="index" :name="item.name" :checked="item.checked">{{item.name}}</el-checkbox>
    </el-checkbox-group>
</template>

<script>
    export default {
        data() {
            return {
                checkList: [],
            };
        },
        props:['list'],
        methods: {
            // 使用多选按钮实现单选功能
            changeCheck () {
                this.checkList.length > 1 && this.checkList.shift();
                //var val = this.checkList.length>0?this.checkList[0]:'';
                this.$emit('selectVal', this.checkList[0]);
                //console.log(val);
            }
        },
    };
</script>
<style>
</style>