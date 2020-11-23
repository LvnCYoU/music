import api from './instance'

export default {
  /**
   * @method 手机登录
   */
  PhoneLogin(phone,password){
    return api.get(`/login/cellphone?phone=${phone}&password=${password}&cookie=${phone}`)
  },
  /**
   * @method 获取登陆状态
   */
  LoginStatus(){
    return api.get('/login/status');
  },
  /**
   * @method 退出登录
   */
  Logout(){
    return api.get('/logout');
  },
  /**
   * @method 刷新登录状态
   */
  LoginRefresh(){
    return api.get('/login/refresh');
  },
  /**
   * @method 获取用户信息
   */
  UserSubcount(){
    return api.get('/user/subcount');
  },
  /**
   * @method 用户详情
   */
  UserDetail(uid){
    return api.get(`/user/detail?uid=${uid}`);
  },
  /**
   * @method 获取用户等级信息
   */
  UserLevel(){
    return api.get('user/level')
  },
  /**
   * @method 获取用户歌单
   */
  UserPlaylist(uid){
    return api.get(`user/playlist?uid=${uid}`)
  },

  /**
   * @method 获取用户播放记录
   */
  UserRecord(params){
    return api.get(`/user/record`,{params})
  },
}