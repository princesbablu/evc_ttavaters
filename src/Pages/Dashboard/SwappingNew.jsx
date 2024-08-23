import React, { useState, useEffect } from "react";
import * as CanvasJS from "@canvasjs/charts";
import "bootstrap-icons/font/bootstrap-icons.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faCircleDollarToSlot,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import {
  allowanceEvcTokentoEvcRouter,
  allowanceBusdtoEvcRouter,
  setEVCTokenApproveEvcRouter,
  getValueOutEvcToBusd,
  getValueOutBusdToEvc,
  setSwapTokensForStable,
  setBUSDApproveRouter,
  setSwapStableForTokens,
  estimateGasFeeForSwap, estimateGasFeeForSwapBUSDToEVC
} from "../../ContractAction/EVCRouterContractAction";
import { getEVCBalance } from "../../ContractAction/EVCStakeContractAction"
import { getBUSDBalance } from "../../ContractAction/BUSDContractAction"
import howbg from "../../assets/img/regular/howbg.png";
import eth from "../../assets/img/icons/ethbg.png"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';


const styles = {
  mainswap: {
    backgroundColor: "#100f10",
    paddingLeft: "5vw",
    display: "flex",
    height: "600px",
  },
  
  graphChart: {
    backgroundColor: "#151515",
    marginBottom: "40px",
    border: "1px solid #112a21",
    borderRadius: "10px",
  },
  treadHistoryTable: {
    backgroundColor: "#111111",
    border: "1px solid #112a21",
    borderRadius: "10px",
    marginRight:"3vw",
    overflowY: "scroll",
    height: "331px",
  },
  swapSidebar: {
    position: "fixed",
    top: "72px",
    left: 0,
    height: "calc(100vh - 72px)",
    overflowY: "auto",
    width: "248px",
    backgroundColor: "#12121A",
    zIndex: 99,
    msOverflowStyle: "none",
    scrollbarWidth: "none",
    overflow: "-moz-scrollbars-none",
    "&::-webkit-scrollbar": {
      width: "0 !important",
    },
    "@media screen and (max-width: 991px)": {
      transform: "translateX(-248px)",
      transition: "all .25s linear",
    },
  },
  /* Add more styles here */
};


const useStyles = makeStyles({
  tableRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#272729',
    },
    '&:hover': {
      backgroundColor: '#e0e0e0',
    },
  },
});


