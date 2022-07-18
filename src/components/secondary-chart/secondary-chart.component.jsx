import colorMap from "../../data/colors.map";
import Highcharts, { chart } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useContext, useEffect } from "react";
import { SecondaryChartContext } from "../../contexts/secondary-chart.context";
import { CurrentCategoryContext } from "../../contexts/current-category.context";

const SecondaryChart = () => {
  const {
    filtredData_sec,
    averageData_sec,
    startingDate_sec,
    chartDescription_sec,
  } = useContext(SecondaryChartContext);

  const { currentCategoryInfos } = useContext(CurrentCategoryContext);

  return (
    <div className="secondary-chart">
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          colors: [
            colorMap.get("orange-color--1"),
            colorMap.get("green-color--2"),
          ],
          chart: {
            backgroundColor: "#1d1b2a",
            // borderColor: '#FFFFFF',
            borderWidth: 0,
            className: "primary-chart",
            // plotBorderColor: '#CCCCCC',
            plotBackgroundColor: "#1d1b2a",
            plotBorderWidth: 0,
            // marginRight: 100,
          },
          title: {
            text: ``,
            style: {
              // color: "green",
              // font: 'bold 0vw "Trebuchet MS", Verdana, sans-serif',
            },
          },
          // subtitle: {
          //   text: `Category : ${chartDescription_sec.categoryName}, Period : ${getStringDate(startingDate_sec)} to ${getStringDate(endingDate_sec)}`,
          //   style:{
          //     color:'red',
          //     font: '0.8vw "Trebuchet MS", Verdana, sans-serif'
          //   }
          // },

          xAxis: {
            title: {
              text: "",
              style: {
                // font: '0.85vw "Trebuchet MS", Verdana, sans-serif',
              },
            },
            type: "datetime",
            gridLineColor: "#FFFFFF",
            lineColors: "#A0A0A0",
            minerTickInterval: null,
          },
          yAxis: {
            title: {
              text: "Search Volume",
              style: {
                // font: '0.85vw  "Trebuchet MS", Verdana, sans-serif',
              },
            },
            gridLineColor: "#FFFFFF",
            gridLineWidth: 0,
            labes: {
              style: {
                color: "#A0A0A0",
              },
            },
            lineColors: "#A0A0A0",
            minerTickInterval: null,
          },
          legend: {
            layout: "vertical",
            align: "right",
            verticalAlign: "middle",
            backgroundColor: colorMap.get("background-color--1"),
            borderRadius: "0.1vw",
            itemStyle: {
              color: "#FFFFFF",
            },
          },

          plotOptions: {
            series: {
              pointIntervalUnit: "month",
            },
          },
          series: [
            {
              name: currentCategoryInfos.title,
              pointStart: startingDate_sec,
              data: filtredData_sec,
              marker: {
                enabled: false,
              },
              style: {},
            },
            {
              name: "Average",
              pointStart: startingDate_sec,
              data: averageData_sec,
              marker: {
                enabled: false,
              },
            },
          ],
          responsive: {
            rules: [
              {
                condition: {
                  maxWidth: 576,
                },
                chartOptions: {
                  legend: {
                    align: "center",
                    verticalAlign: "bottom",
                    layout: "horizontal",
                    itemStyle: {
                      // fontSize: "3vw",
                    },
                  },
                  xAxis: {
                    labels: {
                      style: {
                        // fontSize: "2vw",
                      },
                    },
                  },
                  yAxis: {
                    title: {
                      style: {
                        // fontSize: "2.2vw",
                      },
                    },
                    labels: {
                      style: {
                        // fontSize: "2vw",
                      },
                    },
                  },
                },
              },
            ],
          },
        }}
      />
    </div>
  );
}

export default SecondaryChart;
