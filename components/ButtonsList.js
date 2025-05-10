import React from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const MenuItem = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.profileButton};
    padding: 18px 16px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-top-left-radius: ${({ isFirst }) => (isFirst ? '12px' : '0px')};
    border-top-right-radius: ${({ isFirst }) => (isFirst ? '12px' : '0px')};
    border-bottom-left-radius: ${({ isLast }) => (isLast ? '12px' : '0px')};
    border-bottom-right-radius: ${({ isLast }) => (isLast ? '12px' : '0px')};
    border-bottom-width: ${({ isLast }) => (!isLast ? '1px' : '0px')};
    border-bottom-color: ${({ theme }) => theme.colors.background};
`;

const MenuText = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: 16px;
`;

export default function ButtonsList({ items, onPress }) {
    return (
        <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
                <MenuItem
                    onPress={() => onPress?.(item)}
                    isFirst={index === 0}
                    isLast={index === items.length - 1}
                >
                    <MenuText>{item.label}</MenuText>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="#4b5664" />
                </MenuItem>
            )}
        />
    );
}
