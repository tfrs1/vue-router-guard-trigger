let storedFrom = null;
let storedNext = null;

function storeRouterFunctions(to, from, next) {
  storedFrom = from;
  storedNext = next;
  next();
}

export default {
  install(Vue) {
    Vue.mixin({
      beforeRouteEnter: storeRouterFunctions,
      beforeRouteUpdate: storeRouterFunctions
    });

    /**
     * Trigger a specific guard.
     *
     * @param {NavigationGuard} guard - Navigation guard to be triggered
     * @param {RouteObject} [to=this.$route] - Destination route object
     */
    Vue.prototype.$triggerGuard = function (guard, to = this.$route) {
      guard(to, storedFrom, storedNext);
    };

    /**
     * Trigger all navigation guards defined on the current route.
     */
    Vue.prototype.$triggerCurrentRouteGuards = function () {
      this.$route.matched.forEach((route) => {
        if (route.beforeEnter) {
          route.beforeEnter(this.$route, storedFrom, storedNext);
        }
      });
    };
  }
};
