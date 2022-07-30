<!-- eslint-disable indent -->
<!-- eslint-disable max-len -->
<template>
    <div class="register">
        <b-row class="mt-5">
            <b-col md="8" offset-md="2" lg="6" offset-lg="3">
                <b-card title="注册">
                    <b-form>
                        <b-form-group label="昵称">
                            <b-form-input v-model="$v.user.name.$model" type="text" placeholder="请输入昵称(选填)">
                            </b-form-input>
                        </b-form-group>
                        <b-form-group label="手机号">
                            <b-form-input v-model="$v.user.telephone.$model" type="number" placeholder="请输入手机号"
                                :state="validateState('telephone')"></b-form-input>
                            <b-form-invalid-feedback :state="validateState('telephone')">
                                手机号格式不对
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="密码">
                            <b-form-input v-model="$v.user.password.$model" type="password" placeholder="请输入密码"
                                :state="validateState('password')"></b-form-input>
                            <b-form-invalid-feedback :state="validateState('password')">
                                密码长度为8-20，且包含大小写、特殊符合
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group>
                            <b-button @click="register" variant="outline-primary" block>注册</b-button>
                        </b-form-group>
                    </b-form>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators';
import CustomValidator from '@/helper/validator';
// import { register, info } from '@/service/userService';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      user: {
        name: '',
        telephone: '',
        password: '',
      },
      validation: null,
    };
  },
  validations: {
    user: {
      name: {

      },
      telephone: {
        required,
        telephone: CustomValidator.telephoneValidator,
      },
      password: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(20),
        password: CustomValidator.passwordValidator,

      },
    },

  },
  methods: {
    ...mapActions('userModule', { userRegister: 'register' }),
    validateState(name) {
      const { $dirty, $error } = this.$v.user[name];
      return $dirty ? !$error : null;
    },

    register() {
      // 如果没有这一行，那么用户在不输入的情况下，也可以提交表单
      this.$v.user.$touch();

      // 验证数据
      if (this.$v.user.$anyError) {
        return;
      }

      // 请求
      this.userRegister(this.user).then(() => {
        // 跳转主页
        this.$router.replace({ name: 'home' });
      }).catch((err) => {
        this.$bvToast.toast(err.response.data.msg, {
          title: '数据验证错误',
          variant: 'danger',
          solid: true,
        });
        console.log('false');
      });

      console.log('register');
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
