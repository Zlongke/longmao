<template>
    <div class="login_body">
        <van-cell-group class="m-top">
            <van-field
                left-icon="contact"
                v-model="username"
                label="用户名"
                placeholder="请输入用户名"
            />
            <van-field
                left-icon="bag-o"
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
            />
        </van-cell-group>
        
        <div class="login_btn">
            <input type="submit" value="登录" @touchstart="toLogin">
        </div>
        <div class="login_link">
            <router-link to="/mine/register">立即注册</router-link>
            <router-link to="/mine/findPassword">找回密码</router-link>
        </div>
    </div>
</template>

<script>
import {messageBox} from '@/components/js'
export default {
    name : 'Login',
    data() {
        return {
            username:'',
            password:'',
            title:'用户登录'
        }
    },
    mounted() {
        this.$emit('totitle',this.title)
    },
    methods: {
        
        toLogin(){
            this.axios.post('/api2/users/login',{
                username:this.username,
                password:this.password
            }).then((data)=>{
                console.log(data);
                var _this = this
                var code = data.data.code;
                if (code == 0) {
                    messageBox({
                        title:'登录',
                        con:'登录成功',
                        ok:'确定',
                        handleOk(){
                            _this.$router.push('/mine/center')
                        }
                    })
                   
                }else{
                    messageBox({
                        title:'登录',
                        con:'登录失败',
                        ok:'确定'
                    })
                }
            })
        }
    },
}
</script>

<style scoped>
#content .login_body{  width:100%;}
.login_body .m-top{margin-top: 50px;}
.login_body .login_text{ width:100%; height: 40px; border:none; border-bottom: 1px #ccc solid; margin-bottom: 5px; outline: none; text-indent: 10px;}
.login_body .login_btn{ height:45px; margin:20px 40px;}
.login_body .login_btn input{ width:100%; height:100%; background:#a7cd1a; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;}
.login_body .login_link{ display: flex; justify-content:space-between;}
.login_body .login_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color:#e54847;}
</style>
