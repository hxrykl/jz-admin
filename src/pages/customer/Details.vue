<template>
  <div class="customerDetails">
    <h2>顾客详情</h2>
    <el-button size="small" type="text" @click="backHandler">返回</el-button>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="info">
        <div>姓名:{{customer.realname}}</div>
          <div>手机号:{{customer.telephone}}</div>
      </el-tab-pane>
      <!-- <el-tab-pane label="订单信息" name="orders">
        订单信息...
      </el-tab-pane> -->
      <el-tab-pane label="服务地址" name="address">
        <el-table :data="address">
          <el-table-column label="省" prop="province"></el-table-column>
          <el-table-column label="市" prop="city"></el-table-column>
          <el-table-column label="区" prop="area"></el-table-column>
          <el-table-column label="街道" prop="address"></el-table-column>
          <el-table-column label="手机号" prop="telephone"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
  data(){
    return {
      activeName:"info",
    }
  },
  created(){
    console.log(this.$route);
    this.customer = this.$route.query.customer;
    let id = this.$route.query.id;
    // 通过id查询顾客，订单，地址
    this.findAddressByCustomerId(id);
    //this.findAllCustomers();
  },
  computed:{
    ...mapState("address",["address"]),
    //...mapState("customer", ["customer"]),
  },
  methods:{
    ...mapActions("address",["findAddressByCustomerId"]),
    //...mapActions("customer", ["findAllCustomers"]),
    backHandler(){
      // this.$router.push("/customer")
      this.$router.go(-1)
    }
  }

}
</script>
<style scoped>


</style>