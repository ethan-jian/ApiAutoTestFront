<template>
    <div>
        <el-tabs type="card" v-model="activeName1">
            <el-tab-pane label="用例集合" name="first">
                <el-col>
                    <el-input
                            style="width: 200px;
                    float: left;"
                            placeholder="请输入项目名称"
                            v-model="kw"
                            clearable>
                    </el-input>
                    <div style="position: absolute;left: 205px;">
                        <el-button type="primary" @click="getListCaseSet">查询</el-button>
                        <el-button @click="resetInput()">重置</el-button>
                    </div>
                    <div style="position: absolute; right: 0%;">
                        <el-button type="primary" plain @click="openAddCaseSet">新增</el-button>
                        <el-button type="warning" @click="deleteCaseSet" plain>批量删除</el-button>
                    </div>

                </el-col>

                <el-col :span="15">
                    <el-table
                            ref="multipleTable1"
                            :data="caseSetData.caseSetList"
                            tooltip-effect="dark"
                            style="width: 100%"
                            highlight-current-row
                            @cell-click="handle"
                            @selection-change="handleSelectionChange1"
                            @tab-click="initdata(0)"
                    >
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
                                width="303">
                            <template slot-scope="scope">
                                <el-col>
                                    <el-button @click="catCaseSet(scope.row.id)" type="primary" size="small">编辑
                                    </el-button>
                                    <el-button @click="deleteCaseSet(scope.row.id)" size="small" type="success"
                                               icon="el-icon-video-play">
                                    </el-button>
                                    <el-button @click="deleteCaseSet(scope.row.id)" type="warning" size="small">删除
                                    </el-button>
                                    <el-button type="primary" icon="el-icon-circle-plus-outline"
                                               size="small" @click="openCaseInfo">测试用例
                                    </el-button>
                                </el-col>
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
                </el-col>
                <el-col :span="9">
                    <el-table
                            ref="multipleTable2"
                            :data="caseData.caseList"
                            tooltip-effect="dark"
                            style="width: 100%"
                            highlight-current-row
                            @selection-change="handleSelectionChange2">
                        <el-table-column
                                type="selection"
                                width="50">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="用例名称"
                                width="200">
                        </el-table-column>
                        <el-table-column
                                prop="desc"
                                label="描述"
                                width="150">
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="303">
                            <template slot-scope="scope">
                                <el-col>
                                    <el-button @click="catCase(scope.row.id)" type="primary" size="small">编辑
                                    </el-button>
                                    <el-button @click="deleteCase(scope.row.id)" size="small" type="success"
                                               icon="el-icon-video-play">
                                    </el-button>
                                    <el-button @click="deleteCase(scope.row.id)" type="warning" size="small">删除
                                    </el-button>
                                </el-col>
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
                </el-col>


            </el-tab-pane>
            <el-tab-pane label="编辑用例" name="second">

                <el-tabs v-model="activeName11" type="card" @tab-click="handleClick">
                    <el-tab-pane label="用例信息" name="first">
                        <el-form :model="caseData" :rules="caseInfoRules" ref="ruleForm" label-width="100px"
                                 class="demo-ruleForm" size="mini" style="float: left">
                            <el-form-item label="用例名称" prop="name">
                                <el-input v-model="caseData.name" size="mini"></el-input>
                            </el-form-item>
                            <el-form-item label="所属项目">
                                <el-select v-model="caseSetData.projectId" placeholder="请选择项目" size="mini"
                                           @focus="getListProject()"
                                           @change="getListProject()">
                                    <el-option v-for="item in projectList"
                                               :key="item.id"
                                               :value="item.id"
                                               :label="item.name"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="用例集">
                                <el-select v-model="caseSetData.id" placeholder="请选择用例集" size="mini"
                                           @focus="listProjectCaseSet(caseSetData.projectId)"
                                           @change="listProjectCaseSet(caseSetData.projectId)">
                                    <el-option v-for="item in caseSetData.caseSetList "
                                               :key="item.id"
                                               :value="item.id"
                                               :label="item.name">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="用例描述" prop="desc">
                                <el-input type="textarea" v-model="caseData.desc"></el-input>
                            </el-form-item>

                        </el-form>

                    </el-tab-pane>
                    <el-tab-pane label="用例步骤" name="second">
                        <el-row>
                            <el-col span="10">
                                <el-table
                                        ref="multipleTable"
                                        :data="stepData.stepList"
                                        tooltip-effect="dark"
                                        style="width: 100%; text-align: right;"
                                        size="mini"
                                        @selection-change="handleSelectionChange3">
                                    <el-table-column
                                            type="selection"
                                            width="30">
                                    </el-table-column>
                                    <el-table-column
                                            prop="name"
                                            label="接口名称"
                                            width="150">
                                    </el-table-column>
                                    <el-table-column
                                            prop="desc"
                                            label="描述"
                                            width="150">
                                    </el-table-column>
                                    <el-table-column
                                            prop="url"
                                            label="接口地址"
                                            show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column
                                            label="操作"
                                            width="90">
                                        <template slot-scope="scope">
                                            <!--                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
                                            <el-button @click="catCaseStep(scope.row.id)" type="text" size="small">编辑
                                            </el-button>
                                            <el-button @click="deleteCaseStep(scope.row.id)" type="text" size="small">删除
                                            </el-button>
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

                            </el-col>
                            <el-col span="12">
                                <el-form :model="caseData" :rules="caseInfoRules" ref="ruleForm" label-width="100px"
                                         class="demo-ruleForm">
                                    <el-form-item>
                                        添加步骤
                                        <el-select v-model="apiData.projectId" placeholder="项目" size="mini"
                                                   @focus="getListProject('listApi')"
                                                   @change="getListProject('listApi')">
                                            <el-option v-for="item in projectList"
                                                       :key="item.id"
                                                       :value="item.id"
                                                       :label="item.name"
                                            >
                                            </el-option>
                                        </el-select>
                                        <el-select v-model="apiData.moduleId" placeholder="请选择模块" size="mini"
                                                   @focus="listProjectModule(apiData.projectId)"
                                                   @change="listProjectModule(apiData.projectId)">
                                            <el-option v-for="item in moduleList"
                                                       :key="item.id"
                                                       :value="item.id"
                                                       :label="item.name">
                                            </el-option>
                                        </el-select>
                                        <el-button type="primary" icon="el-icon-circle-plus-outline"
                                                   @click="addCaseStep"
                                                   size="mini">
                                            添加
                                        </el-button>
                                    </el-form-item>
                                </el-form>
                                <el-table
                                        ref="multipleTable"
                                        :data="apiData.apiList"
                                        tooltip-effect="dark"
                                        style="width: 100%; text-align: right;"
                                        size="mini"
                                        type="selection"
                                        @selection-change="handleSelectionChange"
                                        @select="handleSelectionChange4"
                                >
                                    <el-table-column
                                            type="selection"
                                            width="30">
                                    </el-table-column>
                                    <el-table-column
                                            prop="name"
                                            label="接口名称"
                                            width="150">
                                    </el-table-column>
                                    <el-table-column
                                            prop="desc"
                                            label="描述"
                                            width="150">
                                    </el-table-column>
                                    <el-table-column
                                            prop="url"
                                            label="接口地址"
                                            show-overflow-tooltip>
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

                            </el-col>
                        </el-row>


                    </el-tab-pane>
                </el-tabs>
            </el-tab-pane>
            <div style="text-align: center">
                <el-button type="primary" style="float: right" @click="addCase">保存</el-button>
            </div>

        </el-tabs>

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
                            <el-option v-for="item in projectList"
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
                        <el-button type="primary" @click="submitCaseSetForm('caseSetData')">保存</el-button>
                        <el-button @click="resetCaseSetForm('caseSetData')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <span slot="footer" class="dialog-footer">
    <el-button @click="openDialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {
        catProjectModuleInfo,
        listProjectInfo,
        projectCaseSetInfo
    } from "../../api/project";

    import {
        addCaseSetInfo,
        catCaseSetDetailInfo,
        deleteCaseSetInfo,
        editCaseSetInfo,
        listCaseSetInfo
    } from "../../api/caseSet";

    import {
        addCaseInfo,
        // catCaseDetailInfo,
        deleteCaseInfo,
        // editCaseInfo,
        listCaseInfo,
        // addCaseStepInfo
    } from "../../api/case";

    import {listApiInfo, listProjectModuleInfo} from "../../api/api";


    export default {
        inject: ['reload'],
        name: 'module',
        data() {
            return {
                activeName1: 'first',
                activeName11: 'first',
                caseInfoDialogVisible: false,
                hasSelect: false,
                title: '新增',
                kw: '',
                sort: [
                    {
                        "direct": "DESC",
                        "field": "created_time"
                    }],
                openDialogVisible: false,
                currentPage: 1,
                pageSize: 10,
                pageSizes: [10, 20, 30, 40, 50],
                totalPage: 0,
                projectList: [],
                moduleList: [],
                projectId: null,
                moduleId: null,

                caseSetData: {
                    id: null,
                    ids: [],
                    name: null,
                    url: null,
                    desc: null,
                    projectId: null,
                    caseSetList: [],

                },

                caseData: {
                    id: null,
                    ids: [],
                    name: null,
                    caseSetId: null,
                    desc: null,
                    caseList: [],
                    projectId: null,
                    num: 1,

                },

                stepData: {
                    id: null,
                    ids: [],
                    num: 1,
                    stepList: []
                },

                apiData: {
                    id: null,
                    ids: [],
                    name: null,
                    caseSetId: null,
                    desc: null,
                    projectId: null,
                    moduleId: null,
                    apiList: [],
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
                        {required: true, message: '用例名称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    desc: [
                        {required: false, message: '请输入描述', trigger: 'blur'}
                    ],
                    projectId: [
                        {required: false, message: '请选择项目', trigger: 'change'}
                    ],
                    moduleId: [
                        {required: false, message: '请选择模块', trigger: 'change'}
                    ],
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
                this.title = "新增";
                this.caseData.caseSetId = row.id;
                this.caseData.projectId = row.project_id;
                this.caseSetData.projectId = row.project_id;
                this.caseSetData.id = row.id;
                this.getListCase();
            },

            changeStatus() {

            },

            openCaseInfo() {
                this.caseData.name = null;
                this.getListProject();
                this.getListCaseSet();
                this.ListApi();
                this.activeName1 = "second";
                this.activeName11 = "first";
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
                        this.moduleList = rsData;
                    }
                })
            },

            listProjectModule(project_id) {
                let postData = {
                    id: project_id,
                };
                listProjectModuleInfo(postData).then(res => {
                        let code = res.data.code;
                        let rsData = res.data.data
                        if (code === 200) {
                            this.moduleList = rsData;
                            this.ListApi();
                        }
                    }
                )
            },

            listProjectCaseSet(project_id) {
                let postData = {
                    id: project_id,
                };
                projectCaseSetInfo(postData).then(res => {
                        let code = res.data.code;
                        let rsData = res.data.data
                        if (code === 200) {
                            this.caseSetData.caseSetList = rsData;
                        }
                    }
                )
            },

            ListApi() {
                let postData = {
                    totalCount: this.totalPage,
                    pageSize: this.pageSize,
                    currentPage: this.currentPage,
                    project_id: this.apiData.projectId,
                    module_id: this.apiData.moduleId,
                    sort: [{"direct": "DESC", "field": "created_time"}]
                };
                listApiInfo(postData).then(res => {
                    let code = res.data.code;
                    let rsData = res.data.data
                    if (code === 200) {
                        this.totalPage = res.data.totalCount;
                        this.apiData.apiList = rsData;

                    }
                })
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
                        this.resetCaseSetForm('caseSetData')
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

            addCase() {
                let postData = {
                    name: this.caseData.name,
                    project_id: this.caseData.projectId,
                    case_set_id: this.caseData.caseSetId,
                    desc: this.caseData.desc,

                };
                addCaseInfo(postData).then(res => {
                    let code = res.data.code;
                    let message = res.data.message;
                    if (code === 200) {
                        this.activeName1 = "first";
                        this.activeName11 = "first";
                        // this.reload();
                        this.getListCase();
                        // this.resetCaseForm('caseData');
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

            addCaseStep() {
                const hasSelectApiId = this.apiData.ids;
                const allSelectApiId = this.apiData.apiList;
                for (let i = 0; i < hasSelectApiId.length; i++) {
                    for (let j = 0; j < allSelectApiId.length; j++) {
                        if (hasSelectApiId[i] === allSelectApiId[j]['id']) {
                            this.stepData.stepList.push(allSelectApiId[j])
                        }
                    }
                }
            },

            deleteCaseStep(id) {
                const stepList = this.stepData.stepList;
                for (var i = 0; i < stepList.length; i++) {
                    if (stepList[i].id === id) {
                        stepList.splice(i, 1);
                    }
                }
            },

            // addCaseStep() {
            //     let postData = {
            //         api_id_list: this.apiData.ids,
            //         case_id: this.caseData.id,
            //     };
            //
            //     addCaseStepInfo(postData).then(res => {
            //         let code = res.data.code;
            //         let message = res.data.message;
            //         if (code === 200) {
            //             this.activeName1 = "first";
            //             this.activeName11 = "first";
            //             // this.reload();
            //             this.getListCase();
            //             // this.resetCaseForm('caseData');
            //             this.$notify({
            //                 title: message,
            //                 type: "success"
            //             })
            //         } else {
            //             this.$notify({
            //                 title: message,
            //                 type: "error"
            //             })
            //         }
            //     })
            // },

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

            getListCase() {
                let postData = {
                    totalCount: this.totalPage,
                    pageSize: this.pageSize,
                    currentPage: this.currentPage,
                    project_id: this.caseData.projectId,
                    case_set_id: this.caseData.caseSetId,
                    sort: [{"direct": "DESC", "field": "created_time"}]

                };
                listCaseInfo(postData).then(res => {

                    let code = res.data.code;
                    let rsData = res.data.data;
                    if (code === 200) {
                        this.totalPage = res.data.totalCount;
                        this.caseData.caseList = rsData;
                    }
                })
            }
            ,

            getListProject(listApi) {
                this.apiData.moduleId = null;
                this.caseSetData.id = null;
                let postData = {
                    kw: this.kw,
                    sort: [{"direct": "DESC", "field": "created_time"}]

                };
                listProjectInfo(postData).then(res => {
                    let code = res.data.code;
                    let rsData = res.data.data
                    if (code === 200) {
                        this.totalPage = res.data.totalCount;
                        this.projectList = rsData;
                        if (listApi) {
                            this.ListApi();
                        }

                    }
                })
            }
            ,

            openAddCaseSet() {
                this.title = '新增';
                this.openDialogVisible = true;
                // this.resetForm('moduleData');
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
                if (typeof id === "number") {
                    this.caseSetData.ids = [];
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
                    this.reload();
                    deleteCaseSetInfo(postData).then(res => {
                        let code = res.data.code;
                        if (code === 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        } else {
                            this.$message({
                                type: 'warning',
                                message: '删除失败!'
                            });
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
            ,

            deleteCase(id) {
                this.caseData.ids = []
                if (typeof id === "number") {
                    this.caseData.ids.push(id);
                }
                let postData = {
                    ids: this.caseData.ids
                };
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteCaseInfo(postData).then(res => {
                        let code = res.data.code;
                        if (code === 200) {
                            this.getListCase();
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

            handleSelectionChange1(val) {
                this.caseSetData.ids=[];
                this.multipleSelection = val;
                this.multipleSelection.map((item) => {
                    this.caseSetData.ids.push(item.id)
                });
            }
            ,

            handleSelectionChange2(val) {
                this.caseData.ids=[];
                this.multipleSelection = val;
                this.multipleSelection.map((item) => {
                    this.caseData.ids.push(item.id)
                });
            }
            ,

            handleSelectionChange3(val) {
                this.stepData.ids = []
                this.multipleSelection = val;
                this.multipleSelection.map((item) => {
                    this.stepData.ids.push(item.id)
                });
            }
            ,

            handleSelectionChange4(val) {
                this.apiData.ids = []
                this.multipleSelection = val;
                this.multipleSelection.map((item) => {
                    this.apiData.ids.push(item.id)
                });
            },

            open() {
                this.openDialogVisible = true;

            }
            ,

            submitCaseSetForm(formName) {
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

            // submitCaseForm(formName) {
            //     this.$refs[formName].validate((valid) => {
            //         if (valid && this.title === '新增') {
            //             this.addCase();
            //         } else if (valid && this.title === '编辑') {
            //             this.editCase();
            //         } else {
            //             return false;
            //         }
            //     });
            // },

            resetCaseForm(formName) {
                this.$refs[formName].resetFields();
            }
            ,

            resetCaseSetForm(formName) {
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
        },

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