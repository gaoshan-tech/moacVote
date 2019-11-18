<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          @click="handleSearchList()"
          type="primary"
          size="small">
          搜索
        </el-button>
        <el-button
          style="float: right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="用户名：">
            <el-input style="width: 203px" v-model="listQuery.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
           <el-form-item label="昵称：">
             <el-input style="width: 203px" v-model="listQuery.nickname" placeholder="请输入昵称"></el-input>
           </el-form-item>
          <el-form-item label="地址：">
             <el-input style="width: 203px" v-model="listQuery.address" placeholder="请输入地址"></el-input>
           </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="handleAddAdmin()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="productTable"
                :data="list"
                style="width: 100%"
                v-loading="listLoading"
                border>
        <el-table-column label="用户名" align="center">
          <template slot-scope="scope">{{scope.row.username}}</template>
        </el-table-column>
        <el-table-column label="头像" align="center">
          <template slot-scope="scope">
            <el-image v-if="scope.row.picUrl && scope.row.picUrl !== '' && scope.row.picUrl !== 'undefined'"
                      class="cardpic"
                      style="width: 60px; height: 60px"
                      :src="getBase64Img('avator' + scope.row.id) || scope.row.picUrl"
                      title="点击放大"
                      :preview-src-list="[getBase64Img('avator' + scope.row.id) || scope.row.picUrl]">
            </el-image>
            <el-image v-else
                      style="width: 60px; height: 60px"
                      :src="srcImg"
                      :preview-src-list="[srcImg]"
                      title="点击放大">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="昵称" align="center">
          <template slot-scope="scope">{{scope.row.nickname}}</template>
        </el-table-column>
        <el-table-column label="年龄(岁)" align="center">
          <template slot-scope="scope">{{scope.row.age}}</template>
        </el-table-column>
        <el-table-column label="地址" align="center">
          <template slot-scope="scope">{{scope.row.address}}</template>
        </el-table-column>

        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.createTime}}</template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              class="btn-add"
              @click="editAdmin(scope.row)"
              size="mini">
              编辑
            </el-button>
            <el-button
              class="btn-add"
              @click="handleDelAdmin(scope.row)"
              size="mini">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.pageNum"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="listQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="title" :visible.sync="dialogFormVisible">

      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username" autocomplete="off" style="width: 217px"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth" prop="nickname">
          <el-input v-model="form.nickname" autocomplete="off" style="width: 217px"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
          <el-input v-model.number="form.age" autocomplete="off" style="width: 217px"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
          <el-input v-model="form.address" autocomplete="off" style="width: 217px"></el-input>
        </el-form-item>
        <el-form-item label="头像" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            :action="baseUrl + '/vote/app/uploadImage'"
            name="img"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveForm">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import { getAdminUserPage, addAdminUser, updateAdminUser, delAdminUser } from '@/api/vote-api'

  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    address: '',
    nickname: '', // 昵称
    username: '' // 用户名
  };
  export default {
    name: "index",
    data() {
      return {
        baseUrl: process.env.API_HOST,
        typesArray: [],
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        dialogFormVisible: false,
        dialogData: {},
        formLabelWidth: '90px',
        title: '添加',
        form: {
          age: 0,
          nickname: '',
          username: null,
          address: '',
          id: '',
          picUrl: ''
        },
        currencyList:[],
        dateValue:'',
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: ['blur', 'change']}
          ],
          address: [
            {required: true, message: '请输入地址', trigger: ['blur', 'change']}
          ],
          age: [
            {type: 'number', message: '年龄只支持数字格式', trigger: ['blur', 'change']}
          ]
        },
        imageUrl: '',
        srcImg: require("@/assets/images/init.png"),
        srcList: [
          '~@/assets/images/init.png'
        ]
      }
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        this.listLoading = true;
        getAdminUserPage(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = Number(response.data.total);
          this.list.map(d => {
            if (d.picUrl && d.picUrl !== '' && d.picUrl !== '') {
              var image = new Image();
              image.setAttribute("crossOrigin", 'Anonymous')
              image.src = d.picUrl;
              image.onload = function () {
                // 默认按比例压缩
                var w = image.width,
                  h = image.height,
                  scale = w / h;
                w = 200;
                h = w / scale;
                // 默认图片质量为0.7，quality值越小，所绘制出的图像越模糊
                var quality = 0.7;
                //生成canvas
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                // 创建属性节点
                var anw = document.createAttribute("width");
                anw.nodeValue = w;
                var anh = document.createAttribute("height");
                anh.nodeValue = h;
                canvas.setAttributeNode(anw);
                canvas.setAttributeNode(anh);
                ctx.drawImage(image, 0, 0, w, h);
                const ext = image.src.substring(image.src.lastIndexOf(".") + 1).toLowerCase();//图片格式
                const base64 = canvas.toDataURL("image/" + ext, quality);
                sessionStorage.setItem('avator' + d.id, base64);
              }
            }
          })
        });
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      handleResetSearch() {
        this.selectProductCateValue = [];
        this.dateValue = [];
        this.listQuery = Object.assign({}, defaultListQuery);
        this.getList();
      },
      handleDelAdmin(row) {
        this.$confirm('是否要进行删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const query = {
            userId: row.id
          };
          delAdminUser(query).then(res => {
            if (res) {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success'
              });
              this.getList();
            }
          });
        });
      },
      handleAddAdmin() {
        this.title = '添加';
        this.dialogFormVisible = true;
        this.form.id = '';
        this.form.username = '';
        this.form.nickname = '';
        this.form.picUrl = '';
        this.imageUrl = '';
        this.form.address = null;
        setTimeout(() => {
          this.resetForm('form');
          this.form.username = '';
          this.form.nickname = '';
          this.form.picUrl = '';
          this.imageUrl = '';
          this.form.address = null;
        }, 100)
      },
      editAdmin(row) {
        this.title = '编辑';
        this.dialogFormVisible = true;
        this.form.id = row.id;
        this.form.username = row.username;
        this.form.nickname = row.nickname;
        this.form.picUrl = row.picUrl;
        this.imageUrl = row.picUrl;
        this.form.address = row.address;
      },
      saveForm() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if (this.title === '添加') {
              addAdminUser(this.form).then(res => {
                if(res) {
                  console.log(res);
                  this.$message.success('添加成功');
                  this.getList();
                  this.dialogFormVisible = false;
                }
              })
            } else {
              updateAdminUser(this.form).then(res => {
                if(res) {
                  console.log(res);
                  this.$message.success('修改成功');
                  this.getList();
                  this.dialogFormVisible = false;
                }
              })
            }
          }
        });
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = res.data;
        this.form.picUrl = res.data;
        this.$message.success('上传成功');
      },
      beforeAvatarUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        // const isLt2M = file.size / 1024 / 1024 < 2;
        //
        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!');
        // }
        // return isJPG && isLt2M;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getBase64Img(imgUrl) {
        return sessionStorage.getItem(imgUrl);
      }
    }
  }
</script>

<style scoped>
</style>
