import colorMap from "../../data/colors.map";
import Highcharts, { chart } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useContext, useEffect } from "react";
import { SecondaryChartContext } from "../../contexts/secondary-chart.context";

function SecondaryChart() {
  const {
    filtredData_sec,
    averageData_sec,
    startingDate_sec,
    chartDescription_sec,
  } = useContext(SecondaryChartContext);

  return (
    <div className="secondary-chart">
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          colors: [
            colorMap.get("orange-color--1"),
            colorMap.get("green-color--1"),
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
              color: "green",
              font: 'bold 0vw "Trebuchet MS", Verdana, sans-serif',
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
              text: "Time Period",
              style: {
                color: "white",
                font: '0.85vw "Trebuchet MS", Verdana, sans-serif',
              },
            },
            type: "datetime",
            gridLineColor: "#FFFFFF",
            labels: {
              style: {
                color: "#A0A0A0",
              },
            },
            lineColors: "#A0A0A0",
            minerTickInterval: null,
          },
          yAxis: {
            title: {
              text: "Search Volume",
              style: {
                color: "white",
                font: '0.85vw  "Trebuchet MS", Verdana, sans-serif',
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
          },

          plotOptions: {
            series: {
              pointIntervalUnit: "month",
            },
          },
          series: [
            {
              name: chartDescription_sec.categoryName,
              pointStart: startingDate_sec,
              data: filtredData_sec,
              marker: {
                enabled: false,
              },
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
        }}
      />
    </div>
  );
}

export default SecondaryChart;
