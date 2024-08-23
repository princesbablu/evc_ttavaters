import React, { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

//dev: Start LineChart Component
function LineChart() {
  useEffect(() => {
    am5.addLicense("AM5C384814842");

    //dev: Chart code 
    //dev: Create root element
    //dev: https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let root = am5.Root.new("chartdiv");

    //dev: Set themes
    //dev: https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    //dev: Create chart
    //dev:  https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout,
        pinchZoomX: true,
      })
    );

    //dev: Add cursor
    //dev: https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "none",
      })
    );
    cursor.lineY.set("visible", false);

    let colorSet = am5.ColorSet.new(root, {});

    //dev: The data for graph
    let data = [
      {
        year: "14 Apr",
        value: 4400,
        strokeSettings: {
          stroke: colorSet.getIndex(0),
        },
        fillSettings: {
          fill: colorSet.getIndex(0),
        },
        bulletSettings: {
          fill: colorSet.getIndex(0),
        },
      },
      {
        year: "15 Apr",
        value: 4500,
        bulletSettings: {
          fill: colorSet.getIndex(0),
        },
      },
      {
        year: "16 Apr",

        value: 4900,
        bulletSettings: {
          fill: colorSet.getIndex(0),
        },
      },
      {
        year: "17 Apr",
        value: 4400,
        bulletSettings: {
          fill: colorSet.getIndex(0),
        },
      },
      {
        year: "18 Apr",
        value: 4800,
        strokeSettings: {
          stroke: colorSet.getIndex(0),
        },
        fillSettings: {
          fill: colorSet.getIndex(0),
        },
        bulletSettings: {
          fill: colorSet.getIndex(0),
        },
      },
    ];

    //dev: Create axes
    //dev:  https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = am5xy.AxisRendererX.new(root, {});
    xRenderer.grid.template.set("location", 0.5);
    xRenderer.labels.template.setAll({
      location: 0.5,
      multiLocation: 0.5,
    });

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "year",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xAxis.data.setAll(data);

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxPrecision: 0,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    let series = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "year",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
          dy: -5,
        }),
      })
    );

    series.strokes.template.setAll({
      templateField: "strokeSettings",
      strokeWidth: 2,
    });

    series.fills.template.setAll({
      visible: true,
      fillOpacity: 0.5,
      templateField: "fillSettings",
    });

    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          templateField: "bulletSettings",
          radius: 5,
        }),
      });
    });

    series.data.setAll(data);
    series.appear(1000);

    //dev: Add scrollbar
    //dev: https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    //dev: Make stuff animate on load
    //dev: https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <>
      <div
        id="chartdiv"
        style={{
          width: "110%",
          height: "400px",
          fontSize: "18px",
          backgroundColor: " #494F55",
          color: "white",
        }}
      ></div>
      <p
        style={{
          color: "white",
          textAlign: "center",
          fontSize: "16px",
          marginTop: "10px",
          color: "gray",
        }}
      >
        <span style={{ color: "white" }}>
          <span style={{ color: "#1976D2" }}>&#9679;</span>NFT Turnover&nbsp;
        </span>
        <span style={{ color: "#ACF1DD " }}>&#9679;</span>Single Pool
         Turnover&nbsp;
        <span style={{ color: "#F9E8A0" }}>&#9679;</span>Farming Turnover&nbsp;
        <span style={{ color: "#F5B7B1" }}>&#9679;</span>Vault Turnover
      </p>
    </>
  );
}
export default LineChart;