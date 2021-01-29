<template>
    <div>


        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="接口信息" name="first">
                <div style="position: absolute;
        left: 430px;
">
                    <el-input
                            style="width: 200px;float: left;"
                            placeholder="请输入项目名称"
                            v-model="kw"
                            clearable>
                    </el-input>
                    <el-button type="primary" @click="getListProject">查询</el-button>
                    <el-button @click="resetInput()">重置</el-button>
                </div>
                <el-table
                ref="multipleTable"
                :data="listApiData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="名称"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="desc"
                    label="描述"
                    width="120">
            </el-table-column>
            <el-table-column
                    label="项目"
                    width="120">
                <template slot-scope="scope">
                    <span v-if="scope.row.environment_type === '1'">测试环境</span>
                    <span v-if="scope.row.environment_type === '2'">开发环境</span>
                    <span v-if="scope.row.environment_type === '3'">线上环境</span>
                    <span v-if="scope.row.environment_type === '4'">备用环境</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="模块"
                    width="100">
                <template slot-scope="scope">{{ scope.row.user_name }}</template>
            </el-table-column>
            <el-table-column
                    label="创建时间"
                    width="120">
                <template slot-scope="scope">{{ scope.row.created_time }}</template>
            </el-table-column>
            <el-table-column
                    label="更新时间"
                    width="120">
                <template slot-scope="scope">{{ scope.row.update_time }}</template>
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="120">
                <template slot-scope="scope">
                    <!--                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
                    <el-button @click="catProject(scope.row.id)" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteProject(scope.row.id)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>

        </el-table>
            </el-tab-pane>

            <el-tab-pane label="接口配置" name="second">

            </el-tab-pane>
        </el-tabs>


        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes=pageSizes
                    :page-size=pageSize
                    layout="total, sizes, prev, pager, next, jumper"
                    :total=totalPage>
            </el-pagination>
        </div>

        <div style="position: absolute;top: 9.5%;right: 0">
            <el-button type="primary" plain @click="openAddproject">新增</el-button>
            <el-button type="warning" @click="deleteProject" plain>批量删除</el-button>
        </div>

        <el-dialog
                :title="title"
                :visible.sync="ApiDialogVisible"
                width="80%"
                :before-close="handleCloseProjectDialog">
            <div>
                <el-form :model="apiData" :rules="rules" ref="apiData" label-width="80px" class="demo-ruleForm">
                    <el-form-item label-position="left" label="接口名称" prop="apiName">
                        <el-input v-model="apiData.apiName" size="mini"></el-input>
                    </el-form-item>

                    <el-form-item label-position="left" label="项目名称" prop="projectId">
                        <el-select v-model="apiData.projectId"
                                   placeholder="请选择项目"
                                   @focus="getListProject"
                        >
                            <el-option v-for="item in apiData.projectList"
                                       :key="item.id"
                                       :label="item.name"
                                       :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label-position="left" label="模块名称" prop="projectId">
                        <el-select v-model="apiData.moduleId"
                                   placeholder="请选择模块"
                                   @focus="getProjectModule"
                        >
                            <el-option v-for="item in apiData.moduleList"
                                       :key="item.id"
                                       :label="item.name"
                                       :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label-position="left" label="接口地址" prop="url">
                        <el-input v-model="apiData.url" size="mini"></el-input>
                    </el-form-item>
                    <!--                     <el-form-item label-position="left" label="模块名称" prop="apiName">-->
                    <!--                        <el-input v-model="apiData.apiName" size="mini"></el-input>-->
                    <!--                    </el-form-item>-->
                    <el-form-item label="接口描述" prop="desc">
                        <el-input type="textarea" v-model="apiData.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('apiData')">发送</el-button>
                        <el-button type="primary" @click="submitForm('apiData')">保存</el-button>
                        <el-button @click="resetForm('apiData')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <span slot="footer" class="dialog-footer">
    <el-button @click="ApiDialogVisible = false">取 消</el-button>
                <!--    <el-button type="primary" @click="ApiDialogVisible = false">确 定</el-button>-->
  </span>
        </el-dialog>
    </div>
</template>

