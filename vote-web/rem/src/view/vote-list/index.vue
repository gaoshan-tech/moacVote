<template>
    <div class="build-container">
        <van-row class="header">
            <van-col span="24" style="position: fixed; z-index: 10;">
                <van-nav-bar
                        title="投票"
                        right-text="发布投票"
                        @click-right="onBuildVote"
                />
                <!--left-arrow
                @click-left="goBack"-->
            </van-col>
        </van-row>

        <van-row type="flex" justify="center" align="center" v-if="isNoData">
            <van-col span="24" class="build-vote-container">

                <img src="~@/assets/images/zanwujilu.png" alt="" class="img-wrap">

                <span class="tips">暂无投票，快去发布投票吧！</span>
                <van-button type="info" style="width: 200px" @click="onBuildVote">发布投票</van-button>
            </van-col>
        </van-row>

        <div v-if="!isShow" class="content-container" style="position: relative">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh" style="z-index: 0; height: 100%;">
                <van-list
                        v-model="loading"
                        :finished="finished"
                        @load="onLoad"
                >
                    <div class="vote-content-item" v-for="(msg, index) in listData" :key="msg.id">
                        <van-row>
                            <van-col span="24" class="show-vote-container">
                                <div class="base-msg-wrap">
                                    <div class="avator-wrap">
                                        <img v-if="msg.createUserPic && msg.createUserPic !== '' && msg.createUserPic !== 'undefined'" :src="msg.createUserPic" alt="无" @click="previewImg(msg.createUserPic)">
                                        <img v-else src="~@/assets/images/init.png" alt="无">
                                    </div>
                                    <div class="name-wrap">
                                        <span class="nick-name-wrap db">{{msg.createUserName || '普通用户'}}</span>
                                        <span class="show-time-wrap db">{{offsetTime(msg.createTime)}}</span>
                                    </div>
                                </div>
                                <van-tag v-if="msg.status == 3" type="primary" class="status-tag">进行中</van-tag>
                                <van-tag v-else-if="msg.status == 4" class="status-tag">已结束</van-tag>
                                <van-tag v-else-if="msg.status == 0" class="status-tag">未上链</van-tag>
                                <van-tag v-else-if="msg.status == 1" class="status-tag">交易成功</van-tag>
                                <van-tag v-else-if="msg.status == 2" class="status-tag">交易失败</van-tag>
                                <van-tag v-else-if="msg.status == 9" class="status-tag">等待交易确认</van-tag>
                            </van-col>
                        </van-row>

                        <van-row class="vote-content-wrap">
                            <van-col span="24">
                                <div class="vote-title-wrap">{{msg.topic}}</div>
                                <div class="vote-title-wrap font-16">{{msg.desc}}</div>
                            </van-col>
                            <van-col span="24">
                                <img v-if="msg.picUrl" :src="msg.picUrl" alt="无" class="vote-content-image" :name="'picUrl_' + msg.id" @click="previewImg(msg.picUrl)">
                            </van-col>
                            <van-col span="24" v-if="msg.voteUserList">
                                <div v-if="msg.status == 3 && msg.voteUserList.length === 0" class="opt-btn" @click="handleVote('ing', msg.id)">立即投票</div>
                                <div v-else-if="msg.voteUserList.length && msg.status == 3" class="opt-btn" @click="handleVote('ed', msg.id)">已投票，查看详情</div>
                                <div v-else-if="msg.voteUserList.length && msg.status == 4" class="opt-btn" @click="handleVote('ed', msg.id)">已投票，查看结果</div>
                                <div v-else-if="msg.status == 0" class="opt-btn" @click="handleVote('ing', msg.id)">查看投票</div>
                                <div v-else-if="msg.status == 1" class="opt-btn" @click="handleVote('ing', msg.id)">查看投票</div>
                                <div v-else-if="msg.status == 2" class="opt-btn" @click="handleVote('ing', msg.id)">查看投票</div>
                                <div v-else-if="msg.status == 9" class="opt-btn" @click="handleVote('ed', msg.id)">查看投票</div>
                                <div v-else-if="msg.status == 4" class="opt-btn" @click="handleVote('ed', msg.id)">查看投票</div>
                            </van-col>
                            <van-col span="24" v-else>
                                <div v-if="msg.status == 3" class="opt-btn" @click="handleVote('ing', msg.id)">立即投票</div>
                                <div v-else class="opt-btn" @click="handleVote('ed', msg.id)">查看结果</div>
                            </van-col>
                        </van-row>
                    </div>
                </van-list>
            </van-pull-refresh>
        </div>
        <div class="footer-container fixed-style" v-if="listData.length === 1">已显示全部</div>
    </div>
