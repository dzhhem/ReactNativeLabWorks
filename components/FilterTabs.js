import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const Container = styled.View`
    margin: 0 -20px 16px -20px;
    background-color: ${({ theme }) => theme.colors.background};
`;

const Button = styled.TouchableOpacity`
    padding: 10px 16px;
    border-radius: 8px;
    background-color: ${({ active, theme }) =>
    active ? theme.colors.filterButtonActive : theme.colors.filterButtonInactive};
    justify-content: center;
    align-items: center;
`;

const Label = styled.Text`
    color: ${({ theme }) => theme.colors.filterButton};
    font-size: 14px;
`;

const Separator = styled.View`
    width: 8px;
`;

export default function FilterTabs({ data, defaultValue, onChange }) {
    const [selected, setSelected] = useState(defaultValue ?? data?.[0]?.label);
    const theme = useTheme();

    useEffect(() => {
        onChange?.(selected);
    }, [selected]);

    return (
        <Container>
            <FlatList
                data={data}
                keyExtractor={(item) => item.label}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                ItemSeparatorComponent={() => <Separator />}
                renderItem={({ item }) => {
                    const isActive = selected === item.label;

                    return (
                        <Button active={isActive} onPress={() => setSelected(item.label)}>
                            {item.iconName ? (
                                <Ionicons
                                    name={item.iconName}
                                    size={20}
                                    color={theme.colors.filterButton}
                                />
                            ) : (
                                <Label active={isActive}>{item.label}</Label>
                            )}
                        </Button>
                    );
                }}
            />
        </Container>
    );
}
