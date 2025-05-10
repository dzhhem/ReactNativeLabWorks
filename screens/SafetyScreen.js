import React, { useState } from "react";
import styled from "styled-components/native";
import { LinearGradient } from 'expo-linear-gradient';
import ScreenContainer from '../components/ScreenContainer';
import Header from "../components/Header";
import SegmentedTabs from '../components/SegmentedTabs';
import ButtonsList from "../components/ButtonsList";

const safetyTabs = [
    { label: 'Guard' },
    { label: 'Confirmations' },
];

const menuItems = [
    { id: '1', label: 'Remove Authenticator' },
    { id: '2', label: 'My Recovery Code' },
    { id: '3', label: 'Help' },
];

const Overlay = styled(LinearGradient).attrs({
    colors: ['transparent', 'rgba(151,151,151,0.16)'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
})`
    margin: 0 -20px 12px;
`;

const SafetyCodeBackground = styled.ImageBackground`
    height: 175px;
    justify-content: center;
    align-items: center;
`;

const SubText = styled.Text`
    color: ${({ theme }) => theme.colors.secondaryText};
    font-size: 16px;
`;

const CodeText = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: 54px;
    font-weight: bold;
    letter-spacing: 4px;
    margin-bottom: 12px;
`;

const Bar = styled.View`
    width: 158px;
    height: 7px;
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 4px;
    justify-content: center;
    align-items: flex-start;
`;

const Indicator = styled.View`
    width: 70%;
    height: 100%;
    background-color: #31bcfc;
    border-radius: 4px;
`;

const SafetyText = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 14px;
`;

const SafetyTextTip = styled.Text`
    color: #31bcfc;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 24px;
`;

export default function SafetyScreen() {
    const [activeTab, setActiveTab] = useState('Guard');

    return (
        <ScreenContainer>
            <Header title="Safety" />

            <SegmentedTabs data={safetyTabs} defaultValue="Guard" onChange={setActiveTab} />

            <Overlay>
                <SafetyCodeBackground source={require('../assets/img/SafetyScreen/net.png')}>
                    <SubText>Logged in as player</SubText>
                    <CodeText>N5KCV</CodeText>
                    <Bar>
                        <Indicator />
                    </Bar>
                </SafetyCodeBackground>
            </Overlay>

            <SafetyText>You’ll enter your code each time you enter your password to sign in to your Steam account.</SafetyText>
            <SafetyTextTip>Tip: If you don't share your PC, you can select "Remember my password" when you sign in to the PC client to enter your password and authenticator code less often.</SafetyTextTip>

            <ButtonsList
                items={menuItems}
                onPress={(item) => alert(item.label)}
            />
        </ScreenContainer>
    );
}