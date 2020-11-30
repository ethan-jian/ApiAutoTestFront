<template>
    <div class="home">
        <div class="dropdown">
            <el-dropdown>
  <span class="el-dropdown-link">
      用户<i class="el-icon-arrow-down el-icon--right"></i>

  </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click="userInfo">用户信息</el-dropdown-item>
                    <el-dropdown-item @click="userLogout">登出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <el-row class="tac">
            <el-col :span="12">
                <el-menu
                        default-active="1"
                        class="el-menu-vertical-demo"
                >
                    <el-menu-item index="1">
                        <i class="el-icon-menu"></i>
                        <span slot="title">项目管理</span>

                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-document"></i>
                        <span slot="title">接口信息</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-document"></i>
                        <span slot="title">接口用例</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">报告管理</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {getLoginUserInfo, logout} from "../api/user";

    export default {
        name: "home",
        data() {
            return {}
        },
        methods: {
            userInfo(){

            },
            userLogout(){
                logout()
            },
            created() {

            },
            watch: {}
        }

    }
</script>

<style scoped>
    .home {
        width: 20px;
    }

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
        float: right;

    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

    .dropdown {
        position: absolute;
        width: 10px;
        height: 10px;
        right: 5%;
        top: 0;

        /*z-index: 100;*/
    }


</style>
