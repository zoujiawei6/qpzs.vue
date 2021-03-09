<template>
  <SelectDrawer
    class="select-train"
    label="选择列车"
    placeholder="推荐多选"
    :exhibition="exhibition"
    :show.sync="drawer"
    @save="drawerSave"
    @click="clickEvent"
  >
    <el-checkbox-group v-model="trainArray" :max="max" v-loading="loading">
      <el-divider></el-divider>
      <template v-for="(value, index) in trainList">
        <el-row :key="'cdr-' + index">
          <el-checkbox class="font-medium" :label="value.a">
            <el-col :span="12">出发：{{ value.d }}</el-col>
            <el-col :span="12">车次：{{ value.a }}</el-col>
            <el-col :span="12">到达：{{ value.e }}</el-col>
            <el-col :span="12">行程：{{ value.b }} - {{ value.c }}</el-col>
            <el-col :span="12">耗时：{{ value.f }}</el-col>
          </el-checkbox>
        </el-row>
        <el-divider :key="'cdd-' + index"></el-divider>
      </template>
    </el-checkbox-group>
  </SelectDrawer>
</template>

<script>
import SelectDrawer from '@/components/SelectDrawer'
import * as CTYPES from '@/store/ctypes'
import { mapActions, mapGetters } from 'vuex'
import config from '@/config'

export default {
  name: 'SelectTrain',
  props: {
    trains: {
      type: Array,
      default: () => {
        return []
      },
    },
    stroke: {
      type: Object,
      default: () => {
        return {
        departure: '',
        terminal: '',
      }
      },
    },
  },
  components: {
    SelectDrawer,
  },
  data() {
    return {
      max: config.train.max,
      trainArray: [...this.trains],
      drawer: false,
      loading: false,
    }
  },
  computed: {
    ...mapGetters([CTYPES.GETTERS_TRAINS_LIST]),
    exhibition() {
      return this.trains.length === 0 ? '请选择列车' : this.trains.join(', ')
    },
  },
  methods: {
    ...mapActions([CTYPES.ASYNC_QUERY_TRAIN]),
    drawerSave() {
      this.drawer = !this.drawer
      this.$emit('update:trains', this.trainArray)
    },
    async clickEvent() {
      this.loading = true
      try {
        await this[CTYPES.ASYNC_QUERY_TRAIN]({
          start: this.stroke.departure,
          end: this.stroke.terminal,
        })
      } finally {
        this.loading = false
      }
    },
  },
  watch: {
    trains(newValue) {
      this.trainArray = [...newValue]
    },
  },
}
</script>

<style lang="scss">
.select-train {
  .el-checkbox {
    .el-checkbox__input {
      height: 100%;
    }
  }
  .el-divider--horizontal {
    margin: 8px;
  }
}
</style>