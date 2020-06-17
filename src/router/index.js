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
            component: purchase,
            redirect: "/purchaseHome",
            children: [{
                    path: "/purchaseHome",
                    name: "purchaseHome",
                    component: () =>
                        import ("@/containers/purchase/components/home")
                },
                {
                    path: "/purchaseNews",
                    name: "purchaseNews",
                    component: () =>
                        import ("@/containers/purchase/components/news")
                },
                {
                    path: "/purchaseHelp",
                    name: "purchaseHelp",
                    component: () =>
                        import ("@/containers/purchase/components/help")
                },
                {
                    path: "/purchaseSlideshow",
                    name: "purchaseSlideshow",
                    component: () =>
                        import ("@/containers/purchase/components/slideshow")
                },
                {
                    path: "/qrCode",
                    name: "qrCode",
                    component: () =>
                        import ("@/containers/purchase/components/applet/qrCode")
                },
                {
                    path: "/appletSlideshow",
                    name: "appletSlideshow",
                    component: () =>
                        import ("@/containers/purchase/components/applet/slideshow")
                },
                {
                    path: "/advertising",
                    name: "advertising",
                    component: () =>
                        import ("@/containers/purchase/components/applet/advertising")
                },
                {
                    path: "/appletVideos",
                    name: "appletVideos",
                    component: () =>
                        import ("@/containers/purchase/components/applet/video")
                },
                {
                    path: "/productList",
                    name: "productList",
                    component: () =>
                        import ("@/containers/purchase/components/management/productList")
                }, ,
                {
                    path: "/productListDetail",
                    name: "productListDetail",
                    component: () =>
                        import (
                            "@/containers/purchase/components/management/productListDetail"
                        )
                },
                {
                    path: "/categoryList",
                    name: "categoryList",
                    component: () =>
                        import ("@/containers/purchase/components/management/categoryList")
                },
                {
                    path: "/soupBasesList",
                    name: "soupBasesList",
                    component: () =>
                        import ("@/containers/purchase/components/management/soupBasesList")
                },
                {
                    path: "/soupBasesListDetail",
                    name: "soupBasesListDetail",
                    component: () =>
                        import (
                            "@/containers/purchase/components/management/soupBasesListDetail"
                        )
                },
                {
                    path: "/evaluationList",
                    name: "evaluationList",
                    component: () =>
                        import ("@/containers/purchase/components/management/evaluationList")
                },
                {
                    path: "/keyword",
                    name: "keyword",
                    component: () =>
                        import ("@/containers/purchase/components/data/keyword")
                },
                {
                    path: "/realtimeConsumption",
                    name: "realtimeConsumption",
                    component: () =>
                        import ("@/containers/purchase/components/data/realtimeConsumption")
                },
                {
                    path: "/dataStatistics",
                    name: "dataStatistics",
                    component: () =>
                        import ("@/containers/purchase/components/data/dataStatistics")
                },
                {
                    path: "/salesStatistics",
                    name: "salesStatistics",
                    component: () =>
                        import ("@/containers/purchase/components/data/salesStatistics")
                },
                {
                    path: "/dataOverview",
                    name: "dataOverview",
                    component: () =>
                        import ("@/containers/purchase/components/data/dataOverview")
                },
                {
                    path: "/property",
                    name: "property",
                    component: () =>
                        import ("@/containers/purchase/components/property/index")
                },
                {
                    path: "/userList",
                    name: "userList",
                    component: () =>
                        import ("@/containers/purchase/components/userControl/userList")
                },
                {
                    path: "/userListDetail",
                    name: "userListDetail",
                    component: () =>
                        import (
                            "@/containers/purchase/components/userControl/userListDetail"
                        )
                },
                {
                    path: "/userAddress",
                    name: "userAddress",
                    component: () =>
                        import ("@/containers/purchase/components/userControl/userAddress")
                },
                {
                    path: "/userLevel",
                    name: "userLevel",
                    component: () =>
                        import ("@/containers/purchase/components/userControl/userLevel")
                },
                {
                    path: "/userLabel",
                    name: "userLabel",
                    component: () =>
                        import ("@/containers/purchase/components/userControl/userLabel")
                },
                {
                    path: "/rawMaterial",
                    name: "rawMaterial",
                    component: () =>
                        import ("@/containers/purchase/components/orderFrom/rawMaterial")
                },
                {
                    path: "/soupBases",
                    name: "soupBases",
                    component: () =>
                        import ("@/containers/purchase/components/orderFrom/soupBases")
                }
            ]
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
            component: community,
            redirect: "/communityBy",
            children: [{
                    path: "/communityBy",
                    name: "communityBy",
                    component: () =>
                        import ("@/containers/community/components/circle/communityBy")
                },
                {
                    path: "/lable",
                    name: "lable",
                    component: () =>
                        import ("@/containers/community/components/circle/lable")
                },
                {
                    path: "/deit",
                    name: "postHtml",
                    component: () =>
                        import ("@/containers/community/components/circle/post")
                },
                {
                    path: "/sensitive",
                    name: "sensitive",
                    component: () =>
                        import ("@/containers/community/components/circle/sensitive")
                },
                {
                    path: "/videomessage",
                    name: "videomessage",
                    component: () =>
                        import ("@/containers/community/components/college/video")
                },
                {
                    path: "/userLabel",
                    name: "userLabel",
                    component: () =>
                        import ("@/containers/community/components/circle/lable")
                },
                {
                    path: "/classify",
                    name: "classify",
                    component: () =>
                        import ("@/containers/community/components/college/classify")
                },
                {
                    path: "/comment",
                    name: "comment",
                    component: () =>
                        import ("@/containers/community/components/college/comment")
                }
            ]
        },
        {
            path: "/home",
            name: "home",
            component: home
        },
        {
            path: "/set",
            name: "set",
            component: set,
            redirect: "/administrator",
            children: [{
                    path: "/administrator",
                    name: "administrator",
                    component: () =>
                        import ("@/containers/set/components/systemSettings/administrator")
                },
                {
                    path: "/characterName",
                    name: "characterName",
                    component: () =>
                        import ("@/containers/set/components/systemSettings/characterName")
                },
                {
                    path: "/deit",
                    name: "deit",
                    component: () =>
                        import ("@/containers/set/components/systemSettings/deit")
                },
                {
                    path: "/adminLog",
                    name: "adminLog",
                    component: () =>
                        import ("@/containers/set/components/systemSettings/adminLog")
                },
                {
                    path: "/fileManagement",
                    name: "fileManagement",
                    component: () =>
                        import ("@/containers/set/components/systemSettings/fileManagement")
                },
                {
                    path: "/fileGroupManagement",
                    name: "fileGroupManagement",
                    component: () =>
                        import (
                            "@/containers/set/components/systemSettings/fileGroupManagement"
                        )
                },
                {
                    path: "/freight",
                    name: "freight",
                    component: () =>
                        import ("@/containers/set/components/basicSetting/freight")
                },
                {
                    path: "/provinces",
                    name: "provinces",
                    component: () =>
                        import ("@/containers/set/components/basicSetting/provinces")
                },
                {
                    path: "/background",
                    name: "background",
                    component: () =>
                        import ("@/containers/set/components/account/background")
                },
                {
                    path: "/accountMan",
                    name: "accountMan",
                    component: () =>
                        import ("@/containers/set/components/account/accountMan")
                },
                {
                    path: "/accounAdministrator",
                    name: "accounAdministrator",
                    component: () =>
                        import ("@/containers/set/components/account/administrator")
                },
                {
                    path: "/category",
                    name: "category",
                    component: () =>
                        import ("@/containers/set/components/account/category")
                },
                {
                    path: "/slideshow",
                    name: "slideshow",
                    component: () =>
                        import ("@/containers/set/components/officialWebsite/slideshow")
                },
                {
                    path: "/organization",
                    name: "organization",
                    component: () =>
                        import ("@/containers/set/components/officialWebsite/organization")
                },
                {
                    path: "/cutForm",
                    name: "cutForm",
                    component: () =>
                        import ("@/containers/set/components/officialWebsite/cutForm")
                },
                {
                    path: "/coreTeam",
                    name: "coreTeam",
                    component: () =>
                        import ("@/containers/set/components/officialWebsite/coreTeam")
                },
                {
                    path: "/startupStory",
                    name: "startupStory",
                    component: () =>
                        import ("@/containers/set/components/officialWebsite/startupStory")
                },
                {
                    path: "/award",
                    name: "award",
                    component: () =>
                        import ("@/containers/set/components/officialWebsite/award")
                },
                {
                    path: "/mediaVideo",
                    name: "mediaVideo",
                    component: () =>
                        import ("@/containers/set/components/officialWebsite/mediaVideo")
                }
            ]
        }
    ]
});