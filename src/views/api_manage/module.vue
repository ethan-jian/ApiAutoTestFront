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
            <el-button type="primary" @click="getListModule">查询</el-button>
            <el-button @click="resetInput()">重置</el-button>
        </div>
        <el-table
                ref="multipleTable"
                :data="moduleData.moduleList"
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
                    prop="project_name"
                    label="项目"
                    width="120">
            </el-table-column>
             <el-table-column
                    prop="desc"
                    label="描述"
                    width="120">
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
                    <el-button @click="catModule(scope.row.id)" type="text" size="small">编辑</el-button>
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
    import {listProjectInfo} from "../../api/project";

    import {
        addModuleInfo,
        catModuleDetailInfo,
        deleteModuleInfo,
        editModuleInfo,
        listModuleInfo
    } from "../../api/module";

    export default {
        inject: ['reload'],
        name: 'module',
        data() {
            return {
                title: '新增',
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
                    url: null,
                    moduleId: null,
                    projectId: null,
                    desc: null,
                    variable: [],
                    headers: [],
                    projectList: [],
                    moduleList: [],
                },


                multipleSelection: [],
                rules: {
                    moduleName: [
                        {required: true, message: '请输入模块名称', trigger: 'blur'},
                        {min: 2, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur'}
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
            addModule() {
                let postData = {
                    name: this.moduleData.moduleName,
                    project_id: this.moduleData.projectId,
                    desc: this.moduleData.desc,

                };
                addModuleInfo(postData).then(res => {
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
            getListModule() {
                let postData = {
                    totalCount: this.totalPage,
                    pageSize: this.pageSize,
                    currentPage: this.currentPage,
                    kw: this.kw,
                    sort: [{"direct": "DESC", "field": "created_time"}]

                };
                listModuleInfo(postData).then(res => {
                    let code = res.data.code;
                    let rsData = res.data.data
                    if (code === 200) {
                        this.totalPage = res.data.totalCount;
                        this.moduleData.moduleList = rsData;
                        console.log(rsData);

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
                        this.moduleData.projectList = rsData;
                    }
                })
            },

            openAddModule() {
                this.title = '新增';
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
                this.moduleData.ids = []
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
            catModule(id) {
                this.title = '编辑';
                this.moduleDialogVisible = true;
                this.moduleData.id = id;
                let postData = {
                    "id": id
                };

                catModuleDetailInfo(postData).then(res => {
                    let code = res.data.code;
                    // let message = res.data.message;
                    let resData = res.data.data[0];
                    if (code === 200) {
                        this.moduleData.moduleName = resData.name;
                        this.getListProject()
                        this.moduleData.projectId = resData.project_id;
                        this.moduleData.desc = resData.desc;
                    }
                })
            },

            editModule() {
                let postData = {
                    id: this.moduleData.id,
                    name: this.moduleData.moduleName,
                    project_id: this.moduleData.projectId,
                    desc: this.moduleData.desc,
                };
                editModuleInfo(postData).then(res => {
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
                    if (valid && this.title === '新增') {
                        this.addModule();
                    } else if (valid && this.title === '编辑') {
                        this.editModule();
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

            handleCloseModuleDialog() {
                this.moduleDialogVisible = false;
            },
        },
        created() {
            this.getListModule();
        }
    }


</script>

<style scoped>
    .projectTable {
        /*width:50%;*/
        /*height:50%;*/
    }

</style>