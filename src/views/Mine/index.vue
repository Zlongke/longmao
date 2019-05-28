<template>
    <div id="main">
        <Header :title="title">
            <i class="iconfont icon-right" @touchstart="toBack"></i>
        </Header>
        <router-view @totitle="tit"></router-view>
        <TabBar/>
    </div>
</template>

<script>
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'

export default {
    name:'Mine',
    components:{
        Header,
        TabBar,
       
    },
    data() {
        return {
            title:'个人中心'
        }
    },
    methods: {
        tit(msg){
            this.title = msg;
        },
        toBack(){
            this.$router.go(-1)
        }
    },
}
</script>

<style>

</style>
