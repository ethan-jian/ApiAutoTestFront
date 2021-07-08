<template>
    <div class="result">
        <el-dialog
                title="接口测试结果"
                :visible.sync="dialogVisible"
                width="60%"
        >
            <el-tabs type="card" v-model="activeName">
                <el-tab-pane label="返回结果" name="first" style="text-align: left">
                    <json-viewer :value="response.json"
                                 :expand-depth=10
                                 copyable
                                 boxed
                    ></json-viewer>
                </el-tab-pane>
                <el-tab-pane label="返回信息" style="text-align: left">
                    <json-viewer :value="response"
                                 :expand-depth=10
                                 copyable
                                 boxed
                    ></json-viewer>
                </el-tab-pane>
                <el-tab-pane label="请求信息" style="text-align: left">
                    <json-viewer :value="request"
                                 :expand-depth=10
                                 copyable
                                 boxed
                    ></json-viewer>
                </el-tab-pane>
                <el-tab-pane label="提取信息" style="text-align: left">
                    <json-viewer :value="extract_msgs"
                                 :expand-depth=10
                                 copyable
                                 boxed
                    ></json-viewer>
                </el-tab-pane>
                <el-tab-pane label="校验信息" style="text-align: left">
                    <json-viewer :value="validators"
                                 :expand-depth=10
                                 copyable
                                 boxed
                    ></json-viewer>
                </el-tab-pane>
                <el-tab-pane label="错误信息" style="text-align: left">
                    <json-viewer :value="attachment"
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
                activeName: 'first',
                meta_datas: '',
                request: '',
                response: '',
                extract_msgs: '',
                validators: '',
                attachment: '',

            }
        },
        methods: {
            showApiTestResult(rsData) {
                this.dialogVisible = true;
                this.apiTestResultRecords = rsData['details'][0]['records'];
                if (this.apiTestResultRecords) {
                    this.request = this.apiTestResultRecords[0].meta_datas.data[0].response
                    this.response = this.apiTestResultRecords[0].meta_datas.data[0].response
                    this.extract_msgs = this.apiTestResultRecords[0].meta_datas.data[0].extract_msgs
                    this.validators = this.apiTestResultRecords[0].meta_datas.validators
                    this.attachment = this.apiTestResultRecords[0].attachment
                }
            },

        }

    }
</script>

<style scoped>

</style>