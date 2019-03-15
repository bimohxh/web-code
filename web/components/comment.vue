<template>
 <div class="card">
  <div class="card-header">
    <h4 class="card-title">讨论区</h4>
  </div>
  <div class="card-body">
    <editor placeholder="来，话筒交给你" :setval="setval" v-model="content" />
    <div class="d-flex align-items-center">
      <div class="flex-grow-1">
        <div class="emoji-outer">
          <a class="emoji-btn" href="javascripot: void(0)" @click.stop="showEmbox = !showEmbox">
            <icon name="image" size="10" />
          </a>
          <div class="emoji-box" v-show="showEmbox">
            <a class="emoji-item" v-for="item in emojis" :key="item" href="javascript: void(0)" @click.stop="insertEmoji(item)">{{item}}</a>
          </div>
        </div>
      </div>
      <span>支持 Markdow 格式</span>
      <button class="btn btn-sm btn-primary ml-2 mt-2" @click="submit">提交</button>
    </div>
  </div>
  <div class="card-body">
    <div class="comment-box">
      <div v-for="comment in comments" :key="comment.id" class="comment-item">
        <img  :src="comment.mem.avatar" class="avatar" />
        <div class="comment-right">
          <div>
            <span class="mem-nc">{{comment.mem.nc}} </span>
            <span class="mem-extra">{{comment.mem.location}} </span>
            <span class="mem-extra">{{$timeago(comment.created_at)}}</span>
          </div>
          <article>{{comment.content}}</article>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import Editor from './editor'
export default {
  props: ['totype', 'toid'],
  data() {
    return {
      comments: [],
      showEmbox: false,
      content: '',
      setval: {
        time: Date.now(),
        val: ''
      },
      emojis: ['😜', '😀', '😂', '🤣', '😄', '😊', '😍', '😋', '😘', '😙', '😛', '😜', '🤓', '😎', '🤡', '🙄', '😠', '💩', '😧', '😭', '💤', '👏', '👍', '👎', '🙌', '👌', '🤝', '🙏', '📢', '💗', '💔', '💐']
    }
  },
  components: {
    Editor
  },
  methods: {
    fetchComments: async function () {
      const res = await this.$axios().get(`comment?totype=${this.totype}&toid=${this.toid}`)
      this.comments = res.data.data
    },
    insertEditVal: function (val) {
      this.setval = {
        time: Date.now(),
        val: val,
        mode: 'insert'
      }
    },
    // 插入表情
    insertEmoji: function (emoji) {
      this.insertEditVal(emoji)
    },
    setEditVal: function (val) {
      this.setval = {
        time: Date.now(),
        val: val,
        mode: 'set'
      }
    },
    // 新增评论
    submit: async function () {
      const _con = this.content.trim()
      if (_con === '') {
        return
      }
      const res = await this.$axios().post(`comment`, {
        totype: this.totype,
        toid: this.toid,
        content: _con
      })
      // this.$alert('success', '发布评论成功！')
      this.comments.push(res.data.data[0])
      this.setEditVal('')
      // this.isSubmiting = false
    }
  },
  created() {
    this.fetchComments()
  }
}
</script>

<style scoped lang="scss">
.comment-item {
  display: flex;
  margin-bottom: 20px;
  .comment-right {
    display: flex;
    flex-direction: column;
    margin-left: 15px;
  }
  .mem-nc {
    // font-weight: bold;
  }
  .mem-extra {
    font-size: 0.8rem;
  }
  article {
    color: #505050;
    margin-top: 10px;
  }
  .avatar {
    width: 26px;
    height: 26px;
    border-radius: 100%;
  }
}
a.emoji-btn {
  color: #EEE
}
.emoji-outer {
  position: relative;
}
.emoji-box {
  position: absolute;
  top: 40px;
  background-color: #FFF;
  display: flex;
  font-size: 20px;
  flex-wrap: wrap;
  width: 315px;
  z-index: 10;
  padding: 20px;
  border-radius: 2px;
  left: -15px;
  box-shadow: 0px 0px 10px #DDD;
  box-sizing: content-box;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: -10px;
    left: 20px;
    width: 20px;
    height: 20px;
    border: #EEE 1px solid;
    z-index: -1;
    transform: rotate(45deg);
    border-top-left-radius: 5px;
    background-color: #FFF;
    border-bottom: 0;
    border-right: 0;
  }

  .emoji-item {
    border: #e8e8e8  1px solid;
    margin: -1px 0 0 -1px;
    width: 40px;
    height: 40px;
    align-items: center;
    display: flex;
    justify-content: center;

    &:hover {
      border: 1px solid #eb7350;
      background: #fff9ec;
      z-index: 2;
      font-size: 22px;
    }
  }
}
</style>
