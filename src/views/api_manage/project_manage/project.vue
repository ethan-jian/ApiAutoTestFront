<template>
    <div>
        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    label="日期"
                    width="120">
                <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址"
                    show-overflow-tooltip>
            </el-table-column>
        </el-table>

        <div style="margin-top: 20px">
            <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
            <el-button @click="toggleSelection()">取消选择</el-button>
        </div>
        <div style="position: absolute;top: 9.5%;right: 0">
            <el-button type="primary" plain @click="ProjectDialogVisible=true">新增</el-button>
            <el-button type="warning" plain>批量删除</el-button>
        </div>

        <el-dialog
                title="创建项目"
                :visible.sync="ProjectDialogVisible"
                width="80%"
                :before-close="handleClose">
            <div style="position: absolute;top: 5.5%;left: 3%">
                <el-button type="primary" size="mini" plain @click="variableDialogVisible=true">公共变量</el-button>

                <el-dialog
                        title="公共变量"
                        :visible.sync="variableDialogVisible"
                        width="60%"
                        :before-close="handleClose">
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
    <el-button @click="variableDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="variableDialogVisible = false">确 定</el-button>
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
                        <el-select
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
                        <el-button type="primary" @click="submitForm('projectData')">立即创建</el-button>
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
    import {addProjectInfo} from "../../../api/project";

    export default {
        name: 'project',
        data() {
            return {
                ProjectDialogVisible: false,
                variableDialogVisible: false,
                projectData: {
                    id: null,
                    projectName: null,
                    testEnvironment: null,
                    devEnvironment: null,
                    onLineEnvironment: null,
                    bakEnvironment: null,
                    environment: null,
                    testUserId: null,
                    funcFile: '',
                    desc: null,
                    variable: [{'k':'v'}],
                    headers: [],
                    environmentOptions: [],
                    userList: [],
                },
                tableData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },],
                multipleSelection: [],
                ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                rules: {
                    projectName: [
                        {required: true, message: '请输入项目名称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
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
            getEnvironment() {
                console.log(this.projectData.environment)
            },

            addProject() {
                let postData = {
                    name: this.projectData.projectName,
                    user_id: this.projectData.testUserId,
                    environment: this.projectData.environment,
                    variables: this.projectData.variable,
                };
                addProjectInfo(postData).then(res => {
                    let code = res.data.code;
                    if (code === 200) {
                        // this.$router.push('/login')
                        this.$notify({
                            title: "新增项目成功",
                            type: "success"
                        })
                    } else {
                        this.$notify({
                            title: "新增项目失败",
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
            getEnvironments() {
                this.projectData.environmentOptions = []
                if (this.projectData.testEnvironment) {
                    this.projectData.environmentOptions.push({label: '测试环境', value: this.projectData.testEnvironment});
                }
                if (this.projectData.devEnvironment) {
                    this.projectData.environmentOptions.push({label: '开发环境', value: this.projectData.devEnvironment});
                }
                if (this.projectData.onLineEnvironment) {
                    this.projectData.environmentOptions.push({
                        label: '线上环境',
                        value: this.projectData.onLineEnvironment
                    });
                }
                if (this.projectData.bakEnvironment) {
                    this.projectData.environmentOptions.push({label: '备用环境', value: this.projectData.bakEnvironment});
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
            },
            open() {
                this.dialogVisible = true;

            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                        this.addProject();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            addProjectVariable() {
                this.projectData.variable.push({key: null, value: null, remark: null});
            },
            delProjectVariable(i) {
                this.projectData.variable.splice(i, 1);
            },
            handleClose() {
            },
        },
    }


</script>
<style scoped>
    .projectTable {
        /*width:50%;*/
        /*height:50%;*/
    }

</style>