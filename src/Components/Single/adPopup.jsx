import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  dialogPaper: {
    borderRadius: "20px",
    backgroundColor: "rgba(32, 31, 36, 1) !important",
    minHeight: "400px !important",
    minWidth: "600px !important",
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  img: {
    maxWidth: "100%",
  },
  actions: {
    display: "flex",
    justifyContent: "center !important",
    padding: "10px",
  },
  buttonBox: {
    padding: "10px 20px",
    borderRadius: "8px",
    width: "100%",
    background:
      "linear-gradient(149.3deg, rgb(2, 219, 91) -29.94%, rgb(73, 119, 193) 135.03%) !important",
    color: "rgba(249, 247, 247, 1) !important",
    "&:hover": {
      background:
        "linear-gradient(149.3deg, rgb(2, 219, 91) -29.94%, rgb(73, 119, 193) 135.03%) !important",
      color: "rgba(249, 247, 247, 1) !important",
    },
  },
  disabledButton: {
    padding: "10px 20px",
    borderRadius: "8px",
    width: "100%",
    background:
      "linear-gradient(149.3deg, rgb(2, 219, 91) -29.94%, rgb(73, 119, 193) 135.03%) !important",
    color: "rgba(249, 247, 247, 1) !important",
    "&:hover": {
      background:
        "linear-gradient(149.3deg, rgb(2, 219, 91) -29.94%, rgb(73, 119, 193) 135.03%) !important",
      color: "rgba(249, 247, 247, 1) !important",
    },
  },
});

function AdPopup({ ads, onClose }) {
  const classes = useStyles();
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [timer, setTimer] = useState(9);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setButtonEnabled(false);
    setTimer(9);

    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 1) {
          return prevTimer - 1;
        } else {
          clearInterval(countdown);
          setButtonEnabled(true);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [currentAdIndex]);

  const handleNextAd = () => {
    if (currentAdIndex < ads.length - 1) {
      setCurrentAdIndex(currentAdIndex + 1);
    } else {
      onClose();
    }
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={true}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogContent className={classes.content}>
          <iframe
            src={ads[currentAdIndex]}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            title="Ads"
            className={classes.img}
          />

          {console.log("ads[currentAdIndex]", ads[currentAdIndex])}
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button
            className={
              buttonEnabled ? classes.buttonBox : classes.disabledButton
            }
            onClick={handleNextAd}
            disabled={!buttonEnabled}
          >
            {buttonEnabled ? "Next Ad" : `Next Ad (${timer})`}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdPopup;
