<template>
<svg :width="svgWidth" :height="svgWidth" >
  <circle
    :cx="circleCenter"
    :cy="circleCenter"
    :r="option.radius"
    :stroke-width="option.thick"
    :stroke="option.bgColor"
    fill="none"></circle>
  <circle
    :cx="circleCenter"
    :cy="circleCenter"
    :r="option.radius"
    :stroke-width="option.thick"
    :stroke="option.frColor"
    fill="none"
    :transform="'matrix(0,-1,1,0,0,' + this.svgWidth + ')'"
    :stroke-dasharray="dasharray + ' 2000'"></circle>
  <text
    :x='circleCenter'
    :y='circleCenter'
    :fill="option.textFill"
    :font-size="option.textSize">{{ option.text }}</text>
</svg>
</template>

<script>
export default {
  props: ['radius', 'value', 'thick', 'bgColor', 'frColor', 'text', 'textFill', 'total', 'textSize'],
  data() {
    return {
      option: {
        radius: 50,
        value: 80,
        thick: 10,
        bgColor: '#D1D3D7',
        frColor: '#00A5E0',
        text: '',
        textFill: '#000',
        textSize: 12,
        total: 100
      }
    }
  },
  computed: {
    dasharray: function () {
      return parseInt(Math.PI * 2 * this.option.radius * this.option.value / this.option.total)
    },
    svgWidth: function () {
      return (this.option.radius + this.option.thick) * 2
    },
    circleCenter: function () {
      return (this.option.radius + this.option.thick)
    }
  },
  created() {
    Object.keys(this.option).forEach((key) => {
      if (this[key] !== undefined) {
        this.option[key] = this[key]
      }
    })
  }
}
</script>

<style lang="scss" scoped>
text {
  text-anchor: middle;
  dominant-baseline: middle;
}
</style>
