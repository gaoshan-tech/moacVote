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
       <!--   <el-form-item label="投票描述：">
            <el-input style="width: 203px" v-model="listQuery.desc" placeholder="请输入投票描述"></el-input>
          </el-form-item>-->
          <el-form-item label="投票主题：">
            <el-input style="width: 203px" v-model="listQuery.topic" placeholder="请输入投票主题"></el-input>
          </el-form-item>
         <!-- <el-form-item label="投票限制多选数量：">
            <el-input style="width: 203px" v-model="listQuery.limitNum" placeholder="请输入投票限制多选数量"></el-input>
          </el-form-item>-->
           <el-form-item label="投票状态：">
             <el-select v-model="listQuery.status" placeholder="全部" clearable>
               <el-option key="0" label="未上链" value="0"></el-option>
               <el-option key="1" label="交易成功" value="1"></el-option>
               <el-option key="2" label="交易失败" value="2"></el-option>
               <el-option key="3" label="进行中" value="3"></el-option>
               <el-option key="4" label="已结束" value="4"></el-option>
               <el-option key="9" label="等待交易确认" value="9"></el-option>
             </el-select>
           </el-form-item>
          <el-form-item label="投票起止时间：">
            <el-date-picker
              v-model="dateValue"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <!--<el-button-->
        <!--class="btn-add"-->
        <!--@click="handleAddProduct()"-->
        <!--size="mini">-->
        <!--添加-->
      <!--</el-button>-->
    </el-card>
    <div class="table-container">
      <el-table ref="productTable"
                :data="list"
                style="width: 100%"
                v-loading="listLoading"
                border>
        <el-table-column label="投票主题" align="center">
          <template slot-scope="scope">{{scope.row.topic}}</template>
        </el-table-column>
        <el-table-column label="图片" align="center">
          <template slot-scope="scope">
            <el-image v-if="scope.row.picUrl"
              class="cardpic"
              style="width: 60px; height: 60px"
              :src="getBase64Img('picUrl' + scope.row.id) || scope.row.picUrl || src"
              title="点击放大"
              :preview-src-list="[getBase64Img('picUrl' + scope.row.id) || scope.row.picUrl || src]">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="投票描述" align="center">
          <template slot-scope="scope">{{scope.row.desc}}</template>
        </el-table-column>
        <el-table-column label="投票限制多选数量" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.limitNum}}</span>
          </template>
        </el-table-column>

        <el-table-column label="投票状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 2">交易失败</span>
            <span v-else-if="scope.row.status == 1">交易成功</span>
            <span v-else-if="scope.row.status == 0">未上链</span>
            <span v-else-if="scope.row.status == 9">等待交易确认</span>
            <span v-else-if="scope.row.status == 3">进行中</span>
            <span v-else-if="scope.row.status == 4">已结束</span>
          </template>
        </el-table-column>

        <el-table-column label="投票开始时间" align="center">
          <template slot-scope="scope">{{scope.row.startTime}}</template>
        </el-table-column>
        <el-table-column label="投票结束时间" align="center">
          <template slot-scope="scope">
            {{scope.row.endTime}}
          </template>
        </el-table-column>
        <el-table-column label="白名单" align="center">
          <template slot-scope="scope">
            <el-button
              class="btn-add"
              @click="lookWhiteList(scope.row)"
              size="mini">
              查看
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="黑名单" align="center">
          <template slot-scope="scope">
            <el-button
              class="btn-add"
              @click="lookBlackList(scope.row)"
              size="mini">
              查看
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button
              class="btn-add"
              @click="lookDetails(scope.row)"
              size="mini">
              查看详情
            </el-button>
            <el-button
              class="btn-add"
              @click="handleDelVote(scope.row)"
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

    <el-dialog title="查看详情" :visible.sync="dialogFormVisible">
      <div class="container">
        <div style="margin: 10px 0">
          <span class="h3_style item-name db fl mr-10">hash:</span>
          <span class="db fl item-content">
            <a class="click-style" :href="'http://explorer.moac.io/tx/' + dialogData.vote.hash" target="_blank">{{dialogData.vote.hash}}</a>
          </span>
        </div>
        <div class="clear"></div>
        <div style="margin: 10px 0">
          <span class="h3_style item-name db fl mr-10">投票链接:</span>
          <span class="db fl item-content">
           http://47.92.110.121/voteApp/#/vote-details?id={{dialogData.vote.id}}
          </span>
        </div>
        <div class="clear"></div>
        <div style="margin: 10px 0">
          <span class="h3_style item-name db fl mr-10">创建时间:</span>
          <span class="db fl item-content">{{dialogData.vote.createTime}}</span>
        </div>
        <div class="clear"></div>
        <div style="margin: 10px 0">
          <span class="h3_style item-name db fl mr-10">投票时间:</span>
          <span class="db fl item-content">{{dialogData.vote.endTime}}</span>
        </div>
        <div class="clear"></div>
        <div style="margin: 10px 0">
          <span class="h3_style item-name db fl mr-10">投票主题:</span>
          <span class="db fl item-content">{{dialogData.vote.topic}}</span>
        </div>
        <div class="clear"></div>
        <div style="margin: 10px 0">
          <span class="h3_style item-name db fl mr-10">内容描述:</span>
          <span class="db fl item-content">{{dialogData.vote.desc}}</span>
        </div>
        <div class="clear"></div>
        <div style="margin: 10px 0">
          <span class="h3_style item-name db fl mr-10">选项信息:</span>
          <div class="db fl item-content">
            <p v-for="(item, index) in dialogData.optionList" style="margin-top: 0">
              <span class="opt-wrap">选项{{index + 1}}：{{item.content}}</span>
              <span class="count-wrap">投票情况：{{item.count}}票</span>
            </p>
          </div>
        </div>
        <div class="clear"></div>

      </div>
  </el-dialog>

  </div>
