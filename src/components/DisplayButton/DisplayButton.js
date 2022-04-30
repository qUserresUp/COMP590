import React from "react";
import { Button } from "semantic-ui-react";

export const DisplayButton = ({ state, switchViewOnClick }) => {
  // Display the corresponding buttons according to the different states of the header
  const simulateButtonReturn = () => {
    if (state.manyChartsButton) {
      return (
        <Button
          basic
          color={state.simulateButton ? 'blue' : ''}
          onClick={() => {
            switchViewOnClick(3);
          }}
        >
          Analyze
        </Button>
      );
    }
  };
  if (state.chartButton || state.mapButton) {
    return (
      <div>
        <Button
          basic
          color={state.mapButton ? 'blue' : ''}
          onClick={() => switchViewOnClick(-1)}
        >
          Map View
        </Button>
        <Button
          basic
          color={state.chartButton ? 'blue' : ''}
          onClick={() => switchViewOnClick(1)}
        >
          Chart View
        </Button>
      </div>
    );
  } else if (
    state.manyChartsButton || state.simulateButton || state.oneChartButton
  ) {
    return (
      <div>
        <Button
          labelPosition="left"
          icon="left chevron"
          content="Back"
          onClick={() => {
            switchViewOnClick(0);
          }}
        />
        <Button
          basic
          color={state.oneChartButton ? 'blue' : ''}
          onClick={() => switchViewOnClick(1)}
        >
          All In One
        </Button>
        <Button
          basic
          color={state.manyChartsButton ? 'blue' : ''}
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
