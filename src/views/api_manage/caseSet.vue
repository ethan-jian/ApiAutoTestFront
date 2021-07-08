<template>
    <div>
        <el-col>
            <el-input
                    style="width: 200px;
                    float: left;"
                    placeholder="请输入项目名称"
                    v-model="kw"
                    clearable>
            </el-input>
            <div style="position: absolute;left: 430px;">
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
                    @selection-change="handleSelectionCaseSet"
                    row-key="id"
            >
                <el-table-column
                        type="selection"
                        width="50">
                </el-table-column>
                <el-table-column label="序号" type="index" align="center" show-overflow-tooltip width="50px">
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
                    @selection-change="handleSelectionCase">
                <el-table-column
                        type="selection"
                        width="50">
                </el-table-column>
                <el-table-column label="序号" type="index" align="center" show-overflow-tooltip width="50px">
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

        <el-dialog
                :title="title"
                :visible.sync="caseSetDialogVisible"
                width="30%"
                :before-close="handleCloseModuleDialog">
            <div>
                <el-form :model="caseSetData" :rules="caseSetRules" ref="caseSetData" label-width="80px"
                         class="demo-ruleForm">
                    <el-form-item label-position="left" label="用例集合" prop="name">
                        <el-input v-model="caseSetData.name" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label-position="left" label="项目名称" prop="projectId">
                        <el-select v-model="caseSetData.projectId"
                                   placeholder="请选择项目"
                                   @focus="getListProject(false, false)"
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

            <!--            <span slot="footer" class="dialog-footer">-->
            <!--            <el-button @click="openDialogVisible = false">取 消</el-button>-->
            <!--                    </span>-->
        </el-dialog>

        <el-dialog
                :visible.sync="caseInfoDialogVisible"
                width="30%"
                :before-close="handleCloseCaseInfoDialog">
            <el-form :model="caseData" :rules="caseInfoRules" ref="caseData" label-width="100px"
                     class="demo-ruleForm" size="mini">
                <el-form-item label="用例名称" prop="name">
                    <el-input v-model="caseData.name" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="所属项目">
                    <el-select v-model="caseSetData.projectId" placeholder="请选择项目" disabled size="mini"
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
                    <el-select v-model="caseSetData.id" placeholder="请选择用例集" disabled size="mini"
                               @focus="listProjectCaseSet(caseSetData.projectId)"
                               @change="listProjectCaseSet(caseSetData.projectId)">
                        <el-option v-for="item in caseData.caseSetList"
                                   :key="item.id"
                                   :value="item.id"
                                   :label="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用例描述" prop="desc">
                    <el-input type="textarea" v-model="caseData.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitCaseForm('caseData')">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog
                :visible.sync="caseDetailInfoDialogVisible"
                width="80%"
                :before-close="handleCloseCaseDetailInfoDialog">
            <el-form :model="caseData" :rules="caseInfoRules" ref="caseData" label-width="100px"
                     class="demo-ruleForm" size="mini">
                <el-form-item label="用例名称" prop="name">
                    <el-input v-model="caseData.name" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="所属项目">
                    <el-select v-model="caseSetData.projectId" placeholder="请选择项目" size="mini"
                               @focus="getListProject(null, true)"
                               @change="getListProject(null, true)">
                        <el-option v-for="item in projectList"
                                   :key=item.id
                                   :value=item.id
                                   :label="item.name"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用例集">
                    <el-select v-model="caseSetData.id" placeholder="请选择用例集" size="mini"
                               @focus="listProjectCaseSet(caseSetData.projectId)"
                               @change="listProjectCaseSet(caseSetData.projectId)">
                        <el-option v-for="item in caseSetData.caseSetList"
                                   :key=item.id
                                   :value=item.id
                                   :label="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用例描述" prop="desc">
                    <el-input type="textarea" v-model="caseData.desc"></el-input>
                </el-form-item>
            </el-form>

            <el-row>
                <el-col :span="10">
                    <el-table
                            ref="stepDataTable"
                            :data="stepData.stepList"
                            tooltip-effect="dark"
                            style="width: 100%; text-align: right;"
                            size="mini"
                            @selection-change="handleSelectionStep"
                            row-key="name"

                    >
                        <el-table-column
                                type="selection"
                                width="30">
                        </el-table-column>
                        <el-table-column label="序号" type="index" align="center" show-overflow-tooltip width="50px">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="步骤"
                                width="150">
                        </el-table-column>
                        <el-table-column
                                prop="desc"
                                label="描述"
                                width="150">
                        </el-table-column>
                        <el-table-column
                                prop="url"
                                label="地址"
                                show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="90">
                            <template slot-scope="scope">
                                <!--                                <el-button @click="catCaseStep(scope.row.id)" type="text" size="small">编辑-->
                                <!--                                </el-button>-->
                                <el-button @click="catCaseStep(scope.row.id)" type="text" size="small">
                                    编辑
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
                <el-col :span="12">
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
                            @selection-change="handleSelectionApi"
                    >
                        <el-table-column
                                type="selection"
                                width="30">
                        </el-table-column>
                        <el-table-column label="序号" type="index" align="center" show-overflow-tooltip width="50px">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="接口"
                                width="150">
                        </el-table-column>
                        <el-table-column
                                prop="desc"
                                label="描述"
                                width="150">
                        </el-table-column>
                        <el-table-column
                                prop="url"
                                label="地址"
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
                    <div style="text-align: center">
                        <el-button type="primary" style="float: right" @click="editCase">保存</el-button>
                    </div>
                </el-col>

            </el-row>


        </el-dialog>


        <el-drawer
                title="步骤信息"
                :visible.sync="drawer"
                :with-header="false"
                :modal="false"
                :size="stepInfoSize"

        >
            <template>
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="步骤信息" name="first">
                        <el-form>
                            <el-row>
                                <el-form-item label="步骤名称">
                                    <el-col :span="8">
                                        <el-input v-model="stepData.name" placeholder="步骤名称"></el-input>
                                    </el-col>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item label="前置函数">
                                    <el-col :span="8">
                                        <el-input v-model="stepData.upFunc" placeholder="set_up_hooks"></el-input>
                                    </el-col>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item label="后置函数">
                                    <el-col :span="8">
                                        <el-input v-model="stepData.downFunc"
                                                  placeholder="set_down_hooks"></el-input>
                                    </el-col>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item label="是否跳过">
                                    <el-col :span="8">
                                        <el-select v-model="stepData.skip" placeholder="true or false">
                                            <el-option v-for="item in skips"
                                                       :key="item"
                                                       :value="item"
                                            >
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-form-item>
                            </el-row>
                        </el-form>
                    </el-tab-pane>

                    <el-tab-pane label="Headers" name="second">

                        <el-button type="primary" plain @click="addRow('Heard')" size="small">添加
                        </el-button>
                        <el-form v-for="(item, index) in stepData.header"
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


                    </el-tab-pane>

                    <el-tab-pane label="Body" name="third">
                        <span class="collapse-title" slot="title">Body</span>
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
                            <el-form v-for="(item, index) in stepData.bodyFormData"
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
                                                        v-model="stepData.bodyJson"
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
                    <el-tab-pane label="Extract" name="fourth">
                        <span class="collapse-title" slot="title">Extract</span>
                        <el-button type="primary" plain @click="addRow('Extract')" size="small">添加
                        </el-button>
                        <div>
                            <el-form v-for="(item, index) in stepData.extract"
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
                    <el-tab-pane label="Assert" name="five">
                        <span class="collapse-title" slot="title">Assert</span>
                        <el-button type="primary" plain @click="addRow('Validate')" size="small">添加
                        </el-button>
                        <div>
                            <el-form v-for="(item, index) in stepData.validate"
                                     :key="item.pass">
                                <el-form-item>
                                    <el-row>
                                        <el-col :span="6">
                                            <el-input clearable v-model="item.key"
                                                      size="small" placeholder="key"></el-input>
                                        </el-col>

                                        <el-col :span="2">
                                            <el-select v-model="item.validateType"
                                                       size="small"
                                                       style="width: 100px"
                                                       placeholder="选择">
                                                <el-option
                                                        v-for="item in validateTypes"
                                                        :key="item"
                                                        :value="item"
                                                        :label="item">
                                                </el-option>
                                            </el-select>
                                        </el-col>

                                        <el-col :span="12">
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
                <el-button type="primary" @click="editStep()">保存</el-button>

            </template>
        </el-drawer>

        <result ref="resultFunc">
        </result>

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
        catCaseDetailInfo,
        deleteCaseInfo,
        editCaseInfo,
        listCaseInfo,
        addCaseStepInfo,
        listCaseStepInfo,
        deleteCaseStepInfo,
        catCaseStepDetailInfo,
        editCaseStepInfo
    } from "../../api/case";

    import {listApiInfo, listProjectModuleInfo} from "../../api/api";
    import result from "./result";
    import Sortable from 'sortablejs'


    export default {
        inject: ['reload'],
        name: 'module',
        components: {
            editor: require('vue2-ace-editor'),
            result: result,
        },
        data() {
            return {
                activeName: 'first',
                caseSetDialogVisible: false,
                caseInfoDialogVisible: false,
                caseDetailInfoDialogVisible: false,
                stepDialogVisible: false,
                hasSelect: false,
                drawer: false,
                stepInfoSize: '55%',
                radio: 'Form-data',
                title: '新增',
                kw: '',
                skips: ["True", "False"],
                bodyFormDataTypes: ['string', 'file'],
                bodyFormDataType: 'string',
                sort: [
                    {
                        "direct": "DESC",
                        "field": "created_time"
                    }],
                currentPage: 1,
                pageSize: 10,
                pageSizes: [10, 20, 30, 40, 50],
                totalPage: 0,
                projectList: [],
                moduleList: [],

                caseSetData: {
                    id: null,
                    ids: [],
                    name: null,
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
                    caseSetList: [],
                    projectId: null,
                    num: 1,
                },

                stepData: {
                    num: 1,
                    id: null,
                    ids: [],
                    name: null,
                    upFunc: null,
                    downFunc: null,
                    skip: "False",
                    header: Array(),
                    bodyJson: null,
                    params: Array(),
                    body: Array(),
                    extract: Array(),
                    validate: Array(),
                    bodyFormData: Array(),
                    caseId: null,
                    stepList: [],
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
                caseSetRules: {
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
                        {min: 2, max: 30, message: '长度在 3 到 5 个字符', trigger: 'blur'}
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
                // this.title = "新增";
                this.caseData.caseSetId = row.id;
                this.caseData.projectId = row.project_id;
                this.caseSetData.projectId = row.project_id;
                this.caseSetData.id = row.id;
                this.getListCase();
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
                        this.caseSetDialogVisible = false;
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
                        this.caseInfoDialogVisible = false;
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
                let postData = {
                    api_id_list: this.apiData.ids,
                    case_id: this.caseData.id,
                };
                addCaseStepInfo(postData).then(res => {
                    let code = res.data.code;
                    let message = res.data.message;
                    if (code === 200) {
                        this.getListCaseStep()
                        // this.$notify({
                        //     title: message,
                        //     type: "success"
                        // })
                    } else {
                        this.$notify({
                            title: message,
                            type: "error"
                        })
                    }
                })
            },

            // addCaseStep() {
            //     const hasSelectApiId = this.apiData.ids;
            //     const allSelectApiId = this.apiData.apiList;
            //     for (let i = 0; i < hasSelectApiId.length; i++) {
            //         for (let j = 0; j < allSelectApiId.length; j++) {
            //             if (hasSelectApiId[i] === allSelectApiId[j]['id']) {
            //                 this.stepData.stepList.push(allSelectApiId[j])
            //             }
            //         }
            //     }
            // },

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
                            this.caseData.caseSetList = rsData;
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

            open() {
                this.openDialogVisible = true;
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

                    }
                })
            },

            getListCaseStep() {
                let postData = {
                    totalCount: this.totalPage,
                    pageSize: this.pageSize,
                    currentPage: this.currentPage,
                    kw: this.caseData.id,
                    sort: [{"direct": "ASC", "field": "created_time"}]
                };
                listCaseStepInfo(postData).then(res => {
                    let code = res.data.code;
                    let rsData = res.data.data
                    if (code === 200) {
                        this.totalPage = res.data.totalCount;
                        this.stepData.stepList = rsData;
                    }
                })
            },

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
            },

            getListProject(listApi, listCaseSet) {
                this.apiData.moduleId = null;
                if (listCaseSet) {
                    this.caseSetData.id = null;
                }
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
            },

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
            },

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
            },

            catCaseSet(id) {
                this.title = '编辑';
                this.caseSetDialogVisible = true;
                this.caseSetData.id = id;
                let postData = {
                    "id": id
                };
                catCaseSetDetailInfo(postData).then(res => {
                    let code = res.data.code;
                    let resData = res.data.data[0];
                    if (code === 200) {
                        this.caseSetData.name = resData.name;
                        this.getListProject();
                        this.caseSetData.projectId = resData.project_id;
                        this.caseSetData.desc = resData.desc;
                    }
                })
            },

            deleteCaseStep(id) {
                this.stepData.ids = []
                if (typeof id === "number") {
                    this.stepData.ids.push(id);
                }
                let postData = {
                    ids: this.stepData.ids
                };
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteCaseStepInfo(postData).then(res => {
                        let code = res.data.code;
                        if (code === 200) {
                            this.getListCaseStep();
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

            catCase(id) {
                this.caseDetailInfoDialogVisible = true;
                this.caseData.id = id;
                let postData = {
                    "id": id
                };
                catCaseDetailInfo(postData).then(res => {
                    let code = res.data.code;
                    let resData = res.data.data[0];
                    if (code === 200) {
                        this.caseData.name = resData.name;
                        this.getListProject();
                        this.caseData.desc = resData.desc;
                        this.getListCaseStep();
                        this.dragSort();
                    }
                })
            },

            addRow(type) {

                if (type === 'Heard') {
                    this.stepData.header.push({key: null, value: null, remark: null});
                } else if (type === 'Form-data') {
                    this.stepData.bodyFormData.push({key: null, value: null, bodyFormDataType: null, remark: null});
                } else if (type === 'Text') {
                    this.stepData.bodyFormData.push({key: null, value: null, remark: null});
                } else if (type === 'Extract') {
                    this.stepData.extract.push({key: null, value: null, remark: null});
                } else if (type === 'Validate') {
                    this.stepData.validate.push({key: null, value: null, remark: null});
                }
            },

            delRow(type, index) {
                if (type === 'Heard') {
                    this.stepData.header.splice(index, 1);
                } else if (type === 'Form-data') {
                    this.stepData.bodyFormData.splice(index, 1);
                } else if (type === 'Text') {
                    this.stepData.bodyFormData.splice(index, 1);
                } else if (type === 'Extract') {
                    this.stepData.extract.splice(index, 1);
                } else if (type === 'Validate') {
                    this.stepData.validate.splice(index, 1);
                }

            },

            catCaseStep(id) {
                this.drawer = true;
                this.stepData.id = id;
                let postData = {
                    "id": id
                };
                catCaseStepDetailInfo(postData).then(res => {
                    let code = res.data.code;
                    let resData = res.data.data[0];
                    if (code === 200) {
                        this.stepData.name = resData.name;
                        this.stepData.upFunc = resData.up_func;
                        this.stepData.downFunc = resData.down_func;
                        this.stepData.skip = resData.skip;
                        this.stepData.header = JSON.parse(resData.header);
                        this.stepData.bodyJson = resData.body_json;
                        this.stepData.extract = JSON.parse(resData.extract);
                        this.stepData.validate = JSON.parse(resData.validate);
                        this.stepData.bodyFormData = JSON.parse(resData.body_form_data);
                    }
                })
            },

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
                        this.caseSetDialogVisible = false;
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
            },

            editCase() {
                let postData = {
                    id: this.caseData.id,
                    name: this.caseData.name,
                    project_id: this.caseSetData.projectId,
                    case_set_id: this.caseSetData.id,
                    desc: this.caseData.desc,
                };
                editCaseInfo(postData).then(res => {
                    let code = res.data.code;
                    let message = res.data.message;
                    if (code === 200) {
                        this.caseDetailInfoDialogVisible = false;
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
            },

            editStep() {
                let postData = {
                    id: this.stepData.id,
                    name: this.stepData.name,
                    up_func: this.stepData.upFunc,
                    down_func: this.stepData.downFunc,
                    skip: this.stepData.skip,
                    header: this.stepData.header,
                    body_form_data: JSON.stringify(this.stepData.bodyFormData),
                    body_json: JSON.stringify(this.stepData.bodyJson),
                    extract: JSON.stringify(this.stepData.extract),
                    validate: JSON.stringify(this.stepData.validate),
                };
                editCaseStepInfo(postData).then(res => {
                    let code = res.data.code;
                    let message = res.data.message;
                    if (code === 200) {
                        this.drawer = false;
                        this.getListCaseStep();
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

            changeStatus() {

            },

            openCaseInfo() {
                this.caseData.name = null;
                this.getListProject();
                this.getListCaseSet();
                this.ListApi();
                this.caseInfoDialogVisible = true;
            },

            openAddCaseSet() {
                this.title = '新增';
                this.caseSetDialogVisible = true;
                // this.resetForm(this.caseSetData);
                this.resetCaseSetForm('caseSetData')
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

            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },

            handleSelectionCaseSet(val) {
                this.caseSetData.ids = [];
                this.multipleSelection = val;
                this.multipleSelection.map((item) => {
                    this.caseSetData.ids.push(item.id)
                });
                console.log(this.caseSetData.ids)
            },

            handleSelectionCase(val) {
                this.caseData.ids = [];
                this.multipleSelection = val;
                this.multipleSelection.map((item) => {
                    this.caseData.ids.push(item.id)
                });
            },

            handleSelectionStep(val) {
                this.stepData.ids = []
                this.multipleSelection = val;
                this.multipleSelection.map((item) => {
                    this.stepData.ids.push(item.id)
                });
            },

            handleSelectionApi(val) {
                this.apiData.ids = []
                this.multipleSelection = val;
                this.multipleSelection.map((item) => {
                    this.apiData.ids.push(item.id)
                });
                console.log(this.apiData.ids)
            },

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
            },

            submitCaseForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid && this.title === '新增') {
                        this.addCase();
                    } else if (valid && this.title === '编辑') {
                        this.editCase();
                    } else {
                        return false;
                    }
                });
            },

            resetCaseForm(formName) {
                this.$refs[formName].resetFields();
            },

            resetCaseSetForm(formName) {
                this.$refs[formName].resetFields();
            },

            resetStepForm() {
                Object.assign(this.$data.stepData, this.$options.data().stepData);
            },

            resetInput() {
                this.kw = '';
                this.getListProject();
            },

            handleCloseModuleDialog() {
                this.caseSetDialogVisible = false;
            },

            handleCloseCaseInfoDialog() {
                this.caseInfoDialogVisible = false;
            },

            handleCloseCaseDetailInfoDialog() {
                this.caseDetailInfoDialogVisible = false;
            },

            handleClick() {

            },

            editorInit: function () {
                require('brace/ext/language_tools');
                require('brace/mode/json');
                require('brace/theme/chrome');
                require('brace/snippets/json')
            },

            //表格拖动排序
            dragSort() {
                const el = this.$refs.stepDataTable.$el.querySelectorAll('.el-table__body > tbody')[0]
                if (el) {
                    this.sortable = Sortable.create(el, {
                        ghostClass: 'sortable-ghost',
                        setData: function (dataTransfer) {
                            dataTransfer.setData('Text', '')
                        },
                        onEnd: evt => {
                            const targetRow = this.stepData.stepList.splice(evt.oldIndex, 1)[0];
                            this.stepData.stepList.splice(evt.newIndex, 0, targetRow);
                            // console.log(evt.oldIndex) //当前行的被拖拽前的顺序
                            // console.log(evt.newIndex) //当前行的被拖拽后的顺序
                            // console.log(this.stepData.stepList)
                        }
                    })
                }
            },
        },

        created() {
            this.getListCaseSet();
        },

        // mounted() {
        //     this.dragSort();
        // },

    }


</script>

<style rel="stylesheet/scss" lang="scss">
    el-table__body tr.current-row > td {
        color: #fff;
        background: rgba(66, 66, 66, 0.66) !important;
    }

    .collapse-title {
        flex: 1 0 90%;
        order: 1;
    }

    .el-collapse-item__header {
        flex: 1 0 auto;
        order: -1;
    }

    .el-drawer__body {
        overflow: auto;
    }


</style>