</template>

<script>
  import { getVoteList, delVote, getVoteDetail, addVoteBWList, delBlackUser, delWhiteUser, getBlackPage, getWhitePage } from '@/api/vote-api';

  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    topic: '',
    queryStartTime: '', // 开始时间
    queryEntTime: '', // 结束时间
    status: '', // 投票状态，未开始、进行中、已结束
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
        dialogData: {
          optionList: [],
          vote: []

        },
        formLabelWidth: '90px',
        dateValue:'',
        src: '~@/assets/images/init.png',
        srcList: [
          '~@/assets/images/init.png'
        ]
      }
    },
    created() {
      this.getList();
    },
    filters: {

    },
    methods: {
      getList() {
        this.listLoading = true;
        this.listQuery.queryStartTime =  this.dateValue[0] || '';
        this.listQuery.queryEndTime =  this.dateValue[1] || '';
        getVoteList(this.listQuery).then(response => {
          this.listLoading = false;
          const data = response.data.list;
          this.list = response.data.list;
          console.log(this.list);
          data.map(d => {
            if(d.picUrl) {
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
                sessionStorage.setItem('picUrl' + d.id, base64);
              }
            }
          });
          this.total = Number(response.data.total);
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
      lookDetails(row) {
        const query = {
          voteId: row.id
        };
        getVoteDetail(query).then(res => {
          if (res) {
            console.log(res);
            this.dialogData.optionList = res.data.optionList;
            this.dialogData.vote = res.data.vote;
            this.dialogFormVisible = true;
          }
        })
      },
      handleDelVote(row) {
        this.$confirm('是否要进行删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const query = {
            id: row.id
          };
          delVote(query).then(res => {
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
      lookBlackList(row) {
        this.$router.push({path: '/blacklist', query: {id: row.id}});
      },
      lookWhiteList(row) {
        this.$router.push({path: '/whitelist', query: {id: row.id}});
      },
      getBase64Image(url) {
        var image = new Image();
        image.setAttribute("crossOrigin",'Anonymous')
        image.src = url;
        image.onload = function() {
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
          console.log(base64);
          return base64;
        }
      },
      getBase64Img(imgUrl) {
        return sessionStorage.getItem(imgUrl);
      }
    }
  }
</script>

<style scoped>
  {
    flex-direction: column;
  }
.container {
  padding: 10px;
  border: 1px solid #efefef;
}
  .opt-wrap {
    display: inline-block;
    width: 40%;
  }
  .count-wrap {
    display: inline-block;
    width: 50%;
  }
  .item-name {
    width: 100px;
    text-align: right;
  }
  .item-content {
    width: 70%;
  }
</style>
