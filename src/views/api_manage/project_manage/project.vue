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
                :data="listProjectData"
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
                    label="执行环境"
                    width="120">
                <template slot-scope="scope">
                    <span v-if="scope.row.environment_type === '1'">测试环境</span>
                    <span v-if="scope.row.environment_type === '2'">开发环境</span>
                    <span v-if="scope.row.environment_type === '3'">线上环境</span>
                    <span v-if="scope.row.environment_type === '4'">备用环境</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="fun"
                    label="内置函数"
                    show-overflow-tooltip
                    width="120">
            </el-table-column>
            <el-table-column
                    label="测试人员"
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
                :visible.sync="ProjectDialogVisible"
                width="80%"
                :before-close="handleCloseProjectDialog">
            <div style="position: absolute;top: 5.5%;left: 3%">
                <el-button type="primary" size="mini" plain @click="variableDialogVisible=true">公共变量</el-button>

                <el-dialog
                        title="公共变量"
                        :visible.sync="variableDialogVisible"
                        width="60%"
                        :before-close="handleClosevariableDialog">
                    <el-button type="primary" size="mini" @click="addProjectVariable()">
                        添加
                    </el-button>
                    <el-table :data="projectData.variable" stripe :show-header="false" size="mini">
                        <el-table-column label="Key" header-align="center" minWidth="50">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.key" size="mini" placeholder="key">
                                </el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="Value" header-align="center" minWidth="80">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.value" size="mini" placeholder="value">
                                </el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="备注" header-align="center" width="150">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.remark" size="mini" placeholder="备注">
                                </el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" header-align="center" width="80">
                            <template slot-scope="scope">
                                <el-button type="danger" icon="el-icon-delete" size="mini"
                                           @click.native="delProjectVariable(scope.$index)">删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <span slot="footer" class="dialog-footer">
<!--    <el-button @click="handleClosevariableDialog">取 消</el-button>-->
<!--    <el-button type="primary" @click="variableDialogVisible = false">确 定</el-button>-->
  </span>
                </el-dialog>
            </div>

            <div>
                <el-form :model="projectData" :rules="rules" ref="projectData" label-width="80px" class="demo-ruleForm">
                    <el-form-item label-position="left" label="项目名称" prop="projectName">
                        <el-input v-model="projectData.projectName" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label-position="left" label="测试环境" prop="testEnvironment">
                        <el-input v-model="projectData.testEnvironment" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label-position="left" label="开发环境" prop="devEnvironment">
                        <el-input v-model="projectData.devEnvironment" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label-position="left" label="线上环境" prop="onLineEnvironment">
                        <el-input v-model="projectData.onLineEnvironment" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label-position="left" label="备用环境" prop="bakEnvironment">
                        <el-input v-model="projectData.bakEnvironment" size="mini"></el-input>
                    </el-form-item>

                    <el-form-item label-position="left" label="执行环境" prop="environment">
                        <el-select ref="selectEnvironment"
                                   v-model="projectData.environment"
                                   placeholder="请选择测试环境"
                                   @focus="getEnvironments" @change="getEnvironment">
                            <el-option
                                    v-for="item in projectData.environmentOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label-position="left" label="函数文件" prop="fun">
                        <el-select v-model="projectData.fun" placeholder="请选择函数文件" @focus="getEnvironments">
                            <el-option v-for="item in projectData.environmentOptions"
                                       :key="item.value"
                                       :label="item.label"
                                       :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label-position="left" label="测试人员" prop="testUserId">
                        <el-select v-model="projectData.testUserId"
                                   placeholder="请选择测试人员"
                                   @focus="getAllUser"
                        >
                            <el-option v-for="item in projectData.userList"
                                       :key="item.id"
                                       :label="item.username"
                                       :value="item.id"
                            >
                            </el-option>

                        </el-select>
                    </el-form-item>

                    <el-form-item label="项目描述" prop="desc">
                        <el-input type="textarea" v-model="projectData.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('projectData')">保存</el-button>
                        <el-button @click="resetForm('projectData')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <span slot="footer" class="dialog-footer">
    <el-button @click="ProjectDialogVisible = false">取 消</el-button>
                <!--    <el-button type="primary" @click="ProjectDialogVisible = false">确 定</el-button>-->
  </span>
        </el-dialog>
    </div>
</template>

