import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
import { URLDOMAIN } from "../../../ContractAction/ContractDependency";


const AreaChartGraph = ({ Data, setData, userAddress }) => {

  const [startDate, setstartDate] = useState("")
  const [endtDate, setendDate] = useState("")
  console.log("startDate", startDate)
  console.log("endtDate", endtDate)

  const [options, setOptions] = useState({
    colors: ['rgba(11, 134, 104,0.01)'],
    chart: {
      id: "tokenChart",
      background: 'rgba(0, 0, 0, 0)',
      toolbar: {
        show: false
      },
      zoom: {
        autoScaleYaxis: true
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 5
      }
    },
    grid: {
      show: true,
      borderColor: 'rgba(235, 237, 240, 0.03)',
      xaxis: {
        lines: {
          show: false
        }
      }
    },
    xaxis: {
      yAxisIndex: 1,
      type: 'datetime',
      labels: {
        show: true
      },
      axisBorder: {
        show: true,
        color: 'rgba(235, 237, 240, 0.03)'
      },
      tickPlacement: "on"
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return "$" + value.toFixed(0);
        }
      }
    },
    tooltip: {
      show: false
    },
    theme: {
      mode: "dark",
      monochrome: {
        enabled: false,
        color: '#fff',
        shadeTo: 'dark',
        shadeIntensity: 0
      },
    },
    legend: {
      show: false
    },
    stroke: {
      curve: 'smooth',
      width: 1, // Width of the border
      colors: ['#0B8668'] // Color of the border
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: 'dark',
        shadeIntensity: 1,
        opacityFrom: 2,
        opacityTo: 3,
        stops: [20, 250]
      }
    }
  });
  const [series, setSeries] = useState([
    {
      name: 'Earnings',
      data: []
    }
  ]);

  useEffect(() => {
    setSeries([
      {
        name: 'Earnings',
        data: Data
      }
    ]);
  }, [Data]);


  return (
    <>
      <div id="tokenChart">
        <ReactApexChart options={options} series={series} type="area" height={400} />
      </div>
    </>
  );
}

export default AreaChartGraph;