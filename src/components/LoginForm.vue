<template>
    <div class="login-container">
        <div class="title_left" :class="{ toLogin: actLogin }" @click="toLogin">
            <span class="underline-c-out">用户登录</span>
        </div>
        <div class="title_right" :class="{ toRegist: !actLogin }" @click="toRegister">
            <span class="underline-c-out">用户注册</span>
        </div>
        <a-spin :spinning="loading">
            <a-form
                v-if="actLogin"
                ref="loginFormRef"
                :model="loginForm"
                :rules="login_rules"
                class="login-form"
            >
                <a-form-item name="userName">
                    <a-input
                        v-model:value="loginForm.userName"
                        type="text"
                        placeholder="用户名"
                        size="large"
                        tabindex="1"
                        allowClear
                    >
                        <template #prefix>
                            <user-outlined style="margin: 0 0.3em;" type="user" />
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item name="password">
                    <a-input-password
                        v-model:value="loginForm.password"
                        tabindex="2"
                        size="large"
                        allowClear
                        autocomplete="off"
                        placeholder="密码"
                        @keyup.enter="handleLogin"
                    >
                        <template #prefix>
                            <lock-outlined style="margin: 0 0.3em;" />
                        </template>
                    </a-input-password>
                </a-form-item>
                <div class="flex mb20">
                    <a-checkbox>记住我</a-checkbox>
                    <a style="margin-left: auto;">忘记密码</a>
                </div>
                <a-button
                    type="primary"
                    style="width:100%;margin-bottom:30px"
                    size="large"
                    :disabled="disabledLogin"
                    @click.prevent="handleLogin"
                >登录</a-button>
            </a-form>

            <a-form
                v-else
                ref="registerFormRef"
                :model="registerForm"
                :rules="register_rules"
                class="login-form"
            >
                <a-form-item name="userName">
                    <a-input
                        v-model:value="registerForm.userName"
                        type="text"
                        placeholder="用户名"
                        tabindex="1"
                        size="large"
                        allowClear
                    >
                        <template #prefix>
                            <user-outlined style="margin: 0 0.3em;" />
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item has-feedback name="password">
                    <a-input-password
                        v-model:value="registerForm.password"
                        tabindex="2"
                        auto-complete="off"
                        placeholder="密码"
                        size="large"
                    >
                        <template #prefix>
                            <lock-outlined style="margin: 0 0.3em;" />
                        </template>
                    </a-input-password>
                </a-form-item>
                <a-form-item has-feedback name="checkpassword">
                    <a-input-password
                        v-model:value="registerForm.checkpassword"
                        tabindex="3"
                        placeholder="确认密码"
                        size="large"
                        auto-complete="off"
                        @keyup.enter="handleRegister"
                    >
                        <template #prefix>
                            <lock-outlined style="margin: 0 0.3em;" />
                        </template>
                    </a-input-password>
                </a-form-item>
                <a-button
                    type="primary"
                    style="width:100%;
        margin-bottom:30px"
                    size="large"
                    @click.prevent="handleRegister"
                >注册</a-button>
            </a-form>
        </a-spin>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from "vue"
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue"
import type { RuleObject } from 'ant-design-vue/es/form';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { message } from "ant-design-vue";
// import type { FormInstance } from 'ant-design-vue';

interface FormState {
    userName: string;
    password: string;
    checkpassword?: string;
}

