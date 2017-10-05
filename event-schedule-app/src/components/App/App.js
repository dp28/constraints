import React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { TimelineContainer } from "../Timeline/TimelineContainer";
import { NewEventButtonContainer } from "../NewEventButton/NewEventButtonContainer";
import "../../styles.css";

const style = {
  height: "100%"
};

export const App = () => (
  <div className="App" style={style}>
    <Grid style={{ height: "100%" }}>
      <Row style={{ height: "100%" }}>
        <Col xs={12} sm={8}>
          <NewEventButtonContainer />
          <TimelineContainer numberOfUnits={24 * 4} startInUnits={0} />
        </Col>
      </Row>
    </Grid>
  </div>
);
