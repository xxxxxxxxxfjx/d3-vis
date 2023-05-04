<template>
    <div class="login">
        <div class="login-box">
            <h2>Login</h2>
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="80px" status-icon
                @keyup.enter="submit(ruleFormRef)">
                <el-form-item label="Username" prop="username">
                    <el-input v-model="ruleForm.username" />
                </el-form-item>
                <el-form-item label="Password" prop="password">
                    <el-input v-model="ruleForm.password" type="password" show-password />
                </el-form-item>
                <div class="btn">
                    <a @click="submit(ruleFormRef)">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        submit
                    </a>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import useLoginStore from '@/stores/modules/login.js'
import { notification } from '@/hooks/notification'
import { useRouter } from 'vue-router';

const ruleFormRef = ref(null);
const ruleForm = reactive({
    username: '',
    password: ''
});
const rules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
})

const router = useRouter()
const loginStore = useLoginStore();


const submit = async (formEl) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            loginStore.fetchLogin(ruleForm).then(res => {
                notification('登录成功！')
                router.push('/')
            })

            // axios.post('admin/login', {
            //     ...ruleForm
            // }).then(res => {
            //     console.log(res);
            // })

            // axios.create({
            //     baseURL: '/api',
            //     timeout: 10000,
            //     headers: {

            //     }
            // }).post('admin/login', {
            //     ...ruleForm
            // }).then(res => {
            //     console.log(res);
            // }
            // )

        } else {
            console.log('error submit!', fields)
        }
    })

}


</script>

<style lang='less' scoped>
.el-form-item {
    margin-bottom: 30px;
}

.deep(el-input__inner) {
    color: var(--el-input-text-color);
}

.login {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(#ffa011, #72188d);
}

.login-box {
    width: 400px;
    padding: 40px;
    background: rgb(255, 255, 255, 0.5);
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgb(0, 0, 0, 0.5);
    border-radius: 10px;
}

.login-box h2 {
    margin: 0 0 30px;
    color: #000;
    padding: 0;
    text-align: center;
}

.login-box .btn a {
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    color: #03e9f4;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: all 0.5s;
    margin-top: 15px;
    letter-spacing: 4px;
    cursor: default;
}

.login-box a:hover {
    background-color: #03e9f4;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4, 0 0 100px #03e9f4;
}

.login-box a span {
    position: absolute;
    display: block;
}

.login-box a span:nth-child(1) {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #03e9f4);
    animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
    0% {
        left: -100%;
    }

    50%,
    100% {
        left: 100%;
    }
}

.login-box a span:nth-child(2) {
    top: -100%;
    right: 0;
    height: 100%;
    width: 2px;
    background: linear-gradient(180deg, transparent, #03e9f4);
    animation: btn-anim2 1s linear infinite;
    animation-delay: 0.25s;
}

@keyframes btn-anim2 {
    0% {
        top: -100%;
    }

    50%,
    100% {
        top: 100%;
    }
}

.login-box a span:nth-child(3) {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent, #03e9f4);
    animation: btn-anim3 1s linear infinite;
    animation-delay: 0.5s;
}

@keyframes btn-anim3 {
    0% {
        right: -100%;
    }

    50%,
    100% {
        right: 100%;
    }
}

.login-box a span:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, #03e9f4);
    animation: btn-anim4 1s linear infinite;
    animation-delay: 0.75s;
}

@keyframes btn-anim4 {
    0% {
        bottom: -100%;
    }

    50%,
    100% {
        bottom: 100%;
    }
}
</style>
