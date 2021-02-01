<template>
    <div>
        <el-tabs v-model="activeName" type="card">
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

                <el-form ref="form" :model="form" label-width="80px" size="small" style="float: left">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="接口名称">
                                <el-input v-model="apiData.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="选择项目">
                                <el-select v-model="apiData.region" placeholder="请选择活动区域">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="选择模块">
                                <el-select v-model="apiData.region" placeholder="请选择活动区域">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="选择环境">
                                <el-select v-model="apiData.region2" placeholder="请选择活动区域">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="前置函数">
                                <el-input v-model="apiData.name3" placeholder="set_up_hooks"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="后置函数">
                                <el-input v-model="apiData.name2" placeholder="set_down_hooks"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="是否跳过">
                                <el-select v-model="apiData.region2" placeholder="true or false">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-form ref="form" :model="form" label-width="100%">
                        <el-row>
                            <el-col :span="24">
                                <el-input placeholder="Enter request URL"
                                          v-model="apiData.url"
                                          style="width: 100%;margin-right: 5px"
                                          size="medium"
                                >
                                    <el-select v-model="apiData.method"
                                               size="medium"
                                               style="width: 100px"
                                               slot="prepend"
                                               placeholder="选择请求方式">
                                        <el-option v-for="item in methods"
                                                   :key="item"
                                                   :value="item"
                                                   :label="item">
                                        </el-option>
                                    </el-select>
                                    <el-button slot="suffix" type="primary" size="medium">
                                        Send
                                    </el-button>
                                    <el-button slot="suffix" type="primary" size="medium">
                                        Save
                                    </el-button>

                                </el-input>

                            </el-col>
                            <!--                            &lt;!&ndash;                            <el-col :span="2.5">&ndash;&gt;-->
                            <!--                            &lt;!&ndash;                                <el-button type="primary"&ndash;&gt;-->
                            <!--                            &lt;!&ndash;                                           @click.native="saveAndRun()"&ndash;&gt;-->
                            <!--                            &lt;!&ndash;                                           size="medium"&ndash;&gt;-->
                            <!--                            &lt;!&ndash;                                           :loading="this.saveRunStatus"&ndash;&gt;-->
                            <!--                            &lt;!&ndash;                                >Send&ndash;&gt;-->
                            <!--                            &lt;!&ndash;                                </el-button>&ndash;&gt;-->
                            <!--                            &lt;!&ndash;                                <el-button type="primary" @click.native="addApiMsg()" size="medium">Save</el-button>&ndash;&gt;-->
                            <!--                            &lt;!&ndash;                            </el-col>&ndash;&gt;-->
                        </el-row>
                        <el-row>
                            <el-col>
                                <el-tabs v-model="activeName1" type="card">
                                    <el-tab-pane label="Heard" name="first">
                                        <el-button type="primary" plain @click="addHeader" size="small">添加</el-button>
                                        <div>
                                            <el-form v-for="(item, index) in apiData.headers"
                                                     :key="item.pass">
                                                <el-form-item>
                                                    <el-row>
                                                        <el-col :span="6">
                                                            <el-input clearable v-model="item.key"
                                                                      size="small" placeholder="key"></el-input>
                                                        </el-col>
                                                        <el-col :span="14">
                                                            <el-input clearable v-model="item.value"
                                                                      size="small" placeholder="value"></el-input>
                                                        </el-col>
                                                        <el-col :span="3">
                                                            <el-input clearable v-model="item.remark"
                                                                      size="small" placeholder="备注"></el-input>
                                                        </el-col>
                                                        <el-col :span="1">
                                                            <el-button type="danger" class="el-icon-delete"
                                                                       @click="delHeader(index)" size="small">
                                                            </el-button>
                                                        </el-col>
                                                    </el-row>
                                                </el-form-item>
                                            </el-form>

                                        </div>
                                    </el-tab-pane>
                                    <el-tab-pane label="Body" name="second">
                                        <el-tabs v-model="activeName2">
                                            <el-tab-pane label="Form-data" name="first">
                                                <el-button type="primary" plain @click="addBodyFormData" size="small">
                                                    添加
                                                </el-button>
                                                <div>
                                                    <el-form v-for="(item, index) in apiData.bodys"
                                                             :key="item.pass">
                                                        <el-form-item>
                                                            <el-row>
                                                                <el-col :span="6">
                                                                    <el-input clearable v-model="item.key"
                                                                              size="small" placeholder="key"></el-input>
                                                                </el-col>
                                                                <el-col :span="2">
                                                                    <el-select v-model="apiData.bodyFormDataType"
                                                                               size="small"
                                                                               style="width: 100px"
                                                                               placeholder="选择">
                                                                        <el-option
                                                                                v-for="item in apiData.bodyFormDataTypes"
                                                                                :key="item"
                                                                                :value="item"
                                                                                :label="item">
                                                                        </el-option>
                                                                    </el-select>


                                                                </el-col>


                                                                <div v-if="apiData.bodyFormDataType==='file'">
                                                                    <el-col :span="2" style="padding-left:10px;">
                                                                        <el-upload
                                                                                class="upload-demo"
                                                                                action="/api/upload"
                                                                                :show-file-list='false'
                                                                                :on-success="fileChange">
                                                                            <el-button size="mini" type="primary"
                                                                                       @click="tempNum(scope.$index)">
                                                                                点击上传
                                                                            </el-button>
                                                                        </el-upload>
                                                                    </el-col>
                                                                </div>

                                                                <div v-else>
                                                                    <el-col :span="12">
                                                                        <el-input clearable v-model="item.value"
                                                                                  size="small"
                                                                                  placeholder="value"></el-input>
                                                                    </el-col>
                                                                </div>


                                                                <el-col :span="3">
                                                                    <el-input clearable v-model="item.remark"
                                                                              size="small" placeholder="备注"></el-input>
                                                                </el-col>
                                                                <el-col :span="1">
                                                                    <el-button type="danger" class="el-icon-delete"
                                                                               @click="delBodyFormData(index)"
                                                                               size="small">
                                                                    </el-button>
                                                                </el-col>
                                                            </el-row>
                                                        </el-form-item>
                                                    </el-form>

                                                </div>
                                            </el-tab-pane>
                                            <el-tab-pane label="Raw" name="second">

                                            </el-tab-pane>
                                            <el-tab-pane label="Text" name="third">
                                                <el-button type="primary" plain @click="addBodyFormData" size="small">
                                                    添加
                                                </el-button>
                                                <div>
                                                    <el-form v-for="(item, index) in apiData.bodys"
                                                             :key="item.pass">
                                                        <el-form-item>
                                                            <el-row>
                                                                <el-col :span="6">
                                                                    <el-input clearable v-model="item.key"
                                                                              size="small" placeholder="key"></el-input>
                                                                </el-col>
                                                                <el-col :span="2">
                                                                    <el-select v-model="apiData.bodyFormDataType"
                                                                               size="small"
                                                                               style="width: 100px"
                                                                               placeholder="选择请求方式">
                                                                        <el-option
                                                                                v-for="item in apiData.bodyFormDataTypes"
                                                                                :key="item"
                                                                                :value="item"
                                                                                :label="item">
                                                                        </el-option>
                                                                    </el-select>

                                                                </el-col>

                                                                <el-col :span="12">
                                                                    <el-input clearable v-model="item.value"
                                                                              size="small"
                                                                              placeholder="value"></el-input>
                                                                </el-col>
                                                                <el-col :span="3">
                                                                    <el-input clearable v-model="item.remark"
                                                                              size="small" placeholder="备注"></el-input>
                                                                </el-col>
                                                                <el-col :span="1">
                                                                    <el-button type="danger" class="el-icon-delete"
                                                                               @click="delBody(index)" size="small">
                                                                    </el-button>
                                                                </el-col>
                                                            </el-row>
                                                        </el-form-item>
                                                    </el-form>

                                                </div>

                                            </el-tab-pane>
                                        </el-tabs>

                                    </el-tab-pane>
                                    <el-tab-pane label="Extract" name="third">
                                        <el-button type="primary" plain @click="addExtract" size="small">添加</el-button>
                                        <div>
                                            <el-form v-for="(item, index) in apiData.extracts"
                                                     :key="item.pass">
                                                <el-form-item>
                                                    <el-row>
                                                        <el-col :span="6">
                                                            <el-input clearable v-model="item.key"
                                                                      size="small" placeholder="key"></el-input>
                                                        </el-col>
                                                        <el-col :span="14">
                                                            <el-input clearable v-model="item.value"
                                                                      size="small" placeholder="value"></el-input>
                                                        </el-col>
                                                        <el-col :span="3">
                                                            <el-input clearable v-model="item.remark"
                                                                      size="small" placeholder="备注"></el-input>
                                                        </el-col>
                                                        <el-col :span="1">
                                                            <el-button type="danger" class="el-icon-delete"
                                                                       @click="delExtract(index)" size="small">
                                                            </el-button>
                                                        </el-col>
                                                    </el-row>
                                                </el-form-item>
                                            </el-form>

                                        </div>
                                    </el-tab-pane>
                                    <el-tab-pane label="Assert" name="four">
                                        <el-button type="primary" plain @click="addAssert" size="small">添加</el-button>
                                        <div>
                                            <el-form v-for="(item, index) in apiData.asserts"
                                                     :key="item.pass">
                                                <el-form-item>
                                                    <el-row>
                                                        <el-col :span="6">
                                                            <el-input clearable v-model="item.key"
                                                                      size="small" placeholder="key"></el-input>
                                                        </el-col>
                                                        <el-col :span="14">
                                                            <el-input clearable v-model="item.value"
                                                                      size="small" placeholder="value"></el-input>
                                                        </el-col>
                                                        <el-col :span="3">
                                                            <el-input clearable v-model="item.remark"
                                                                      size="small" placeholder="备注"></el-input>
                                                        </el-col>
                                                        <el-col :span="1">
                                                            <el-button type="danger" class="el-icon-delete"
                                                                       @click="delAssert(index)" size="small">
                                                            </el-button>
                                                        </el-col>
                                                    </el-row>
                                                </el-form-item>
                                            </el-form>

                                        </div>
                                    </el-tab-pane>
                                </el-tabs>
                            </el-col>
                        </el-row>
                    </el-form>

                </el-form>

            </el-tab-pane>

        </el-tabs>

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
                activeName: 'first',
                activeName1: 'first',
                activeName2: 'first',
                activeName3: 'first',
                activeName4: 'first',
                activeName5: 'first',
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
                    environment_type: '1',//测试环境
                    projectId: null,
                    funcFile: '',
                    desc: null,
                    methods: ['POST', 'GET'],
                    variable: [],
                    headers: [],
                    bodys: [],
                    bodysJson: [],
                    bodyFormDataTypes: ["string", "file"],
                    bodyFormDataType: "string",
                    bodyRowType: null,
                    bodyTextType: null,
                    extracts: [],
                    asserts: [],
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
            addHeader() {
                this.apiData.headers.push({key: null, value: null, remark: null});
                console.log(this.apiData.headers)
            },
            delHeader(index) {
                this.apiData.headers.splice(index, 1);
            },
            addBodyFormData() {
                this.apiData.bodys.push({key: null, value: null, remark: null});
                console.log(this.apiData.headers)
            },
            delBodyFormData(index) {
                this.apiData.bodys.splice(index, 1);
            },
            addExtract() {
                this.apiData.extracts.push({key: null, value: null, remark: null});
                console.log(this.apiData.headers)
            },
            delExtract(index) {
                this.apiData.extracts.splice(index, 1);
            },
            addAssert() {
                this.apiData.asserts.push({key: null, value: null, remark: null});
                console.log(this.apiData.headers)
            },
            delAssert(index) {
                this.apiData.asserts.splice(index, 1);
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
        },


    }


</script>

<style scoped>
    .projectTable {
        /*width:50%;*/
        /*height:50%;*/
    }

</style>