import React from 'react';
import styled from 'styled-components/native';

const CardContainer = styled.View`
    border-radius: 14px;
    overflow: hidden;
`;

const BackgroundImage = styled.ImageBackground`
    height: 230px;
    width: 327px;
`;

const ImagePanel = styled.View`
    background-color: rgba(0, 0, 0, 0.4);
    justify-content: flex-end;
    padding: 20px;
    width: 100%;
    height: 100%;
`;

const Title = styled.Text`
    color: #ffffff;
    font-size: 20px;
    font-weight: bold;
`;

const Subtitle = styled.Text`
    color: #bcd0e8;
    font-size: 14px;
    margin-bottom: 14px;
`;

const PriceRow = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const PriceLeft = styled.View`
    flex-direction: row;
    align-items: center;
`;

const Discount = styled.Text`
    background-color: #056d29;
    color: #ffffff;
    font-size: 12px;
    padding: 2px 6px;
    border-radius: 4px 0 0 4px;
`;

const Price = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 0 4px 4px 0;
    padding: 2px 6px;
`;

const OldPrice = styled.Text`
    color: rgba(255, 255, 255, 0.7);
    font-size: 12px;
    text-decoration: line-through;
    margin-right: 4px;
`;

const NewPrice = styled.Text`
    color: #ffffff;
    font-size: 12px;
`;

const OperatingSystem = styled.Image`
    width: 18px;
    height: 18px;
`;

export default function RecommendationCard({ image, title, subtitle, discount, oldPrice, newPrice, operatingSystemImage }) {
    return (
        <CardContainer>
            <BackgroundImage source={image} resizeMode="cover">
                <ImagePanel>
                    <Title>{title}</Title>
                    <Subtitle>{subtitle}</Subtitle>
                    <PriceRow>
                        <PriceLeft>
                            <Discount>{discount}</Discount>
                            <Price>
                                <OldPrice>{oldPrice}</OldPrice>
                                <NewPrice>{newPrice}</NewPrice>
                            </Price>
                        </PriceLeft>
                        <OperatingSystem source={operatingSystemImage}></OperatingSystem>
                    </PriceRow>
                </ImagePanel>
            </BackgroundImage>
        </CardContainer>
    );
}