const SwappingNew = ({ title }) => {




  const [isDetailsVisible, setDetailsVisible] = useState(true);
  const [isMaxReturnActive, setMaxReturnActive] = useState(true);
  const [isLowGasActive, setLowGasActive] = useState(false);
  const [isCryptoActive, setCryptoActive] = useState(true);
  const [isFiatActive, setFiatActive] = useState(false);
  const [activeTime, setActiveTime] = useState("24H");
  const [evcValue, setEvcValue] = useState(0);
  const [usdtValue, setUsdtValue] = useState(0);
  const [gasFee, setGasFee] = useState(0);
  const [allowanceEvcTokentoRouter, setAllowanceEvcTokentoRouter] = useState();
  const [allowanceBusdtoRouter, setAllowanceBusdtoRouter] = useState();
  const [isRefreshClicked, setRefreshClicked] = useState(false);
  const [evcBalance, setEvcBalance] = useState(0);
  const [usdtBalance, setUSDCBalance] = useState(0);
  const [isUSDCAbove, setIsUSDCAbove] = useState(false);

  const toggleDetails = () => {
    setDetailsVisible(!isDetailsVisible);
  };

  const handleMaxReturnClick = () => {
    setMaxReturnActive(true);
    setLowGasActive(false);
  };

  const handleLowGasClick = () => {
    setMaxReturnActive(false);
    setLowGasActive(true);
  };

  const handleCryptoClick = () => {
    setCryptoActive(true);
    setFiatActive(false);
  };

  const handleFiatClick = () => {
    setCryptoActive(false);
    setFiatActive(true);
  };

  const handleTimeClick = (time) => {
    setActiveTime(time);
  };

  const isSwapEnabled = () => {
    return (isUSDCAbove ? usdtValue : evcValue) > 0;
  };

  const refreshUsdtValue = async () => {
    updateUsdtValue(); // Call the existing function to update USDC
  };

  const refreshEvcValue = async () => {
    updateEvcValue(); // Call the existing function to update USDC
  };

  // Attach the refreshUsdtValue function to the "faRepeat" icon
  const handleRefreshClick = () => {
    setRefreshClicked(true);
    if (!isUSDCAbove) {
      refreshUsdtValue(); // Trigger USDC value update
    } else {
      refreshEvcValue();
    }
  };

  const handleEvcBalanceClick = () => {
    setEvcValue(Number(evcBalance).toFixed(6));
    // alert(evcValue)
  };

  const handleBusdBalanceClick = () => {
    setUsdtValue(Number(usdtBalance).toFixed(6));
  };

  const handleArrowClick = () => {
    setIsUSDCAbove(!isUSDCAbove);
  };

  const combinedFunction = () => {
    handleArrowClick(); // Call handleArrowClick
    // Introduce a 10 millisecond delay before calling handleRefreshClick
    setTimeout(() => {
      handleRefreshClick();
    }, 10);
  };

  const updateEvcValue = async () => {
    try {
      // Parse the input value to a float
      const valueInUsdt = parseFloat(usdtValue);
      if (!isNaN(valueInUsdt)) {
        // Call the function to get the TT value
        const evcAmount = await getValueOutBusdToEvc(valueInUsdt);
        if (evcAmount > 0) {  // Use '>= 0' to handle non-negative values
          // Limit the number of decimal places to 6
          const evcValue = parseFloat(evcAmount).toFixed(6);
          setEvcValue(evcValue);
        } else {
          setEvcValue('0');  // Set to empty if the result is negative
        }
      } else {
        setEvcValue('');  // Set to empty if usdtValue is empty or not a number
      }
    } catch (error) {
      console.error('Error updating TT value:', error);
    }
  };

  const updateUsdtValue = async () => {
    try {
      // Parse the input value to a float
      const valueInEvc = parseFloat(evcValue);
      if (!isNaN(valueInEvc)) {
        // Call the function to get the USDC value
        const usdtamount = await getValueOutEvcToBusd(valueInEvc);
        if (usdtamount > 0) {  // Use '>= 0' to handle non-negative values
          // Limit the number of decimal places to 6
          const usdtAmount = parseFloat(usdtamount).toFixed(6);
          setUsdtValue(usdtAmount);
        } else {
          setUsdtValue('0');  // Set to empty if the result is negative
        }
      } else {
        setUsdtValue('');  // Set to empty if evcValue is empty or not a number
      }
    } catch (error) {
      console.error('Error updating USDC value:', error);
    }
  };

  const updateGasForSwapEVCToBUSD = async () => {
    try {
      // Parse the input value to a float
      const valueInEvc = parseFloat(evcValue);
      if (!isNaN(valueInEvc)) {
        // Call the function to get the USDC value
        const gasamount = await estimateGasFeeForSwap(valueInEvc);
        if (gasamount > 0) {  // Use '>= 0' to handle non-negative values
          // Limit the number of decimal places to 6
          const gasAmount = parseFloat(gasamount).toFixed(6);
          setGasFee(gasAmount);
        } else {
          setGasFee('0');  // Set to empty if the result is negative
        }
      } else {
        setGasFee('');  // Set to empty if evcValue is empty or not a number
      }
    } catch (error) {
      console.error('Error updating Gas value for Swap TRND-BUSD:', error);
    }
  };

  const updateGasForSwapBUSDToEVC = async () => {
    try {
      // Parse the input value to a float
      const valueInBusd = parseFloat(usdtValue);
      if (!isNaN(valueInBusd)) {
        // Call the function to get the USDC value
        const gasamount = await estimateGasFeeForSwapBUSDToEVC(valueInBusd);
        if (gasamount > 0) {  // Use '>= 0' to handle non-negative values
          // Limit the number of decimal places to 6
          const gasAmount = parseFloat(gasamount).toFixed(6);
          setGasFee(gasAmount);
        } else {
          setGasFee('0');  // Set to empty if the result is negative
        }
      } else {
        setGasFee('');  // Set to empty if evcValue is empty or not a number
      }
    } catch (error) {
      console.error('Error updating Gas value for Swap BUSD-TRND:', error);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      const allowanceEvcTokenRouter = await allowanceEvcTokentoEvcRouter();
      setAllowanceEvcTokentoRouter(allowanceEvcTokenRouter);
      const allowanceBusdRouter = await allowanceBusdtoEvcRouter();
      setAllowanceBusdtoRouter(allowanceBusdRouter);

      const evcBalanceInfo = await getEVCBalance();
      setEvcBalance(evcBalanceInfo);

      const usdtBalanceInfo = await getBUSDBalance();
      setUSDCBalance(usdtBalanceInfo);

      if (!isUSDCAbove) {
        updateUsdtValue();
        updateGasForSwapEVCToBUSD();
      } else {
        updateGasForSwapBUSDToEVC();
      }

      if (isUSDCAbove) {
        updateEvcValue();
      }

    };

    fetchData();
  }, [isUSDCAbove, evcValue, usdtValue]);



  useEffect(() => {
    document.title = title ? title : "TT Avatars | Swap";

    document.querySelector(".page-title").innerText = "Swap";
  }, []);




  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Sample data (replace it with your actual data)
  const rows = [
    { date: '07/02/2023', type: 'Sell', maker: '0x3835..dd5b', from: '527.45', to: '527.45', price: '$0.123' },
    // Add more rows here as needed
  ];
  return (
<div style={{ background: "#201f24", height: "100%", width: "100%",marginTop:"0px"}}>
    <div className="row align-item-center justify-content-center " style={{marginTop: "100px",marginLeft:"270px",marginRight:"10px"}}>

<div className="my-5 d-flex align-item-center justify-content-center"style={{height:"552px",width:"426px",borderRadius:"8px",backgroundColor:"#1D2A2A"}}>
<div className="row" style={{background: "linear-gradient(180deg, rgba(217, 217, 217, 0.25) 0%, rgba(217, 217, 217, 0.25) 100%),linear-gradient(0deg, rgba(9, 27, 25, 0.3), rgba(9, 27, 25, 0.3))" ,width:"400px",height:"73px",borderRadius:"8px",margin:"10px"}}>
  <input type="number" placeholder="0.00" style={{background:"transparent",color:"#F1F1F1",fontSize:"41px",fontWeight:"700"}}/>
  <div className="row">
    <img src={eth} style={{height:"24px",width:"24px"}}/>
    <div>ETH</div>
  </div>
</div>
</div>
<div className="col-xl-12 col-xxxl-12 col-sm-12 col-md-12">
<TableContainer component={Paper} style={{borderRadius:"0px",margin:"0px"}}>
      <Table style={{borderRadius:"0px"}}>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Maker</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow key={index} className={classes.tableRow}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.maker}</TableCell>
                <TableCell>{row.from}</TableCell>
                <TableCell>{row.to}</TableCell>
                <TableCell>{row.price}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>

    </div>

    </div>
    </div>
  )
}


export default SwappingNew