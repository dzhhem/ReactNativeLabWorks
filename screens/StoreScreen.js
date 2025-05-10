import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components/native';
import ScreenContainer from '../components/ScreenContainer';
import Header from '../components/Header';
import RecommendationCard from '../components/RecommendationCard';
import FilterTabs from '../components/FilterTabs';
import GameCard from '../components/GameCard';
import InfiniteScrollList from '../components/InfiniteScrollList';

const OuterBlock = styled.View`
    background-color: ${({ theme }) => theme.colors.background};
    margin: 0 -20px;
`;

const recommendations = [
    {
        id: '1',
        image: require('../assets/img/StoreScreen/deadbydaylight.jpg'),
        title: 'Dead by Daylight',
        subtitle: 'Recommended by your friend, Player',
        discount: '-70%',
        oldPrice: '$18',
        newPrice: '$5',
        operatingSystemImage: require('../assets/img/StoreScreen/windows.png'),
    },
    {
        id: '2',
        image: require('../assets/img/StoreScreen/battlefield.jpg'),
        title: 'Battlefield 4',
        subtitle: 'Recommended by your friend, Alex',
        discount: '-50%',
        oldPrice: '$38',
        newPrice: '$19',
        operatingSystemImage: require('../assets/img/StoreScreen/windows.png'),
    },
];

const filterOptions = [
    { label: 'Top Sellers' },
    { label: 'Free to play' },
    { label: 'Early Access' },
    { label: 'Action' },
];

const allGames = [
    {
        id: '1',
        title: 'Grand Theft Auto V',
        image: require('../assets/img/StoreScreen/games/01.jpg'),
        platforms: ['Windows'],
        oldPrice: '$20',
        newPrice: '$10',
        discount: '-50%',
    },
    {
        id: '2',
        title: 'Battlefield 4™',
        image: require('../assets/img/StoreScreen/games/02.jpg'),
        platforms: ['Windows'],
        newPrice: '$35',
    },
    {
        id: '3',
        title: 'Factorio',
        image: require('../assets/img/StoreScreen/games/03.jpg'),
        platforms: ['Windows', 'Mac'],
        newPrice: '$7',
    },
    {
        id: '4',
        title: 'Horizon Zero Dawn',
        image: require('../assets/img/StoreScreen/games/04.jpg'),
        platforms: ['Windows'],
        newPrice: '$38',
    },
    {
        id: '5',
        title: 'Grand Theft Auto V',
        image: require('../assets/img/StoreScreen/games/01.jpg'),
        platforms: ['Windows'],
        oldPrice: '$20',
        newPrice: '$10',
        discount: '-50%',
    },
    {
        id: '6',
        title: 'Battlefield 4™',
        image: require('../assets/img/StoreScreen/games/02.jpg'),
        platforms: ['Windows'],
        newPrice: '$35',
    },
    {
        id: '7',
        title: 'Factorio',
        image: require('../assets/img/StoreScreen/games/03.jpg'),
        platforms: ['Windows', 'Mac'],
        newPrice: '$7',
    },
    {
        id: '8',
        title: 'Horizon Zero Dawn',
        image: require('../assets/img/StoreScreen/games/04.jpg'),
        platforms: ['Windows'],
        newPrice: '$38',
    },
    {
        id: '9',
        title: 'Grand Theft Auto V',
        image: require('../assets/img/StoreScreen/games/01.jpg'),
        platforms: ['Windows'],
        oldPrice: '$20',
        newPrice: '$10',
        discount: '-50%',
    },
    {
        id: '10',
        title: 'Battlefield 4™',
        image: require('../assets/img/StoreScreen/games/02.jpg'),
        platforms: ['Windows'],
        newPrice: '$35',
    },
    {
        id: '11',
        title: 'Factorio',
        image: require('../assets/img/StoreScreen/games/03.jpg'),
        platforms: ['Windows', 'Mac'],
        newPrice: '$7',
    },
    {
        id: '12',
        title: 'Horizon Zero Dawn',
        image: require('../assets/img/StoreScreen/games/04.jpg'),
        platforms: ['Windows'],
        newPrice: '$38',
    },
    {
        id: '13',
        title: 'Grand Theft Auto V',
        image: require('../assets/img/StoreScreen/games/01.jpg'),
        platforms: ['Windows'],
        oldPrice: '$20',
        newPrice: '$10',
        discount: '-50%',
    },
    {
        id: '14',
        title: 'Battlefield 4™',
        image: require('../assets/img/StoreScreen/games/02.jpg'),
        platforms: ['Windows'],
        newPrice: '$35',
    },
    {
        id: '15',
        title: 'Factorio',
        image: require('../assets/img/StoreScreen/games/03.jpg'),
        platforms: ['Windows', 'Mac'],
        newPrice: '$7',
    },
    {
        id: '16',
        title: 'Horizon Zero Dawn',
        image: require('../assets/img/StoreScreen/games/04.jpg'),
        platforms: ['Windows'],
        newPrice: '$38',
    },
];

export default function StoreScreen() {
    const [activeFilter, setActiveFilter] = useState('Top Sellers');

    return (
        <ScreenContainer>
            <Header title="Store" showSearch={true} />

            <OuterBlock style={{ marginBottom: 32 }}>
                <FlatList
                    data={recommendations}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                    ItemSeparatorComponent={() => <View style={{ width: 16 }}></View>}
                    renderItem={({ item }) => (
                        <RecommendationCard
                            image={item.image}
                            title={item.title}
                            subtitle={item.subtitle}
                            discount={item.discount}
                            oldPrice={item.oldPrice}
                            newPrice={item.newPrice}
                            operatingSystemImage={item.operatingSystemImage}
                        />
                    )}
                />
            </OuterBlock>

            <FilterTabs data={filterOptions} defaultValue="Top Sellers" onChange={setActiveFilter} />

            <InfiniteScrollList
                data={allGames}
                itemsPerPage={4}
                renderItem={({ item }) => <GameCard game={item} />}
                keyExtractor={(item) => item.id}
            />
        </ScreenContainer>
    );
}