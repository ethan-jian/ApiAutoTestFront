<template>
  <div class="routeManagement">
    <p>vue-json-editor</p>
    <vue-json-editor
    v-model="json"
    :show-btns="true"
    :mode="'code'"
    lang="zh"
    @json-change="onJsonChange"
    @json-save="onJsonSave"
    @has-error="onError"></vue-json-editor>
  </div>
</template>

<script>
  import vueJsonEditor from 'vue-json-editor'

  export default {
    data () {
      return {
        json: {
          msg: 'demo of jsoneditor'
        }
      }
    },

    components: {
      vueJsonEditor
    },

    methods: {
      onJsonChange (value) {
            console.log('value:', value);
        },
      onJsonSave (value) {
            console.log('value:', value);
        },
       onError (value) {
            console.log('value:', value);
        }
    }
  }
</script>

<style lang="scss" scoped>
.routeManagement{
  width:100%;
  margin:16px auto;
  /deep/.jsoneditor-vue{
    height:700px;
  }
  /deep/.json-save-btn{
    cursor: pointer;
  }
}
</style>