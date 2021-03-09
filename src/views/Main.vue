<template>
  <div class="main">
    <Stroke v-model="stroke"></Stroke>
    <div class="main-items">
      <DepartureDate :timestamps.sync="timestamps"></DepartureDate>
      <SelectTrain :trains.sync="trains" :stroke="stroke"></SelectTrain>
      <Seat :seats.sync="seats"></Seat>
      <Rider :riders.sync="riders"></Rider>
      <Account :accounts.sync="accounts"></Account>
      <el-row class="main-item">
        <el-col :span="6">
          <div class="font-large">联系方式</div>
        </el-col>
        <el-col :span="18">
          <el-input
            placeholder="请输入手机号"
            v-model="concat"
            clearable
          ></el-input>
        </el-col>
      </el-row>
      <el-row class="main-item">
        <el-col :span="6">
          <div class="font-large">备注</div>
        </el-col>
        <el-col :span="18">
          <el-input
            type="textarea"
            placeholder="请输入备注"
            v-model="remake"
            clearable
          ></el-input>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-button class="main-submit" type="primary" @click="submit">提交抢票</el-button>
    </div>
  </div>
</template>

<script>
import Stroke from '@/views/Stroke'
import DepartureDate from '@/views/DepartureDate'
import SelectTrain from '@/views/SelectTrain'
import Seat from '@/views/Seat'
import Rider from '@/views/Rider'
import Account from '@/views/Account'
import { format, FORMATTER } from '@/utils/moment'
import { rush } from '@/api'
import utils from '@/utils'

export default {
  name: 'Main',
  components: {
    Seat,
    Rider,
    Stroke,
    Account,
    SelectTrain,
    DepartureDate,
  },
  data() {
    return {
      stroke: {
        departure: 'BJP',
        terminal: 'GZQ',
      },
      timestamps: [Date.now()],
      trains: [],
      seats: [],
      riders: [],
      accounts: [],
      concat: '',
      remake: '',
    }
  },
  methods: {
    async submit() {
      if (utils.isDevelopment()) {
        this.$message({
          type: 'success',
          message: '模拟提交成功',
        })
        return
      }
      const data = {
        stroke: this.stroke,
        timestamps: this.timestamps,
        trains: this.trains,
        seats: this.seats,
        riders: this.riders,
        accounts: this.accounts,
        concat: this.concat,
        remake: this.remake,
      }
      console.log(format(Date.now(), FORMATTER))// 格式化示范
      console.log(data)
      debugger// 删掉以提交

      // 请求你的抢票代码
      const result = await rush(data)
      if (result) {
        this.$message({
          type: 'success',
          message: '抢票成功',
        })
        return
      } else {
        this.$message({
          type: 'error',
          message: '抢票失败',
        })
        return
      }
    }
  },
}
</script>

<style lang="scss">
@import '@/assets/app.scss';
@import '@/assets/args.scss';

.main {
  max-width: 1024px;
  margin: 0 auto;
  .main-items {
    .main-item {
      padding: 16px 32px;
      & > .el-col:first-child {
        text-align: left;
      }
      & > .el-col:last-child {
        text-align: right;
      }
    }
  }
  .main-submit {
    width: 100%;
  }
}
</style>