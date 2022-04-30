import React from "react";
import { Segment, Dropdown, Form } from "semantic-ui-react";
import { returnOption } from "../../utils/countyViewUtil";
export const SimulateOption = ({
  state,
  selectShiftDays,
  selectMovingAverageDays,
  selectMedianFilterDays,
}) => {
  if (state.manyChartsButton && state.simulateButton) {
    // When the analyze button is clicked, display the header information of the menu
    // The method is implemented by the parent component
    return (
      <div>
        <Segment>
          <Form>
            <Form.Group widths="equal">
              <Form.Field
                control={Dropdown}
                label="Shift Days"
                search
                selection
                value={state.shiftDays}
                options={returnOption(10)}
                placeholder="Shift Days"
                onChange={selectShiftDays}
              />
              <Form.Field
                control={Dropdown}
                label="Moving Average Days"
                value={state.movingAverageDays}
                search
                selection
                options={returnOption(30)}
                placeholder="Moving Average Days"
                onChange={selectMovingAverageDays}
              />
              <Form.Field
                control={Dropdown}
                label="Median Filters Days"
                value={state.medianFiltersDays}
                search
                selection
                options={returnOption(30)}
                placeholder="Median Filters"
                onChange={selectMedianFilterDays}
              />
            </Form.Group>
          </Form>
        </Segment>
      </div>
    );
  } else {
    return null;
  }
};

export default SimulateOption;
