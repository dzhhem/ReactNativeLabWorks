import React, { useState } from 'react';
import { FlatList } from 'react-native';

export default function InfiniteScrollList({
                                               data,
                                               renderItem,
                                               itemsPerPage = 2,
                                               keyExtractor = (item, index) => index.toString(),
                                               onEndReachedThreshold = 0.4,
                                               horizontal = false,
                                               ...props
                                           }) {
    const [page, setPage] = useState(1);

    const visibleData = data.slice(0, page * itemsPerPage);

    const handleEndReached = () => {
        if (visibleData.length < data.length) {
            setPage((prev) => prev + 1);
        }
    };

    return (
        <FlatList
            data={visibleData}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            onEndReached={handleEndReached}
            onEndReachedThreshold={onEndReachedThreshold}
            horizontal={horizontal}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            {...props}
        />
    );
}
