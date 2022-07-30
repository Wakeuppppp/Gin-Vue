import request from '@/utils/request';

// 用户注册
export const register = ({ name, telephone, password }) => request.post('auth/register', { name, telephone, password });

// 获取用户信息
export const info = () => request.get('auth/info');

// 用户登陆
export const login = ({ telephone, password }) => request.post('auth/login', { telephone, password });
