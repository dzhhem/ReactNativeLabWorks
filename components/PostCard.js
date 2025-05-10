import React from 'react';
import styled from 'styled-components/native';
import { Ionicons, Feather, MaterialIcons, Fontisto } from '@expo/vector-icons';
import {TouchableOpacity} from "react-native";

const Card = styled.View`
    padding: 14px 20px;
    border-top-color: ${({ theme }) => theme.colors.postCardSeparator};
    border-top-width: 8px;
`;

const HeaderRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
`;

const AuthorSection = styled.View`
    flex-direction: row;
    align-items: center;
`;

const AuthorImage = styled.Image`
    width: 34px;
    height: 34px;
    border-radius: 17px;
    margin-right: 10px;
`;

const AuthorInfo = styled.View``;

const Author = styled.View`
    flex-direction: row;
    align-items: center;
`;

const AuthorBlock = styled.View`
    margin-right: 6px;
`;

const AuthorText = styled.Text`
    font-size: 16px;
    color: ${({ theme }) => theme.colors.text};
`;

const TagBlock = styled.View`
    background-color: #b63db6;
    padding: 2px 4px;
    border-radius: 4px;
    overflow: hidden;
`;

const TagText = styled.Text`
    color: #ffffff;
    font-size: 10px;
`;

const Time = styled.Text`
    color: ${({ theme }) => theme.colors.secondaryText};
    font-size: 12px;
`;

const PostImage = styled.Image`
    width: 100%;
    height: 190px;
    border-radius: 10px;
    margin-bottom: 14px;
`;

const PostContent = styled.View`
    padding-bottom: 12px;
    border-bottom-width: 1px;
    border-bottom-color: #303649;
    margin-bottom: 16px;
`;

const Title = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: 16px;
    line-height: 22px;
    font-weight: 500;
    margin-bottom: 4px;
`;

const Content = styled.Text`
    color: ${({ theme }) => theme.colors.secondaryText};
    font-size: 14px;
    line-height: 20px;
`;

const Reactions = styled.View`
    flex-direction: row;
    gap: 16px;
`;

const Reaction = styled.View`
    flex-direction: row;
    align-items: center;
`;

const ReactionText = styled.Text`
    color: #4c5664;
    font-size: 14px;
    margin-left: 4px;
`;

const Activity = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export default function PostCard({ post }) {
    return (
        <Card>
            <HeaderRow>
                <AuthorSection>
                    <AuthorImage source={post.pfp}></AuthorImage>
                    <AuthorInfo>
                        <Author>
                            <AuthorBlock><AuthorText>{post.author}</AuthorText></AuthorBlock>
                            {post.tag && <TagBlock><TagText>{post.tag}</TagText></TagBlock>}
                        </Author>
                        <Time>{post.time}</Time>
                    </AuthorInfo>
                </AuthorSection>
                <TouchableOpacity onPress={() => alert('More info')}>
                    <Ionicons name="ellipsis-horizontal" size={26} color="#7b8d9d" />
                </TouchableOpacity>
            </HeaderRow>

            <PostImage source={post.image} resizeMode="cover" />

            <PostContent>
                <Title>{post.title}</Title>
                <Content>{post.content}</Content>
            </PostContent>
            <Activity>
                <Reactions>
                    <Reaction>
                        <Feather name="thumbs-up" size={22} color="#00d44b" />
                        <ReactionText style={{ color: "#00d44b" }}>{post.likes}</ReactionText>
                    </Reaction>
                    <Reaction>
                        <MaterialIcons name="chat-bubble-outline" size={22} color="#4c5664" />
                        <ReactionText>{post.comments}</ReactionText>
                    </Reaction>
                </Reactions>
                <Fontisto name="share-a" size={20} color="#4c5664" />
            </Activity>
        </Card>
    );
}
