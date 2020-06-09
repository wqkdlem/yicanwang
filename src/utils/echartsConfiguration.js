/**
 * 页面使用 如
 * import {pieChart} from '路径';
 * 赋值于data中定义的变量
 * this.xxx=pieChart;
 * 数据修改-修改this.xxx中的配置,及数据 重新放到 echarts绘制
 *
 *
 *
 */

//首页饼图
import echarts from "echarts";
export let pieChart = {
    title: {
        text: "关键字比列图(实时)",
        // subtext: "纯属虚构",
        left: "center"
    },
    tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: "vertical",
        left: "left",
        data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
    },
    series: [{
        name: "访问来源",
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: [
            { value: 335, name: "直接访问" },
            { value: 310, name: "邮件营销" },
            { value: 234, name: "联盟广告" },
            { value: 135, name: "视频广告" },
            { value: 1548, name: "搜索引擎" }
        ],
        emphasis: {
            itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
            }
        }
    }]
};
//首页折线图
export let lineChart = {
    title: {},
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "cross",
            label: {
                backgroundColor: "#6a7985"
            }
        }
    },
    legend: {
        x: "5%",
        y: "10px",
        data: ["昨天"],
        show: false
    },
    grid: {
        left: "3%",
        right: "4%",
        bottom: "10%",
        containLabel: true
    },
    xAxis: {
        type: "category",
        boundaryGap: false,
        axisLine: {
            show: false,
            lineStyle: {
                color: "#282828",
                fontWeight: "lighter"
            }
        },
        splitLine: {
            lineStyle: {
                color: ["#fff", "#aaa"]
            }
        },
        axisTick: {
            show: false
        },
        data: []
    },
    yAxis: [
        // y轴
        {
            type: "value",
            min: 0,
            // max: 45000,
            // interval: 5000,
            axisLabel: {
                formatter: "{value}"
            },
            offset: 15,
            axisTick: {
                show: false
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: "#282828",
                    fontWeight: "lighter"
                }
            }
        }
    ],
    series: [{
        name: "昨天",
        type: "line",
        stack: "总量",
        smooth: true, //让曲线变平滑的
        // symbol: "star", //拐点样式
        symbolSize: 5, //拐点大小
        areaStyle: {},
        itemStyle: {
            normal: {
                color: "#0071CE", //改变折线点的颜色
                areaStyle: {
                    type: "default",
                    //渐变色实现
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1, //变化度
                        //三种由深及浅的颜色
                        [{
                                offset: 0,
                                color: "#5caff3"
                            },
                            {
                                offset: 1,
                                color: "#ffffff"
                            }
                        ]
                    )
                },

                lineStyle: {
                    width: 2 //折线宽度
                }
            }
        },
        data: []
    }]
};
//首页柱状图
export let barGraph = {
    title: {
        text: "", //主标题
        textStyle: {
            color: "#282828",
            fontSize: "14px",
            fontWeight: "lighter"
        },
        x: "30px", //x轴方向对齐方式
        y: "15px"
    },
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "cross",
            crossStyle: {
                color: "#999"
            }
        }
    },
    legend: {
        x: "78%",
        y: "10px",
        data: ["今日", "昨日"]
    },
    xAxis:
    // x轴
    {
        type: "category",
        data: [],
        axisPointer: {
            type: "shadow"
        },
        axisLine: {
            show: false,
            lineStyle: {
                color: "#282828",
                fontWeight: "lighter"
            }
        },
        splitLine: {
            lineStyle: {
                color: ["#fff", "#aaa"]
            }
        },
        axisTick: {
            show: false
        }
    },
    yAxis: [
        // y轴
        {
            type: "value",
            // interval: 10000,
            axisLabel: {
                formatter: "{value}"
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            }
        }
    ],
    series: [{
            radius: [30, 70],
            name: "今日",
            type: "bar",
            legendHoverLink: true,
            barWidth: 15, //柱图宽度
            itemStyle: {
                //---图形形状
                color: "#5AB1EF"
            },
            data: [2000, 49000, 30070, 12312, 25006, 10767]
        },
        {
            name: "昨日",
            type: "bar",
            barWidth: 15, //柱图宽度
            itemStyle: {
                //---图形形状
                color: "#2EC7C9"
            },
            data: [10000, 11159, 21190, 26400, 28700, 10707]
        }
    ]
};
//选品清单的饼图数据
export let pieChart_goods = {
    title: {
        // text: "南丁格尔玫瑰图",
        // subtext: "纯属虚构",
        left: "2%"
    },
    tooltip: {
        trigger: "item",
        formatter: function(parms) {
            console.log(parms, "parms");
            var src = "1111";
            return src;
        }
    },
    //图例
    legend: {
        type: "scroll",
        itemGap: 30,
        orient: "vertical",
        right: "10%",
        align: "left",
        top: "middle",
        textStyle: {
            color: "#8C8C8C"
        },
        height: 500,
        default: false
    },
    calculable: false,
    series: [{
        name: "面积模式",
        type: "pie",
        center: ["28%", "50%"],
        radius: ["28%", "55%"],
        roseType: "area",
        data: [{
                value: "",
                name: "",
                itemStyle: {
                    color: "#FFDA5B"
                }
            },
            {
                value: "",
                name: "",
                itemStyle: {
                    color: "#9FE7B9"
                }
            },
            {
                value: "",
                name: "",
                itemStyle: {
                    color: "#32C4E9"
                }
            },
            {
                value: "",
                name: "",
                itemStyle: {
                    color: "#8278E9"
                }
            },
            {
                value: "",
                name: "",
                itemStyle: {
                    color: "#E7BCF2"
                }
            },
            {
                value: "",
                name: "",
                itemStyle: {
                    color: "#FF9F7F"
                }
            }
        ]
    }]
};