<script>

    // import {
    //     catProjectDetailInfo,
    //     deleteProjectInfo, editProjectInfo,
    //     // editProjectInfo,
    //     listProjectInfo
    // } from "../../../api/project";

    import {addApiInfo} from "../../api/api";
    import {
        catProjectModuleInfo,
        catProjectDetailInfo,
        deleteProjectInfo,
        editProjectInfo,
        listProjectInfo,
    } from "../../api/project";


    export default {
        inject: ['reload'],
        name: 'apiInfo',
        data() {
            return {
                title: '新增',
                kw: '',
                ApiDialogVisible: false,
                variableDialogVisible: false,
                currentPage: 1,
                pageSize: 10,
                pageSizes: [10, 20, 30, 40, 50],
                totalPage: 0,
                apiData: {
                    id: null,
                    ids: [],
                    apiName: null,
                    url: null,
                    moduleId: null,
                    testEnvironment: null,
                    devEnvironment: null,
                    onLineEnvironment: null,
                    bakEnvironment: null,
                    environment: null,
                    environment_type: '1',//测试环境
                    projectId: null,
                    funcFile: '',
                    desc: null,
                    variable: [],
                    headers: [],
                    environmentOptions: [],
                    projectList: [],
                    moduleList: [],
                },
                listApiData: [],

                multipleSelection: [],
                rules: {
                    apiName: [
                        {required: true, message: '请输入接口名称', trigger: 'blur'},
                        {min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur'}
                    ],
                    url: [
                        {required: true, message: '请输入接口地址', trigger: 'blur'},
                        {min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur'}
                    ],
                    projectId: [
                        {required: true, message: '请选择项目名称', trigger: 'change'}
                    ],
                    desc: [
                        {required: false, message: '请填写项目描述', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            openAddproject() {
                this.title = '新增';
                this.ApiDialogVisible = true;
                this.resetForm('apiData');
                this.apiData.variable = [];
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.getListProject();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                this.getListProject();
            },

            getEnvironment() {
                //locations是v-for里面的也是datas里面的值
                console.log()
            },
            deleteProject(id) {
                console.log(id)
                if (typeof id === "number") {
                    this.apiData.ids.push(id);
                }
                let postData = {
                    ids: this.apiData.ids
                };
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteProjectInfo(postData).then(res => {
                        let code = res.data.code;
                        if (code === 200) {
                            this.reload()
                        }
                    });
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            catProject(id) {
                this.title = '编辑';
                this.ApiDialogVisible = true;
                this.apiData.id = id;
                let postData = {
                    "id": id
                };

                catProjectDetailInfo(postData).then(res => {
                    let code = res.data.code;
                    // let message = res.data.message;
                    let resData = res.data.data[0];
                    if (code === 200) {
                        this.apiData.apiName = resData.name;
                        this.apiData.testEnvironment = resData.test_environment;
                        this.apiData.devEnvironment = resData.dev_environment;
                        this.apiData.onLineEnvironment = resData.online_environment;
                        this.apiData.bakEnvironment = resData.bak_environment;
                        this.apiData.desc = resData.desc;
                        this.apiData.environment_type = resData.environment_type;
                        if (this.apiData.environment_type === '1') {
                            this.apiData.environment = '测试环境';
                        } else if (this.apiData.environment_type === '2') {
                            this.apiData.environment = '开发环境';
                        } else if (this.apiData.environment_type === '3') {
                            this.apiData.environment = '线上环境';
                        } else if (this.apiData.environment_type === '4') {
                            this.apiData.environment = '备用环境';
                        }
                        this.getAllUser();
                        this.apiData.testUserId = resData.user_id_id;
                        this.apiData.variable = JSON.parse(resData.variables);
                    }
                })
            },

            editProject() {
                let postData = {
                    id: this.apiData.id,
                    name: this.apiData.apiName,
                    user_id_id: this.apiData.testUserId,
                    // environment: this.apiData.environment,
                    test_environment: this.apiData.testEnvironment,
                    dev_environment: this.apiData.devEnvironment,
                    online_environment: this.apiData.onLineEnvironment,
                    bak_environment: this.apiData.bakEnvironment,
                    environment_type: this.apiData.environment_type,
                    variables: JSON.stringify(this.apiData.variable),
                    desc: this.apiData.desc,
                };
                editProjectInfo(postData).then(res => {
                    let code = res.data.code;
                    let message = res.data.message;
                    if (code === 200) {
                        this.ApiDialogVisible = false;
                        this.reload()
                        this.resetForm('apiData')
                        this.$notify({
                            title: message,
                            type: "success"
                        })
                    } else {
                        this.$notify({
                            title: message,
                            type: "error"
                        })
                    }

                })
            },
            getSelectedEnvironmentType() {
                let selectedLabel = this.$refs.selectEnvironment.selected.label;
                if (selectedLabel === '测试环境') {
                    this.apiData.environment_type = '1';
                } else if (selectedLabel === '开发环境') {
                    this.apiData.environment_type = '2';
                } else if (selectedLabel === '线上环境') {
                    this.apiData.environment_type = '3';
                } else if (selectedLabel === '备用环境') {
                    this.apiData.environment_type = '4';
                }
            },

            addApi() {
                let postData = {
                    name: this.apiData.apiName,
                    url: this.apiData.url,
                    module_id: this.apiData.moduleId,
                    project_id: this.apiData.moduleId,
                    desc: this.apiData.desc,
                };
                addApiInfo(postData).then(res => {
                    let code = res.data.code;
                    let message = res.data.message;
                    if (code === 200) {
                        this.ApiDialogVisible = false;
                        this.reload()
                        this.resetForm('apiData')
                        this.$notify({
                            title: message,
                            type: "success"
                        })
                    } else {
                        this.$notify({
                            title: message,
                            type: "error"
                        })
                    }

                })


            },

            getListProject() {
                let postData = {
                    kw: this.kw,
                    sort: [{"direct": "DESC", "field": "created_time"}]

                };
                listProjectInfo(postData).then(res => {
                    let code = res.data.code;
                    let rsData = res.data.data
                    if (code === 200) {
                        console.log(rsData);
                        this.totalPage = res.data.totalCount;
                        this.apiData.projectList = rsData;

                    }
                })
            },

            getProjectModule() {
                let postData = {
                    id: this.apiData.projectId,
                };
                catProjectModuleInfo(postData).then(res => {
                    let code = res.data.code;
                    let rsData = res.data.data
                    if (code === 200) {
                        this.totalPage = res.data.totalCount;
                        this.apiData.moduleList = rsData;
                    }
                })
            },

            getEnvironments() {
                this.apiData.environmentOptions = []
                if (this.apiData.testEnvironment) {
                    this.apiData.environmentOptions.push({
                        label: '测试环境',
                        value: this.apiData.testEnvironment
                    });
                }
                if (this.apiData.devEnvironment) {
                    this.apiData.environmentOptions.push({
                        label: '开发环境',
                        value: this.apiData.devEnvironment
                    });
                }
                if (this.apiData.onLineEnvironment) {
                    this.apiData.environmentOptions.push({
                        label: '线上环境',
                        value: this.apiData.onLineEnvironment
                    });
                }
                if (this.apiData.bakEnvironment) {
                    this.apiData.environmentOptions.push({
                        label: '备用环境',
                        value: this.apiData.bakEnvironment
                    });
                }
                console.log(this.apiData.environmentOptions);
            },

            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                this.multipleSelection.map((item) => {
                    this.apiData.ids.push(item.id)
                });
            },

            open() {
                this.dialogVisible = true;

            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid && this.title === '新增') {
                        this.addApi();
                    } else if (valid && this.title === '编辑') {
                        this.editProject();
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            resetInput() {
                this.kw = '';
                this.getListProject();
            },
            addProjectVariable() {
                this.apiData.variable.push({key: null, value: null, remark: null});
            },
            delProjectVariable(i) {
                this.apiData.variable.splice(i, 1);
            },
            handleCloseProjectDialog() {
                this.ApiDialogVisible = false;
            },
            handleClosevariableDialog() {
                this.variableDialogVisible = false;
                // this.apiData.variable = [];
            },

        },
        created() {
            this.getListProject();
        }
    }


</script>

<style scoped>
    .projectTable {
        /*width:50%;*/
        /*height:50%;*/
    }

</style>