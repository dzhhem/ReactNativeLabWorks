import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
    background-color: ${({ theme }) => theme.colors.segmentedTabsWrapper};
    flex-direction: row;
    border-radius: 10px;
    padding: 4px;
    margin-bottom: 16px;
`;

const TabButton = styled.TouchableOpacity`
    flex: 1;
    padding: 8px;
    border-radius: 8px;
    background-color: ${({ active, theme }) => active ? theme.colors.segmentedTabsActive : 'transparent'};
    align-items: center;
    justify-content: center;
`;

const TabText = styled.Text`
    font-size: 14px;
    color: ${({ active, theme }) => active ? theme.colors.segmentedTabsActiveText : theme.colors.segmentedTabsInactiveText};
    font-weight: 500;
`;

export default function SegmentedTabs({ data, defaultValue, onChange }) {
    const [selected, setSelected] = useState(defaultValue ?? data?.[0]?.label);

    useEffect(() => {
        onChange?.(selected);
    }, [selected]);

    return (
        <Wrapper>
            {data.map((item) => {
                const isActive = selected === item.label;
                return (
                    <TabButton
                        key={item.label}
                        active={isActive}
                        onPress={() => setSelected(item.label)}
                    >
                        <TabText active={isActive}>{item.label}</TabText>
                    </TabButton>
                );
            })}
        </Wrapper>
    );
}
