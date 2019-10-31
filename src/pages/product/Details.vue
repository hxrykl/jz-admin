<template>
  <div class="productDetails">
    <h2>产品详情</h2>
    <el-button size="small" type="text" @click="backHandler">返回</el-button>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="info">
        基本信息
      </el-tab-pane>
      <el-tab-pane label="订单信息" name="orders">
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      activeName: 'info'
    }
  },
  created() {
    console.log("id",this.$route.query.id);
    const id = this.$route.query.id
    // 通过id查询产品，订单，地址
    this.findAddressByProductId(id)
  },
  computed: {
    ...mapState('address', ['address'])
  },
  methods: {
    ...mapActions('address', ['findAddressByProductId']),
    backHandler() {
      // this.$router.push("/product")
      //返回上一级
      this.$router.go(-1)
    }
  }

}
</script>
<style scoped>

</style>
