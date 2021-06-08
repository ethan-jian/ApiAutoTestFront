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
            <el-button type="primary" @click="getListCaseSet">查询</el-button>
            <el-button @click="resetInput()">重置</el-button>
        </div>
        <el-button type="primary" icon="el-icon-circle-plus-outline" v-if="hasSelect" @click="addCase">测试用例</el-button>
        <el-table
                ref="multipleTable"
                :data="caseSetData.caseSetList"
                tooltip-effect="dark"
                style="width: 100%"
                highlight-current-row
                @cell-click="handle"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="50">
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
                    width="200">
                <template slot-scope="scope">
                    <el-row>
                        <el-col :span="8">
                            <el-button @click="catCaseSet(scope.row.id)" type="primary" size="small">编辑
                            </el-button>
                        </el-col>
                        <el-col :span="8">
                            <el-button @click="deleteCaseSet(scope.row.id)" size="small" type="success"
                                       icon="el-icon-video-play">
                            </el-button>
                        </el-col>
                        <el-col :span="8">
                            <el-button @click="deleteCaseSet(scope.row.id)" type="warning" size="small">删除</el-button>
                        </el-col>
                    </el-row>

                </template>
            </el-table-column>

        </el-table>


        <div class="block" style="float: left;">
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
            <el-button type="warning" @click="deleteCaseSet" plain>批量删除</el-button>
        </div>

        <el-dialog
                :title="title"
                :visible.sync="openDialogVisible"
                width="80%"
                :before-close="handleCloseModuleDialog">
            <div>
                <el-form :model="caseSetData" :rules="rules" ref="caseSetData" label-width="80px" class="demo-ruleForm">
                    <el-form-item label-position="left" label="用例集合" prop="name">
                        <el-input v-model="caseSetData.name" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label-position="left" label="项目名称" prop="projectId">
                        <el-select v-model="caseSetData.projectId"
                                   placeholder="请选择项目"
                                   @focus="getListProject"
                        >
                            <el-option v-for="item in caseSetData.projectList"
                                       :key="item.id"
                                       :label="item.name"
                                       :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="集合描述" prop="desc">
                        <el-input type="textarea" v-model="caseSetData.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('caseSetData')">保存</el-button>
                        <el-button @click="resetForm('caseSetData')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <span slot="footer" class="dialog-footer">
    <el-button @click="openDialogVisible = false">取 消</el-button>
                <!--    <el-button type="primary" @click="ApiDialogVisible = false">确 定</el-button>-->
  </span>
        </el-dialog>

        <el-dialog
                title="用例信息"
                :visible.sync="centerDialogVisible"
                width="50%"
                center>

            <el-form :model="ruleForm" :rules="caseInfoRules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用例名称" prop="name">
                    <el-input v-model="caseInfoRuleForm.name" size="mini"></el-input>
                </el-form-item>

                <el-form-item label="增加步骤">
                    <el-input v-model="caseInfoRuleForm.name" :disabled="true" style="width: auto"
                              size="mini"></el-input>
                    <el-select v-model="caseInfoRuleForm.region" placeholder="模块" size="mini">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addCase" size="mini">
                        添加
                    </el-button>

                </el-form-item>
                <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%; text-align: right;"
                        size="mini"
                        @selection-change="handleSelectionChange">
                    <el-table-column
                            type="selection"
                            width="30">
                    </el-table-column>
                    <el-table-column
                            label="接口名称"
                            width="160">
                        <template slot-scope="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="接口描述"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="接口地址"
                            show-overflow-tooltip>
                    </el-table-column>
                </el-table>

                <el-form-item label="用例描述" prop="desc">
                    <el-input type="textarea" v-model="caseInfoRuleForm.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="caseInfoRuleForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
                <el-button @click="centerDialogVisible = false">取 消</el-button>

  </span>
        </el-dialog>

    </div>
</template>

