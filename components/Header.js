import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const HeaderContainer = styled.View`
    background-color: ${({ theme }) => theme.colors.background};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18px;
`;

const HeaderLeft = styled.View`
    flex-direction: row;
    align-items: center;
`;

const HeaderLogo = styled.Image`
    width: 36px;
    height: 36px;
    border-radius: 18px;
    margin-right: 8px;
    background-color: #1c202c;
`;

const HeaderTitle = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: 28px;
`;

export default function Header({ title, showSearch = false }) {
    return (
        <HeaderContainer>
            <HeaderLeft>
                <HeaderLogo source={require('../assets/img/logo.png')} />
                <HeaderTitle>{title}</HeaderTitle>
            </HeaderLeft>

            {showSearch && (
                <TouchableOpacity onPress={() => alert('Search')}>
                    <Ionicons name="search" size={28} color="#4b5664" />
                </TouchableOpacity>
            )}
        </HeaderContainer>
    );
}
