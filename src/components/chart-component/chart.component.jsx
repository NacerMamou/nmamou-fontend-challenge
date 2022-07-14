import colorMap from "../../data/colors.map";
import Highcharts, { chart } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useContext } from "react";
import { ChartContext } from "../../contexts/chart.context";

function Chart() {
  const { filtredData, averageData, startingDate, chartDescription } =
    useContext(ChartContext);

  return (
    <div className="main-chart">
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
          },

          title: {
            text: ``,
            style: {
              color: colorMap.get("green-color--1"),
              font: 'bold 1vw "Trebuchet MS", Verdana, sans-serif',
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
              text: "Time Period",
              style: {
                color: "white",
                font: '0.85vw "Trebuchet MS", Verdana, sans-serif',
              },
            },
            type: "datetime",
            gridLineColor: "#FFFFFF",
            gridLineWidth: 0,
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
                font: '1vw  "Trebuchet MS", Verdana, sans-serif',
              },
            },
            gridLineColor: "#FFFFFF",
            gridLineWidth: 0,
            labels: {
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
              name: chartDescription.categoryName,
              pointStart: startingDate,
              data: filtredData,
              marker: {
                enabled: false,
              },
            },
            {
              name: "Avergae",
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
