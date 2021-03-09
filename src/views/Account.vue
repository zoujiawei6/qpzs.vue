<template>
  <div class="account">
    <SelectDrawer
      label="12306账号"
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
      <el-form :model="form" :rules="rules" ref="accountForm">
        <el-form-item prop="account">
          <el-input
            placeholder="账号"
            v-model="form.account"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="remark">
          <el-input
            placeholder="备注"
            v-model="form.remark"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
    </SelectDrawer>
    <div class="main-item" v-if="accountArray.length > 0">
      <el-collapse v-model="collapse" accordion>
        <el-collapse-item name="1">
          <template slot="title"> 账号列表 </template>
          <CardRow
            v-for="(account, index) in accountArray"
            :key="'show-accounts' + index"
          >
            {{ account.account }}
            <template v-slot:right>
              <el-input
                v-if="account.remark"
                size="mini"
                v-model="account.remark"
                :disabled="true"
              >
              </el-input>
            </template>
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
  name: 'Account',
  components: {
    CardRow,
    SelectDrawer,
  },
  props: {
    accounts: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      form: {
        account: '',
        remark: '',
      },
      accountArray: [...this.accounts],
      drawer: false,
      collapse: '0',
      drawerText: {
        title: '请选择',
        confirm: '添加',
        cancel: '取消',
      },
      rules: {
        account: [
          {
            required: true,
            message: '账号不能为空',
            trigger: 'change',
          },
        ],
        remark: [
          {
            required: true,
            message: '备注不能为空',
            trigger: 'change',
          },
        ],
      },
    }
  },
  methods: {
    save() {
      if (
        this.accountArray.findIndex((account) => {
          return account.account === this.form.account
        }) !== -1
      ) {
        this.$message({
          type: 'warn',
          message: '账号信息已存在',
        })
        return
      }
      // push到数组，以对象形式
      this.accountArray.push({
        account: this.form.account,
        remark: this.form.remark,
      })

      // 向父组件提交同步事件
      this.$emit('update:accounts', this.accountArray)
    },
    drawerSave() {
      this.$refs['accountForm'].validate((valid) => {
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
    accounts(newValue) {
      this.accountArray = [...newValue]
    },
  },
}
</script>

<style lang="scss">
.account {
  .select-drawer {
    width: 100%;
    .el-input {
      margin-bottom: 16px;
    }
  }
  .card-item__row {
    height: 32px;
    line-height: 32px;
  }
}
</style>