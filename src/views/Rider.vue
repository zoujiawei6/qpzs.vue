<template>
  <div class="rider">
    <SelectDrawer
      label="乘车人"
      drawer-size="30%"
      :show.sync="drawer"
      :drawer="drawerText"
      @click="drawerVisible"
      @save="drawerSave"
      @cancel="drawerCancel"
      cancelable
    >
      <template v-slot:placeholder>
        <i class="el-icon-circle-plus-outline font-large"></i>
      </template>
      <el-form :model="form" :rules="rules" ref="riderForm">
        <el-form-item prop="name">
          <el-input placeholder="乘车人姓名" v-model="form.name" clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="idcard">
          <el-input placeholder="乘车人身份证号" v-model="form.idcard" clearable>
          </el-input>
        </el-form-item>
      </el-form>
    </SelectDrawer>
    <div class="main-item" v-if="riderArray.length > 0">
      <el-collapse v-model="collapse" accordion>
        <el-collapse-item name="1">
          <template slot="title"> 乘车人列表 </template>
          <CardRow
            v-for="(rider, index) in riderArray"
            :key="'show-riders' + index"
          >
            {{ rider.name }}
            <template v-slot:right>{{ rider.idcard }}</template>
          </CardRow>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import SelectDrawer from '@/components/SelectDrawer'
import CardRow from '@/components/CardRow'

export default {
  name: 'Rider',
  components: {
    CardRow,
    SelectDrawer,
  },
  props: {
    riders: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      form: {
        name: '',
        idcard: '',
      },
      riderArray: [...this.riders],
      drawer: false,
      collapse: '0',
      drawerText: {
        title: '请选择',
        confirm: '添加',
        cancel: '取消',
      },
      rules: {
        name: [
          {
            required: true,
            message: '姓名不能为空',
            trigger: 'change',
          },
          { min: 2, message: '姓名最少为两个字', trigger: 'change' },
        ],
        idcard: [
          {
            required: true,
            message: '身份证号不能为空',
            trigger: 'change',
          },
        ],
      },
    }
  },
  methods: {
    save() {
      if (
        this.riderArray.findIndex((rider) => {
          return rider.idcard === this.form.idcard
        }) !== -1
      ) {
        this.$message({
          type: 'warn',
          message: '乘车人信息已存在',
        })
        return
      }
      // push到数组，以对象形式
      this.riderArray.push({
        name: this.form.name,
        idcard: this.form.idcard,
      })

      // 向父组件提交同步事件
      this.$emit('update:riders', this.riderArray)
    },
    drawerSave() {
      this.$refs['riderForm'].validate((valid) => {
        if (valid) {
          this.save()
          return true
        } else {
          this.$message({
            type: 'error',
            message: '输入信息格式不正确',
          })
          return false
        }
      })
    },
    drawerCancel() {
      this.drawer = !this.drawer
    },
    drawerVisible() {
      this.collapse = '1'
    },
  },
  watch: {
    riders(newValue) {
      this.riderArray = [...newValue]
    },
  },
}
</script>

<style lang="scss">
.rider {
  .select-drawer {
    width: 100%;
  }
  .el-input {
    margin-bottom: 16px;
  }
  .card-item__row {
    height: 24px;
    line-height: 24px;
  }
}
</style>