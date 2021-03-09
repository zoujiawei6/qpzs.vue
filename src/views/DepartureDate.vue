<template>
  <SelectDrawer
    class="departure-date"
    label="出行日期"
    placeholder="推荐多选"
    :exhibition="departureDate"
    :show.sync="drawer"
    @save="drawerSave"
  >
    <el-checkbox-group v-model="timestampArray" :max="max">
      <el-divider></el-divider>
      <template v-for="(value, index) in checkboxGroup">
        <el-row :key="'cdr-' + index">
          <el-checkbox class="font-medium" :label="value.timestamp">
            {{ value.formatter }}
          </el-checkbox>
        </el-row>
        <el-divider :key="'cdd-' + index"></el-divider>
      </template>
    </el-checkbox-group>
  </SelectDrawer>
</template>

<script>
import timer from '@/utils/timer'
import SelectDrawer from '@/components/SelectDrawer'
import { FORMATTER_WEEK, format } from '@/utils/moment'
import config from '@/config'

export default {
  name: 'DepartureDate',
  props: {
    timestamps: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  components: {
    SelectDrawer,
  },
  data() {
    const DATE_NOW = this.timestamps.length > 0 ? this.timestamps[0] : undefined
    return {
      max: config.departure.max,
      timestampArray: [...this.timestamps],
      drawer: false,
      checkboxGroup: timer.timestampScope(
        FORMATTER_WEEK,
        51,
        {
          day: 30,
          text: '今日可购买',
          after: '预售',
        },
        DATE_NOW
      ),
      trains: [],
    }
  },
  computed: {
    departureDate() {
      return this.timestamps
        .map((timestamp) => {
          return format(timestamp)
        })
        .join(', ')
    },
  },
  methods: {
    drawerSave() {
      this.drawer = !this.drawer
      this.$emit('update:timestamps', this.timestampArray)
    },
  },
  watch: {
    timestamps(newValue) {
      this.timestampArray = [...newValue]
    },
  },
}
</script>

<style lang="scss">
.departure-date {
  .el-divider--horizontal {
    margin: 0px;
  }
}
</style>