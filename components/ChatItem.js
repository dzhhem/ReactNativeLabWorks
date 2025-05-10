import React from 'react';
import styled from 'styled-components/native';

const Container = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    padding: 14px 0;
`;

const AvatarBlock = styled.View`
    position: relative;
    margin-right: 12px;
`;

const Avatar = styled.Image`
    width: 52px;
    height: 52px;
    border-radius: 26px;
`;

const UserStatus = styled.View`
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: ${({ passive, online }) => passive ? '#31bcfc' : online ? '#00d44b' : null};
    width: 14px;
    height: 14px;
    border-radius: 7px;
    border-width: 2px;
    border-color: ${({ theme }) => theme.colors.background};
`;

const InfoBlock = styled.View`
    flex: 1;
`;

const Name = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: 16px;
    line-height: 26px;
    font-weight: 500;
`;

const YourMessage = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: 14px;
`;

const LastMessageAndDate = styled.Text`
    color: ${({ theme }) => theme.colors.secondaryText};
    font-size: 14px;
`;

const ReactionDot = styled.View`
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.text};
`;

const RightBlock = styled.View`
    align-items: flex-end;
`;

const Badge = styled.View`
    background-color: #31bcfc;
    width: 24px;
    height: 24px;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
`;

const BadgeText = styled.Text`
    color: #000000;
    font-size: 12px;
`;

export default function ChatItem({ chat }) {
    return (
        <Container onPress={() => alert(`Open chat with ${chat.name}`)}>
            <AvatarBlock>
                <Avatar source={chat.avatar} />
                {(chat.online || chat.passive) && (
                    <UserStatus online={chat.online} passive={chat.passive} />
                )}
            </AvatarBlock>
            <InfoBlock>
                <Name>{chat.name}</Name>
                <LastMessageAndDate>
                    {(chat.your) && (
                        <YourMessage>You: </YourMessage>
                    )}
                    {chat.lastMessage} • {chat.date}
                </LastMessageAndDate>
            </InfoBlock>
            <RightBlock>
                {chat.unread ? (
                    <Badge>
                        <BadgeText>{chat.unread}</BadgeText>
                    </Badge>
                ) : chat.reacted ? (
                    <ReactionDot />
                ) : null}
            </RightBlock>
        </Container>
    );
}
