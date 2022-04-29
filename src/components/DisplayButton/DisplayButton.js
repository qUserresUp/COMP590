import React, { useState, useEffect, memo } from "react";
import { Button, Modal } from "semantic-ui-react";

export const DisplayButton = ({ state, switchViewOnClick }) => {
  const simulateButtonReturn = () => {
    if (state.manyChartsButton === "blue") {
      return (
        <Button
          basic
          color={state.simulateButton}
          onClick={() => {
            switchViewOnClick(3);
          }}
        >
          Analyze
        </Button>
      );
    }
  };
  if (state.chartButton === "blue" || state.mapButton === "blue") {
    return (
      <div>
        <Button
          basic
          color={state.mapButton}
          onClick={() => switchViewOnClick(-1)}
        >
          Map View
        </Button>
        <Button
          basic
          color={state.chartButton}
          onClick={() => switchViewOnClick(1)}
        >
          Chart View
        </Button>
      </div>
    );
  } else if (
    state.manyChartsButton === "blue" ||
    state.simulateButton === "blue" ||
    state.oneChartButton === "blue"
  ) {
    return (
      <div>
        <Button
          labelPosition="left"
          icon="left chevron"
          content="Back"
          onClick={() => {
            switchViewOnClick(-1);
          }}
        />
        <Button
          basic
          color={state.oneChartButton}
          onClick={() => switchViewOnClick(1)}
        >
          All In One
        </Button>
        <Button
          basic
          color={state.manyChartsButton}
          onClick={() => switchViewOnClick(2)}
        >
          Split Views
        </Button>
        {simulateButtonReturn()}
      </div>
    );
  }
};

export default DisplayButton;
