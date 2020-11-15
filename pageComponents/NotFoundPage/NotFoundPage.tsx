import * as React from "react";
import styled from "styled-components";
import HeadBar from "@@/components/HeadBar";
import FootBar from "@@/components/FootBar";
import { Void } from "@@/components/Illustration";
import classes from "./NotFoundPage.module.css";

interface Props extends React.Attributes {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * Write a description here.
 */
export default function NotFoundPage({ ...props }: Props) {
  return (
    <Root className={classes.root}>
      <HeadBar />

      <div>
        <Void className={classes.illustration} />
      </div>

      <FootBar />
    </Root>
  );
}

const Root = styled.div``;
