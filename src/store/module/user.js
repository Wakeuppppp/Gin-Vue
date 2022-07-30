import storageService from '@/service/storageService';
import { register, info, login } from '@/service/userService';

const userModule = {
  namespaced: true,
  state: {
    token: storageService.get(storageService.USER_TOKEN),
    userInfo: storageService.get(storageService.USER_INFO) ? JSON.parse(storageService.get(storageService.USER_INFO)) : null,
  },

  mutations: {
    SET_TOKEN(state, token) {
      // 更新本地缓存
      storageService.set(storageService.USER_TOKEN, token);
      // 更新state
      state.token = token;
    },
    SET_USERINFO(state, userInfo) {
      // 更新本地缓存
      storageService.set(storageService.USER_INFO, JSON.stringify(userInfo));
      // 更新state
      state.userInfo = userInfo;
    },
  },
  actions: {
    register(context, { name, telephone, password }) {
      return new Promise((resolve, reject) => {
        register({ name, telephone, password }).then((res) => {
          // 保存token
          context.commit('SET_TOKEN', res.data.data.token);
          return info();
        }).then((res) => {
          // 保存用户信息
          context.commit('SET_USERINFO', res.data.data.user);
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    login(context, { telephone, password }) {
      return new Promise((resolve, reject) => {
        login({ telephone, password }).then((res) => {
          // 保存token
          context.commit('SET_TOKEN', res.data.data.token);
          return info();
        }).then((res) => {
          // 保存用户信息
          context.commit('SET_USERINFO', res.data.data.user);
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    logout(context) {
      // 清楚token
      context.commit('SET_TOKEN', '');
      storageService.set(storageService.USER_TOKEN, '');
      // 清楚用户信息
      context.commit('SET_USERINFO', '');
      storageService.set(storageService.USER_INFO, '');

      window.location.reload();
    },
  },
};
export default userModule;
