import styled from "styled-components/native";

const StyledView = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
    align-items: center;
    justify-content: center;
`;

const StyledText = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: 24px;
`;

export default function StyledComponent({ text }) {
    return (
        <StyledView>
            <StyledText>{text}</StyledText>
        </StyledView>
    );
}