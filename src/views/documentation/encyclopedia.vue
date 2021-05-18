<template >
    <div style="background-color: #f3f5f4">
        <el-container class="el-container">
            <el-header style="background-color: #A6D2FF">
                <UltramanHeader></UltramanHeader>
                <el-button type="primary">我要贡献</el-button>
            </el-header>
            <div v-for="(item,i) in encyclopediaDataList">
                <el-row class="el-row-h1" :id="item.id">
                    <el-col :span="12" style="font-size: 26px;">{{item.ultramanName1}}</el-col>
                    <el-col :span="12" style="font-size: 26px;">{{item.ultramanTransformPerson1}}</el-col>
                </el-row>
                <el-row class="el-row-image">
                    <el-col>
                        <img :src="item.ultramanImage1" style="height: 360px">
                    </el-col>
                </el-row>
                <el-row class="el-row-h1">
                    <el-col :span="12" style="font-size: 26px;">{{item.ultramanTeam}}</el-col>
                </el-row>
                <el-row class="el-row-image">
                    <el-col>
                        <img :src="item.ultramanImage3">
                    </el-col>
                </el-row >
                <el-row class="el-row-h1">

                </el-row>
            </div>


        </el-container>
    </div>

</template>
<script>
    import UltramanHeader from '../../components/head/UltramanHeader'
    //var username = this.$store.getters.getUser.username;
    export default {
        name: 'encyclopedia',
        data() {
            return {
                //设置调用封装头部模板时是否显示模板自定义图片 0为不显示其他都为显示
                showImageOrHideImage: 0,

                encyclopediaDataList: {
                    id: 0,
                    ultraman_name_1: '',
                    ultraman_image_1: '',
                    ultraman_name_2: '',
                    ultraman_image_2: '',
                    ultraman_name_3: '',
                    ultraman_image_3: '',
                    transfiguration: '',
                    ultraman_transform_person_1: '',
                    ultraman_transform_person_image_1: '',
                    ultraman_transform_person_2: '',
                    ultraman_transform_person_image_2: '',
                    ultraman_transform_person_3: '',
                    ultraman_transform_person_image_3: '',
                    ultraman_transform_person_4: '',
                    ultraman_transform_person_image_4: '',
                    ultraman_transform_person_5: '',
                    ultraman_transform_person_image_5: '',
                    ultraman_team: '',
                    ultraman_team_year: 0,
                    ultraman_team_history: '',
                    ultraman_team_image: '',
                    aircraft_or_car_name_1: '',
                    aircraft_or_car_name_2: '',
                    aircraft_or_car_name_3: '',
                    aircraft_or_car_name_4: '',
                    aircraft_or_car_name_5: '',
                    aircraft_or_car_image_1: '',
                    aircraft_or_car_image_2: '',
                    aircraft_or_car_image_3: '',
                    aircraft_or_car_image_4: '',
                    aircraft_or_car_image_5: '',
                    ultraman_team_person_1: '',
                    ultraman_team_image_1: '',
                    ultraman_team_person_details_1: '',
                    ultraman_team_person_2: '',
                    ultraman_team_image_2: '',
                    ultraman_team_person_details_2: '',
                    ultraman_team_person_3: '',
                    ultraman_team_image_3: '',
                    ultraman_team_person_details_3: '',
                    ultraman_team_person_4: '',
                    ultraman_team_image_4: '',
                    ultraman_team_person_details_4: '',
                    ultraman_team_person_5: '',
                    ultraman_team_image_5: '',
                    ultraman_team_person_details_5: '',
                    ultraman_team_person_6: '',
                    ultraman_team_image_6: '',
                    ultraman_team_person_details_6: '',
                    ultraman_team_person_7: '',
                    ultraman_team_image_7: '',
                    ultraman_team_person_details_7: '',
                    ultraman_team_person_8: '',
                    ultraman_team_image_8: '',
                    ultraman_team_person_details_8: '',
                    create_username: '',
                    create_time: '',
                    create_code: '',
                    update_username: '',
                    update_time: '',
                    update_code: '',
                    status: '',
                }
            }
        },
        created() {
            this.getEncyclopediaData();
        },
        components: {
            UltramanHeader
        },
        methods: {
            getEncyclopediaData() {
                var _this = this;
                this.$axios.post('http://localhost:8086/encyclopedia/getList', 'zero').then((res) => {
                    if (res.data.code == 0) {
                        _this.encyclopediaDataList = res.data.data;
                    }
                }).catch((res) => {
                    console.log('发送请求失败!');
                });
            }
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