import api from './instance'

export default {
  /**
   * @method 手机登录
   */
  async PhoneLogin(phone,password){
    return api.get(`/login/cellphone?phone=${phone}&password=${password}&cookie=${phone}`)
  },
  /**
   * @method 获取登陆状态
   */
  async LoginStatus(){
    return api.get('/login/status');
  },
  /**
   * @method 退出登录
   */
  async Logout(){
    return api.get('/logout');
  },
  /**
   * @method 刷新登录状态
   */
  async LoginRefresh(){
    return api.get('login/refresh');
  },
  /**
   * @method 获取用户信息
   */
  async UserSubcount(){
    return api.post('/user/subcount');
  },
  /**
   * @method 用户详情
   */
  async UserDetail(uid){
    return api.post('user/detail',{
      uid,
    });
  },
  /**
   * @method 获取用户等级信息
   */
  async UserLevel(){
    return api.post('user/level')
  },
  /**
   * @method 获取用户歌单
   */
  async UserPlayList(uid){
    return api.post('user/playlist',{
      uid,
    })
  }
}