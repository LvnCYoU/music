import axios from 'axios'

export default {
  // 获取行政区
  getDistrict(keywords){
    return axios.get(`https://restapi.amap.com/v3/config/district`,{
      params: {
        key: '85465e4de53c7b566e1fe513feead057',
        keywords,
        subdistrict: 1,
      }
    })
  }
};