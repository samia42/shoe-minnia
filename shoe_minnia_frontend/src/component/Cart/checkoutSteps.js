import {
  AccountBalance,
  LibraryAddCheck,
  LocalShippingOutlined,
} from "@mui/icons-material";
import { Typography, Stepper, StepLabel, Step } from "@mui/material";
import React from "react";
import { Fragment } from "react";
import "./checkoutStep.css";

function CheckoutSteps({ activeStep }) {
  const steps = [
    {
      label: <Typography>Shipping Detail</Typography>,
      icon: <LocalShippingOutlined></LocalShippingOutlined>,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheck />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalance />,
    },
  ];
  const stepStyle = {
    boxSizing: "border-box",
  };
  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyle}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "gray" : "#bb84e8",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
}

export default CheckoutSteps;