</template>

<script>
    import { getVotePage, showPic } from '@/api/buite-vote'
    import { formatTime } from '@/utils/timeFormatter'
    import { loadPic } from '@/utils/loadPic'
    import { ImagePreview } from 'vant';
    export default {
        name: "index",
        data() {
            return {
                isShow: true,
                isNoData: false,
                isLoading: true,
                // address: '0xb7bc89ba2e49f52782da4f926be5a7a7ac1f1a94',
                address: sessionStorage.getItem('address'),
                pageNum: 1,
                pageSize: 10,
                listData: [],
                total: 0,
                baseUrl: this.baseUrl,
                loading: false,
                finished: false
            }
        },
        mounted() {
            this.getVotePage();
        },
        methods: {
            getVotePage() {
                let voteAddress= '';
                let _chainBlock = '';
                this.$tp.getCurrentWallet().then(res => {
                    if (res) {
                        // console.log('resdata', res.data);
                        voteAddress = res.data.address;
                        _chainBlock = res.data.blockchain;
                        const params = {
                            address: voteAddress,
                            pageNum: this.pageNum,
                            pageSize: this.pageSize,
                        }
                        getVotePage(params).then(res => {
                            if (res) {
                                this.isLoading = false;
                                this.loading = false;
                                this.$toast('更新成功');
                                const list = res.data.list;
                                this.total = res.data.total;
                                if (list.length === 0) {
                                    this.isNoData = true;
                                } else {
                                    this.isShow = false;
                                    list.map( d => {
                                        if (d.picUrl) {
                                            const _image = new Image();
                                            _image.setAttribute("crossOrigin", 'Anonymous')
                                            _image.src = d.picUrl;
                                            _image.onload = function () {
                                                // 默认按比例压缩
                                                var w = _image.width,
                                                    h = _image.height,
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
                                                var ext = _image.src.substring(_image.src.lastIndexOf(".") + 1).toLowerCase();//图片格式
                                                var base64 = canvas.toDataURL("image/" + ext, quality);
                                                localStorage.setItem('picUrl_' + d.id, base64)
                                            }
                                        }
                                        if (d.createUserPic) {
                                            var image = new Image();
                                            image.setAttribute("crossOrigin", 'Anonymous')
                                            image.src = d.createUserPic;
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
                                                var ext = image.src.substring(image.src.lastIndexOf(".") + 1).toLowerCase();//图片格式
                                                var base64 = canvas.toDataURL("image/" + ext, quality);
                                                localStorage.setItem('createUserPic' + d.id, base64)
                                            }
                                        }
                                    })
                                    // 数据全部加载完成
                                    const val = this.pageNum * this.pageSize
                                    // if (this.pageNum === 3) {
                                    if (val > this.total || val === this.total) {
                                        // console.log('val', val);
                                        // console.log('total', this.total);
                                        this.finished = true;
                                    } else {
                                        this.finished = false;
                                    }
                                }
                                this.listData = [...this.listData, ...list];
                            }
                        });
                    }
                })

               /* const params = {
                    address: '0xb7bc89ba2e49f52782da4f926be5a7a7ac1f1a94',
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                }
                getVotePage(params).then(res => {
                    if (res) {
                        this.isLoading = false;
                        this.loading = false;
                        this.$toast('更新成功');
                        const list = res.data.list;
                        this.total = res.data.total;
                        if (list.length === 0) {
                            this.isNoData = true;
                        } else {
                            this.isShow = false;
                            console.log('list', list);
                            list.map( d => {
                                if (d.picUrl && d.picUrl !== '' && d.createUserPic !== 'undefined') {
                                    const _image = new Image();
                                    _image.setAttribute("crossOrigin", 'Anonymous')
                                    _image.src = d.picUrl;
                                    _image.onload = function () {
                                        // 默认按比例压缩
                                        var w = _image.width,
                                            h = _image.height,
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
                                        var ext = _image.src.substring(_image.src.lastIndexOf(".") + 1).toLowerCase();//图片格式
                                        let base64 = canvas.toDataURL("image/" + ext, quality);
                                        console.log('picUrl', d.picUrl);
                                        localStorage.setItem('picUrl_' + d.id, base64);
                                    }
                                }
                                if (d.createUserPic && d.createUserPic !== '' && d.createUserPic !== 'undefined') {
                                    var image = new Image();
                                    image.setAttribute("crossOrigin", 'Anonymous')
                                    image.src = d.createUserPic;
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
                                        var ext = image.src.substring(image.src.lastIndexOf(".") + 1).toLowerCase();//图片格式
                                        let _base64 = canvas.toDataURL("image/" + ext, quality);
                                        console.log('createUserPic', d.createUserPic);
                                        const fileId = d.createUserPic
                                        localStorage.setItem('createUserPic_' + d.id, _base64)
                                    }
                                }
                            })
                            // 数据全部加载完成
                            const val = this.pageNum * this.pageSize
                            // if (this.pageNum === 3) {
                            if (val > this.total || val === this.total) {
                                console.log('val', val);
                                console.log('total', this.total);
                                this.finished = true;
                            } else {
                                this.finished = false;
                            }
                        }
                        this.listData = [...this.listData, ...list];
                    }
                });*/
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
                    var ext = image.src.substring(image.src.lastIndexOf(".") + 1).toLowerCase();//图片格式
                    var base64 = canvas.toDataURL("image/" + ext, quality);
                    return base64;
                }
            },
            onLoad() {
                setTimeout(() => {
                    this.pageNum++;
                    this.getVotePage();
                }, 500);
            },
            goBack() {
                history.back(-1);
            },
            onBuildVote() {
                this.$router.push({path: '/build-vote'})
            },
            onRefresh() {
                this.pageNum = 1;
                this.listData = [];
                this.isLoading = true;
                this.getVotePage();
            },
            handleVote(status, id) {
                if (status === 'ing') {
                    this.$router.push({path: '/vote-details', query: {id: id}});

                } else if (status === 'ed') {
                    this.$router.push({path: '/vote-details-finished', query: {id: id}});
                }
            },
            getBase64Img(imgUrl) {
                return localStorage.getItem(imgUrl);
            },
            previewImg(img) {
                ImagePreview({
                    images:[img],
                    showIndex:false,
                    loop:false
                })
            },
            offsetTime(time) {
                const _time = new Date(time.replace(/-/g,'/')).getTime();
                const curOffset = new Date().getTimezoneOffset();
                // console.log(curOffset);
                const targetTime = new Date(_time - curOffset * 60 * 1000 - 8 * 60 * 60 * 1000);
                // console.log(targetTime);
                return this.$moment(targetTime).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }
