import Link from "next/link";
import * as React from "react";
import styled from "styled-components";
import { MOBILE_MEDIA } from "@@/constants/mediaquery";

interface Props extends React.Attributes {
  onContactClick?: (e: React.SyntheticEvent, objectId: string) => void;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function FootBar({
  onContactClick = () => {},
  children,
  ...props
}: Props) {
  return (
    <Root {...props}>
      <div>© 2020 Agnosticful</div>

      <Links>
        <Link href="/privacy_policy">
          <a>Privacy Policy</a>
        </Link>

        <a
          href="mailto:yo+chipstackoverflow@kohei.dev"
          onClick={(e) => onContactClick(e, "foot_bar_contact")}
        >
          Contact
        </a>
      </Links>
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 64px 128px;
  background-color: #0f151c;
  color: #fff;

  ${MOBILE_MEDIA} {
    padding: 32px 16px;
    font-size: 14px;
  }
`;

const Links = styled.div`
  display: flex;

  & > a {
    margin-left: 32px;
    color: #f53333;
    text-decoration: none;

    :first-of-type {
      margin-left: 0;
    }

    :hover {
      text-decoration: underline;
    }

    ${MOBILE_MEDIA} {
      margin-left: 16px;
    }
  }
`;
