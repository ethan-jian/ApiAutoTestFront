<template>
    <div>

        <el-input
                style="width: 200px;
                    float: left;"
                placeholder="请输入项目名称"
                v-model="kw"
                clearable>
        </el-input>
        <div style="position: absolute;
        left: 430px;
">
            <el-button type="primary" @click="getListProject">查询</el-button>
            <el-button @click="resetInput()">重置</el-button>
        </div>
        <el-table
                ref="multipleTable"
                :data="listmoduleData"
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
                    <el-button @click="deleteModule(scope.row.id)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>

        </el-table>

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
            <el-button type="primary" plain @click="openAddModule">新增</el-button>
            <el-button type="warning" @click="deleteModule" plain>批量删除</el-button>
        </div>

        <el-dialog
                :title="title"
                :visible.sync="moduleDialogVisible"
                width="80%"
                :before-close="handleCloseModuleDialog">
            <div>
                <el-form :model="moduleData" :rules="rules" ref="moduleData" label-width="80px" class="demo-ruleForm">
                    <el-form-item label-position="left" label="模块名称" prop="moduleName">
                        <el-input v-model="moduleData.moduleName" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label-position="left" label="项目名称" prop="projectId">
                        <el-select v-model="moduleData.projectId"
                                   placeholder="请选择项目"
                                   @focus="getListProject"
                        >
                            <el-option v-for="item in moduleData.projectList"
                                       :key="item.id"
                                       :label="item.name"
                                       :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="模块描述" prop="desc">
                        <el-input type="textarea" v-model="moduleData.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('moduleData')">保存</el-button>
                        <el-button @click="resetForm('moduleData')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <span slot="footer" class="dialog-footer">
    <el-button @click="moduleDialogVisible = false">取 消</el-button>
                <!--    <el-button type="primary" @click="ApiDialogVisible = false">确 定</el-button>-->
  </span>
        </el-dialog>
    </div>
</template>

