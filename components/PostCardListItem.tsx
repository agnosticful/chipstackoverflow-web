import { Row, Col, Card, Typography } from 'antd';
import * as React from 'react';
import styled from 'styled-components';
import PlayingCard from './PlayingCard';
import { Rank, Suit } from '../models/PlayingCard';
import Position from '../models/Position';
import Round from '../models/Round';
import LikeIcon from './LikeIcon';
import getAgoByDate from '../utilities/getAgoByDate';
import getSIMetricPrefixData from '../utilities/getSIMetricPrefixData';

interface Props {
  hand: [
    {
      rank: Rank;
      suit: Suit;
    },
    {
      rank: Rank;
      suit: Suit;
    }
  ];
  title: string;
  likes: number;
  playAt: Position;
  endedAt: Round;
  finalPod: number;
  posted: Date;
  onClick: () => void;
}

// <PostCardList column={[PostCardListColumn.totalPotSize, PostCardListColumn.lastUpdate]}>
//   <PostCardListItem />
//   <PostCardListItem />
//   <PostCardListItem />
// </PostCardList>

// const PostCardListContext = React.createContext();

// function PostCardList({ column }) {
//   if (column.length !== 4) {
//     throw new Error("props.column must be a four-length array.");
//   }

//   return (
//     <PostCardListContext.Provider value={column}>
//       {children}
//     </PostCardListContext.Provider>
//   )
// }

// function PostCardListItem() {
//   const { column } = React.useContext(PostCardListContext);

//   if (showCreateDate) {
//     // ...
//   }

//   if (showLastUpdateDate) {
//     // ...
//   }
// }

const PostCardListItem = ({ hand, title, likes, playAt, endedAt, finalPod, posted, onClick }: Props) => {
  return (
    <Card hoverable style={{ maxWidth: '496px', margin: '8px' }} bodyStyle={{ padding: '8px' }} onClick={onClick}>
      <Row gutter={[4, 4]}>
        <Col span={5}>
          <PlayerCards>
            <PlayingCard suit={hand[0].suit} rank={hand[0].rank} style={{ width: '40%', margin: '2px' }} />
            <PlayingCard suit={hand[1].suit} rank={hand[1].rank} style={{ width: '40%', margin: '2px' }} />
          </PlayerCards>
        </Col>
        <Col span={19}>
          <Typography.Title level={4} style={{ margin: '0 0 8px 8px' }}>
            {title}
          </Typography.Title>
        </Col>
      </Row>
      <Row justify='space-between'>
        <Col span={4}>
          <BoxCenter>
            <LikeIcon color='gray' style={{ width: 25, height: 25, margin: '4px' }} />
            {likes}
          </BoxCenter>
        </Col>
        <Attribute title='PLAY AT' value={playAt} />
        <Attribute title='ENDED AT' value={endedAt} />
        <Attribute title='FINAL POT' value={`${getSIMetricPrefixData(finalPod)} BB`} />
        <Attribute title='POSTED' value={getAgoByDate(posted)} />
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

const PlayerCards = styled.div`
  height: 100%;
  min-width: 72px;
  text-align: center;
`;

const BoxCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

PostCardListItem.defaultProps = {
  onClick: null
};

export default PostCardListItem;
