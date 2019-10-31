import request from '@/utils/request'
import {post,post_array} from '@/utils/request'

export default {
  namespaced:true,
  state:{
    orders:[],
    // 待派单
    ordersdp:[],
    // 待接单
    ordersdj:[],
    // 待服务
    ordersdf:[],
    // 未评价
    orderswp:[],
    visible:false,
    title:"添加订单信息",
    loading:false,
  },
  getters:{
    orderSize(state){
      return state.orders.length;
    },
    orderOrder:(state)=>{
      return function(flag){
        state.orders.sort((a,b)=>{
          if(a[flag] > b[flag]){
            return -1;
          } else {
            return 1;
          }
        })
        return state.orders;
      }
    }
  },
  mutations:{
    

    showModal(state){
      state.visible = true;
    },
    closeModal(state){
      state.visible = false;
    },
    // 刷新订单，及订单分类方法
    refreshOrders(state,orders){
      state.orders = orders;
      orders.map((item,index)=>{
        if(item.status == '待派单'){
          state.ordersdp[index] = item;
        }
        if(item.status == '待接单'){
          state.ordersdj[index] = item;
        }
        if(item.status == '待服务'){
          state.ordersdf[index] = item;
        }
        if(item.status == '待评价'){
          state.orderswp[index] = item;
        }
        console.log("item",item.status,index);
      });
    },
    setTitle(state,title){
      state.title = title;
    },
    beginLoading(state){
      state.loading = true;
    },
    endLoading(state){
      state.loading = false;
    }
  },
  actions:{
    async batchDeleteOrder(context,ids){
      // 1. 批量删除
      let response = await post_array("/order/batchDelete",{ids})
      // 2. 分发
      context.dispatch("findAllOrders");
      // 3. 返回结果
      return response;
    },
    async deleteOrderById(context,id){
      let response = await request.get("/order/deleteById?id="+id);
      context.dispatch("findAllOrders");
      return response;
    },
    async findAllOrders({dispatch,commit}){
      // 1. ajax查询
      commit("beginLoading");
      let response = await request.get("/order/findAll");
      // 2. 将查询结果更新到state中
      commit("refreshOrders",response.data);
      setTimeout(()=>{
        commit("endLoading")
      },1000)
    },
    // payload 订单信息
    async saveOrUpdateOrder({commit,dispatch},payload){
      // 1. 保存或更新
      let response = await post("/order/saveOrUpdate",payload)
      // 2. 刷新页面
      dispatch("findAllOrders");
      // 3. 关闭模态框
      commit("closeModal");
      // 4. 提示
      return response;
    }
  }
}