export default defineComponent({
    name: 'LoginForm',
    components: {
        UserOutlined,
        LockOutlined
    },
    setup() {
        const loginFormRef = ref();
        const registerFormRef = ref();
        const store = useStore()
        const router = useRouter()

        const pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
        let validateName = async (rule: RuleObject, value: string) => {
            console.log(value)
            if (!value) {
                return Promise.reject('请输入用户名')
            } else if (value.length > 10) {
                return Promise.reject('用户名长度不能多于10位')
            } else if (pattern.test(value)) {
                return Promise.reject('用户名不允许有特殊字符')
            } else {
                return Promise.resolve()
            }
        }
        let validatePwd = async (rule: RuleObject, value: string) => {
            if (!value) {
                return Promise.reject('请输入密码')
            } else if (value.length > 15) {
                return Promise.reject('密码长度不能多于15位')
            } else if (value.length < 6) {
                return Promise.reject('密码长度不能少于6位')
            } else {
                return Promise.resolve()
            }
        }
        let validateCheckPwd = async (rule: RuleObject, value: string) => {
            if (!value) {
                return Promise.reject('请确认密码')
            } else if (value !== registerForm.password) {
                return Promise.reject('两次密码不一致')
            } else {
                return Promise.resolve()
            }
        }
        let loginForm = reactive<FormState>({
            userName: '',
            password: ''
        })
        let registerForm = reactive<FormState>({
            userName: '',
            password: '',
            checkpassword: ''
        })
        const login_rules = {
            userName: [{ required: true, validator: validateName, trigger: 'change' }],
            password: [{ required: true, validator: validatePwd, trigger: 'change' }]
        }
        const register_rules = {
            userName: [{ required: true, validator: validateName, trigger: 'change' }],
            password: [{ required: true, validator: validatePwd, trigger: 'change' }],
            checkpassword: [{ required: true, validator: validateCheckPwd, trigger: 'change' }]
        }
        let disabledLogin = computed(() => {
            return !(loginForm.userName && loginForm.password);
        })
        let disabledRegister = computed(() => {
            return !(registerForm.userName && registerForm.password && registerForm.checkpassword);
        })
        const handleLogin = async () => {
            console.log(loginForm)
            loading.value = true
            //TODO  没有做错误处理

            try {
                const values = await loginFormRef.value.validateFields();
                console.log('Success:', values);
                store.dispatch("user/login", loginForm).then(() => {
                    message.success('登录成功')
                    loading.value = false
                    router.push('/')
                }, (err) => {
                    console.log(err)
                    loading.value = false
                })
            } catch (errorInfo) {
                console.log('Failed:', errorInfo);
                message.error('校验失败')
                loading.value = false;
            }
        }
        const handleRegister = async () => {
            console.log(registerForm)
            loading.value = true
            //TODO 没有做错误处理
            try {
                const values = await registerFormRef.value.validateFields();
                console.log('Success:', values);
                store.dispatch("user/register", registerForm).then(() => {
                    message.success('注册成功')
                    loading.value = false
                    router.push('/')
                }, (err) => {
                    console.log(err)
                    loading.value = false
                })
            } catch (errorInfo) {
                console.log('Failed:', errorInfo);
                message.error('校验失败')
                loading.value = false;
            }
            //         this.$store.dispatch('user/register', fd).then(() => {
            //             this.loading = false
            //             this.$router.push({ path: '/' })
            //         }, (data) => {
            //             this.$message.error({
            //                 message: '用户名已存在'
            //             })
            //             console.log(data)
            //             this.loading = false
            //         }).catch(error => {
            //             console.log(error)
            //         })
            //     } else {
            //         this.loading = false
            //         this.$message.error({
            //             message: '用户名或密码格式不正确，请重新输入'
            //         })
            //         console.log('error register!!')
            //         return false
            //     }
            // })
        }
        let actLogin = ref<Boolean>(true)
        const toLogin = function () {
            actLogin.value = true
        }
        const toRegister = function () {
            actLogin.value = false
        }
        let loading = ref<boolean>(false)
        return {
            handleLogin,
            handleRegister,
            registerForm,
            loginForm,
            login_rules,
            register_rules,
            loginFormRef,
            registerFormRef,
            actLogin,
            toLogin,
            toRegister,
            disabledLogin,
            disabledRegister,
            loading
        }
    },

    watch: {
        $route: {
            handler: function (route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true
        }
    },

})
</script>
<style lang="less" scoped>
@dark_gray: #889aa4;
.login-container {
    line-height: 0 !important;
    // min-height: 100%;
    border-radius: 15px;
    background-clip: padding-box;
    margin: 0 auto;
    width: 350px;
    padding: 35px 35px 0px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    position: relative;
    .underline-c-out {
        position: relative;
        margin-left: 40px;
    }
    .title_left {
        // margin: 0px auto 0px auto;
        margin-bottom: 40px;
        text-align: center;
        color: #505458;
        cursor: pointer;
        font-size: 20px;
        position: relative;
        float: left;
        // left: 40px;
    }
    .title_right {
        // margin: 0px auto 40px auto;
        margin-bottom: 40px;
        text-align: center;
        color: #505458;
        font-size: 20px;
        float: left;
        cursor: pointer;
        position: relative;
        // margin-left: 38px;
    }
    .toLogin {
        color: #0078f7;
        // font-weight: 700;
    }
    .toRegist {
        color: #0078f7;
        // font-weight: 700;
    }
    .login-form {
        position: relative;
        // width: 350px;
        width: 100%;
        // padding: 160px 35px 0;
        margin: 0 auto;
        overflow: hidden;
    }
    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: @dark_gray;
        cursor: pointer;
        user-select: none;
    }
}
</style>
