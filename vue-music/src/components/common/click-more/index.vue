<template>
  <div 
    class="more" 
    v-show="queue.length != item.length"
  >
    <span @click="load">查看更多</span>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
    },
    num: {
      type: Number,
      required: false,
    }
  },
  data(){
    return{
      item: [],
      queue: [],
    }
  },
  watch: {
    list(){
      this.init();
    }
  },
  mounted(){
    this.init();
  },
  methods:{
    init(){
      if(!this.list.length) return;
      if(this.list[0].song){
        let len = this.list.length;
        let arr = this.list.slice(0,len);
        let args = [];
        arr.map(list => {
          let obj = list.song;
          args.push(obj);
        })
        this.queue = args;
      }else{
        this.queue = this.list
      }
      this.item = this.queue.slice(0,this.num || 4);
      this.$emit('load',this.item)
    },
    load(){
      let arr = [];
      let len = this.item.length;
      let num = this.num || 4;
      arr = this.queue.slice(len, len + num)
      this.item.push(...arr);
      this.$emit('load',this.item)
    }
  }
}
</script>

<style lang="scss" scoped>
  .more{
    @include flex;
    span{
      padding: 10px;
      transform: translateX(-20px);
      cursor: pointer;
      user-select: none;
      &:hover{
        color: $mainColor;
      }
    }
  }
</style>