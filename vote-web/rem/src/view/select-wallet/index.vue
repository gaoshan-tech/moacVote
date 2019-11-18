<template>
    <div class="select-container">
        <van-row type="flex" justify="center">
            <van-col span="24">
                <van-nav-bar title="钱包"/>
               <!-- left-text="X"
                @click-left="onClose"-->
            </van-col>
        </van-row>

        <van-row type="flex" justify="center" class="container mt_30">
            <van-col span="22">
                <p class="select-title">请选择钱包开始投票</p>
            </van-col>
        </van-row>

        <van-row type="flex" justify="center" class="mt_10">
            <van-col span="22">
                <van-dropdown-menu class="dropdown-wrap">
                    <van-dropdown-item v-model="value" :options="addOpt" class="dropdown-item-wrap"/>
                </van-dropdown-menu>
            </van-col>
        </van-row>

        <van-row type="flex" justify="center" class="mt_10">
            <van-col span="22">
                <van-button type="info" style="width: 100%" @click="joinInVote">进入投票</van-button>
            </van-col>
        </van-row>

    </div>
</template>

<script>
    import { DropdownMenu, DropdownItem, NavBar  } from 'vant';
    export default {
        name: "index",
        components: {
            [DropdownMenu.name]: DropdownMenu,
            [DropdownItem.name]: DropdownItem,
            [NavBar .name]: NavBar ,
        },
        data() {
            return {
                value: 0,
                addOpt: [

                ],
                _blockchain: ''
            }
        },
        mounted() {
            this.getWalletAddress();
            // const str = '0xb7bc89ba2e49f52782da4f926be5a7a7ac1f1a94'
            // const strrrr = str.length > 2 ? str.substr(0, 10) + new Array(str.length - 20).join('*') + str.substr(-10) : str
            // console.log(strrrr);
            // console.log(str.length)
        },
        methods: {
            onClose() {
                // console.log('close');
            },
            joinInVote() {
                if (this._blockchain == 'moac') {
                    sessionStorage.setItem('address', this.value)
                    this.$router.push({path: '/vote-list', query: {address: this.value}})
                } else {
                    this.$toast('当前钱包地址不是moac钱包地址，请切换moac钱包');
                }
            },
            // 获取钱包地址
            getWalletAddress() {
                // console.log(this.$tp.isConnected());
                // this.$tp.getAppInfo().then(res => {
                //     if (res) {
                //         console.log(res.data.system);
                //     }
                // })
                // this.$tp.getWallets().then(res => {
                this.$tp.getCurrentWallet().then(res => {
                    // console.log('resdata', res.data);
                    const optData = res.data;
                    this._blockchain = optData.blockchain;
                    let item = {
                        text: optData.address,
                        value: optData.address
                    }
                    this.addOpt.push(item);
                    this.value = this.addOpt[0].value;
                    // this.joinInVote();
                })
            },
            parseStringToStar(str) {
                return str.length > 2 ? str.substr(0, 1) + new Array(str.length - 2).join('*') + str.substr(-1) : str;
            }
        }
    }
</script>

<style scoped>
.select-title {
    font-size: 18px;
    text-align: left;
    /*text-indent: 10px;*/
}
    .container {

    }
    .mt_30 {
        margin-top: 30px;
    }
    .mt_10 {
        margin-top: 10px;
    }
</style>
<style>
    .dropdown-item-wrap .van-dropdown-item .van-popup .van-cell.van-cell--clickable.van-dropdown-item__option{
        /*word-break: break-word;*/
    }
</style>