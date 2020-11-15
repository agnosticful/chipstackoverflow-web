import { action } from "@storybook/addon-actions";
import * as React from "react";
import PostTable, { PostTableRow } from "@@/components/PostTable";
import Hand, { HandActionType } from "@@/models/Hand";
import Rank from "@@/models/Rank";
import Suit from "@@/models/Suit";
import { PostId, PostTitle, PostBody, PostMinimum } from "@@/models/Post";

export default {
  title: "PostTable",
  component: PostTable,
};

export const example = () => {
  const posts: PostMinimum[] = [
    {
      id: "mvczHP30q8zGEYdlvaMU" as PostId,
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore" as
        PostTitle,
      body:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. Vivamus at augue eget arcu dictum. Lobortis mattis aliquam faucibus purus in massa tempor nec. Purus viverra accumsan in nisl nisi. Adipiscing elit ut aliquam purus. Lorem sed risus ultricies tristique nulla aliquet enim. Purus viverra accumsan in nisl. Volutpat blandit aliquam etiam erat velit scelerisque in dictum. Ornare quam viverra orci sagittis eu volutpat odio facilisis mauris. Eget magna fermentum iaculis eu non diam phasellus vestibulum lorem. Id diam maecenas ultricies mi eget mauris pharetra et. Id leo in vitae turpis. Id cursus metus aliquam eleifend mi in nulla posuere. Fames ac turpis egestas sed tempus urna et pharetra. Mi tempus imperdiet nulla malesuada.\n\nAliquet lectus proin nibh nisl condimentum id venenatis a condimentum. Id donec ultrices tincidunt arcu non sodales. Fusce id velit ut tortor pretium viverra suspendisse. Vel quam elementum pulvinar etiam. Vulputate mi sit amet mauris commodo quis imperdiet massa. Hac habitasse platea dictumst vestibulum rhoncus est. Tellus at urna condimentum mattis pellentesque id. In hendrerit gravida rutrum quisque non. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat. In tellus integer feugiat scelerisque varius. Sed egestas egestas fringilla phasellus faucibus scelerisque.\n\nViverra ipsum nunc aliquet bibendum enim facilisis gravida neque convallis. Nec nam aliquam sem et tortor consequat id. Sed velit dignissim sodales ut. Euismod in pellentesque massa placerat. Pharetra massa massa ultricies mi quis hendrerit dolor. Risus at ultrices mi tempus imperdiet. Duis at tellus at urna condimentum. Tortor at auctor urna nunc id. Cursus risus at ultrices mi tempus imperdiet nulla malesuada. Mauris pellentesque pulvinar pellentesque habitant morbi tristique. Dignissim cras tincidunt lobortis feugiat. Vitae proin sagittis nisl rhoncus mattis rhoncus urna. Id leo in vitae turpis massa sed elementum tempus egestas. Accumsan tortor posuere ac ut consequat semper viverra.\n\nFaucibus et molestie ac feugiat sed lectus vestibulum mattis ullamcorper. Est ante in nibh mauris. Proin libero nunc consequat interdum varius sit amet mattis vulputate. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Eros donec ac odio tempor orci. Vel elit scelerisque mauris pellentesque pulvinar pellentesque. Lacinia at quis risus sed vulputate. Pellentesque sit amet porttitor eget dolor morbi non arcu. Scelerisque viverra mauris in aliquam sem fringilla. Metus aliquam eleifend mi in nulla posuere sollicitudin aliquam. Vestibulum sed arcu non odio euismod. Leo vel orci porta non pulvinar neque laoreet suspendisse. Convallis a cras semper auctor neque vitae tempus. Scelerisque in dictum non consectetur. Integer quis auctor elit sed vulputate.\n\nPretium aenean pharetra magna ac. Faucibus purus in massa tempor nec feugiat nisl. Elit at imperdiet dui accumsan sit amet. Donec et odio pellentesque diam volutpat. Libero nunc consequat interdum varius. Sodales neque sodales ut etiam sit amet nisl purus in. Auctor eu augue ut lectus arcu bibendum. Sollicitudin ac orci phasellus egestas tellus rutrum. In hac habitasse platea dictumst. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque. Senectus et netus et malesuada fames ac turpis egestas. Placerat duis ultricies lacus sed turpis tincidunt. Sed blandit libero volutpat sed cras. Scelerisque eleifend donec pretium vulputate sapien. Faucibus a pellentesque sit amet porttitor. Ullamcorper a lacus vestibulum sed arcu." as
        PostBody,
      hand: new Hand({
        playerInitialStackSizes: new Map([
          [0, 38.3],
          [1, 189.1],
          [2, 127.9],
          [3, 74.2],
          [4, 111],
          [5, 96.8],
        ]),
        playerCards: new Map([
          [
            0,
            [
              { rank: Rank.ace, suit: Suit.diamond },
              { rank: Rank.queen, suit: Suit.club },
            ],
          ],
          [
            1,
            [
              { rank: Rank.deuce, suit: Suit.diamond },
              { rank: Rank.five, suit: Suit.heart },
            ],
          ],
          [
            3,
            [
              { rank: Rank.nine, suit: Suit.club },
              { rank: Rank.eight, suit: Suit.club },
            ],
          ],
        ]),
        smallBlindSize: 0.5,
        antiSize: 0,
        communityCards: [
          { rank: Rank.king, suit: Suit.club },
          { rank: Rank.deuce, suit: Suit.club },
          { rank: Rank.five, suit: Suit.club },
          { rank: Rank.queen, suit: Suit.spade },
          { rank: Rank.ace, suit: Suit.heart },
        ],
        preflopActions: [
          { type: HandActionType.fold, playerIndex: 2, betSize: 0 },
          { type: HandActionType.raise, playerIndex: 3, betSize: 3 },
          { type: HandActionType.fold, playerIndex: 4, betSize: 0 },
          { type: HandActionType.fold, playerIndex: 5, betSize: 0 },
          { type: HandActionType.call, playerIndex: 0, betSize: 3 },
          { type: HandActionType.call, playerIndex: 1, betSize: 3 },
        ],
        flopActions: [
          { type: HandActionType.bet, playerIndex: 0, betSize: 1 },
          { type: HandActionType.call, playerIndex: 1, betSize: 1 },
          { type: HandActionType.call, playerIndex: 3, betSize: 1 },
        ],
        turnActions: [
          { type: HandActionType.bet, playerIndex: 0, betSize: 1 },
          { type: HandActionType.call, playerIndex: 1, betSize: 1 },
          { type: HandActionType.raise, playerIndex: 3, betSize: 4 },
          { type: HandActionType.call, playerIndex: 0, betSize: 4 },
          { type: HandActionType.call, playerIndex: 1, betSize: 4 },
        ],
        riverActions: [
          { type: HandActionType.bet, playerIndex: 0, betSize: 30.3 },
          { type: HandActionType.call, playerIndex: 1, betSize: 30.3 },
          { type: HandActionType.call, playerIndex: 3, betSize: 30.3 },
        ],
      }),
      heroIndex: 3,
      likes: 3,
      dislikes: 2,
      createdAt: new Date("2020-06-14T01:57:09.917Z"),
      lastUpdatedAt: new Date("2020-06-14T01:57:09.917Z"),
    },
    {
      id: "00000000000000000000" as PostId,
      title: "abcdefgh" as PostTitle,
      body: "abcdefgh" as PostBody,
      hand: new Hand({
        playerInitialStackSizes: new Map([
          [0, 1],
          [1, 1],
        ]),
        playerCards: new Map([
          [
            0,
            [
              { rank: Rank.ace, suit: Suit.spade },
              { rank: Rank.king, suit: Suit.spade },
            ],
          ],
          [
            1,
            [
              { rank: Rank.ace, suit: Suit.heart },
              { rank: Rank.king, suit: Suit.heart },
            ],
          ],
        ]),
        smallBlindSize: 0.5,
        antiSize: 0,
        communityCards: [],
        preflopActions: [
          { type: HandActionType.fold, playerIndex: 0, betSize: 0.5 },
        ],
        flopActions: [],
        turnActions: [],
        riverActions: [],
      }),
      heroIndex: 1,
      likes: 0,
      dislikes: 0,
      createdAt: new Date(),
      lastUpdatedAt: new Date(),
    },
    {
      id: "zzzzzzzzzzzzzzzzzzzz" as PostId,
      title:
        "In egestas erat imperdiet sed. In massa tempor nec feugiat nisl pretium. Urna condimentum mattis pellentesque id nibh. Massa sapien faucibus et molestie ac feugiat sed lectus. Facilisis gravida neque convallis a cras semper auctor neque vitae. Aliquam faucibus purus in massa tempor nec feugiat. Sit amet purus gravida quis blandit. Ligula ullamcorper malesuada proin libero nunc consequat. Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Enim nulla aliquet porttitor lacus luctus accumsan tortor. Facilisi etiam dignissim diam quis enim. Sagittis aliquam malesuada bibendum arcu. Tristique senectus et netus et malesuada fames ac. Non tellus orci ac auctor augue. Massa vitae tortor condimentum lacinia quis vel eros donec. Arcu non sodales neque sodales ut etiam sit amet nisl. Rhoncus dolor purus non enim praesent elementum. Pulvinar etiam non quam lacus suspendisse faucibus interdum posuere lorem. Neque aliquam vestibulum morbi blandit cursus risus at. Mauris cursus mattis molestie a iaculis at. Facilisis sed odio morbi quis commodo. Tincidunt tortor aliquam nulla facilisi cras fermentum odio. Lorem ipsum dolor sit amet consectetur adipiscing. Bibendum est ultricies integer quis auctor. Ipsum consequat nisl vel pretium. Accumsan lacus vel facilisis volutpat est. Amet dictum sit amet justo. Condimentum lacinia quis vel eros donec ac. Convallis tellus id interdum velit laoreet. Nunc lobortis mattis aliquam faucibus purus. Ut sem nulla pharetra diam sit. Mauris pellentesque pulvinar pellentesque habitant morbi. Erat velit scelerisque in dictum non. Enim tortor at auctor urna nunc id cursus. Orci ac auctor augue mauris augue neque gravida in. Ultrices sagittis orci a scelerisque purus semper eget duis. Erat pellentesque adipiscing commodo elit at imperdiet. Feugiat nisl pretium fusce id. Praesent elementum facilisis leo vel fringilla est ullamcorper eget nulla. Dictum non consectetur a erat nam at lectus urna. Quisque non tellus orci ac auctor. Mus mauris vitae ultricies leo integer. Pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies. Elementum nisi quis eleifend quam adipiscing vitae. Aenean euismod elementum nisi quis eleifend quam adipiscing. Sapien faucibus et molestie ac feugiat sed lectus vestibulum. Mus mauris vitae ultricies leo integer malesuada nunc vel. Nisi quis eleifend quam adipiscing. Consequat nisl vel pretium lectus quam. Arcu dui vivamus arcu felis bibendum. Nisl pretium fusce id velit. Lobortis scelerisque fermentum dui faucibus in ornare quam viverra. Non enim praesent elementum facilisis. Tortor id aliquet lectus proin nibh nisl. Pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus. Nibh sit amet commodo nulla facilisi. Nunc mattis enim ut tellus. Suspendisse in est ante in nibh mauris cursus. Pellentesque nec nam aliquam sem et tortor consequat id. Mi bibendum neque egestas congue quisque egestas. Sed id semper risus in hendrerit gravida rutrum. Amet luctus venenatis lectus magna fringilla. Neque volutpat ac tincidunt vitae semper quis lectus nulla at. Et malesuada fames ac turpis egestas integer eget aliquet. Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum. Sed cras ornare arcu dui vivamus arcu felis bibendum ut. Turpis massa tincidunt dui ut ornare. Ipsum nunc aliquet bibendum enim facilisis gravida neque convallis. Ac tortor vitae purus faucibus ornare suspendisse. Diam in arcu cursus euismod quis viverra nibh cras pulvinar. Dui sapien eget mi proin sed. Ullamcorper sit amet risus nullam eget. Nam aliquam sem et tortor consequat id porta. At quis risus sed vulputate odio ut enim blandit. Gravida rutrum quisque non tellus orci ac. Congue quisque egestas diam in arcu. Venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam. Enim sed faucibus turpis in eu. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Molestie a iaculis at erat pellentesque adipiscing. Dolor sit amet consectetur adipiscing. Non arcu risus quis varius quam quisque id diam vel. Bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Ut eu sem integer vitae justo eget magna fermentum iaculis. Vitae et leo duis ut diam quam nulla porttitor. Risus viverra adipiscing at in tellus integer feugiat. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque. Maecenas volutpat blandit aliquam etiam erat velit scelerisque in dictum. Est pellentesque elit ullamcorper dignissim cras tincidunt. Id nibh tortor id aliquet. Nec feugiat nisl pretium fusce id velit ut. Duis tristique sollicitudin nibh sit amet. Viverra accumsan in nisl nisi scelerisque eu ultrices vitae auctor. Amet facilisis magna etiam tempor orci. Quis commodo odio aenean sed adipiscing. Tempus egestas sed sed risus pretium. Sollicitudin tempor id eu nisl nunc mi. Sapien et ligula ullamcorper malesuada proin libero. Pellentesque pulvinar pellentesque habitant morbi tristique senectus." as
        PostTitle,
      body:
        "Sapien et ligula ullamcorper malesuada proin. In mollis nunc sed id semper risus. Enim nulla aliquet porttitor lacus luctus accumsan tortor posuere ac. Egestas erat imperdiet sed euismod. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. Magna sit amet purus gravida quis blandit turpis cursus in. Elit ut aliquam purus sit amet luctus. Lectus nulla at volutpat diam ut venenatis tellus in metus. Enim diam vulputate ut pharetra sit amet aliquam id. Quam nulla porttitor massa id. A pellentesque sit amet porttitor eget. Convallis convallis tellus id interdum velit. Nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus. Pretium lectus quam id leo in. Enim eu turpis egestas pretium aenean pharetra magna ac placerat. Sollicitudin aliquam ultrices sagittis orci a. Tellus integer feugiat scelerisque varius morbi enim nunc. Quam quisque id diam vel quam. Cras ornare arcu dui vivamus arcu felis. Leo in vitae turpis massa sed elementum tempus egestas. Neque viverra justo nec ultrices dui sapien eget mi. Mollis aliquam ut porttitor leo a diam sollicitudin tempor id. Mattis nunc sed blandit libero volutpat sed cras ornare. Dignissim sodales ut eu sem. Viverra justo nec ultrices dui sapien. Pharetra pharetra massa massa ultricies mi quis hendrerit. Nibh cras pulvinar mattis nunc. In cursus turpis massa tincidunt. Cras pulvinar mattis nunc sed blandit libero volutpat sed cras. In ante metus dictum at tempor commodo ullamcorper a lacus. Tristique sollicitudin nibh sit amet commodo nulla. Pharetra et ultrices neque ornare aenean euismod elementum nisi. Dictum at tempor commodo ullamcorper a lacus vestibulum. Auctor neque vitae tempus quam. Vitae suscipit tellus mauris a. Velit egestas dui id ornare. Mi in nulla posuere sollicitudin aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem sed risus ultricies tristique. Maecenas pharetra convallis posuere morbi. Mi tempus imperdiet nulla malesuada pellentesque elit eget gravida. Morbi tristique senectus et netus et malesuada fames ac turpis. At erat pellentesque adipiscing commodo. Tellus at urna condimentum mattis. Interdum velit euismod in pellentesque massa placerat duis ultricies. Commodo viverra maecenas accumsan lacus vel facilisis volutpat. Commodo odio aenean sed adipiscing diam donec adipiscing tristique. Nulla aliquet enim tortor at auctor urna nunc. Ultricies tristique nulla aliquet enim tortor at. Sed sed risus pretium quam. Eu consequat ac felis donec et odio pellentesque diam. Id semper risus in hendrerit gravida. Elementum sagittis vitae et leo duis ut diam quam. Praesent elementum facilisis leo vel fringilla. Sagittis purus sit amet volutpat consequat mauris nunc congue. Sed elementum tempus egestas sed sed risus. Orci eu lobortis elementum nibh tellus. Maecenas pharetra convallis posuere morbi leo urna molestie at. Pellentesque elit ullamcorper dignissim cras tincidunt. Congue quisque egestas diam in arcu cursus euismod. Orci phasellus egestas tellus rutrum tellus. Elementum facilisis leo vel fringilla est ullamcorper eget nulla. Scelerisque varius morbi enim nunc. Viverra aliquet eget sit amet. Sagittis vitae et leo duis ut diam quam nulla porttitor. Diam ut venenatis tellus in metus vulputate. In fermentum et sollicitudin ac orci phasellus egestas. Ac turpis egestas sed tempus urna. Senectus et netus et malesuada fames ac turpis egestas. At elementum eu facilisis sed odio morbi quis commodo. Donec ultrices tincidunt arcu non sodales neque sodales. Luctus accumsan tortor posuere ac. Purus non enim praesent elementum facilisis leo vel fringilla est. Lectus nulla at volutpat diam ut. Vestibulum sed arcu non odio euismod lacinia. Elit duis tristique sollicitudin nibh sit amet commodo. Odio ut sem nulla pharetra diam sit amet nisl suscipit. Tempus iaculis urna id volutpat lacus laoreet. Magna fermentum iaculis eu non diam phasellus vestibulum. Sagittis eu volutpat odio facilisis mauris sit amet massa. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Purus sit amet volutpat consequat mauris nunc congue. Odio ut sem nulla pharetra. Interdum velit euismod in pellentesque massa placerat duis ultricies. Ipsum suspendisse ultrices gravida dictum fusce. Est ultricies integer quis auctor elit sed vulputate mi sit. Netus et malesuada fames ac turpis egestas integer eget. Volutpat consequat mauris nunc congue nisi vitae suscipit. Felis imperdiet proin fermentum leo vel orci porta non. Risus nec feugiat in fermentum posuere urna. Odio morbi quis commodo odio aenean sed adipiscing. Sed ullamcorper morbi tincidunt ornare massa eget egestas purus. Morbi tristique senectus et netus et malesuada fames ac. Vivamus arcu felis bibendum ut tristique et egestas quis. Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada. Aliquet nec ullamcorper sit amet risus nullam eget felis. Eget nunc scelerisque viverra mauris in aliquam sem fringilla ut. Malesuada pellentesque elit eget gravida cum sociis natoque penatibus et. Nunc congue nisi vitae suscipit." as
        PostBody,
      hand: new Hand({
        playerInitialStackSizes: new Map([
          [0, 100000000],
          [1, 100000000],
          [2, 100000000],
          [3, 100000000],
          [4, 100000000],
          [5, 100000000],
          [6, 100000000],
          [7, 100000000],
          [8, 100000000],
          [9, 100000000],
        ]),
        playerCards: new Map([
          [
            0,
            [
              { rank: Rank.ace, suit: Suit.spade },
              { rank: Rank.ace, suit: Suit.heart },
            ],
          ],
          [
            1,
            [
              { rank: Rank.king, suit: Suit.diamond },
              { rank: Rank.king, suit: Suit.club },
            ],
          ],
          [
            2,
            [
              { rank: Rank.queen, suit: Suit.heart },
              { rank: Rank.queen, suit: Suit.club },
            ],
          ],
          [
            3,
            [
              { rank: Rank.jack, suit: Suit.spade },
              { rank: Rank.jack, suit: Suit.diamond },
            ],
          ],
          [
            4,
            [
              { rank: Rank.ten, suit: Suit.heart },
              { rank: Rank.ten, suit: Suit.club },
            ],
          ],
          [
            5,
            [
              { rank: Rank.ace, suit: Suit.diamond },
              { rank: Rank.king, suit: Suit.spade },
            ],
          ],
          [
            6,
            [
              { rank: Rank.king, suit: Suit.heart },
              { rank: Rank.queen, suit: Suit.spade },
            ],
          ],
          [
            7,
            [
              { rank: Rank.queen, suit: Suit.diamond },
              { rank: Rank.jack, suit: Suit.heart },
            ],
          ],
          [
            8,
            [
              { rank: Rank.jack, suit: Suit.club },
              { rank: Rank.ten, suit: Suit.spade },
            ],
          ],
          [
            9,
            [
              { rank: Rank.deuce, suit: Suit.spade },
              { rank: Rank.deuce, suit: Suit.heart },
            ],
          ],
        ]),
        smallBlindSize: 0.5,
        antiSize: 0,
        communityCards: [
          { rank: Rank.nine, suit: Suit.heart },
          { rank: Rank.nine, suit: Suit.diamond },
          { rank: Rank.nine, suit: Suit.club },
          { rank: Rank.eight, suit: Suit.club },
          { rank: Rank.ace, suit: Suit.club },
        ],
        preflopActions: [
          { type: HandActionType.raise, playerIndex: 2, betSize: 3 },
          { type: HandActionType.raise, playerIndex: 3, betSize: 9 },
          { type: HandActionType.call, playerIndex: 4, betSize: 9 },
          { type: HandActionType.fold, playerIndex: 5, betSize: 0 },
          { type: HandActionType.fold, playerIndex: 6, betSize: 0 },
          { type: HandActionType.fold, playerIndex: 7, betSize: 0 },
          { type: HandActionType.fold, playerIndex: 8, betSize: 0 },
          { type: HandActionType.call, playerIndex: 9, betSize: 9 },
          { type: HandActionType.raise, playerIndex: 0, betSize: 24 },
          { type: HandActionType.call, playerIndex: 1, betSize: 24 },
          { type: HandActionType.call, playerIndex: 2, betSize: 24 },
          { type: HandActionType.call, playerIndex: 3, betSize: 24 },
          { type: HandActionType.call, playerIndex: 4, betSize: 24 },
        ],
        flopActions: [
          { type: HandActionType.bet, playerIndex: 0, betSize: 50 },
          { type: HandActionType.call, playerIndex: 1, betSize: 50 },
          { type: HandActionType.raise, playerIndex: 2, betSize: 100 },
          { type: HandActionType.call, playerIndex: 3, betSize: 100 },
          { type: HandActionType.call, playerIndex: 4, betSize: 100 },
          { type: HandActionType.call, playerIndex: 0, betSize: 100 },
          { type: HandActionType.call, playerIndex: 1, betSize: 100 },
        ],
        turnActions: [
          { type: HandActionType.check, playerIndex: 0, betSize: 0 },
          { type: HandActionType.bet, playerIndex: 1, betSize: 320 },
          { type: HandActionType.call, playerIndex: 2, betSize: 320 },
          { type: HandActionType.call, playerIndex: 3, betSize: 320 },
          { type: HandActionType.call, playerIndex: 4, betSize: 320 },
          { type: HandActionType.raise, playerIndex: 0, betSize: 750 },
          { type: HandActionType.raise, playerIndex: 1, betSize: 1800 },
          { type: HandActionType.fold, playerIndex: 2, betSize: 320 },
          { type: HandActionType.fold, playerIndex: 3, betSize: 320 },
          { type: HandActionType.fold, playerIndex: 4, betSize: 320 },
          { type: HandActionType.call, playerIndex: 0, betSize: 1800 },
        ],
        riverActions: [
          { type: HandActionType.check, playerIndex: 0, betSize: 0 },
          { type: HandActionType.check, playerIndex: 1, betSize: 0 },
        ],
      }),
      heroIndex: 0,
      likes: 2 ** 29,
      dislikes: 2 ** 12,
      createdAt: new Date(1292603960743),
      lastUpdatedAt: new Date(1392603960743),
    },
    {
      id: "rgaergba" as PostId,
      title:
        "suspendisse interdum consectetur libero id undisse interdum consectetur libero deid consectetur libero deid" as
        PostTitle,
      body:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." as
        PostBody,
      likes: 125,
      dislikes: 12,
      hand: new Hand({
        playerInitialStackSizes: new Map(
          [82, 103.2, 107.6, 113.2, 100.6, 94.8].map((v, k) => [k, v])
        ),
        playerCards: new Map([
          [
            2,
            [
              { rank: Rank.ace, suit: Suit.diamond },
              { rank: Rank.king, suit: Suit.heart },
            ],
          ],
          [
            3,
            [
              { rank: Rank.four, suit: Suit.spade },
              { rank: Rank.four, suit: Suit.heart },
            ],
          ],
        ]),
        smallBlindSize: 0.4,
        antiSize: 0,
        communityCards: [
          { rank: Rank.four, suit: Suit.club },
          { rank: Rank.seven, suit: Suit.club },
          { rank: Rank.six, suit: Suit.spade },
          { rank: Rank.three, suit: Suit.spade },
        ],
        preflopActions: [
          { type: HandActionType.raise, playerIndex: 2, betSize: 3 },
          { type: HandActionType.call, playerIndex: 3, betSize: 3 },
          { type: HandActionType.fold, playerIndex: 4, betSize: 0 },
          { type: HandActionType.fold, playerIndex: 5, betSize: 0 },
          { type: HandActionType.call, playerIndex: 0, betSize: 3 },
          { type: HandActionType.fold, playerIndex: 1, betSize: 1 },
        ],
        flopActions: [
          { type: HandActionType.check, playerIndex: 0, betSize: 0 },
          { type: HandActionType.bet, playerIndex: 2, betSize: 4.8 },
          { type: HandActionType.call, playerIndex: 3, betSize: 4.8 },
          { type: HandActionType.fold, playerIndex: 0, betSize: 0 },
        ],
        turnActions: [
          { type: HandActionType.bet, playerIndex: 2, betSize: 9.4 },
          { type: HandActionType.raise, playerIndex: 3, betSize: 22 },
          { type: HandActionType.fold, playerIndex: 2, betSize: 9.4 },
        ],
        riverActions: [],
      }),
      heroIndex: 2,
      createdAt: new Date(),
      lastUpdatedAt: new Date(),
    },
  ];

  return (
    <PostTable>
      {posts.map((post) => (
        <PostTableRow post={post} onClick={action("onClick")} key={post.id} />
      ))}
    </PostTable>
  );
};
