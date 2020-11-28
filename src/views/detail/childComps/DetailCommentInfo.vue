<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="comment-title clear-fix">
      <div class="user-comment">用户评价</div>
      <div class="more-comment">更多</div>
    </div>
    <div class="user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="comment-content">
      <p>{{commentInfo.content}}</p>
    </div>
    <div class="other-info">
      <span>{{commentInfo.created | transDate()}}</span>
      <span>{{commentInfo.style}}</span>
    </div>
    <div class="comment-image">
      <img v-for="(arry,index) in commentInfo.images" :key="index" :src="arry" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    transDate(oDate) {
      let date = new Date(oDate * 1000);
      // date格式化
      let nDate = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
      return nDate;
    }
  }
}
</script>

<style scoped>
  .comment-title{
    font-size: 12px;
    /* margin: 10px; */
    padding: 10px;
    border-bottom: 2px solid rgba(200,200,200,0.3);
  }
  .comment-title .user-comment{
    float: left;
  }
  .comment-title .more-comment{
    float: right;
  }

  .user{
    font-size: 12px;
    margin: 10px;
  }
  .user img{
    width: 40px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 10px;
  }
  .user span{
    vertical-align: middle;
  }

  .comment-content{
    font-size: 10px;
    margin: 10px;
  }

  .other-info{
    font-size: 10px;
    color: rgb(160, 160, 160);
    margin: 10px;
  }
  .other-info span{
    margin-right: 10px;
  }

  .comment-image{
    margin: 10px;
    display: flex;
    justify-content: left;
  }
  .comment-image img{
    width: 50px;
    height: 50px;
    padding-right: 5px;
  }
</style>