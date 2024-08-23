import React, { useEffect, useState } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import evcLogo from "../../assets/img/dashboard/icons/evc-logo.png";
import evcLogoLg from "../../assets/img/dashboard/icons/evc-logo-lg.png";
import Swapping from "./Charts/BuyBurnChart";
import { getBurnEVCBalance } from "../../ContractAction/EVCStakeContractAction";
import { getamountsoutEVCToBUSD } from "../../ContractAction/EVCNFTStakeContractAction";
import { Line } from "react-chartjs-2";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel'
import dashCardIcon1 from "../../assets/img/dashboard/icons/dash-card-icon-1.svg";
// import SwapComponent from "./SwapComponent";


const BuyBurn = ({ title }) => {
  //dev: get the Address for Local Storage
  const [burnAmount, setBurnAmount] = useState(0);
  const [burnAmountInBusd, setBurnAmountInBusd] = useState(0);

  useEffect(() => {
    document.title = title ? title : "TT Avatars | Buy & Burn";
    document.querySelector(".page-title").innerText = "Buy & Burn";
    const burnInfo = async () => {
      const burnValue = await getBurnEVCBalance();
      const burnValueInBusd = await getamountsoutEVCToBUSD(burnValue.toString());
      setBurnAmount(burnValue);
      setBurnAmountInBusd(burnValueInBusd);
    };
    burnInfo();
  }, []);


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Set the number of rows per page

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <div style={{ background: "#201f24" }}>
      <div className="dashboard-wrap" >
        <div className="mt-3" style={{ backgroundColor: 'linear-gradient(to right, rgba(2, 219, 91, 0.1), rgba(73, 119, 193, 0.05))', paddingLeft: '10px', paddingRight: "10px" }}>
          <Swapping />
          {/* <SwapComponent /> */}
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4" >
              {/* <div className="dash-content-area"> */}
              <div className="dash-global-wrap">
                <p className="fw-semibold mb-2">Buy & Burn process</p>
                <p style={{ color: "rgb(155, 151, 151)"}}>
                  Buy & Burn reduces the overall supply of TRND and increases the
                  price of remaining TRND, creating a deflationary system helps to
                  drive up the value of TRND token over time
                </p>
              </div>
              {/* </div> */}

            <div className=" font-gilroy my-2 d-flex gap-1 align-items-center">
                <img src={dashCardIcon1} alt="" className="img-fluid" />{" "}
                <span className="fs-10 ">TT Token</span>
              </div>
              <div className="dash-global-wrap">
                <p className="text-muted mb-2 text-md">TT Burned</p>
                <div>
                  <span className="fw-semibold font-gilroy">{burnAmount.toLocaleString()}</span>
                  <span className="text-md text-muted ms-1">~{burnAmountInBusd.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <TableContainer className="border-top" style={{ borderRadius: "8px" }}>
                <TableSortLabel style={{ background: "#212d2d", width: "100%", fontSize: "18px", padding: "10px 0px 0px 10px", }} disabled>Transaction history</TableSortLabel>
                <Table >
                  <TableHead style={{ background: "#212d2d" }}>
                    <TableRow className="text-uppercase">
                      <TableCell style={{ color:"rgb(155, 151, 151)" }}>Date</TableCell>
                      <TableCell style={{ color: "rgb(155, 151, 151)" }}>TxID</TableCell>
                      <TableCell style={{ color: "rgb(155, 151, 151)" }}>Amount</TableCell>
                      <TableCell style={{ color: "rgb(155, 151, 151)" }}>Token</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell style={{ color: "rgb(155, 151, 151)"}}>07/02/2023 10:30</TableCell>
                      <TableCell style={{ color: "rgb(155, 151, 151)"}}>572.45</TableCell>
                      <TableCell style={{ color: "rgb(155, 151, 151)"}}>572.45</TableCell>
                      <TableCell style={{ color: "rgb(155, 151, 151)"}}>07/02/2023 10:30</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={100}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={{ color: "rgb(155, 151, 151)"}}
                />
              </TableContainer>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyBurn;




// <tbody style={{ backgroundColor: "linear-gradient(180deg, rgba(217, 217, 217, 0.25) 0%, rgba(217, 217, 217, 0.25) 100%),linear-gradient(0deg, rgba(32, 31, 36, 0.7), rgba(32, 31, 36, 0.7))" }}>
// <tr>
//   <td>07/02/2023 10:30</td>
//   <td style={{ color: "background: linear-gradient(149.3deg, #02DB5B -29.94%, #4977C1 135.03%)" }}>
//     <a href="#" >0x3835..dd5b </a>
//   </td>
//   <td>572.45</td>
//   <td>
//     <div className="d-flex align-items-center">
//       <img src={evcLogo} alt="" className="img-fluid me-2" />
//       <span className="text-md">TT</span>
//     </div>
//   </td>
// </tr>
// <tr>
//   <td>07/02/2023 10:30</td>
//   <td>
//     <a href="#" style={{ color: "linear-gradient(149.3deg, #02DB5B -29.94%, #4977C1 135.03%)" }}>0x3835..dd5b</a>
//   </td>
//   <td>572.45</td>
//   <td>
//     <div className="d-flex align-items-center">
//       <img src={evcLogo} alt="" className="img-fluid me-2" />
//       <span className="text-md">TT</span>
//     </div>
//   </td>
// </tr>
// <tr>
//   <td>07/02/2023 10:30</td>
//   <td>
//     <a href="#" style={{ color: "background: linear-gradient(149.3deg, #02DB5B -29.94%, #4977C1 135.03%)" }}>0x3835..dd5b</a>
//   </td>
//   <td>572.45</td>
//   <td>
//     <div className="d-flex align-items-center">
//       <img src={evcLogo} alt="" className="img-fluid me-2" />
//       <span className="text-md">TT</span>
//     </div>
//   </td>
// </tr>
// <tr>
//   <td>07/02/2023 10:30</td>
//   <td>
//     <a href="#" style={{ color: "background: linear-gradient(149.3deg, #02DB5B -29.94%, #4977C1 135.03%)" }}>0x3835..dd5b</a>
//   </td>
//   <td>572.45</td>
//   <td>
//     <div className="d-flex align-items-center">
//       <img src={evcLogo} alt="" className="img-fluid me-2" />
//       <span className="text-md">TT</span>
//     </div>
//   </td>
// </tr>
// </tbody> 