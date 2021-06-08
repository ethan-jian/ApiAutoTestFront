<template>
    <div>
        <el-container style="height: 100%; border: 1px solid #eee">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu
                        :default-openeds="['1', '2']"
                        default-active="1-1"
                        @select="handleSelect"
                >
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-document"></i>接口管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="project">项目管理</el-menu-item>
                            <el-menu-item index="module">模块管理</el-menu-item>
                            <el-menu-item index="interface">接口信息</el-menu-item>
                            <el-menu-item index="caseSet">用例集合</el-menu-item>
                            <el-menu-item index="case">接口用例</el-menu-item>
                            <el-menu-item index="builtInfunc">内置函数</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-menu"></i>报告管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="testReport">测试报告</el-menu-item>
                            <el-menu-item index="timeTask">定时任务</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="otherProcedure">
                        <template slot="title"><i class="el-icon-setting"></i>其它程序</template>
                        <el-menu-item-group>
                            <el-menu-item index="smallTool">小工具</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="systemManage">
                        <template slot="title"><i class="el-icon-setting"></i>系统管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="userManage">用户管理</el-menu-item>
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

                <el-main>
                    <div class="right-context">
                        <router-view/>
                    </div>
                </el-main>

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
    // import project from "./api_manage/project_manage/project";

    export default {
        name: "home",
        // comments: {
        //     'project': project
        // },
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
            handleSelect(index) {
                this.activeIndex = index;
                switch (index) {
                    case "project":
                        this.$router.push('/project');
                        break;
                    case "module":
                        this.$router.push('/module');
                        break;
                    case "interface":
                        this.$router.push('/interface');
                        break;
                    case "caseSet":
                        this.$router.push('/caseSet');
                        break;
                    case "case":
                        this.$router.push('/case');
                        break;
                    case "builtInfunc":
                        this.$router.push('/builtInfunc');
                        break;
                    case "testReport":
                        this.$router.push('/testReport');
                        break;
                    case "timeTask":
                        this.$router.push('/timeTask');
                        break;
                    case "otherProcedure":
                        this.$router.push('/otherProcedure');
                        break;
                    case "smallTool":
                        this.$router.push('/smallTool');
                        break;
                    case "systemManage":
                        this.$router.push('/systemManage');
                        break;

                    case "userManage":
                        this.$router.push('/userManage');
                        break;


                }
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
    }

</script>

<style>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>