<template>
<div class="code-bar">
  <div class="card">
    <div class="card-body d-flex ">
      <img class="avatar" src="https://l.ruby-china.com/user/avatar/6553.jpg!md" />
      <div class="ml-2">
        <div><strong>笔墨伺候</strong> <small>北京</small></div>
        <div>代码 10 / 赞 50</div>
      </div>
    </div>
  </div>
  <div class="card mt-2">
    <div class="card-header d-flex">
      <div class="flex-grow-1">
        <span>快速排序快速排序快速排</span>
      </div>
      <a href="javascript: void(0)" class="star-btn">
        <icon name="star" size="18" />
      </a>
    </div>
    <div class="card-body text-center">
      <a href="javascript: void(0)" class="mt-3">
        <icon name="thumbs-up" size="40"></icon>
      </a>
      <div class="mt-3">10人觉得很赞</div>
    </div>
    <div class="card-footer d-flex">
      <div class="flex-grow-1">
        <a href="javascript: void(0)">
          <icon name="chevron-left">上一段</icon>
        </a>
      </div>
      <div>
        <a href="javascript: void(0)" class="d-flex">
          <span class="d-inline-flex">下一段</span>
          <icon name="chevron-right" />
        </a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.code-bar {
  a {
    text-decoration: none;
    color: #34495e;
    &.star-btn {
      color: #AAA;
    }
  }
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 100%;
}
</style>
