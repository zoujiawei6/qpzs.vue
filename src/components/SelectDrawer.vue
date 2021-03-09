<template>
  <div class="select-drawer">
    <el-row class="main-item">
      <el-col :span="16">
        <div class="font-large">{{ label }}</div>
        <div class="font-base" style="margin-top: 8px" v-if="exhibition">
          {{ exhibition }}
        </div>
      </el-col>
      <el-col :span="8">
        <div class="items-checkbox" @click.stop="visibleDrawer">
          <span v-if="placeholder" v-html="placeholder"></span>
          <slot name="placeholder"></slot>
        </div>
      </el-col>
    </el-row>
    <el-drawer
      class="select-drawer-items"
      direction="btt"
      :size="drawerSize"
      :visible.sync="visible"
      :show-close="false"
    >
      <template v-slot:title>
        <CardRow class="select-drawer-items__title">
          {{ drawer.title }}
          <template v-slot:right>
            <el-button v-if="cancelable" @click="cancel" type="danger">
              {{ drawer.cancel }}
            </el-button>
            <el-button @click="confirm" type="primary">
              {{ drawer.confirm }}
            </el-button>
          </template>
        </CardRow>
      </template>
      <div class="select-drawer-items__content">
        <slot></slot>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import CardRow from '@/components/CardRow'

export default {
  name: 'SelectDrawer',
  components: {
    CardRow,
  },
  props: {
    cancelable: {
      type: Boolean,
      default: false,
    },
    drawerSize: {
      type: [String, Number],
      default: '80%',
    },
    label: {
      type: String,
      default: '',
    },
    exhibition: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    /**
     * 当值为true时，显示drawer
     */
    show: {
      type: Boolean,
      default: false,
    },
    /**
     * 配置drawer内容
     */
    drawer: {
      type: Object,
      default: () => {
        return {
          title: '请选择',
          confirm: '确定',
          cancel: '取消',
        }
      },
    },
  },
  data() {
    return {
      visible: this.show,
    }
  },
  methods: {
    confirm() {
      this.$emit('save')
    },
    cancel() {
      this.$emit('cancel')
    },
    visibleDrawer() {
      this.visible = !this.visible
      this.$emit('click')
    },
  },
  watch: {
    show(newValue) {
      this.visible = newValue
    },
    visible(newValue) {
      this.$emit('update:show', newValue)
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/app.scss';
@import '@/assets/args.scss';

.select-drawer {
  .el-drawer {
    padding: 32px 16px 16px 16px;
    .el-drawer__header {
      margin-bottom: 0;
      padding: 0 0 16px 0;
      .select-drawer-items__title {
        @extend .font-large;
      }
    }
    .el-drawer__body {
      overflow-y: auto;
      .select-drawer-items__content {
        .el-checkbox {
          width: 100%;
          height: 43px;
          line-height: 43px;
        }
      }
    }
  }
  .items-checkbox {
    @extend .font-large;
    @extend .color-range;
    cursor: pointer;
  }
}
</style>