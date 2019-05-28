<template>
    <div class="myCon">
        <div class="conTop">
            <div class="headImg">
                <img src="/image/timg.jpg"/>
            </div>
            <div class="username">
                <h3>{{$store.state.user.name}}</h3>
                <p>关注<span>0</span><span class="span2">|</span>粉丝<span>0</span></p>
            </div>
            <div class="vipCon">
                <h3>会员中心</h3>
                <div class="vipImg"></div>
            </div>
        </div>
        <div class="conCenter">
            <van-cell title="我的电影票" is-link to="index" />
            <van-cell title="我的优惠券" is-link/>
            <van-cell title="播放记录" is-link/>
        </div>
        <van-button class="logOut" type="danger" @touchstart="toLogout">退出登录</van-button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'Center',
    data() {
        return {
            title:'个人中心',
        }
    },
    mounted() {
        this.$emit('totitle',this.title)
    },
    methods: {
        toLogout(){
            this.axios.get('/api2/users/logout').then((data)=>{
                var code = data.data.code
                if (code == 0) {
                    this.$router.push('/mine/login')
                    this.$store.commit('user/USER_NAME',{name:''})
                }
            })
        }
    },
    beforeRouteEnter (to, from, next) {
        axios.get('/api2/users/getUser').then((data)=>{
            var code = data.data.code
            if (code == 0) {
                next(vm=>{
                    vm.$store.commit('user/USER_NAME',{name:data.data.data.username})
                })
            }else{
                next('/mine/login')
            }
        })
    }
}
</script>

<style scoped>
.myCon{
    margin-bottom: 50px;
    overflow: auto;
}
.conTop{
    height: 180px;
    width: 100%;
    background: #a7cd1a;
    display: flex;
    align-items: center;
    padding-left: 30px;
    position: relative;
}
.conTop .headImg{
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #fff;
    margin-right: 20px;
}
.conTop .headImg img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.conTop .username{
    font-size: 14px;
    color: #fff;
}
.conTop .username h3{
    font-size: 18px;
}
.conTop .username p .span2{
    margin: 0 10px;
}
.conTop .vipCon{
    height: 80px;
    width: 90vw;
    margin-left: 5vw;
    background:#fff;
    position: absolute;
    bottom: -50px;
    left: 0;
    border-radius: 5px;
    display: flex;
    align-items: center;
    box-shadow: 2px 2px 2px #cecece;
}
.conTop .vipCon h3{
    width: 80px;
    padding: 5px 10px;
    border-right: 1px solid #ccc;
    box-sizing: content-box;
    text-align: center;
    font-size: 16px;
}
.conTop .vipCon .vipImg{
    flex: 1;
    padding-left: 10px;
}
.conCenter{
    margin-top: 60px;
}
.logOut{
   margin-top:80px;
    background: #a7cd1a;
    border: none;
    width: 100%;
    
}
.conCenter .van-cell{
    padding: 20px 15px;
}
</style>
