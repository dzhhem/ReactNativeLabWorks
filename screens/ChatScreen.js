import React, { useState } from "react";
import ScreenContainer from '../components/ScreenContainer';
import Header from "../components/Header";
import SegmentedTabs from '../components/SegmentedTabs';
import InfiniteScrollList from '../components/InfiniteScrollList';
import ChatItem from '../components/ChatItem';

const chatTabs = [
    { label: 'Open chats' },
    { label: 'My friends' },
];

const chats = [
    {
        id: '1',
        avatar: require('../assets/img/ChatScreen/mark.jpg'),
        name: 'Mark Dyson',
        lastMessage: "I'm already starting to play",
        date: '14 Jun',
        unread: 1,
        online: true,
    },
    {
        id: '2',
        avatar: require('../assets/img/ChatScreen/mark.jpg'),
        name: 'Mark Dyson',
        your: true,
        lastMessage: 'Ok',
        date: '14 Jun',
        online: true,
        reacted: true,
    },
    {
        id: '3',
        avatar: require('../assets/img/ChatScreen/player123.jpg'),
        name: 'Player123',
        your: true,
        lastMessage: 'Ok',
        date: '14 Jun',
        passive: true,
        reacted: true,
    },
    {
        id: '4',
        avatar: require('../assets/img/ChatScreen/player123.jpg'),
        name: 'Player123',
        your: true,
        lastMessage: 'Ok',
        date: '14 Jun',
        passive: true,
        reacted: true,
    },
    {
        id: '5',
        avatar: require('../assets/img/ChatScreen/player.jpg'),
        name: 'Player',
        lastMessage: 'Hello!',
        date: '12 Jun',
    },
    {
        id: '6',
        avatar: require('../assets/img/ChatScreen/player.jpg'),
        name: 'Player',
        lastMessage: 'Hello!',
        date: '12 Jun',
    },
    {
        id: '7',
        avatar: require('../assets/img/ChatScreen/expresso.jpg'),
        name: '💎 ∑χρŗêssσ #=_-#',
        lastMessage: 'Ok',
        date: '12 Jun',
        online: true,
    },
    {
        id: '8',
        avatar: require('../assets/img/ChatScreen/expresso.jpg'),
        name: '💎 ∑χρŗêssσ #=_-#',
        lastMessage: 'Ok',
        date: '12 Jun',
    },
    {
        id: '9',
        avatar: require('../assets/img/ChatScreen/mark.jpg'),
        name: 'Mark Dyson',
        lastMessage: "I'm already starting to play",
        date: '14 Jun',
        unread: 1,
        online: true,
    },
    {
        id: '10',
        avatar: require('../assets/img/ChatScreen/mark.jpg'),
        name: 'Mark Dyson',
        your: true,
        lastMessage: 'Ok',
        date: '14 Jun',
        online: true,
        reacted: true,
    },
    {
        id: '11',
        avatar: require('../assets/img/ChatScreen/player123.jpg'),
        name: 'Player123',
        your: true,
        lastMessage: 'Ok',
        date: '14 Jun',
        passive: true,
        reacted: true,
    },
    {
        id: '12',
        avatar: require('../assets/img/ChatScreen/player123.jpg'),
        name: 'Player123',
        your: true,
        lastMessage: 'Ok',
        date: '14 Jun',
        passive: true,
        reacted: true,
    },
    {
        id: '13',
        avatar: require('../assets/img/ChatScreen/player.jpg'),
        name: 'Player',
        lastMessage: 'Hello!',
        date: '12 Jun',
    },
    {
        id: '14',
        avatar: require('../assets/img/ChatScreen/player.jpg'),
        name: 'Player',
        lastMessage: 'Hello!',
        date: '12 Jun',
    },
    {
        id: '15',
        avatar: require('../assets/img/ChatScreen/expresso.jpg'),
        name: '💎 ∑χρŗêssσ #=_-#',
        lastMessage: 'Ok',
        date: '12 Jun',
        online: true,
    },
    {
        id: '16',
        avatar: require('../assets/img/ChatScreen/expresso.jpg'),
        name: '💎 ∑χρŗêssσ #=_-#',
        lastMessage: 'Ok',
        date: '12 Jun',
    },
    {
        id: '17',
        avatar: require('../assets/img/ChatScreen/mark.jpg'),
        name: 'Mark Dyson',
        lastMessage: "I'm already starting to play",
        date: '14 Jun',
        unread: 1,
        online: true,
    },
    {
        id: '18',
        avatar: require('../assets/img/ChatScreen/mark.jpg'),
        name: 'Mark Dyson',
        your: true,
        lastMessage: 'Ok',
        date: '14 Jun',
        online: true,
        reacted: true,
    },
    {
        id: '19',
        avatar: require('../assets/img/ChatScreen/player123.jpg'),
        name: 'Player123',
        your: true,
        lastMessage: 'Ok',
        date: '14 Jun',
        passive: true,
        reacted: true,
    },
    {
        id: '20',
        avatar: require('../assets/img/ChatScreen/player123.jpg'),
        name: 'Player123',
        your: true,
        lastMessage: 'Ok',
        date: '14 Jun',
        passive: true,
        reacted: true,
    },
    {
        id: '21',
        avatar: require('../assets/img/ChatScreen/player.jpg'),
        name: 'Player',
        lastMessage: 'Hello!',
        date: '12 Jun',
    },
    {
        id: '22',
        avatar: require('../assets/img/ChatScreen/player.jpg'),
        name: 'Player',
        lastMessage: 'Hello!',
        date: '12 Jun',
    },
    {
        id: '23',
        avatar: require('../assets/img/ChatScreen/expresso.jpg'),
        name: '💎 ∑χρŗêssσ #=_-#',
        lastMessage: 'Ok',
        date: '12 Jun',
        online: true,
    },
    {
        id: '24',
        avatar: require('../assets/img/ChatScreen/expresso.jpg'),
        name: '💎 ∑χρŗêssσ #=_-#',
        lastMessage: 'Ok',
        date: '12 Jun',
    },
];

export default function ChatScreen() {
    const [activeTab, setActiveTab] = useState('Open chats');

    return (
        <ScreenContainer>
            <Header title="Chat" showSearch={true} />

            <SegmentedTabs data={chatTabs} defaultValue="Open chats" onChange={setActiveTab} />

            <InfiniteScrollList
                data={chats}
                itemsPerPage={4}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ChatItem chat={item} />}
            />
        </ScreenContainer>
    );
}