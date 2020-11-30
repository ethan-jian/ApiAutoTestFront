<template>
    <div class="home">
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
                        <i class="el-icon-setting"></i>
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
    export default {
        name: "home",
        data() {
            return {}
        },
        methods: {
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


</style>
