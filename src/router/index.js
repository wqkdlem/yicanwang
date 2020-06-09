import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import login from "@/containers/login/index";
import home from "@/containers/home/index";

import purchase from "@/containers/purchase/index";
import order from "@/containers/order/index";
import bigData from "@/containers/bigData/index";
import generalize from "@/containers/generalize/index";
import community from "@/containers/community/index";
import set from "@/containers/set/index";

Vue.use(Router);

export default new Router({
    routes: [{
            path: "/",
            name: "login",
            component: login
        },
        {
            path: "/home",
            name: "home",
            component: home
        },
        {
            path: "/purchase",
            name: "purchase",
            component: purchase
        },
        {
            path: "/order",
            name: "order",
            component: order
        },
        {
            path: "/bigData",
            name: "bigData",
            component: bigData
        },
        {
            path: "/generalize",
            name: "generalize",
            component: generalize
        },
        {
            path: "/community",
            name: "community",
            component: community
        },
        {
            path: "/home",
            name: "home",
            component: home
        },
        {
            path: "/set",
            name: "set",
            component: set
        }
    ]
});