</script>

<style scoped>
    .build-container {
        flex-direction: column;
    }
    .header {
        /*position: fixed;*/
    }
.build-vote-container {
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 55px;
}
    .img-wrap {
        display: block;
        width: 200px;
        height: 200px;
    }
    .tips {
        font-size: 20px;
    }
    .content-container {
          margin-top: 45px;
          background: #efefef;
          font-size: 14px;
      }
    .avator-wrap {
        /*display: block;*/
        overflow: hidden;
        float: left;
        margin-right: 10px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    .avator-wrap img {
        width: 50px;
        height: 50px;
    }
    .vote-content-item {
        background: #fff!important;
        margin-top: 10px!important;
    }
    .show-vote-container {
    }
    .base-msg-wrap {
        margin-top: 10px;
        margin-left: 15px;
        float: left;
    }

    .name-wrap {
        float: left;
        width: 120px;
        height: 50px;
    }
    .nick-name-wrap {
        display: block;
        line-height: 25px;
    }
    .show-time-wrap {
        display: block;
        font-size: 12px;
        color: #666;
        line-height: 25px;
    }
    .status-tag {
        float: right;
    }
    .vote-content-wrap {
        padding: 10px 15px;
    }
    .vote-title-wrap {
        font-size: 16px;
        margin: 0 0 10px 0;
    }
    .font-16 {
        font-size: 14px;
    }
    .vote-content-image {
        width: 100%;
        height: 200px;
    }
    .opt-btn {
        height: 40px;
        color: #1989fa;
        font-size: 16px;
        text-align: center;
        line-height: 50px;
    }
    .footer-container {
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 14px;
    }
    .fixed-style {
        /*position: absolute;*/
        /*bottom: 0;*/
    }
</style>

