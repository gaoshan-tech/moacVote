<template> 
  <div>
    <el-upload
      class="upload-demo"
      :action="actionUrl"
      :headers="header"
      :file-list="fileList"
      list-type="picture"
      :before-upload="beforeUpload"
      :on-success="handleUploadSuccess"
      :on-change="handleChange"
      :on-remove="handleRemove">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <!-- <el-upload
      :action="actionUrl"
      list-type="picture"
      :headers = "header"
      :multiple="true" :show-file-list="showFileList"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="fileList[0].url" alt="">
    </el-dialog> -->
  </div>
</template>
<script>
  import { getRequest,postRequest } from "../../common.js";
  export default {
    name: 'singleUpload',
    props: {
      value: String
    },
    computed: {
      imageUrl() {
        return this.value;
      },
      imageName() {
        if (this.value != null && this.value !== '') {
          return this.value.substr(this.value.lastIndexOf("/") + 1);
        } else {
          return null;
        }
      },
      // fileList() {
      //   return [{
      //     name: this.imageName,
      //     url: this.imageUrl
      //   }]
      // },
      showFileList: {
        get: function () {
          return this.value !== null && this.value !== ''&& this.value!==undefined;
        },
        set: function (newValue) {
        }
      }
    },
    data() {
      return {
        newval:this.value,
        dataObj: {
          policy: '',
          signature: '',
          key: '',
          ossaccessKeyId: '',
          dir: '',
          host: '',
          // callback:'',
        },
        dialogVisible: false,
        actionUrl: process.env.API_HOST+"/admin/admin/updateHeadImg",
        header: {'Authorization': localStorage.token?localStorage.token:''},
        fileList:[]
      };
    },
    watch:{
      value:function(newval,oldval){
        this.fileList= [{
          name: newval,
          url: newval
        }]
      }
    },
    created(){
      if(this.imageUrl){
        this.fileList =[{
          name: this.value,
          url: this.value
        }]
      }
    },
    methods: {
      emitInput(val) {
        this.$emit('childFn', val)
      },
      handleRemove(file, fileList) {
        this.$emit('childFn', fileList)
      },
      handleChange(file, fileList){
        this.fileList = fileList.slice(-1);
      },
      handlePreview(file) {
        this.dialogVisible = true;
      },
      beforeUpload(file) {
        console.log('file', file);
        const isJPG = file.type == 'image/jpeg';
        const isPNG = file.type == 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!(file.type === 'image/jpeg' || file.type === 'image/png')) {
          this.$message.error('上传图片只能是 JPG/PNG 格式!');
          return;
        }
        if (!isLt2M) {
          this.$message.error('上传图标大小不能超过 10MB!');
          return;
        }
          return isJPG || isPNG && isLt2M;
      },
      handleUploadSuccess(res, file) {
        // console.log(res);
        // console.log(file);
        this.showFileList = true;
        // this.fileList.pop();
        this.fileList.push({name: file.name, url: res.returnObject});
        this.$emit('childFn', this.fileList)
        // this.emitInput(this.fileList[0].url);
      }
    }
  }
</script>
<style>

</style>


