import * as React from "react";
import LogRepositoryStub from "../../testUtilities/LogRepositoryStub";
import FootBar from "./FootBar";

export default {
  title: "FootBar",
  component: FootBar,
};

export const example = () => (
  <LogRepositoryStub>
    <FootBar />
  </LogRepositoryStub>
);
