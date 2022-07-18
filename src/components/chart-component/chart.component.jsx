import colorMap from "../../data/colors.map";
import Highcharts, { chart } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useContext } from "react";
import { ChartContext } from "../../contexts/chart.context";
import { CurrentCategoryContext } from "../../contexts/current-category.context";

const Chart = () => {
  const { filtredData, averageData, startingDate, chartDescription } =
    useContext(ChartContext);
  const { currentCategoryInfos } = useContext(CurrentCategoryContext);

  return (
    <div className="main-chart">
      <HighchartsReact
        highcharts={Highcharts}
        options={{
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
          },

          title: {
            text: "",
            style: {
              // font: 'bold 1vw "Trebuchet MS", Verdana, sans-serif',
            },
          },
          // subtitle: {
          //   text: `Category : ${chartDescription.categoryName}, Period : ${getStringDate(startingDate)} to ${getStringDate(endingDate)}`,
          //   style:{
          //     color:'red',
          //     font: '0.8vw "Trebuchet MS", Verdana, sans-serif'
          //   }
          // },

          xAxis: {
            title: {
              text: "",
              style: {
                textShadow: "0 0 0vw",
                // font: '0.8vw  "Trebuchet MS", Verdana, sans-serif',
              },
            },
            type: "datetime",
            gridLineColor: "#FFFFFF",
            gridLineWidth: 0,

            labels: {
              style: {
                // fontSize: "0.6vw",
              },
            },
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
            labels: {
              style: {},
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
              // fontSize: "0.7vw",
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
              pointStart: startingDate,
              data: filtredData,
              marker: {
                enabled: false,
              },
            },
            {
              name: "Average",
              pointStart: startingDate,
              data: averageData,
              marker: {
                enabled: false,
              },
            },
          ],
          
        }}
      />
    </div>
  );
}

export default Chart;
