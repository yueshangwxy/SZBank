import {constantRouterMap,Layout} from '../../router/routers'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    keepAlive: false,
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_KEEPALIVE:(state, keepAlive) => {
      state.keepAlive = keepAlive;
    }
  },
  actions: {
    GenerateRoutes({commit}, asyncRouter) {
      commit('SET_ROUTERS', asyncRouter)
    },
    setKeepAlive({commit},keepAlive){
      commit('SET_KEEPALIVE',keepAlive)
    }
  }
}
export default permission
