import React, { useState } from "react";
import styled from 'styled-components/native';
import ScreenContainer from '../components/ScreenContainer';
import Header from "../components/Header";
import FilterTabs from '../components/FilterTabs';
import InfiniteScrollList from '../components/InfiniteScrollList';
import PostCard from '../components/PostCard';

const OuterBlock = styled.View`
    background-color: ${({ theme }) => theme.colors.background};
    margin: 0 -20px;
    flex: 1;
`;

const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.secondaryText};
  font-size: 14px;
  margin-bottom: 28px;
`;

const filters = [
    { label: 'Search', iconName: 'search' },
    { label: 'All' },
    { label: 'Screenshots' },
    { label: 'Artwork' },
    { label: 'Workshop' },
    { label: 'News' },
];

const posts = [
    {
        id: '1',
        pfp: require('../assets/img/CommunityScreen/pfp.png'),
        author: 'Eurogamer',
        tag: 'NEWS',
        time: 'yesterday • 2:20 pm',
        image: require('../assets/img/CommunityScreen/post-image-1.jpg'),
        title: 'Florida tourist attraction sues Fortnite, seeks removal of in-game castle',
        content: 'Coral Castle Museum, a tourist attraction near Miami, is suing Fortnite maker Epic Games for trademark infringement and unfair competition.',
        likes: 324,
        comments: 12,
    },
    {
        id: '2',
        pfp: require('../assets/img/CommunityScreen/pfp.png'),
        author: 'Eurogamer',
        tag: null,
        time: '2 days ago',
        image: require('../assets/img/CommunityScreen/post-image-2.jpg'),
        title: 'Florida tourist attraction sues Fortnite, seeks removal of in-game castle',
        content: 'Coral Castle Museum, a tourist attraction near Miami, is suing Fortnite maker Epic Games for trademark infringement and unfair competition.',
        likes: 730,
        comments: 92,
    },
    {
        id: '3',
        pfp: require('../assets/img/CommunityScreen/pfp.png'),
        author: 'Eurogamer',
        tag: 'NEWS',
        time: 'yesterday • 2:20 pm',
        image: require('../assets/img/CommunityScreen/post-image-1.jpg'),
        title: 'Florida tourist attraction sues Fortnite, seeks removal of in-game castle',
        content: 'Coral Castle Museum, a tourist attraction near Miami, is suing Fortnite maker Epic Games for trademark infringement and unfair competition.',
        likes: 324,
        comments: 12,
    },
    {
        id: '4',
        pfp: require('../assets/img/CommunityScreen/pfp.png'),
        author: 'Eurogamer',
        tag: null,
        time: '2 days ago',
        image: require('../assets/img/CommunityScreen/post-image-2.jpg'),
        title: 'Florida tourist attraction sues Fortnite, seeks removal of in-game castle',
        content: 'Coral Castle Museum, a tourist attraction near Miami, is suing Fortnite maker Epic Games for trademark infringement and unfair competition.',
        likes: 730,
        comments: 92,
    },
    {
        id: '5',
        pfp: require('../assets/img/CommunityScreen/pfp.png'),
        author: 'Eurogamer',
        tag: 'NEWS',
        time: 'yesterday • 2:20 pm',
        image: require('../assets/img/CommunityScreen/post-image-1.jpg'),
        title: 'Florida tourist attraction sues Fortnite, seeks removal of in-game castle',
        content: 'Coral Castle Museum, a tourist attraction near Miami, is suing Fortnite maker Epic Games for trademark infringement and unfair competition.',
        likes: 324,
        comments: 12,
    },
    {
        id: '6',
        pfp: require('../assets/img/CommunityScreen/pfp.png'),
        author: 'Eurogamer',
        tag: null,
        time: '2 days ago',
        image: require('../assets/img/CommunityScreen/post-image-2.jpg'),
        title: 'Florida tourist attraction sues Fortnite, seeks removal of in-game castle',
        content: 'Coral Castle Museum, a tourist attraction near Miami, is suing Fortnite maker Epic Games for trademark infringement and unfair competition.',
        likes: 730,
        comments: 92,
    },
    {
        id: '7',
        pfp: require('../assets/img/CommunityScreen/pfp.png'),
        author: 'Eurogamer',
        tag: 'NEWS',
        time: 'yesterday • 2:20 pm',
        image: require('../assets/img/CommunityScreen/post-image-1.jpg'),
        title: 'Florida tourist attraction sues Fortnite, seeks removal of in-game castle',
        content: 'Coral Castle Museum, a tourist attraction near Miami, is suing Fortnite maker Epic Games for trademark infringement and unfair competition.',
        likes: 324,
        comments: 12,
    },
    {
        id: '8',
        pfp: require('../assets/img/CommunityScreen/pfp.png'),
        author: 'Eurogamer',
        tag: null,
        time: '2 days ago',
        image: require('../assets/img/CommunityScreen/post-image-2.jpg'),
        title: 'Florida tourist attraction sues Fortnite, seeks removal of in-game castle',
        content: 'Coral Castle Museum, a tourist attraction near Miami, is suing Fortnite maker Epic Games for trademark infringement and unfair competition.',
        likes: 730,
        comments: 92,
    },
    {
        id: '9',
        pfp: require('../assets/img/CommunityScreen/pfp.png'),
        author: 'Eurogamer',
        tag: 'NEWS',
        time: 'yesterday • 2:20 pm',
        image: require('../assets/img/CommunityScreen/post-image-1.jpg'),
        title: 'Florida tourist attraction sues Fortnite, seeks removal of in-game castle',
        content: 'Coral Castle Museum, a tourist attraction near Miami, is suing Fortnite maker Epic Games for trademark infringement and unfair competition.',
        likes: 324,
        comments: 12,
    },
    {
        id: '10',
        pfp: require('../assets/img/CommunityScreen/pfp.png'),
        author: 'Eurogamer',
        tag: null,
        time: '2 days ago',
        image: require('../assets/img/CommunityScreen/post-image-2.jpg'),
        title: 'Florida tourist attraction sues Fortnite, seeks removal of in-game castle',
        content: 'Coral Castle Museum, a tourist attraction near Miami, is suing Fortnite maker Epic Games for trademark infringement and unfair competition.',
        likes: 730,
        comments: 92,
    },
];

export default function CommunityScreen() {
    const [selectedFilter, setSelectedFilter] = useState('All');

    return (
        <ScreenContainer>
            <Header title="Community" />
            <Subtitle>
                Community and official content for all games and software
            </Subtitle>

            <FilterTabs data={filters} defaultValue="All" onChange={setSelectedFilter} />

            <OuterBlock>
                <InfiniteScrollList
                    data={posts}
                    itemsPerPage={2}
                    renderItem={({ item }) => <PostCard post={item} />}
                    keyExtractor={(item) => item.id}
                />
            </OuterBlock>
        </ScreenContainer>
    );
}