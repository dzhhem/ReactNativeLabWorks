import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const Container = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 12px 0;
`;

const GameImage = styled.Image`
    width: 72px;
    height: 50px;
    border-radius: 8px;
    margin-right: 14px;
`;

const Info = styled.View`
    flex: 1;
`;

const Title = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: 16px;
    margin-bottom: 2px;
`;

const PlatformRow = styled.View`
    flex-direction: row;
    align-items: center;
`;

const PlatformIcon = styled.View`
    flex-direction: row;
    align-items: center;
    margin-right: 4px;
`;

const PlatformText = styled.Text`
    color: ${({ theme }) => theme.colors.secondaryText};
    font-size: 12px;
    margin-left: 2px;
`;

const PriceBlock = styled.View`
    align-items: flex-end;
`;

const PriceTop = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 2px;
`;

const OldPrice = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.6;
    font-size: 10px;
    text-decoration: line-through;
    margin-right: 4px;
`;

const NewPrice = styled.Text`
    font-size: 16px;
    color: ${({ theme }) => theme.colors.text};
`;

const Discount = styled.Text`
    color: #ffffff;
    background-color: #0e7a3c;
    font-size: 12px;
    border-radius: 4px;
    padding: 2px 6px;
`;

const getPlatformIcon = (platform) => {
    switch (platform.toLowerCase()) {
        case 'windows':
            return 'logo-windows';
        case 'mac':
            return 'logo-apple';
        default:
            return 'logo-windows';
    }
};

export default function GameCard({ game }) {
    return (
        <Container>
            <GameImage source={game.image} resizeMode="cover" />
            <Info>
                <Title>{game.title}</Title>
                <PlatformRow>
                    {game.platforms.map((platform, index) => (
                        <PlatformIcon key={index}>
                            <Ionicons name={getPlatformIcon(platform)} size={14} color="#7b8d9d" />
                            <PlatformText>
                                {platform}
                                {index < game.platforms.length - 1 ? ',' : ''}
                            </PlatformText>
                        </PlatformIcon>
                    ))}
                </PlatformRow>
            </Info>
            <PriceBlock>
                <PriceTop>
                    {game.oldPrice && <OldPrice>{game.oldPrice}</OldPrice>}
                    <NewPrice>{game.newPrice}</NewPrice>
                </PriceTop>
                {game.discount && <Discount>{game.discount}</Discount>}
            </PriceBlock>
        </Container>
    );
}
