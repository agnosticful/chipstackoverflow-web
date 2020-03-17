import Link from "next/link";
import * as React from "react";
import styled from "styled-components";
import FootBar from "../../components/FootBar";
import HeadBar from "../../components/HeadBar";
import { MOBILE_MEDIA } from "../../constants/mediaquery";

interface Props extends React.Attributes {
  className?: string;
  style?: React.CSSProperties;
}

const WEBSITE_NAME = "chipstachoverflow";

export default function PrivacyPolicyPage(props: Props) {
  return (
    <div {...props}>
      <HeadBar />

      <Content>
        <h1>Privacy Policy</h1>

        <p>
          At{" "}
          <strong>
            <em>{WEBSITE_NAME}</em>
          </strong>
          , accessible from{" "}
          <Link href="/" as="/">
            <a>https://chipstachoverflow.com/</a>
          </Link>
          , one of our main priorities is the privacy of our visitors. This
          Privacy Policy document contains types of information that is
          collected and recorded by <em>{WEBSITE_NAME}</em> and how we use it.
        </p>

        <p>
          If you have additional questions or require more information about our
          Privacy Policy, do not hesitate to contact us.
        </p>

        <p>
          This Privacy Policy applies only to our online activities and is valid
          for visitors to our website with regards to the information that they
          shared and/or collect in <em>{WEBSITE_NAME}</em>. This policy is not
          applicable to any information collected offline or via channels other
          than this website.
        </p>

        <h2>Consent</h2>

        <p>
          By using our website, you hereby consent to our Privacy Policy and
          agree to its terms.
        </p>

        <h2>Information we collect</h2>

        <p>
          The personal information that you are asked to provide, and the
          reasons why you are asked to provide it, will be made clear to you at
          the point we ask you to provide your personal information.
        </p>

        <p>
          If you contact us directly, we may receive additional information
          about you such as your name, email address, phone number, the contents
          of the message and/or attachments you may send us, and any other
          information you may choose to provide.
        </p>

        <p>
          When you register for an Account, we may ask for your contact
          information, including items such as name, company name, address,
          email address, and telephone number.
        </p>

        <h2>How we use your information</h2>

        <p>We use the information we collect in various ways, including to:</p>

        <ul>
          <li>
            <p>Provide, operate, and maintain our webste</p>
          </li>

          <li>
            <p>Improve, personalize, and expand our webste</p>
          </li>

          <li>
            <p>Understand and analyze how you use our webste</p>
          </li>

          <li>
            <p>Develop new products, services, features, and functionality</p>
          </li>

          <li>
            <p>
              Communicate with you, either directly or through one of our
              partners, including for customer service, to provide you with
              updates and other information relating to the webste, and for
              marketing and promotional purposes
            </p>
          </li>

          <li>
            <p>Send you emails</p>
          </li>

          <li>
            <p>Find and prevent fraud</p>
          </li>
        </ul>

        <h2>Log Files</h2>

        <p>
          <em>{WEBSITE_NAME}</em> follows a standard procedure of using log
          files. These files log visitors when they visit websites. All hosting
          companies do this and a part of hosting services' analytics. The
          information collected by log files include internet protocol (IP)
          addresses, browser type, Internet Service Provider (ISP), date and
          time stamp, referring/exit pages, and possibly the number of clicks.
          These are not linked to any information that is personally
          identifiable. The purpose of the information is for analyzing trends,
          administering the site, tracking users' movement on the website, and
          gathering demographic information. Our Privacy Policy was created with
          the help of the{" "}
          <a href="https://www.privacypolicygenerator.info/">
            Privacy Policy Generator
          </a>{" "}
          and the{" "}
          <a href="https://www.privacypolicytemplate.net/">
            Privacy Policy Template
          </a>
          .
        </p>

        <h2>Cookies and Web Beacons</h2>

        <p>
          Like any other website, <em>{WEBSITE_NAME}</em> uses 'cookies'. These
          cookies are used to store information including visitors' preferences,
          and the pages on the website that the visitor accessed or visited. The
          information is used to optimize the users' experience by customizing
          our web page content based on visitors' browser type and/or other
          information.
        </p>

        <h2>CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>

        <p>
          Under the CCPA, among other rights, California consumers have the
          right to:
        </p>

        <ul>
          <li>
            <p>
              Request that a business that collects a consumer's personal data
              disclose the categories and specific pieces of personal data that
              a business has collected about consumers.
            </p>
          </li>

          <li>
            <p>
              Request that a business delete any personal data about the
              consumer that a business has collected.
            </p>
          </li>

          <li>
            <p>
              Request that a business that sells a consumer's personal data, not
              sell the consumer's personal data.
            </p>
          </li>

          <li>
            <p>
              If you make a request, we have one month to respond to you. If you
              would like to exercise any of these rights, please contact us.
            </p>
          </li>
        </ul>

        <h2>GDPR Data Protection Rights</h2>

        <p>
          We would like to make sure you are fully aware of all of your data
          protection rights. Every user is entitled to the following:
        </p>

        <ul>
          <li>
            <p>
              The right to access – You have the right to request copies of your
              personal data. We may charge you a small fee for this service.
            </p>
          </li>

          <li>
            <p>
              The right to rectification – You have the right to request that we
              correct any information you believe is inaccurate. You also have
              the right to request that we complete the information you believe
              is incomplete.
            </p>
          </li>

          <li>
            <p>
              The right to erasure – You have the right to request that we erase
              your personal data, under certain conditions.
            </p>
          </li>

          <li>
            <p>
              The right to restrict processing – You have the right to request
              that we restrict the processing of your personal data, under
              certain conditions.
            </p>
          </li>

          <li>
            <p>
              The right to object to processing – You have the right to object
              to our processing of your personal data, under certain conditions.
            </p>
          </li>

          <li>
            <p>
              The right to data portability – You have the right to request that
              we transfer the data that we have collected to another
              organization, or directly to you, under certain conditions.
            </p>
          </li>

          <li>
            <p>
              If you make a request, we have one month to respond to you. If you
              would like to exercise any of these rights, please contact us.
            </p>
          </li>
        </ul>

        <h2>Children's Information</h2>

        <p>
          Another part of our priority is adding protection for children while
          using the internet. We encourage parents and guardians to observe,
          participate in, and/or monitor and guide their online activity.
        </p>

        <p>
          <em>{WEBSITE_NAME}</em> does not knowingly collect any Personal
          Identifiable Information from children under the age of 13. If you
          think that your child provided this kind of information on our
          website, we strongly encourage you to contact us immediately and we
          will do our best efforts to promptly remove such information from our
          records.
        </p>
      </Content>

      <FootBar />
    </div>
  );
}

const Content = styled.section`
  box-sizing: border-box;
  max-width: 1280px;
  min-width: 375px;
  margin: 0 auto;
  padding: 64px 128px 128px;
  color: #0f151c;

  ${MOBILE_MEDIA} {
    margin: 0;
    padding: 0 16px 64px;
  }

  & > h1,
  & > h2 {
    margin: 0;
  }

  & > h1 {
    margin-bottom: 64px;
    font-size: 48px;
  }

  & > h2 {
    margin: 2rem 0 1rem;
    font-size: 28px;
  }

  & > ul {
    margin: 1rem 0;
  }

  ul {
    li {
      margin: 0.5rem 0;
    }
  }

  p {
    margin: 0;
    line-height: 1.5;
  }

  & > p {
    margin: 1rem 0;
  }

  a {
    color: #f53333;
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }
  }
`;