<script>

    import {getUserInfo} from "../../../api/user";
    import {
        addProjectInfo,
        catProjectDetailInfo,
        deleteProjectInfo, editProjectInfo,
        // editProjectInfo,
        listProjectInfo
    } from "../../../api/project";

    export default {
        inject: ['reload'],
        name: 'project',
        data() {
            return {
                title: '创建项目',
                kw: '',
                ProjectDialogVisible: false,
                variableDialogVisible: false,
                currentPage: 1,
                pageSize: 10,
                pageSizes: [10, 20, 30, 40, 50],
                totalPage: 0,
                projectData: {
                    id: null,
                    ids: [],
                    projectName: null,
                    testEnvironment: null,
                    devEnvironment: null,
                    onLineEnvironment: null,
                    bakEnvironment: null,
                    environment: null,
                    environment_type: '1',//测试环境
                    testUserId: null,
                    funcFile: '',
                    desc: null,
                    variable: [],
                    headers: [],
                    environmentOptions: [],
                    userList: [],
                },
                listProjectData: [],

                multipleSelection: [],
                rules: {
                    projectName: [
                        {required: true, message: '请输入项目名称', trigger: 'blur'},
                        {min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur'}
                    ],
                    environment: [
                        {required: true, message: '请选择执行环境', trigger: 'change'}
                    ],
                    testUserId: [
                        {required: true, message: '请选择测试人员', trigger: 'change'}
                    ],
                    desc: [
                        {required: false, message: '请填写项目描述', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            openAddproject() {
                this.title = '新增项目';
                this.ProjectDialogVisible = true;
                this.resetForm('projectData');
                this.projectData.variable = [];
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
                    this.projectData.ids.push(id);
                }
                let postData = {
                    ids: this.projectData.ids
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
                this.title = '编辑项目';
                this.ProjectDialogVisible = true;
                this.projectData.id = id;
                let postData = {
                    "id": id
                };

                catProjectDetailInfo(postData).then(res => {
                    let code = res.data.code;
                    // let message = res.data.message;
                    let resData = res.data.data[0];
                    if (code === 200) {
                        this.projectData.projectName = resData.name;
                        this.projectData.testEnvironment = resData.test_environment;
                        this.projectData.devEnvironment = resData.dev_environment;
                        this.projectData.onLineEnvironment = resData.online_environment;
                        this.projectData.bakEnvironment = resData.bak_environment;
                        this.projectData.desc = resData.desc;
                        this.projectData.environment_type = resData.environment_type;
                        if (this.projectData.environment_type === '1') {
                            this.projectData.environment = '测试环境';
                        } else if (this.projectData.environment_type === '2') {
                            this.projectData.environment = '开发环境';
                        } else if (this.projectData.environment_type === '3') {
                            this.projectData.environment = '线上环境';
                        } else if (this.projectData.environment_type === '4') {
                            this.projectData.environment = '备用环境';
                        }
                        this.getAllUser();
                        this.projectData.testUserId = resData.user_id_id;
                        this.projectData.variable = JSON.parse(resData.variables);
                    }
                })
            },

            editProject() {
                let postData = {
                    id: this.projectData.id,
                    name: this.projectData.projectName,
                    user_id_id: this.projectData.testUserId,
                    // environment: this.projectData.environment,
                    test_environment: this.projectData.testEnvironment,
                    dev_environment: this.projectData.devEnvironment,
                    online_environment: this.projectData.onLineEnvironment,
                    bak_environment: this.projectData.bakEnvironment,
                    environment_type: this.projectData.environment_type,
                    variables: JSON.stringify(this.projectData.variable),
                    desc: this.projectData.desc,
                };
                editProjectInfo(postData).then(res => {
                    let code = res.data.code;
                    let message = res.data.message;
                    if (code === 200) {
                        this.ProjectDialogVisible = false;
                        this.reload()
                        this.resetForm('projectData')
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
                    this.projectData.environment_type = '1';
                } else if (selectedLabel === '开发环境') {
                    this.projectData.environment_type = '2';
                } else if (selectedLabel === '线上环境') {
                    this.projectData.environment_type = '3';
                } else if (selectedLabel === '备用环境') {
                    this.projectData.environment_type = '4';
                }
            },

            addProject() {
                this.getSelectedEnvironmentType();
                let postData = {
                    name: this.projectData.projectName,
                    user_id_id: this.projectData.testUserId,
                    // environment: this.projectData.environment,
                    test_environment: this.projectData.testEnvironment,
                    dev_environment: this.projectData.devEnvironment,
                    online_environment: this.projectData.onLineEnvironment,
                    bak_environment: this.projectData.bakEnvironment,
                    environment_type: this.projectData.environment_type,
                    variables: JSON.stringify(this.projectData.variable),
                    desc: this.projectData.desc,

                };
                addProjectInfo(postData).then(res => {
                    let code = res.data.code;
                    let message = res.data.message;
                    if (code === 200) {
                        this.ProjectDialogVisible = false;
                        this.reload()
                        this.resetForm('projectData')
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

            getAllUser() {
                getUserInfo().then(res => {
                    let code = res.data.code;
                    if (code === 200) {
                        this.projectData.userList = res.data.data;
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
                        this.listProjectData = rsData;

                    }
                })
            },
            getEnvironments() {
                this.projectData.environmentOptions = []
                if (this.projectData.testEnvironment) {
                    this.projectData.environmentOptions.push({
                        label: '测试环境',
                        value: this.projectData.testEnvironment
                    });
                }
                if (this.projectData.devEnvironment) {
                    this.projectData.environmentOptions.push({
                        label: '开发环境',
                        value: this.projectData.devEnvironment
                    });
                }
                if (this.projectData.onLineEnvironment) {
                    this.projectData.environmentOptions.push({
                        label: '线上环境',
                        value: this.projectData.onLineEnvironment
                    });
                }
                if (this.projectData.bakEnvironment) {
                    this.projectData.environmentOptions.push({
                        label: '备用环境',
                        value: this.projectData.bakEnvironment
                    });
                }
                console.log(this.projectData.environmentOptions);
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
                    this.projectData.ids.push(item.id)
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
                this.projectData.variable.push({key: null, value: null, remark: null});
            },
            delProjectVariable(i) {
                this.projectData.variable.splice(i, 1);
            },
            handleCloseProjectDialog() {
                this.ProjectDialogVisible = false;
            },
            handleClosevariableDialog() {
                this.variableDialogVisible = false;
                // this.projectData.variable = [];
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