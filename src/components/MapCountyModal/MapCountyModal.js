import React, { useState, useEffect, memo } from "react";
import { Button, Modal } from "semantic-ui-react";

export const MapCountyModal = ({
  setCountyMapModal,
  state,
  countyMapChartView,
}) => {
  console.log("state: ", state);

  if (state.errorMessageOpen) {
    return (
      <Modal
        onClose={() => setCountyMapModal(false)}
        onOpen={() => setCountyMapModal(true)}
        open={state.countyMapModalOpen}
      >
        <Modal.Header>{"County data is not available"}</Modal.Header>

        <Modal.Content>
          {"Sorry, the county data will be available soon"}
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Close"
            labelPosition="right"
            icon="checkmark"
            onClick={() => setCountyMapModal(false)}
            positive
          />
        </Modal.Actions>
      </Modal>
    );
  }
  return (
    <Modal
      onClose={() => setCountyMapModal(false)}
      onOpen={() => setCountyMapModal(true)}
      open={state.countyMapModalOpen}
      size={"large"}
    >
      <Modal.Header>{state.selectCountyName}</Modal.Header>

      <Modal.Content>
        {countyMapChartView(state.selectCountyName.split(",")[0])}
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setCountyMapModal(false)}>
          Suggestions
        </Button>
        <Button
          content="Yep, that's great"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setCountyMapModal(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default MapCountyModal;
