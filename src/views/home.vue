<template>
    <div>
        <el-container style="height: 100%; border: 1px solid #eee">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu :default-openeds="['1', '2']" default-active="1-1">
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-document"></i>接口管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">项目管理</el-menu-item>
                            <el-menu-item index="1-2">接口信息</el-menu-item>
                            <el-menu-item index="1-3">业务配置</el-menu-item>
                            <el-menu-item index="1-4">接口用例</el-menu-item>
                            <el-menu-item index="1-5">内置函数</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-menu"></i>报告管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="2-1">测试报告</el-menu-item>
                            <el-menu-item index="2-2">定时任务</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-setting"></i>其它程序</template>
                        <el-menu-item-group>
                            <el-menu-item index="3-1">小工具</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-setting"></i>系统管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="4-1">用户管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <el-container>
                <el-header style="text-align: right; font-size: 12px">
                    <el-dropdown>
                        <i class="el-icon-user-solid" style="margin-right: 15px"></i>
                        <el-dropdown-menu slot="dropdown">
                            <div @click="userInfo">
                                <el-dropdown-item>用户信息</el-dropdown-item>
                            </div>
                            <div @click="userLogout">
                                <el-dropdown-item>登出</el-dropdown-item>
                            </div>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <span>{{userName}}</span>

                </el-header>

                <!--            <el-main>-->
                <!--                <el-table :data="tableData">-->
                <!--                    <el-table-column prop="date" label="日期" width="140">-->
                <!--                    </el-table-column>-->
                <!--                    <el-table-column prop="name" label="姓名" width="120">-->
                <!--                    </el-table-column>-->
                <!--                    <el-table-column prop="address" label="地址">-->
                <!--                    </el-table-column>-->
                <!--                </el-table>-->
                <!--            </el-main>-->
            </el-container>
        </el-container>
        <el-dialog title="用户信息" :visible.sync="dialogTableVisible">
            <el-table :data="gridData">
                <el-table-column property="id" label="id" width="100"></el-table-column>
                <el-table-column property="create_time" label="注册时间" width="150"></el-table-column>
                <el-table-column property="last_login_time" label="最近登录时间" width="150"></el-table-column>
                <el-table-column property="name" label="姓名" width="200"></el-table-column>
                <el-table-column property="address" label="地址"></el-table-column>
            </el-table>
        </el-dialog>
    </div>

</template>


<script>
    import {logout, getLoginUserInfo} from "../api/user";

    export default {
        name: "home",
        data() {
            return {
                userName: '用户',
                dialogTableVisible: false,
                gridData: '',
            }

        },
        methods: {
            userLogout() {
                logout().then(res => {
                    let code = res.data.code;
                    if (code === 200) {
                        this.$router.push('/login')
                        this.$notify({
                            title: "登出成功",
                            type: "success"
                        })
                    } else {
                        this.$notify({
                            title: "登出成功",
                            type: "success"
                        })
                    }

                })
            },
            userInfo() {
                getLoginUserInfo().then(res => {
                    let code = res.data.code;
                    if (code === 200) {
                        this.gridData = res.data.data;
                        this.dialogTableVisible = true;
                    }
                })
            },
        },
        created() {
            getLoginUserInfo().then(res => {
                let code = res.data.code;
                if (code === 200) {
                    this.userName = res.data.data[0].name;
                }
            })
        },

    };
</script>

<style >
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>