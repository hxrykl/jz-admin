<template>
  <div class="waiterDetails">
    <h2>员工详情</h2>
    <el-button size="small"  type="text" @click="backHandler">返回</el-button>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="info">
        <p>员工姓名：{{waiter.realname}}</p>
        <p>员工账号：{{waiter.username}}</p>
        <p>员工密码：{{waiter.password}}</p>
        <p>员工电话：{{waiter.telephone}}</p>
        <p>员工性别：{{waiter.gender}}</p>
        <p>员工状态：{{waiter.status}}</p>
      </el-tab-pane>
      <!-- <el-tab-pane label="订单信息" name="orders">
        订单信息...
      </el-tab-pane>
      <el-tab-pane label="服务地址" name="address">
        <el-table :data="address">
          <el-table-column label="省" prop="province" />
          <el-table-column label="市" prop="city" />
          <el-table-column label="区" prop="area" />
          <el-table-column label="街道" prop="address" />
          <el-table-column label="手机号" prop="telephone" />
        </el-table>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      activeName: 'info',
      waiter:{}
    }
  },
  created() {
    console.log(this.$route)
    this.waiter = this.$route.query.waiter
    console.log("员工信息",this.waiter);
    // 通过id查询员工，订单，地址
    // this.findAddressByWaiterId(id)
  },
  computed: {
    ...mapState('address', ['address'])
  },
  methods: {
    ...mapActions('address', ['findAddressByWaiterId']),
    backHandler() {
      // this.$router.push("/waiter")
      this.$router.go(-1)
    }
  }

}
</script>
<style scoped>

</style>
