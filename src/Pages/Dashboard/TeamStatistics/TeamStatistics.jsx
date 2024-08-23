
import React, { useState, useEffect } from "react";
import BasicTable from "./PartnerActivityTable";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { getCurrentUserTeamSaleAndPartners, getTeamStatisticOfAddressResponse } from "../../../ContractAction/EVCNFTContractAction";
import { URLDOMAIN } from "../../../ContractAction/ContractDependency";
import AreaChartGraph from "./AreaChartGraph";
import ApexCharts from 'apexcharts';
import { useTranslation } from "react-i18next";
import { getNetworkExplorerUrl } from "../../../ContractAction/BUSDContractAction";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


//dev: Second Table
function createData1(
  wallet,
  rank,
  TotalPartner,
  ownNft,
  totalWeeklyTurnover,
  TotalNftTeamTurnOver
) {
  return {
    wallet,
    rank,
    TotalPartner,
    ownNft,
    totalWeeklyTurnover,
    TotalNftTeamTurnOver,
  };
}


function TeamStatistics({ title }) {

  const userAddress = localStorage.getItem("connectedAccount")
  // const userAddress = "0x6fa247a35348e8df42ffeed1699de0f8c1cbebbc"

  const [value, setValue] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [GraphData, setGraphData] = useState()
  const [data, setData] = useState([]);
  const [teamDetails, setTeamDetails] = useState()
  const [startDate, setstartDate] = useState("")
  const [endtDate, setendDate] = useState("")
  console.log("teamDetails", teamDetails)
  console.log("endtDate", endtDate)
  const { t } = useTranslation();
  const [selection, setSelection] = useState('all');

  console.log({ data })
  useEffect(() => {
    const fetchData = async () => {

      const teamStatisticData = await getTeamStatisticOfAddressResponse(userAddress);
      setData(teamStatisticData);
      console.log("teamStatisticData", teamStatisticData)

    };
    fetchData();
  }, [userAddress]);
  useEffect(() => {
    const fetchUserTeamsTotalData = async () => {
      const TeamDetails = await getCurrentUserTeamSaleAndPartners();
      // const data = await TeamDetails.json();
      console.log("fetchUserTeamsTotalData", TeamDetails)
      setTeamDetails(TeamDetails)

    };
    fetchUserTeamsTotalData();
  }, []);

  useEffect(() => {
    fetch(`${URLDOMAIN}api/partneractivity/getusergraphtokenoneyear/${userAddress}?useraddress=${userAddress}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status == true) {
          setGraphData(data?.GraphData);
          const dates = data?.GraphData.map((item) => new Date(item[0]).getTime());
          const firstDate = new Date(Math.min(...dates));
          const lastDate = new Date(Math.max(...dates));
          const options = { year: 'numeric', month: 'short', day: 'numeric' };
          const formattedfirstDate = new Date(firstDate).toLocaleDateString('en-US', options);
          const formattedlastDate = new Date(lastDate).toLocaleDateString('en-US', options);
          setstartDate(formattedfirstDate)
          setendDate(formattedlastDate)
          ApexCharts.exec('tokenChart', 'zoomX', firstDate.getTime(), lastDate.getTime());
        }
      })
      .catch((err) => {
        console.log('error', err);
      });
  }, [])

  useEffect(() => {
    document.title = title ? title : "TRND Avatars | Team Statistics";
    document.querySelector(".page-title").innerText = "Team Statistics";
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const updateData = (timeline) => {
    setSelection(timeline);
    switch (timeline) {
      case 'one_day':
        fetch(`${URLDOMAIN}api/partneractivity/getusergraphtoken/${userAddress}?useraddress=${userAddress}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.status == true) {
              setData(data?.GraphData);
              const dates = data?.GraphData.map((item) => new Date(item[0]).getTime());
              const firstDate = new Date(Math.min(...dates));
              const lastDate = new Date(Math.max(...dates));

              const options = { year: 'numeric', month: 'short', day: 'numeric' };
              const formattedfirstDate = new Date(firstDate).toLocaleDateString('en-US', options);
              const formattedlastDate = new Date(lastDate).toLocaleDateString('en-US', options);
              setstartDate(formattedfirstDate)
              setendDate(formattedlastDate)
              ApexCharts.exec('tokenChart', 'zoomX', firstDate.getTime(), lastDate.getTime());

            }
          })
          .catch((err) => {
            console.log('error', err);
          });
        break;
      case 'one_week':
        fetch(`${URLDOMAIN}api/partneractivity/getusergraphtokenweekly/${userAddress}?useraddress=${userAddress}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.status == true) {
              setData(data?.GraphData);
              const dates = data?.GraphData.map((item) => new Date(item[0]).getTime());
              const firstDate = new Date(Math.min(...dates));
              const lastDate = new Date(Math.max(...dates));
              const options = { year: 'numeric', month: 'short', day: 'numeric' };
              const formattedfirstDate = new Date(firstDate).toLocaleDateString('en-US', options);
              const formattedlastDate = new Date(lastDate).toLocaleDateString('en-US', options);
              setstartDate(formattedfirstDate)
              setendDate(formattedlastDate)
              ApexCharts.exec('tokenChart', 'zoomX', firstDate.getTime(), lastDate.getTime());
            }
          })
          .catch((err) => {
            console.log('error', err);
          });
        break;
      case 'one_month':
        fetch(`${URLDOMAIN}api/partneractivity/getusergraphtokenmonthly/${userAddress}?useraddress=${userAddress}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.status == true) {
              setData(data?.GraphData);
              const dates = data?.GraphData.map((item) => new Date(item[0]).getTime());
              const firstDate = new Date(Math.min(...dates));
              const lastDate = new Date(Math.max(...dates));
              const options = { year: 'numeric', month: 'short', day: 'numeric' };
              const formattedfirstDate = new Date(firstDate).toLocaleDateString('en-US', options);
              const formattedlastDate = new Date(lastDate).toLocaleDateString('en-US', options);
              setstartDate(formattedfirstDate)
              setendDate(formattedlastDate)
              ApexCharts.exec('tokenChart', 'zoomX', firstDate.getTime(), lastDate.getTime());
            }
          })
          .catch((err) => {
            console.log('error', err);
          });
        break;
      case 'six_month':
        fetch(`${URLDOMAIN}api/partneractivity/getusergraphtokensixmonths/${userAddress}?useraddress=${userAddress}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.status == true) {
              setData(data?.GraphData);
              const dates = data?.GraphData.map((item) => new Date(item[0]).getTime());
              const firstDate = new Date(Math.min(...dates));
              const lastDate = new Date(Math.max(...dates));
              const options = { year: 'numeric', month: 'short', day: 'numeric' };
              const formattedfirstDate = new Date(firstDate).toLocaleDateString('en-US', options);
              const formattedlastDate = new Date(lastDate).toLocaleDateString('en-US', options);
              setstartDate(formattedfirstDate)
              setendDate(formattedlastDate)
              ApexCharts.exec('tokenChart', 'zoomX', firstDate.getTime(), lastDate.getTime());
            }
          })
          .catch((err) => {
            console.log('error', err);
          });
        break;
      case 'all':
        fetch(`${URLDOMAIN}api/partneractivity/getusergraphtokenoneyear/${userAddress}?useraddress=${userAddress}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.status == true) {
              setData(data?.GraphData);
              const dates = data?.GraphData.map((item) => new Date(item[0]).getTime());
              const firstDate = new Date(Math.min(...dates));
              const lastDate = new Date(Math.max(...dates));

              const options = { year: 'numeric', month: 'short', day: 'numeric' };
              const formattedfirstDate = new Date(firstDate).toLocaleDateString('en-US', options);
              const formattedlastDate = new Date(lastDate).toLocaleDateString('en-US', options);
              setstartDate(formattedfirstDate)
              setendDate(formattedlastDate)
              ApexCharts.exec('tokenChart', 'zoomX', firstDate.getTime(), lastDate.getTime());
            }
          })
          .catch((err) => {
            console.log('error', err);
          });
        break;
      default:
    }
  }
  return (
    <div className="dashboard-wrap " style={{ background: "#201f24" }}>
      <div className="dash-content-area">
        <div className="d-flex justify-content-between mb-2 pb-1" >
          <h6 className="team-statics-text mb-0">{t("Total Team turnover")} - {teamDetails?.teamSale} USDC</h6>
          <h6 className="team-statics-text mb-0 ">{t("Total Team Member")} -
            <span className="ms-1 me-1">
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.34375 9.2835C5.34375 9.8515 4.68642 10.1482 4.26175 9.8055L4.20575 9.75483L0.205749 5.75483C0.0909641 5.64004 0.0220111 5.4873 0.0118234 5.32528C0.00163583 5.16327 0.0509146 5.0031 0.150415 4.87483L0.205749 4.81216L4.20575 0.812164L4.26842 0.756831L4.31975 0.720831L4.38375 0.684831L4.40775 0.673497L4.45242 0.655498L4.52442 0.634164L4.55975 0.627497L4.59975 0.620831L4.63775 0.618164L4.71642 0.618164L4.75508 0.621497L4.79508 0.627497L4.82975 0.634164L4.90175 0.655498L4.94642 0.673498L5.03442 0.720164L5.09442 0.763497L5.14842 0.812164L5.20375 0.874831L5.23975 0.926164L5.27575 0.990164L5.28708 1.01416L5.30508 1.05883L5.32642 1.13083L5.33308 1.16616L5.33975 1.20616L5.34242 1.24416L5.34375 9.2835Z" fill="currentColor" />
              </svg>
            </span>
            {teamDetails?.totalPartners}
            <span className="ms-1">
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.34375 9.2835C0.34375 9.8515 1.00108 10.1482 1.42575 9.8055L1.48175 9.75483L5.48175 5.75483C5.59654 5.64004 5.66549 5.4873 5.67568 5.32528C5.68586 5.16327 5.63659 5.0031 5.53708 4.87483L5.48175 4.81216L1.48175 0.812164L1.41908 0.756831L1.36775 0.720831L1.30375 0.684831L1.27975 0.673497L1.23508 0.655498L1.16308 0.634164L1.12775 0.627497L1.08775 0.620831L1.04975 0.618164L0.971083 0.618164L0.932417 0.621497L0.892417 0.627497L0.85775 0.634164L0.78575 0.655498L0.741083 0.673498L0.653083 0.720164L0.593083 0.763497L0.539084 0.812164L0.48375 0.874831L0.44775 0.926164L0.41175 0.990164L0.400417 1.01416L0.382416 1.05883L0.361083 1.13083L0.354417 1.16616L0.34775 1.20616L0.345083 1.24416L0.34375 9.2835Z" fill="currentColor" />
              </svg>

            </span>
          </h6>
        </div>
        {/* End First table */}
        <Card sx={{ background: '#0b2224', border: "0px solid", borderRadius: "8px" }}>

          <CardContent sx={{ color: "white" }} className="d-flex justify-content-between">
            <Typography>
              {t("Team Turnover")}
            </Typography>
            <Typography>
              <div className="d-flex align-items-center">
                <div className="chart-btn-group">
                  <button onClick={() => updateData('one_day')} className={`chart-btn ${selection === 'one_day' ? 'active' : ''}`}> 24H </button>
                  <button onClick={() => updateData('one_week')} className={`chart-btn ${selection === 'one_week' ? 'active' : ''}`}> 7D </button>
                  <button onClick={() => updateData('one_month')} className={`chart-btn ${selection === 'one_month' ? 'active' : ''}`}> 1M </button>
                  <button onClick={() => updateData('six_month')} className={`chart-btn ${selection === 'six_month' ? 'active' : ''}`}> 6M </button>
                  <button onClick={() => updateData('all')} className={`chart-btn ${selection === 'all' ? 'active' : ''}`}> All </button>
                </div>
              </div>
            </Typography>
          </CardContent>
          <Box >

            {/*dev: Render the Linechart component (NFT Turnover Graph)  */}
            <div
              id="chart"
              style={{ padding: "0px", margin: "0px" }}
            >
              <AreaChartGraph
                Data={GraphData}
                setData={setGraphData}
                userAddress={userAddress}
                startDate={startDate}
                setstartDate={setstartDate}
                endtDate={endtDate}
                setendDate={setendDate}
              />
            </div>
          </Box>
        </Card>

        <BasicTable
          userAddress={userAddress}
          data={data}
          setData={setData}
        />

      </div>
    </div>
  );
}

export default TeamStatistics;