import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { Switch  } from 'react-native';
import { ThemeContext } from '../components/ThemeContext';
import ScreenContainer from '../components/ScreenContainer';
import ButtonsList from "../components/ButtonsList";

const AvatarContainer = styled.View`
    align-items: center;
    margin-bottom: 34px;
`;

const AvatarWrapper = styled.View`
    position: relative;
    margin-bottom: 10px;
`;

const Avatar = styled.Image`
    width: 98px;
    height: 98px;
    border-radius: 49px;
`;

const OnlineIndicator = styled.View`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 26px;
    height: 26px;
    border-radius: 13px;
    overflow: hidden;
    background-color: #00d44b;
    border-width: 2px;
    border-color: ${({ theme }) => theme.colors.background};
`;

const UserInfo = styled.Text`
    font-size: 16px;
    line-height: 24px;
    color: ${({ theme }) => theme.colors.text};
    text-align: center;
`;

const ProfileText = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: 16px;
`;

const SwitchRow = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
`;

const menuItems = [
    { id: '1', label: 'Settings' },
    { id: '2', label: 'Logout' }
];

export default function ProfileScreen() {
    const { themeName, toggleTheme } = useContext(ThemeContext);

    return (
        <ScreenContainer>
            <AvatarContainer>
                <AvatarWrapper>
                    <Avatar source={require('../assets/img/my-pfp.png')} />
                    <OnlineIndicator />
                </AvatarWrapper>
                <UserInfo>Makar Dzhehur</UserInfo>
                <UserInfo>BT-23-1</UserInfo>
            </AvatarContainer>

            <SwitchRow>
                <ProfileText>Dark Theme</ProfileText>
                <Switch
                    value={themeName === 'dark'}
                    onValueChange={toggleTheme}
                    trackColor={{ false: '#4b5664', true: '#31bcfc' }}
                    thumbColor='#ffffff'
                />
            </SwitchRow>

            <ButtonsList
                items={menuItems}
                onPress={(item) => alert(item.label)}
            />
        </ScreenContainer>
    );
}
