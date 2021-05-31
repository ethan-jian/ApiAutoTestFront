<template>
    <div>
        <el-tabs v-model="activeName1" type="card">
            <el-tab-pane label="接口信息" name="first">
                <div>
                    <el-row style="float: left">
                        <el-col :span="8">
                            <el-select v-model="apiData.project_id" placeholder="请选择项目" @focus="listProject()"
                                       @change="listProject()">
                                <el-option v-for="item in projectList"
                                           :key="item.id"
                                           :value="item.id"
                                           :label="item.name"
                                >
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="8">
                            <el-select v-model="apiData.module_id" placeholder="请选择模块"
                                       @focus="listProjectModule(apiData.project_id)">
                                <el-option v-for="item in moduleList"
                                           :key="item.id"
                                           :value="item.id"
                                           :label="item.name">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="2">
                            <el-button type="primary" @click="ListApi">查询</el-button>
                        </el-col>
                        <!--                        <el-col :span="5">-->
                        <!--                            <el-button @click="resetInput()">重置</el-button>-->
                        <!--                        </el-col>-->

                    </el-row>
                    <div style="position: absolute;right: 0">
                        <el-button type="warning" @click="deleteApi"
                                   plain>批量删除
                        </el-button>
                    </div>
                </div>
                <el-table
                        ref="multipleTable"
                        :data="apiList"
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
                            width="200">
                    </el-table-column>
                    <!--                    <el-table-column-->
                    <!--                            prop="desc"-->
                    <!--                            label="描述"-->
                    <!--                            width="200">-->
                    <!--                    </el-table-column>-->
                    <el-table-column
                            label="项目"
                            width="200">
                        <template slot-scope="scope">
                            {{ scope.row.project_name}}
                            <!--                                                <span v-if="scope.row.environment_type === '1'">测试环境</span>-->
                            <!--                                                <span v-if="scope.row.environment_type === '2'">开发环境</span>-->
                            <!--                                                <span v-if="scope.row.environment_type === '3'">线上环境</span>-->
                            <!--                                                <span v-if="scope.row.environment_type === '4'">备用环境</span>-->
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="模块"
                            width="200">
                        <template slot-scope="scope">{{ scope.row.module_name }}</template>
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
                            <el-button @click="editApi(scope.row.id)" type="text" size="small">编辑</el-button>
                            <el-button @click="deleteApi(scope.row.id)" type="text" size="small">删除</el-button>
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
                                <el-select v-model="apiData.project_id" placeholder="请选择项目" @focus="listProject()"
                                           @change="listProject()">
                                    <el-option v-for="item in projectList"
                                               :key="item.id"
                                               :value="item.id"
                                               :label="item.name"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="选择模块">
                                <el-select v-model="apiData.module_id" placeholder="请选择模块"
                                           @focus="listProjectModule(apiData.project_id)">
                                    <el-option v-for="item in moduleList"
                                               :key="item.id"
                                               :value="item.id"
                                               :label="item.name">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="基础url">
                                <el-input
                                        placeholder="base_url"
                                        v-model="apiData.base_url"
                                        :disabled="true">
                                </el-input>
                                <!--                                <el-select v-model="apiData.base_url" placeholder="请选择活动区域">-->
                                <!--                                    <el-option v-for="item in moduleList"-->
                                <!--                                               :key="item.id"-->
                                <!--                                               :value="item.id"-->
                                <!--                                               :label="item.name">-->
                                <!--                                    </el-option>-->
                                <!--                                </el-select>-->
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="前置函数">
                                <el-input v-model="apiData.up_func" placeholder="set_up_hooks"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="后置函数">
                                <el-input v-model="apiData.down_func" placeholder="set_down_hooks"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="是否跳过">
                                <el-select v-model="apiData.skip" placeholder="true or false">
                                    <el-option v-for="item in skips"
                                               :key="item"
                                               :value="item"
                                    >
                                    </el-option>
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
                                        <el-option v-for="item in methodList"
                                                   :key="item"
                                                   :value="item"
                                                   :label="item">
                                        </el-option>
                                    </el-select>
                                    <el-button slot="suffix" type="primary" size="medium" @click="runApi">
                                        Send
                                    </el-button>
                                    <el-button slot="suffix" type="primary" size="medium"
                                               @click="addApi">
                                        Save
                                    </el-button>

                                </el-input>

                            </el-col>

                        </el-row>
                        <el-row>
                            <el-col>
                                <el-tabs v-model="activeName11" type="card">
                                    <el-tab-pane label="Heard" name="first">
                                        <el-button type="primary" plain @click="addRow('Heard')" size="small">添加
                                        </el-button>
                                        <div>
                                            <el-form v-for="(item, index) in apiData.header"
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
                                                                       @click="delRow('Heard', index)" size="small">
                                                            </el-button>
                                                        </el-col>
                                                    </el-row>
                                                </el-form-item>
                                            </el-form>

                                        </div>
                                    </el-tab-pane>
                                    <el-tab-pane label="Body" name="second">
                                        <el-row style="float: left">
                                            <el-col :span="24">
                                                <el-radio-group v-model="radio">
                                                    <el-radio-button label="Form-data"></el-radio-button>
                                                    <el-radio-button label="Raw"></el-radio-button>
                                                    <el-radio-button label="Text"></el-radio-button>
                                                </el-radio-group>
                                            </el-col>
                                        </el-row>
                                        <br>
                                        <br>
                                        <div class="Form-dataClass" v-if="radio!=='Raw'">
                                            <el-button type="primary" plain
                                                       @click="addRow(radio)"
                                                       size="small">
                                                添加
                                            </el-button>
                                            <el-form v-for="(item, index) in apiData.body_form_data"
                                                     :key="item.pass">
                                                <el-form-item>
                                                    <el-row>
                                                        <el-col :span="6">
                                                            <el-input clearable v-model="item.key"
                                                                      size="small" placeholder="key"></el-input>
                                                        </el-col>
                                                        <el-col :span="2">
                                                            <el-select v-model="item.bodyFormDataType"
                                                                       size="small"
                                                                       style="width: 100px"
                                                                       placeholder="选择">
                                                                <el-option
                                                                        v-for="item in bodyFormDataTypes"
                                                                        :key="item"
                                                                        :value="item"
                                                                        :label="item">
                                                                </el-option>
                                                            </el-select>
                                                        </el-col>
                                                        <div v-if="item.bodyFormDataType==='file'">
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
                                                                       @click="delRow(radio, index)"
                                                                       size="small">
                                                            </el-button>
                                                        </el-col>
                                                    </el-row>
                                                </el-form-item>
                                            </el-form>
                                        </div>

                                        <div class="jsonClass" v-if="radio==='Raw'">
                                            <el-form>
                                                <el-form-item>
                                                    <el-row>
                                                        <el-col :span="24">
                                                            <div>
                                                                <editor
                                                                        v-contextmenu:contextmenu
                                                                        style="font-size: 15px"
                                                                        v-model="apiData.body_json"
                                                                        @init="editorInit"
                                                                        lang="json"
                                                                        theme="chrome"
                                                                        width="100%"
                                                                        height="515px"
                                                                        :options="{}"
                                                                ></editor>
                                                            </div>
                                                        </el-col>
                                                    </el-row>
                                                </el-form-item>
                                            </el-form>
                                        </div>

                                    </el-tab-pane>
                                    <el-tab-pane label="Extract" name="third">
                                        <el-button type="primary" plain @click="addRow('Extract')" size="small">添加
                                        </el-button>
                                        <div>
                                            <el-form v-for="(item, index) in apiData.extract"
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
                                                                       @click="delRow('Extract', index)" size="small">
                                                            </el-button>
                                                        </el-col>
                                                    </el-row>
                                                </el-form-item>
                                            </el-form>

                                        </div>
                                    </el-tab-pane>
                                    <el-tab-pane label="Validate" name="four">
                                        <el-button type="primary" plain @click="addRow('Validate')" size="small">添加
                                        </el-button>
                                        <div>
                                            <el-form v-for="(item, index) in apiData.validate"
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
                                                                       @click="delRow('Validate', index)" size="small">
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

    import {
        addApiInfo,
        catApiDetailInfo,
        deleteApiInfo,
        editApiInfo,
        listApiInfo,
        listProjectModuleInfo,
        runApiInfo,
    } from "../../api/api";
    import {
        catProjectModuleInfo,
        listProjectInfo,
    } from "../../api/project";


    export default {
        inject: ['reload'],
        name: 'apiInfo',

        components: {
            editor: require('vue2-ace-editor'),
        },
        data() {
            return {
                radio: 'Form-data',
                activeName1: 'first',
                activeName11: 'first',
                activeBody: 'first',
                title: '新增',
                skips: [true, false],
                methodList: ['POST', 'GET', 'PUT', 'DELETE'],
                bodyFormDataTypes: ['string', 'file'],
                bodyFormDataType: 'string',
                kw: '',
                sort: [
                    {
                        "direct": "DESC",
                        "field": "created_time"
                    }],
                ApiDialogVisible: false,
                variableDialogVisible: false,
                projectList: [],
                moduleList: [],
                apiList: [],
                multipleSelection: [],
                currentPage: 1,
                pageSize: 10,
                pageSizes: [10, 20, 30, 40, 50],
                totalPage: 0,
                id: null,
                ids: [],

                apiData: {
                    name: null,
                    desc: null,
                    body_type: 'json', //参数选择类型
                    base_url: null,      //基础url,序号对应项目的环境
                    up_func: null,       //接口执行前的函数
                    down_func: '',      //接口执行后的函数
                    method: 'POST',       //请求方式
                    body_form_data: [],     //form-data形式的参数
                    body_json: null,  //json形式的参数
                    url_param: [],          //url上面所带的参数
                    url: null,  //接口地址
                    skip: false, //跳过判断
                    extract: [], //提取信息
                    validate: [], //断言信息
                    header: [],   //头部信息
                    module_id: null,  //所属的接口模块id
                    project_id: null,  //所属的项目id

                },

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

            addApi() {
                let postData = {
                    name: this.apiData.name,
                    desc: this.apiData.desc,
                    bodyType: this.apiData.body_type, //参数选择类型
                    baseUrl: this.apiData.base_url,      //基础url,序号对应项目的环境
                    upFunc: this.apiData.up_func,       //接口执行前的函数
                    downFunc: this.apiData.down_func,      //接口执行后的函数
                    method: this.apiData.method,       //请求方式
                    bodyFormData: this.apiData.body_form_data,     //form-data形式的参数
                    bodyJson: this.apiData.body_json,  //json形式的参数
                    urlParam: this.apiData.url_param,          //url上面所带的参数
                    url: this.apiData.url,  //接口地址
                    skip: this.apiData.skip, //跳过判断
                    extract: this.apiData.extract, //提取信息
                    validate: this.apiData.validate, //断言信息
                    header: this.apiData.header,   //头部信息
                    moduleId: this.apiData.module_id,  //所属的接口模块id
                    projectId: this.apiData.project_id,  //所属的项目id

                };
                addApiInfo(postData).then(res => {
                        let code = res.data.code;
                        let message = res.data.message;
                        if (code === 200) {
                            this.reload();
                            this.$notify({
                                    title: message,
                                    type: "success"
                                }
                            );

                        } else {
                            this.$notify({
                                title: message,
                                type: "error"
                            })
                        }

                    }
                )
            },

            runApi() {
                let postData = {
                    name: this.apiData.name,
                    desc: this.apiData.desc,
                    bodyType: this.apiData.body_type, //参数选择类型
                    baseUrl: this.apiData.base_url,      //基础url,序号对应项目的环境
                    upFunc: this.apiData.up_func,       //接口执行前的函数
                    downFunc: this.apiData.down_func,      //接口执行后的函数
                    method: this.apiData.method,       //请求方式
                    bodyFormData: this.apiData.body_form_data,     //form-data形式的参数
                    bodyJson: this.apiData.body_json,  //json形式的参数
                    urlParam: this.apiData.url_param,          //url上面所带的参数
                    url: this.apiData.url,  //接口地址
                    skip: this.apiData.skip, //跳过判断
                    extract: this.apiData.extract, //提取信息
                    validate: this.apiData.validate, //断言信息
                    header: this.apiData.header,   //头部信息
                    moduleId: this.apiData.module_id,  //所属的接口模块id
                    projectId: this.apiData.project_id,  //所属的项目id
                };
                runApiInfo(postData).then(res => {
                    let code = res.data.code;
                    let rsData = res.data.data
                    if (code === 200) {
                        console.log(rsData);
                        // this.totalPage = res.data.totalCount;
                        // this.apiList = rsData;

                    }
                })
            },

            getBaseUrl(projectId) {
                for (var n = 0; n < this.projectList.length; n++) {
                    console.log('id', this.projectList[n]['id'])
                    console.log('projectid', projectId)
                    if (projectId === this.projectList[n]['id']) {
                        console.log('environment_type', this.projectList[n]['environment_type'])
                        if (this.projectList[n]['environment_type'] === '1') {
                            this.apiData.base_url = this.projectList[n]['test_environment']
                        } else if (this.projectList[n]['environment_type'] === '2') {
                            this.apiData.base_url = this.projectList[n]['dev_environment']
                        } else if (this.projectList[n]['environment_type'] === '3') {
                            this.apiData.base_url = this.projectList[n]['online_environment']
                        } else if (this.projectList[n]['environment_type'] === '4') {
                            this.apiData.base_url = this.projectList[n]['bak_environment']
                        }
                        break;
                    }
                }

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

                        }
                    }
                )
            },

            listProject() {
                let postData = {
                    kw: this.kw,
                    sort: this.sort,
                };
                listProjectInfo(postData).then(res => {
                        let code = res.data.code;
                        let rsData = res.data.data
                        if (code === 200) {
                            // this.totalPage = res.data.totalCount;
                            this.apiData.module_id = null;
                            this.projectList = rsData;
                            this.getBaseUrl(this.apiData.project_id);
                        }
                    }
                )
            },

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

            deleteApi(id) {
                console.log(id)
                if (typeof id === "number") {
                    this.ids.push(id);
                }
                let postData = {
                    ids: this.ids
                };
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteApiInfo(postData).then(res => {
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
            catApi(id) {
                this.title = '编辑';
                this.ApiDialogVisible = true;
                this.apiData.id = id;
                let postData = {
                    "id": id
                };

                catApiDetailInfo(postData).then(res => {
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

            editApi() {
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
                editApiInfo(postData).then(res => {
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


            ListApi() {
                let postData = {
                    totalCount: this.totalPage,
                    pageSize: this.pageSize,
                    currentPage: this.currentPage,
                    project_id: this.apiData.project_id,
                    module_id: this.apiData.module_id,
                    sort: [{"direct": "DESC", "field": "created_time"}]
                };
                listApiInfo(postData).then(res => {
                    let code = res.data.code;
                    let rsData = res.data.data
                    if (code === 200) {
                        this.totalPage = res.data.totalCount;
                        this.apiList = rsData;

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
                    this.ids.push(item.id)
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

            addRow(type) {
                if (type === 'Heard') {
                    console.log(this.apiData.header)
                    this.apiData.header.push({key: null, value: null, remark: null});
                } else if (type === 'Form-data') {
                    this.apiData.body_form_data.push({key: null, value: null, bodyFormDataType: null, remark: null});
                    console.log(this.apiData.body_form_data)
                } else if (type === 'Text') {
                    this.apiData.body_form_data.push({key: null, value: null, remark: null});
                } else if (type === 'Extract') {
                    this.apiData.extract.push({key: null, value: null, remark: null});
                } else if (type === 'Validate') {
                    this.apiData.validate.push({key: null, value: null, remark: null});
                }

            },

            delRow(type, index) {
                if (type === 'Heard') {
                    this.apiData.header.splice(index, 1);
                } else if (type === 'Form-data') {
                    this.apiData.body_form_data.splice(index, 1);
                } else if (type === 'Text') {
                    this.apiData.body_form_data.splice(index, 1);
                } else if (type === 'Extract') {
                    this.apiData.extract.splice(index, 1);
                } else if (type === 'Validate') {
                    this.apiData.validate.splice(index, 1);
                }

            },

            handleCloseProjectDialog() {
                this.ApiDialogVisible = false;
            },
            handleClosevariableDialog() {
                this.variableDialogVisible = false;
                // this.apiData.variable = [];
            },


            onJsonChange(value) {
                // console.log('更改value:', value);
                // 实时保存
                this.onJsonSave(value)
            },
            onJsonSave(value) {
                // console.log('保存value:', value);
                this.resultInfo = value
                this.hasJsonFlag = true
            },
            onError(value) {
                console.log("json错误了value:", value);
                this.hasJsonFlag = false
            },
            // 检查json
            checkJson() {
                if (this.hasJsonFlag === false) {
                    // console.log("json验证失败")
                    // this.$message.error("json验证失败")
                    alert("json验证失败")
                    return false
                } else {
                    // console.log("json验证成功")
                    // this.$message.success("json验证成功")
                    alert("json验证成功")
                    return true
                }
            },
            editorInit: function () {
                require('brace/ext/language_tools');
                require('brace/mode/json');
                require('brace/theme/chrome');
                require('brace/snippets/json')
            }

        },
        created() {
            this.ListApi();
        },


    }


</script>

<style scoped>
    .projectTable {
        /*width:50%;*/
        /*height:50%;*/
    }

</style>