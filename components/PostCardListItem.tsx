import { Row, Col, Card, Typography } from "antd";
import * as React from "react";
import styled from "styled-components";
import LikeIcon from "./LikeIcon";
import PlayingCard from "./PlayingCard";
import { Rank, Suit } from "../models/PlayingCard";
import Post from "../models/Post";
import Round from "../models/Round";
import getAgoByDate from "../utilities/getAgoByDate";
import getFinalPodOfTheGame from "../utilities/getFinalPodOfTheGame";
import getPositionByPlayerAndIndex from "../utilities/getPositionByPlayerAndIndex";
import getSIMetricPrefixData from "../utilities/getSIMetricPrefixData";

interface Props {
  isRecentPost: boolean;
  post: Post;
  onClick?: () => void;
}

const PostCardListItem = ({ isRecentPost, post, onClick }: Props) => {
  return (
    <Card
      hoverable
      style={{ maxWidth: "496px", margin: "8px" }}
      bodyStyle={{ padding: "8px" }}
      onClick={onClick}
    >
      <Row gutter={[4, 4]}>
        <Col span={5}>
          <PlayerHand>
            <PlayingCard
              suit={Suit.spade} // TODO
              rank={Rank.king}
              style={{ width: "40%", margin: "2px" }}
            />
            <PlayingCard
              suit={Suit.heart} // TODO
              rank={Rank.king}
              style={{ width: "40%", margin: "2px" }}
            />
          </PlayerHand>
        </Col>
        <Col span={19}>
          <Typography.Title level={4} style={{ margin: "0 0 8px 8px" }}>
            {post.title}
          </Typography.Title>
        </Col>
      </Row>
      <Row justify="space-between">
        <Col span={4}>
          <CenterItem>
            <LikeIcon
              color="gray"
              style={{ width: 25, height: 25, margin: "4px" }}
            />
            {post.likes}
          </CenterItem>
        </Col>
        <Attribute
          title="PLAY AT"
          value={getPositionByPlayerAndIndex(
            post.gameSituation.players,
            post.gameSituation.heroIndex
          )}
        />
        <Attribute
          title="ENDED AT"
          value={
            post.gameSituation.river
              ? Round.RIVER
              : post.gameSituation.turn
              ? Round.TURN
              : post.gameSituation.flop
              ? Round.FLOP
              : Round.PREFLOP
          }
        />
        <Attribute
          title="FINAL POT"
          value={`${getSIMetricPrefixData(
            getFinalPodOfTheGame(post.gameSituation)
          )} BB`}
        />
        <Attribute
          title={isRecentPost ? "POSTED" : "Last Update"}
          value={
            isRecentPost
              ? getAgoByDate(post.createdAt)
              : getAgoByDate(post.lastUpdatedAt)
          }
        />
      </Row>
    </Card>
  );
};

const Attribute = ({ title, value }: { title: string; value: string }) => (
  <Col>
    <Row>{title}</Row>
    <Row>{value}</Row>
  </Col>
);

const PlayerHand = styled.div`
  height: 100%;
  min-width: 72px;
  text-align: center;
`;

const CenterItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export default PostCardListItem;
