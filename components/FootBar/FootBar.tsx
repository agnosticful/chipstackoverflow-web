import Link from "next/link";
import * as React from "react";
import styled from "styled-components";
import { MOBILE_MEDIA } from "../../constants/mediaquery";
import useRepository from "../../hooks/useRepository";

interface Props extends React.Attributes {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function FootBar({ children, ...props }: Props) {
  const { logEvent } = useRepository();
  const onContactClick = React.useCallback(() => logEvent("contact_click"), []);

  return (
    <Root {...props}>
      <div>© 2020 Agnosticful</div>

      <Links>
        <Link href="/privacy_policy">
          <a>Privacy Policy</a>
        </Link>

        <a
          href="mailto:yo+chipstackoverflow@kohei.dev"
          onClick={onContactClick}
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
