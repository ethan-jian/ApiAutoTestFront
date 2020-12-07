<template>
    <div class="home">
        <div class="dropdown">
            <el-dropdown>
                <el-button type="primary">
                    用户<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <div @click="userLogout">
                        <el-dropdown-item>登出</el-dropdown-item>
                    </div>
                    <div @click="userInfo">
                        <el-dropdown-item>用户信息</el-dropdown-item>
                    </div>

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
        <div class="popover">
            <el-popover v-model="open"
                        placement="right"
                        width="400"
                        trigger="click">
                <el-table :data="gridData">
                    <el-table-column width="61" property="id" label="用户id"></el-table-column>
                    <el-table-column width="100" property="create_time" label="注册时间"></el-table-column>
                    <el-table-column width="105" property="last_login_time" label="最近登录时间"></el-table-column>
                    <el-table-column width="100" property="name" label="用户名"></el-table-column>
                </el-table>
                <el-button type="text" @click="closePopover">确定</el-button>
            </el-popover>
        </div>
    </div>

</template>

<script>
    import {logout, getLoginUserInfo} from "../api/user";

    export default {
        name: "home",
        data() {
            return {
                open: false,

                gridData: []
            }
        },
        methods: {
            closePopover() {
                this.open = false
            },
            userInfo() {
                getLoginUserInfo().then(res => {
                    let code = res.data.code;
                    if (code === 200) {
                        this.gridData = res.data.data
                        this.open = true
                    } else {
                        this.$notify({
                            title: "获取用户信息失败",
                            type: "error"
                        })
                    }

                })
            },
            userLogout() {
                logout().then(data => {
                    let code = data.data.code;
                    if (code === 200) {
                        this.$router.push("/login")
                        this.$notify({
                            title: "登出成功",
                            type: "success"
                        })
                    } else {
                        this.$notify({
                            title: "登出失败",
                            type: "error"
                        })
                    }
                })
            },
            created() {

            },
            // watch: {}
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
        /*float: right;*/

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

    .popover {
        position: absolute;
        top: 0%;
        right: 28%;
    }


</style>
