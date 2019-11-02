import request from '@/utils/request'
import {get,post,post_array} from '@/utils/request'
import moment from 'moment'

export default {
  namespaced:true,
  state:{
    // 全部订单
    orders:[],
    // 派单模态框的显示与隐藏
    pdVisible:false,
    // 修改模态框的显示与隐藏
    visible:false,
    title:"添加订单信息",
    // 加载样式显示
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
    },
    // 遍历全部订单，返回想要的值
    filterOrderStatus(state,status) {
      return (status)=>{
        return state.orders.filter((item)=>{
          return item.status === status;
        })
      }
    }
  },
  mutations:{
    // 将派单模态框显示
    showSendOrder(state) {
      state.pdVisible = true
    },
    // 将派单模态框隐藏
    closeSendOrder(state) {
      state.pdVisible = false
    },
    // 将模态框的状态改为打开
    showModal(state){
      state.visible = true;
    },
    // 将模态框的状态改为关闭
    closeModal(state){
      state.visible = false;
    },
    // 提交新的订单数据
    refreshOrders(state,orders){
      state.orders = orders;
      // 时间戳处理
      state.orders.forEach((item)=>{
        item.orderTime = moment(item.orderTime).format('YYYY-MM-DD HH:mm:ss');
      })
    },
    // 设置模态框地标题方法
    setTitle(state,title){
      state.title = title;
    },
    // 加载样式显示方法
    beginLoading(state){
      state.loading = true;
    },
    // 加载样式隐藏方法
    endLoading(state){
      state.loading = false;
    }
  },
  actions:{
    // 派单方法
    async sendOrder(context,wno) {
      // console.log("提交信息",wno.waiterId,wno.orderId);
      let response = await get('/order/sendOrder?waiterId='+wno.waiterId+"&orderId="+wno.orderId);
      context.dispatch('findAllOrders');
      return response;
    },
    // 批量删除订单方法
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
    // 查询全部订单方法
    async findAllOrders({dispatch,commit}){
      // 1. ajax查询，同时加载样式显示
      commit("beginLoading");
      let response = await request.get("/order/findAll");
      // 2. 将查询结果更新到state中
      commit("refreshOrders",response.data);
      // 延时提交，拿到结果后加载样式隐藏
      setTimeout(()=>{
        commit("endLoading")
      },10)
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