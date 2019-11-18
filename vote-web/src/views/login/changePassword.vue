<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <h3 class="title-wrap">修改密码</h3>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
       <!-- <el-form-item label="旧密码" prop="oldPassword">
          <el-input type="password" v-model="ruleForm.oldPassword" autocomplete="off"></el-input>
        </el-form-item>-->
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="ruleForm.newPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
       <!-- <el-form-item label="年龄" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>

    </el-card>
  </div>
</template>

<script>
  // import { updatePassword } from "@/api/password";
  import { changePassword } from '@/api/vote-api'
  export default {
    name: "changePassword",
    data() {
      const checkOldPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('旧密码不能为空'));
        } else {
          callback();
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          // oldPassword: '',
          newPassword: '',
          checkPass: ''
        },
        rules: {
          newPassword: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          /*oldPassword: [
            { validator: checkOldPassword, trigger: 'blur' }
          ]*/
        }
      };
    },
    methods: {
      goBack(){
        history.back(-1);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const params = {
              // oldPassword: this.ruleForm.oldPassword,
              password: this.ruleForm.newPassword
            }
            changePassword(params).then(res => {
              if (res) {
                this.$notify({
                  title: '成功',
                  message: '修改成功',
                  type: 'success'
                })
                this.goBack();
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
.title-wrap {
  width: 100px;
  text-align: right;
}
</style>