<script>
    import {listProjectInfo} from "../../api/project";

    import {
        addCaseSetInfo,
        catCaseSetDetailInfo,
        deleteCaseSetInfo,
        editCaseSetInfo,
        listCaseSetInfo
    } from "../../api/caseSet";

    export default {
        inject: ['reload'],
        name: 'module',
        data() {
            return {
                centerDialogVisible: false,
                hasSelect: false,
                title: '新增',
                kw: '',
                openDialogVisible: false,
                currentPage: 1,
                pageSize: 10,
                pageSizes: [10, 20, 30, 40, 50],
                totalPage: 0,
                caseSetData: {
                    id: null,
                    ids: [],
                    name: null,
                    url: null,
                    projectId: null,
                    desc: null,
                    caseSetList: [],
                    projectList: [],
                },

                caseInfoRuleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },

                multipleSelection: [],
                rules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                        {min: 2, max: 25, message: '长度在 2 到 25 个字符', trigger: 'blur'}
                    ],
                    projectId: [
                        {required: true, message: '请选择项目', trigger: 'change'}
                    ],
                    desc: [
                        {required: false, message: '请填写描述', trigger: 'blur'}
                    ]
                },
                caseInfoRules: {
                    name: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    region: [
                        {required: true, message: '请选择活动区域', trigger: 'change'}
                    ],
                    date1: [
                        {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
                    ],
                    date2: [
                        {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
                    ],
                    type: [
                        {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
                    ],
                    resource: [
                        {required: true, message: '请选择活动资源', trigger: 'change'}
                    ],
                    desc: [
                        {required: true, message: '请填写活动形式', trigger: 'blur'}
                    ]
                }
            };
        },


        methods: {

            handle(row, column, event, cell) {
                console.log("row" + row.name)
                console.log("row" + row.id)
                console.log("event" + event)
                console.log("cell" + cell)
                this.hasSelect = true;
            },


            addCase() {
                this.centerDialogVisible = true;

            },


            addCaseSet() {
                let postData = {
                    name: this.caseSetData.name,
                    project_id: this.caseSetData.projectId,
                    desc: this.caseSetData.desc,

                };
                addCaseSetInfo(postData).then(res => {
                    let code = res.data.code;
                    let message = res.data.message;
                    if (code === 200) {
                        this.openDialogVisible = false;
                        this.reload()
                        this.resetForm('caseSetData')
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
            }
            ,
            getListCaseSet() {
                let postData = {
                    totalCount: this.totalPage,
                    pageSize: this.pageSize,
                    currentPage: this.currentPage,
                    kw: this.kw,
                    sort: [{"direct": "DESC", "field": "created_time"}]

                };
                listCaseSetInfo(postData).then(res => {
                    let code = res.data.code;
                    let rsData = res.data.data
                    if (code === 200) {
                        this.totalPage = res.data.totalCount;
                        this.caseSetData.caseSetList = rsData;
                        console.log(rsData);

                    }
                })
            }
            ,
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
                        this.caseSetData.projectList = rsData;
                    }
                })
            }
            ,

            openAddModule() {
                this.title = '新增';
                this.openDialogVisible = true;
                this.resetForm('moduleData');
            }
            ,
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.getListProject();
            }
            ,
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                this.getListProject();
            }
            ,

            getEnvironment() {
                //locations是v-for里面的也是datas里面的值
                console.log()
            }
            ,
            deleteCaseSet(id) {
                this.caseSetData.ids = []
                if (typeof id === "number") {
                    this.caseSetData.ids.push(id);
                }
                let postData = {
                    ids: this.caseSetData.ids
                };
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteCaseSetInfo(postData).then(res => {
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
            }
            ,
            catCaseSet(id) {
                this.title = '编辑';
                this.openDialogVisible = true;
                this.caseSetData.id = id;
                let postData = {
                    "id": id
                };

                catCaseSetDetailInfo(postData).then(res => {
                    let code = res.data.code;
                    // let message = res.data.message;
                    let resData = res.data.data[0];
                    if (code === 200) {
                        this.caseSetData.name = resData.name;
                        this.getListProject()
                        this.caseSetData.projectId = resData.project_id;
                        this.caseSetData.desc = resData.desc;
                    }
                })
            }
            ,

            editCaseSet() {
                let postData = {
                    id: this.caseSetData.id,
                    name: this.caseSetData.name,
                    project_id: this.caseSetData.projectId,
                    desc: this.caseSetData.desc,
                };
                editCaseSetInfo(postData).then(res => {
                    let code = res.data.code;
                    let message = res.data.message;
                    if (code === 200) {
                        this.openDialogVisible = false;
                        this.reload()
                        this.resetForm('caseSetData')
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
            }
            ,

            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            }
            ,
            handleSelectionChange(val) {
                this.multipleSelection = val;
                this.multipleSelection.map((item) => {
                    this.caseSetData.ids.push(item.id)
                });
            }
            ,

            open() {
                this.openDialogVisible = true;

            }
            ,
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid && this.title === '新增') {
                        this.addCaseSet();
                    } else if (valid && this.title === '编辑') {
                        this.editCaseSet();
                    } else {
                        return false;
                    }
                });
            }
            ,
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
            ,
            resetInput() {
                this.kw = '';
                this.getListProject();
            }
            ,

            handleCloseModuleDialog() {
                this.openDialogVisible = false;
            }
            ,


        }
        ,
        created() {
            this.getListCaseSet();
        }
    }


</script>

<style scoped>
    el-table__body tr.current-row > td {
        color: #fff;
        background: rgba(66, 66, 66, 0.66) !important;
    }

</style>