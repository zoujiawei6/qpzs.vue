<template>
  <SelectDrawer
    label="坐席"
    placeholder="推荐多选"
    :exhibition="exhibition"
    :show.sync="drawer"
    @save="drawerSave"
  >
    <el-checkbox-group v-model="seatArray" :max="max">
      <el-divider></el-divider>
      <template v-for="(value, index) in checkboxGroup">
        <el-row :key="'cdr-' + index">
          <el-checkbox class="font-medium" :label="value">
            {{ value }}
          </el-checkbox>
        </el-row>
        <el-divider :key="'cdd-' + index"></el-divider>
      </template>
    </el-checkbox-group>
  </SelectDrawer>
</template>

<script>
import SelectDrawer from '@/components/SelectDrawer'
import config from '@/config'

export default {
  name: 'Seat',
  components: {
    SelectDrawer,
  },
  props: {
    seats: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      max: config.seat.max,
      seatArray: [...this.seats],
      drawer: false,
      checkboxGroup: [
        '商务|特等座',
        '一等座',
        '二等座|二等包座',
        '高级软卧',
        '软卧|一等卧',
        '动卧',
        '硬卧|二等卧',
        '软座',
        '硬座',
        '无座',
      ],
    }
  },
  computed: {
    exhibition() {
      return this.seatArray.length === 0 ? '请选择坐席' : this.seatArray.join(', ')
    },
  },
  methods: {
    drawerSave() {
      this.drawer = !this.drawer
      this.$emit('update:seats', this.seatArray)
    },
  },
  watch: {
    seats(newValue) {
      this.seatArray = [...newValue]
    },
  },
}
</script>

<style lang="scss" scoped>
</style>