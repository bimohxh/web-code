<template>
<div class="container">
  <div class="tip-box">
    <h3>代码发布成功！</h3>
    <div class="mt-5 mb-5">
      你发布的代码已经进入广场，等到积累 10 个赞，即可进入精选
    </div>

    <div>
      <router-link to="/square" class="btn btn-outline-secondary">返回广场</router-link>
      <router-link to="/code/new" class="btn btn-outline-secondary ml-5">继续发布</router-link>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.tip-box {
  text-align: center;
  padding: 50px 0;
  h3 {
    color: #6cba10
  }
}
</style>
