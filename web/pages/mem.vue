<template>
<div class="container mem-box">
  <div class="card mem-banner">
    <div class="card-header d-flex">
      <img :src="mem.avatar" class="avatar" />
      <div class="ml-3">
        <div>
          <h4 class="card-title">{{ mem.nc }}</h4>
          <div>Wait Code 第 102 位会员，于 2013-12-10 加入</div>
        </div>
      </div>
      <div class="socail-link">
        <a href="#" title="个人主页"><icon name="home"/></a>
        <a href="#"  title="GitHub"><icon name="github"/></a>
      </div>
    </div>
    <div class="card-body mem-achive">
      共发布<span>10</span>段代码，获得<span>100</span>个赞
    </div>
  </div>
  <nuxt />
</div>
</template>
<script>
export default {
  async asyncData(context) {
    const res = await context.app.$axios().get('mem/' + context.params.id)
    return {
      mem: res.data.data[0]
    }
  }
}
</script>

<style lang="scss" scoped>
.mem-box {
  max-width: 700px;
}
.mem-banner {
  position: relative;
  .avatar {
    border-radius: 100%;
    width: 70px;
    height: 70px;
  }
  .mem-achive {
    text-align: center;
    span {
      font-size: 2rem;
      margin: 0 10px;
      font-weight: bold;
    }
  }
  .socail-link {
    position: absolute;
    right: 20px;
    top: 15px;
    a {
      display: inline-block;
      margin-left: 5px;
      text-decoration: none;
      color: #AAA;
    }
  }
}

</style>
