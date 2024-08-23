// import React, { useState, useEffect } from "react";
// import Chart from "chart.js/auto";

// function TokenomicsChart() {
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     const data = {
//       labels: [
//         "TT Avatar Rewards",
//         "Marketing/ Advertising Rewards",
//         "CEX Listing",
//         "Dev/Trend Team",

//       ],
//       datasets: [
//         {
//           data: [85,5, 5, 5],
//           backgroundColor: [
//             "#167E6D",
//             "#0B5246",
//             "#07372F",
//             "#04231E",

//           ],
//           borderWidth: 0,
//         },
//       ],
//     };

//     const config = {
//       type: "pie",
//       data: data,
//       options: {
//         plugins: {
//           legend: {
//             legend: { display: false },
//             rotation: (-0.5 * Math.PI) - (25 / 180 * Math.PI)
//           },
//         },
//       },
//     };

//     const ctx = document.getElementById("tokenomicsChart");
//     const myChart = new Chart(ctx, config);

//     setChartData(myChart);

//     return () => {
//       // Cleanup to prevent memory leaks
//       myChart.destroy();
//     };
//   }, []);

//   return (
//     <div className="container" style={{height:"526px",width:"1052px"}}>
//       <div className="row align-items-center">
//         <div className="col-lg-6">
//           <div className="mb-5 mb-lg-0">
//             <canvas id="tokenomicsChart"></canvas>
//           </div>
//         </div>

//         <div className="col-lg-6">
//           <ul className="tokenomics-legends">

//             {chartData &&
//               chartData.data.labels.map((label, i) => (
//                 <li
//                   className="d-flex align-items-center gap-4"
//                   key={i}
//                   style={{ marginTop: "2%" }}
//                 >
//                   <div
//                     style={{
//                       backgroundColor: chartData.data.datasets[0].backgroundColor[i],
//                       color: "white", // Set text color to white
//                     }}
//                   >
//                     {chartData.data.datasets[0].data[i] + "%"}
//                   </div>
//                   <span style={{ color: "white" }}>{label}</span>
//                 </li>
//               ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TokenomicsChart;

import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
//dev: TokenomicsChart Component
function TokenomicsChart() {
  //dev: Chart Data in array of object format(json)
  const [Area, setArea] = useState({
    series: [85, 5, 5, 5],

    options: {
      colors: ["#167E6D", "#0B5246", "#07372F", "#04231E"],

      chart: {
        width: 380,
      },
      labels: [
        "TT Avatar Rewards",
        "Marketing/ Advertising Rewards",
        "CEX Listing",
        "Dev/Trend Team",
      ],
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "18px",
        },
      },

      plotOptions: {
        pie: {
          startAngle: -270,
          endAngle: 90,
          // donut: {
          //   labels: {
          //     show: true,
          //     name: {
          //       fontSize: "22px",
          //     },
          //     value: {
          //       formatter: function (val) {
          //         return parseInt(val) + "%";
          //       },
          //     },
          //   },
          // },
        },
      },

      stroke: {
        show: false,
      },

      legend: {
        show: false,
        position: "bottom",
      },
    },
  });

  const datanew = [
    {
      name: "Token Name",
      valuenew: "Trend Token",
    },
    {
      name: "Token Token",
      valuenew: "$TRND",
    },
    {
      name: "Chain",
      valuenew: "Base Mainnet",
    },
    {
      name: "Max Supply",
      valuenew: "21,000,000",
    },
    {
      name: "Launch Price",
      valuenew: "0.21$",
    },
  ];
  const { t, i18n } = useTranslation();
  const isMobile = useMediaQuery("(max-width:991px)");

  return (
    <div className="container mt-4" style={{ padding: "0px", margin: "0px" }}>
      <div
        className="d-flex flex-row align-items-center justify-content-center w-100 flex-wrap"
        style={{ marginTop: "-72px" }}
      >
        {/* <div className="col-lg-6 col-xxxl-6 col-xl-6 col-md-12 col-sm-12" > */}
        <div className="mb-5 mb-lg-0  me-5 ">
          {/*dev: Use ReactApexChart   */}
          <ReactApexChart
            options={Area.options}
            series={Area.series}
            height="450"
            width="450"
            type="pie"
          />
        </div>
        {/* </div> */}

        {/* <div className="col-lg-6 col-xxl-6 col-xl-6 col-md-12 col-sm-12"> */}
        <ul className="tokenomics-legends">
          {Area.series.map((el, i) => {
            return (
              <li
                className="d-flex align-items-center gap-5"
                key={i}
                style={{ marginTop: "2%" }}
              >
                <div style={{ backgroundColor: Area.options.colors[i] }}>
                  {isMobile ? <h3  className="mt-2">{el + "%"}</h3> : <h6 className="mt-2">{el + "%"}</h6>}
                </div>
                {isMobile ? (
                  <h2>{t(Area.options.labels[i])}</h2>
                ) : (
                  <h6>{t(Area.options.labels[i])}</h6>
                )}{" "}
              </li>
            );
          })}

          {/* <h5>(1 year locked & released on 10% a month vesting period)</h5> */}
        </ul>

        {/* </div> */}
      </div>
      <div className="mt-4">
        <div className="row d-flex justify-content-center mt-4">
          {datanew.map((el, i) => (
            <div
              className="col-lg-2 col-md-2 col-sm-6 mb-2 text-center"
              key={i}
            >
              <h5
                className="card-title"
                style={{
                  color: "rgba(78, 134, 100, 1)",
                  textDecoration: "underline",
                  fontWeight: "600",
                }}
              >
                {t(el.name)}
              </h5>
              <h5 className="card-text h4" style={{ fontWeight: "600" }}>
                {t(el.valuenew)}
              </h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TokenomicsChart;
