import { action } from "@storybook/addon-actions";
import * as React from "react";
import Card from "./Card";
import styled from "styled-components";
import { MOBILE_MEDIA } from "../../constants/mediaquery";

export default {
  title: "Card",
  component: Card
};

export const example = () => (
  <Card onClick={action("clicked")} style={{ height: "200px", width: "400px" }}>
    200 * 400
  </Card>
);

export const WithContent = () => (
  <CardWithContent onClick={action("clicked")}>
    <h3>nibh tortor id</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </p>
  </CardWithContent>
);
export const InGrid = () => (
  <Layout>
    <Card onClick={action("clicked")}>
      <h3>nibh tortor id</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </Card>
    <Card onClick={action("clicked")}>
      <h3>nibh tortor id</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </Card>
    <Card onClick={action("clicked")}>
      <h3>nibh tortor id</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </Card>
    <Card onClick={action("clicked")}>
      <h3>nibh tortor id</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </Card>
    <Card onClick={action("clicked")}>
      <h3>nibh tortor id</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </Card>
    <Card onClick={action("clicked")}>
      <h3>nibh tortor id</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </Card>
  </Layout>
);

const CardWithContent = styled(Card)`
  padding: 16px;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 400px 400px;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 16px;

  & h3,
  & p {
    margin: 16px;
  }

  ${MOBILE_MEDIA} {
    grid-template-columns: 100%;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  }
`;