<script>

    // import {getUserInfo} from "../../../api/user";
    // import {
    //     addProjectInfo,
    //     catProjectDetailInfo,
    //     deleteModuleInfo, editProjectInfo,
    //     // editProjectInfo,
    //     listProjectInfo
    // } from "../../../api/project";

    import {
        addProjectInfo,
        catProjectDetailInfo,
        deleteModuleInfo,
        editProjectInfo,
        listProjectInfo
    } from "../../api/project";

    export default {
        inject: ['reload'],
        name: 'module',
        data() {
            return {
                title: '新增模块',
                kw: '',
                moduleDialogVisible: false,
                currentPage: 1,
                pageSize: 10,
                pageSizes: [10, 20, 30, 40, 50],
                totalPage: 0,
                moduleData: {
                    id: null,
                    ids: [],
                    moduleName: null,
                    url:null,
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
                },
                listmoduleData: [],

                multipleSelection: [],
                rules: {
                    moduleName: [
                        {required: true, message: '请输入模块名称', trigger: 'blur'},
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
            openAddModule() {
                this.title = '新增模块';
                this.moduleDialogVisible = true;
                this.resetForm('moduleData');
                this.moduleData.variable = [];
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
            deleteModule(id) {
                console.log(id)
                if (typeof id === "number") {
                    this.moduleData.ids.push(id);
                }
                let postData = {
                    ids: this.moduleData.ids
                };
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteModuleInfo(postData).then(res => {
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
                this.title = '编辑接口';
                this.ApiDialogVisible = true;
                this.moduleData.id = id;
                let postData = {
                    "id": id
                };

                catProjectDetailInfo(postData).then(res => {
                    let code = res.data.code;
                    // let message = res.data.message;
                    let resData = res.data.data[0];
                    if (code === 200) {
                        this.moduleData.moduleName = resData.name;
                        this.moduleData.testEnvironment = resData.test_environment;
                        this.moduleData.devEnvironment = resData.dev_environment;
                        this.moduleData.onLineEnvironment = resData.online_environment;
                        this.moduleData.bakEnvironment = resData.bak_environment;
                        this.moduleData.desc = resData.desc;
                        this.moduleData.environment_type = resData.environment_type;
                        if (this.moduleData.environment_type === '1') {
                            this.moduleData.environment = '测试环境';
                        } else if (this.moduleData.environment_type === '2') {
                            this.moduleData.environment = '开发环境';
                        } else if (this.moduleData.environment_type === '3') {
                            this.moduleData.environment = '线上环境';
                        } else if (this.moduleData.environment_type === '4') {
                            this.moduleData.environment = '备用环境';
                        }
                        this.getAllUser();
                        this.moduleData.testUserId = resData.user_id_id;
                        this.moduleData.variable = JSON.parse(resData.variables);
                    }
                })
            },

            editProject() {
                let postData = {
                    id: this.moduleData.id,
                    name: this.moduleData.moduleName,
                    user_id_id: this.moduleData.testUserId,
                    // environment: this.moduleData.environment,
                    test_environment: this.moduleData.testEnvironment,
                    dev_environment: this.moduleData.devEnvironment,
                    online_environment: this.moduleData.onLineEnvironment,
                    bak_environment: this.moduleData.bakEnvironment,
                    environment_type: this.moduleData.environment_type,
                    variables: JSON.stringify(this.moduleData.variable),
                    desc: this.moduleData.desc,
                };
                editProjectInfo(postData).then(res => {
                    let code = res.data.code;
                    let message = res.data.message;
                    if (code === 200) {
                        this.ApiDialogVisible = false;
                        this.reload()
                        this.resetForm('moduleData')
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
                    this.moduleData.environment_type = '1';
                } else if (selectedLabel === '开发环境') {
                    this.moduleData.environment_type = '2';
                } else if (selectedLabel === '线上环境') {
                    this.moduleData.environment_type = '3';
                } else if (selectedLabel === '备用环境') {
                    this.moduleData.environment_type = '4';
                }
            },

            addProject() {
                this.getSelectedEnvironmentType();
                let postData = {
                    name: this.moduleData.moduleName,
                    user_id_id: this.moduleData.testUserId,
                    // environment: this.moduleData.environment,
                    test_environment: this.moduleData.testEnvironment,
                    dev_environment: this.moduleData.devEnvironment,
                    online_environment: this.moduleData.onLineEnvironment,
                    bak_environment: this.moduleData.bakEnvironment,
                    environment_type: this.moduleData.environment_type,
                    variables: JSON.stringify(this.moduleData.variable),
                    desc: this.moduleData.desc,

                };
                addProjectInfo(postData).then(res => {
                    let code = res.data.code;
                    let message = res.data.message;
                    if (code === 200) {
                        this.ApiDialogVisible = false;
                        this.reload()
                        this.resetForm('moduleData')
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
                    totalCount: this.totalPage,
                    pageSize: this.pageSize,
                    currentPage: this.currentPage,
                    kw: this.kw,
                    sort: [{"direct": "DESC", "field": "created_time"}]

                };
                listProjectInfo(postData).then(res => {
                    let code = res.data.code;
                    let rsData = res.data.data
                    if (code === 200) {
                        console.log(rsData);
                        this.totalPage = res.data.totalCount;
                        this.moduleData.projectList = rsData;

                    }
                })
            },
            getEnvironments() {
                this.moduleData.environmentOptions = []
                if (this.moduleData.testEnvironment) {
                    this.moduleData.environmentOptions.push({
                        label: '测试环境',
                        value: this.moduleData.testEnvironment
                    });
                }
                if (this.moduleData.devEnvironment) {
                    this.moduleData.environmentOptions.push({
                        label: '开发环境',
                        value: this.moduleData.devEnvironment
                    });
                }
                if (this.moduleData.onLineEnvironment) {
                    this.moduleData.environmentOptions.push({
                        label: '线上环境',
                        value: this.moduleData.onLineEnvironment
                    });
                }
                if (this.moduleData.bakEnvironment) {
                    this.moduleData.environmentOptions.push({
                        label: '备用环境',
                        value: this.moduleData.bakEnvironment
                    });
                }
                console.log(this.moduleData.environmentOptions);
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
                    this.moduleData.ids.push(item.id)
                });
            },

            open() {
                this.dialogVisible = true;

            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid && this.title === '新增项目') {
                        this.addProject();
                    } else if (valid && this.title === '编辑项目') {
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
                this.moduleData.variable.push({key: null, value: null, remark: null});
            },
            delProjectVariable(i) {
                this.moduleData.variable.splice(i, 1);
            },
            handleCloseModuleDialog() {
                this.moduleDialogVisible = false;
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