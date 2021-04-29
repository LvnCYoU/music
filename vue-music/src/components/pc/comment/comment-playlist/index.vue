<template>
  <div class="comment-playlist shadow">
    <header class="title">
      <span>精彩评论</span>
      <div class="btn">
        <span 
          :class="flag ? 'is-active' : ''"
          @click="changeComment(true)"
        >
          最热
        </span>
        <span 
          :class="flag ? '' : 'is-active'"
          @click="changeComment(false)"
        >
          最新
        </span>
      </div>
    </header>
    <ul>
      <li 
        class="item" 
        v-for="item in comment" 
        :key="item.commentId"
      > 
        <div class="cover">
          <el-image 
            :src="item.user.avatarUrl" 
            fit="fill"
            v-if="item.user.avatarUrl"
          >
          </el-image>
        </div>
        <div class="info">
          <h2 class="name" v-if="item.user.nickname">
            <span>{{ item.user.nickname }}</span>
            <small class="time"> . {{ utils.getMonth(item.time) }}</small>
          </h2>
          <div class="content">
            <p>{{ item.content }}</p>
          </div>
        </div>
      </li>
      <div class="error" v-if="!comment.length">
        <span>暂没有评论噢~</span>
      </div>
    </ul>
  </div>
</template>
<script>
export default {
  data(){
    return{
      comment: [],
      flag: true,
      data: {},
      order: '最热'
    }
  },

  mounted(){
    this.init();
  },

  methods: {
    init(){
      this.getCommentPlaylist();
    },

    // 获取评论数据
    async getCommentPlaylist(){
      let id = this.$route.query.id;
      await  this.$api.CommentPlaylist(id)
        .then(res => {
          this.data = res.data;
          this.comment = res.data.hotComments
        })
      
    },

    // 评论转变 最新/最热
    changeComment(flag){
      let map = new Map([
        ['false', () => {
          this.comment = this.data.comments
        }],
        ['true', () => {
          this.comment = this.data.hotComments
        }],
        ['default', () => { return }]
      ])
      if(this.flag == flag) return;
      this.flag = flag;
      return map.get(`${this.flag}`).call(this) ||
             map.get('default').call(this)
    }

  }
}
</script>

<style lang="scss" scoped>
  .comment-playlist{
    margin-bottom: 20px;
    padding: 15px;
    border-radius: 8px;
    box-sizing: border-box;
    .title{
      padding-left: 1rem;
      margin-bottom: 15px;
      display: flex;
      justify-content: space-between;
      height: 20px;
      border-left: 3px solid #fa2800;
      font-weight: 700;
      font-size: 14px;
      .btn{
        cursor: pointer;
        .is-active{
          color: $mainColor;
        }
        span{
          padding: 0 5px;
          &:last-child{
            padding-left: 6px;
            border-left: 1px solid #4a4a4a;
          }
        }
      }
    }
    ul{
      .item{
        padding: 10px 0;
        display: flex;
        .cover{
          margin-right: 12px;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          flex-shrink: 0;
          cursor: pointer;
          .el-image{
            border-radius: 50%;
          }
        }
        .info{
          &>div{
            box-sizing: border-box;
          }
          .name{
            margin-right: 5px;
            margin-bottom: 10px;
            font-size: 15px;
            cursor: pointer;
            small{
              font-size: 12px;
              color: #a5a5c1;
              font-weight: 200;
            }
          }
          .content{
            margin-top: 5px;
            padding: 5px 10px;
            width: 100%;
            line-height: 1.6;
            color: #666;
            background: #f5f5f5;
            border-radius: 3px;
            font-size: 12px;
          }
        }
      }
      .error{
        margin-top: 50px;
        font-size: 14px;
        text-align: center;
      }
    }
  }
</style>