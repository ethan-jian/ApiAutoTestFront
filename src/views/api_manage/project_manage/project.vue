<template>
    <div>
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
                    show-overflow-tooltip>
            </el-table-column>
             <el-table-column
                    label="测试人员"
                    width="120">
                <template slot-scope="scope">{{ scope.row.user_id }}</template>
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
    import {addProjectInfo, listProjectInfo} from "../../../api/project";

    export default {
        inject: ['reload'],
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
            getEnvironment() {
                //locations是v-for里面的也是datas里面的值
                console.log()
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
                    user_id: this.projectData.testUserId,
                    environment: this.projectData.environment,
                    environment_type: this.projectData.environment_type,
                    variables: this.projectData.variable,
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
                listProjectInfo().then(res => {
                    let code = res.data.code;
                    let rsData = res.data.data
                    if (code === 200) {
                        console.log(rsData);
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
            },
            open() {
                this.dialogVisible = true;

            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert('submit!');
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