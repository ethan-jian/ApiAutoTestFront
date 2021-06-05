<template>
    <div class="result">
        <el-dialog
                title="接口测试结果"
                :visible.sync="dialogVisible"
                width="60%"
        >
            <el-tabs type="card" v-model="activeName">
                <el-tab-pane label="返回结果" name="first" style="text-align: left">
                    <json-viewer :value="apiTestResultRecords[0].meta_datas.data[0].response.json"
                                 :expand-depth=10
                                 copyable
                                 boxed
                    ></json-viewer>
                </el-tab-pane>
                <el-tab-pane label="返回信息" style="text-align: left">
                    <json-viewer :value="apiTestResultRecords[0].meta_datas.data[0].response"
                                 :expand-depth=10
                                 copyable
                                 boxed
                    ></json-viewer>
                </el-tab-pane>
                <el-tab-pane label="请求信息" style="text-align: left">
                    <json-viewer :value="apiTestResultRecords[0].meta_datas.data[0].request"
                                 :expand-depth=10
                                 copyable
                                 boxed
                    ></json-viewer>
                </el-tab-pane>
                <el-tab-pane label="提取信息" style="text-align: left">
                    <json-viewer :value="apiTestResultRecords[0].meta_datas.data[0].extract_msgs"
                                 :expand-depth=10
                                 copyable
                                 boxed
                    ></json-viewer>
                </el-tab-pane>
                <el-tab-pane label="校验信息" style="text-align: left">
                    <json-viewer :value="apiTestResultRecords[0].meta_datas.validators"
                                 :expand-depth=10
                                 copyable
                                 boxed
                    ></json-viewer>
                </el-tab-pane>
                <el-tab-pane label="错误信息" style="text-align: left">
                    <json-viewer :value="apiTestResultRecords[0].attachment"
                                 :expand-depth=10
                                 copyable
                                 boxed
                    ></json-viewer>
                </el-tab-pane>
            </el-tabs>

        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "result",
        data() {
            return {
                dialogVisible: false,
                apiTestResultRecords: null,
                activeName: 'first'
            }
        },
        methods: {

            showApiTestResult(rsData) {
                this.dialogVisible = true;
                this.apiTestResultRecords = rsData['details'][0]['records'];
            },

        }

    }
</script>

<style scoped>

</style>