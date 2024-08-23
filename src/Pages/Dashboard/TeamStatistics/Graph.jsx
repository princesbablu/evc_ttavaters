import * as React from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  Tooltip,
  DataLabel,
  AreaSeries,
} from "@syncfusion/ej2-react-charts";
//Notification for @syncfusion
import { registerLicense } from "@syncfusion/ej2-base";
registerLicense(
  "Mgo+DSMBaFt+QHFqUUdrWU5GcEBAXWFKblV8QGVTfl1gBShNYlxTR3ZbQFtjTn9SdUVrXn9W;Mgo+DSMBPh8sVXJ1S0d+WFBPc0BAW3xLflF1VWVTelh6dVZWESFaRnZdQV1nS3hTcURiWn9WeXZS;ORg4AjUWIQA/Gnt2VFhhQlVFfVpdX2VWfFN0RnNfdVt2flRFcC0sT3RfQF5jTXxVdkJiWHxeeXVXTg==;MTg0NjA1N0AzMjMxMmUzMTJlMzQzMW93NnN2WENHNVlVczZYKzRFSXhSYk1qMzNCNTZhODJKeTg0ZXRCTDFYMGs9;MTg0NjA1OEAzMjMxMmUzMTJlMzQzMWs0NWtweXZpNnJXaUNjMURHQURxaHFUcGd3ZGU0Qmp3dGxkM2lyZjU2QU09;NRAiBiAaIQQuGjN/V0d+XU9Ad1RHQmFPYVF2R2BJeVR1cl9HY0wgOX1dQl9gSXpRcEVkWH5dcXRTT2E=;MTg0NjA2MEAzMjMxMmUzMTJlMzQzMWo5TGRRdHdlSWZaK2FtOGZHSm1FTEY0NmpVTElqRjFOVFdZbHRKdjd4L2c9;MTg0NjA2MUAzMjMxMmUzMTJlMzQzMVFCa0U3ek8rcS9QV1NkMEtHR3hYNEk2b0tVTnk3dG9GamtpWldjeVkwZVE9;Mgo+DSMBMAY9C3t2VFhhQlVFfVpdX2VWfFN0RnNfdVt2flRFcC0sT3RfQF5jTXxVdkJiWHxfcXdTRw==;MTg0NjA2M0AzMjMxMmUzMTJlMzQzMWdRY2pUd25ZN2ZyN0pPZmx0SDBaQWVCNCtjQy9jZHBITjhNL3NFdER4OVU9;MTg0NjA2NEAzMjMxMmUzMTJlMzQzMVY0bHRvKzcyWk1qSFFxWmdxajZscThlcmpGa0IyRktmY3cvTlFsdXF4bFk9;MTg0NjA2NUAzMjMxMmUzMTJlMzQzMWo5TGRRdHdlSWZaK2FtOGZHSm1FTEY0NmpVTElqRjFOVFdZbHRKdjd4L2c9"
);
function Graph() {
  const data = [
    { x: 14, y: 4400 },
    { x: 15, y: 4000 },
    { x: 16, y: 4400 },
    { x: 17, y: 3500 },
    { x: 18, y: 4400 },
    { x: 19, y: 2500 },
  ];
  const marker = {
    visible: true,
    height: 10,
    fill: "#328ce3",
    background: "#328ce3",
    color: "#ffffff",
    width: 10,
    dataLabel: { visible: true, position: "Top" },
  };

  const primaryxAxis = {
    minimum: 14,
    maximum: 18,
    interval: 1,
    edgeLabelPlacement: "Shift",
    majorGridLines: { width: 0 },
  };
  const primaryyAxis = {
    minimum: 0,
    maximum: 5000,
    interval: 1000,
  };
  return (
    <ChartComponent
      style={{ backgroundColor: "#101018" }}
      id="charts"
      primaryXAxis={primaryxAxis}
      primaryYAxis={primaryyAxis}
    >
      <Inject services={[AreaSeries, Legend, Tooltip, DataLabel, Category]} />
      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={data}
          xName="x"
          marker={marker}
          yName="y"
          name="NFT Turnover"
          fill="#acd5ff"
          opacity={0.6}
          type="Area"
        ></SeriesDirective>
      </SeriesCollectionDirective>
    </ChartComponent>
  );
}
export default Graph;