<template> 
  <div>
    <el-upload
      action="/api/admin/aliyun/oss/uploadPic"
      :data="dataObj"
      list-type="picture-card"
      :file-list="fileList"
      :multiple="true"
      :headers="header"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview"
      :limit="maxCount"
      :on-exceed="handleExceed"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
  import {policy} from '@/api/ss'

  export default {
    name: 'multiUpload',
    props: {
      //图片属性数组
      value: Array,
      //最大上传图片数量
      maxCount:{
        type:Number,
        default:5
      }
    },
    data() {
      return {
        header: {'Authorization': localStorage.token?localStorage.token:''},
        dataObj: {
          policy: '',
          signature: '',
          key: '',
          ossaccessKeyId: '',
          dir: '',
          host: ''
        },
        dialogVisible: false,
        dialogImageUrl:null
      };
    },
    computed: {
      fileList() {
        let fileList=[];
        for(let i=0;i<this.value.length;i++){
          fileList.push({url:this.value[i]});
        }
        return fileList;
      }
    },
    methods: {
      emitInput(fileList) {
        let value=[];
        for(let i=0;i<fileList.length;i++){
          value.push(fileList[i].url);
        }
        this.$emit('input', value)
      },
      handleRemove(file, fileList) {
        this.emitInput(fileList);
      },
      handlePreview(file) {
        this.dialogVisible = true;
        this.dialogImageUrl=file.url;
      },
      beforeUpload(file) {
        let _self = this;
        const fileName = file.uid;
        // if(file.type !== 'image/jpeg' || file.type !== 'image/png'){
        //   this.$message.error('上传图标只能是 JPG/PNG 格式!');
        //   return;
        // }
        // const fileSize = file.size / 1024 / 1024 < 10;
        // if (!fileSize) {
        //   this.$message.error('上传图标大小不能超过 10MB!');
        //   return;
        // }
        // return isJPG || isPNG && isLt2M;
      },
      handleUploadSuccess(res, file) {
        this.fileList.push({name: file.name,url:res.returnObject});
        this.emitInput(this.fileList);
      },
      handleExceed(files, fileList) {
        this.$message({
          message: '最多只能上传'+this.maxCount+'张图片',
          type: 'warning',
          duration:1000
        });
      },
    }
  }
</script>
<style>

</style>


