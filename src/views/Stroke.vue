<template>
  <el-card class="stroke" shadow="hover">
    <el-card class="departure" shadow="never">
      <p class="font-extra-small">始发站</p>
      <el-select
        v-model="stroke.departure"
        placeholder="请选择"
        loading-text="请输入"
        filterable
        remote
        :remote-method="remoteDepartures"
        :loading="loadingDepartures"
      >
        <el-option
          v-for="(item , index) in departures"
          :key="'departure-option' + index"
          :label="item.name"
          :value="item.code"
          :disabled="stroke.terminal === item.code"
        ></el-option>
      </el-select>
    </el-card>
    <el-card class="departure_icon_terminal" shadow="never">
      <i class="el-icon-sort" @click.stop="switchDeparture"></i>
    </el-card>
    <el-card class="terminal" shadow="never">
      <p class="font-extra-small">终点站</p>
      <el-select
        v-model="stroke.terminal"
        placeholder="请选择"
        loading-text="请输入"
        filterable
        remote
        :remote-method="remoteTerminals"
        :loading="loadingTerminals"
      >
        <el-option
          v-for="(item, index) in terminals"
          :key="'terminal-option' + index"
          :label="item.name"
          :value="item.code"
          :disabled="stroke.departure === item.code"
        ></el-option>
      </el-select>
    </el-card>
  </el-card>
</template>

<script>
import * as CTYPES from '@/store/ctypes'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Stroke',
  model: {
    prop: 'stroke',
    event: 'change'
  },
  props: {
    stroke: {
      type: Object,
      default: () => {
        return {
          departure: '',
          terminal: ''
        }
      }
    }
  },
  data() {
    return {
      loadingDepartures: false,
      loadingTerminals: false,
    }
  },
  computed: {
    ...mapGetters([CTYPES.GETTERS_DEPARTURES, CTYPES.GETTERS_TERMINALS])
  },
  methods: {
    ...mapActions([CTYPES.ASYNC_GET_DEPARTURES, CTYPES.ASYNC_GET_TERMINALS]),
    ...mapMutations(['switchDeparturesTerminals']),
    async remoteDepartures(departure) {
      this.loadingDepartures = true
      if (departure) {
        try {
          await this[CTYPES.ASYNC_GET_DEPARTURES](departure)
        } finally {
          this.loadingDepartures = false
        }
      }
    },
    async remoteTerminals(terminal) {
      this.loadingTerminals = true
      if (terminal) {
        try {
        await this[CTYPES.ASYNC_GET_TERMINALS](terminal)
        } finally {
          this.loadingTerminals = false
        }
      }
    },
    switchDeparture() {
      const departure = this.stroke.departure
      const terminal = this.stroke.terminal
      this.switchDeparturesTerminals()
      this.$emit('change', {
        departure: terminal,
        terminal: departure
      })
    },
  },
  mounted() {
    this.remoteDepartures()
    this.remoteTerminals()
  }
}
</script>

<style lang="scss">
@import '@/assets/app.scss';
@import '@/assets/args.scss';

.stroke {
  // border-width: 0px;
  & > .el-card__body {
    display: flex;
    flex-direction: row;
    padding-top: 0;
    margin: 0 auto;

    .el-card {
      flex: 1;
      border-width: 0px;
      margin: 8px;
      height: 96px;
      overflow: none;

      & > .el-card__body {
        padding: 8px;
      }
    }
    .departure,
    .terminal {
      min-width: 104px;
    }
    .departure {
      text-align: left;
    }
    .departure_icon_terminal {
      width: 40px;
      min-width: 40px;
      text-align: center;
      height: 96px;
      line-height: 96px;
      .el-icon-sort {
        cursor: pointer;
      }
    }
    .terminal {
      text-align: right;
    }
    .el-icon-sort {
      font-size: 24px;
      transform: rotate(-90deg);
      color: $color-range;
    }
    .el-input__inner {
      @extend .font-large;
    }
  }
}
</style>