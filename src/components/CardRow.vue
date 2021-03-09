<template>
  <div class="card-item__row">
    <span class="card-item__content">
      <slot></slot>
    </span>
    <span class="card-item__right">
      <slot name="right"></slot>
    </span>
  </div>
</template>

<script>
/**
 * 卡片行。左右两侧内容
 */
export default {
  name: 'CardRow',
}
</script>

<style lang="scss" scoped>
.card-item__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1;
  .card-item__content {
    text-align: left;
    flex-grow: 1;
  }
  .card-item__right {
    text-align: right;
  }
}
</style>