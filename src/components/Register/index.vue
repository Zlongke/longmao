<template>
    <div class="login_body">
        <van-cell-group>
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
            <van-field
                left-icon="phone-o"
                v-model="phone"
                label="手机号"
                placeholder="请输入手机号"
            />
        </van-cell-group>
        <van-cell-group>
            <van-field
                v-model="sms"
                center
                clearable
                label="短信验证码"
                placeholder="请输入短信验证码"
            >
                <van-button slot="button" size="small" type="primary" :disabled="disabled" @touchstart="toyzm">{{yzminfo}}</van-button>
            </van-field>
        </van-cell-group>
        <div class="login_btn">
            <input type="submit" @touchstart="toRegist" value="注册">
        </div>
        <div class="login_link">
            <router-link to="/mine/login">立即登录</router-link>
            <router-link to="/mine/findPassword">找回密码</router-link>
        </div>
    </div>
</template>

<script>
import {messageBox} from '@/components/js'
export default {
    name : 'Register',
    data() {
        return {
            username:'',
            phone:'',
            sms:'',
            password:'',
            title:'用户注册',
            yzminfo:'发送验证码',
            disabled:false

        }
    },
    mounted() {
        this.$emit('totitle',this.title)
    },
    methods: {
        
        //先获取验证码
        toyzm(){
            if (this.disabled) {
                return;   
            }
            this.axios.get('/api2/users/verify?phonenum='+this.phone).then((data)=>{
                var code = data.data.code
                var _this = this
                if (code == 0) {
                    messageBox({
                        title:'验证码',
                        con:'验证码发送成功',
                        ok:'确定',
                        handleOk(){
                            _this.countDown()
                        }
                    })
                }else{
                    messageBox({
                        title:'验证码',
                        con:'验证码发送失败，请重新发送',
                        ok:'确定'
                    })
                }
            })
        },
        toRegist(){
            var _this = this;
            this.axios.post('/api2/users/register',{
                username:this.username,
                password:this.password,
                phonenum:this.phone,
                yzm:this.sms
            }).then((data)=>{
                var code = data.data.code
                if (code == 0) {
                     messageBox({
                        title:'注册',
                        con:'用户注册成功',
                        ok:'确定',
                        handleOk(){
                            _this.$router.push('/mine/login')
                        }
                    })
                }else{
                    messageBox({
                        title:'注册',
                        con:data.data.msg+',请重新注册',
                        ok:'确定'
                    })
                }
            })
        },
        countDown(){
            this.disabled = true;
            var count = 60;
            var timer = setInterval(() => {
                count --;
                this.yzminfo = '剩余'+count+'秒'
                if (count === 0) {
                    this.disabled = false;
                    count = 60;
                    this.yzminfo = '发送验证码'
                    clearInterval(timer)
                }
                
            }, 1000);
        }
    },
}
</script>

<style scoped>
#content .login_body{  width:100%;}
.login_body .login_text{ width:100%; height: 40px; border:none; border-bottom: 1px #ccc solid; margin-bottom: 5px; outline: none; text-indent: 10px;}
.login_body .login_btn{ height:45px; margin:20px 40px;}
.login_body .login_btn input{ width:100%; height:100%; background:#a7cd1a; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;}
.login_body .login_link{ display: flex; justify-content:space-between;}
.login_body .login_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color:#e54847;}
</style>
