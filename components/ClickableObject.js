import React, { useRef, useState } from 'react';
import { StyleSheet, View, Animated, Text } from 'react-native';
import {
    TapGestureHandler,
    LongPressGestureHandler,
    PanGestureHandler,
    FlingGestureHandler,
    PinchGestureHandler,
    State,
    Directions,
} from 'react-native-gesture-handler';
import { useGameContext } from '../context/GameContext';

const ClickableObject = () => {
    const { addPoints, updateTaskProgress } = useGameContext();

    const scale = useRef(new Animated.Value(1)).current;
    const translateX = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(1)).current;

    const doubleTapRef = useRef();
    const pinchRef = useRef()
    const panRef = useRef();
    const flingLeftRef = useRef();
    const flingRightRef = useRef();

    const [message, setMessage] = useState('');
    const [points, setPoints] = useState(null);

    const showPoints = (pts) => {
        setPoints(pts);
        setTimeout(() => setPoints(null), 1000);
    };

    const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(''), 2000);
    };

    const onSingleTap = (event) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            Animated.sequence([
                Animated.timing(scale, {
                    toValue: 1.2,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(scale, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true,
                }),
            ]).start();

            const pointsToAdd = 1;
            addPoints(pointsToAdd);
            updateTaskProgress('tap');
            showPoints(`+${pointsToAdd}`);
            showMessage('Клік!');
        }
    };

    const onDoubleTap = (event) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            Animated.sequence([
                Animated.timing(scale, {
                    toValue: 1.5,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(scale, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true,
                }),
            ]).start();

            const pointsToAdd = 2;
            addPoints(pointsToAdd);
            updateTaskProgress('doubleTap');
            showPoints(`+${pointsToAdd}`);
            showMessage('Подвійний клік!');
        }
    };

    const onLongPress = (event) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 0.5,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();

            const pointsToAdd = 5;
            addPoints(pointsToAdd);
            updateTaskProgress('longPress');
            showPoints(`+${pointsToAdd}`);
            showMessage('Довге натискання!');
        }
    };

    const onPan = (event) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            translateX.setValue(event.nativeEvent.translationX);
            translateY.setValue(event.nativeEvent.translationY);
            updateTaskProgress('pan');
        } else if (event.nativeEvent.state === State.END) {
            Animated.spring(translateX, {
                toValue: 0,
                useNativeDriver: true,
                bounciness: 10,
            }).start();
            Animated.spring(translateY, {
                toValue: 0,
                useNativeDriver: true,
                bounciness: 10,
            }).start();
            showMessage('Перетягування об\'єкта!');
        }
    };

    const onFlingRight = (event) => {
        if (event.nativeEvent.state === State.END) {
            Animated.sequence([
                Animated.timing(translateX, {
                    toValue: 200,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(translateX, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();

            const pointsToAdd = Math.floor(Math.random() * 10) + 1;
            addPoints(pointsToAdd);
            updateTaskProgress('flingRight');
            showPoints(`+${pointsToAdd}`);
            showMessage('Свайп вправо!');
        }
    };

    const onFlingLeft = (event) => {
        if (event.nativeEvent.state === State.END) {
            Animated.sequence([
                Animated.timing(translateX, {
                    toValue: -200,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(translateX, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();

            const pointsToAdd = Math.floor(Math.random() * 10) + 1;
            addPoints(pointsToAdd);
            updateTaskProgress('flingLeft');
            showPoints(`+${pointsToAdd}`);
            showMessage('Свайп вліво!');
        }
    };

    const onPinch = (event) => {
        const newScale = event.nativeEvent.scale;
        scale.setValue(newScale);

        if (event.nativeEvent.state === State.END) {
            Animated.spring(scale, {
                toValue: 1,
                useNativeDriver: true,
                friction: 3,
            }).start();

            if (Math.abs(newScale - 1) > 0.5) {
                const pointsToAdd = 3;
                addPoints(pointsToAdd);
                updateTaskProgress('pinch');
                showPoints(`+${pointsToAdd}`);
                showMessage('Змінa розміру!');
            }
        }
    };

    return (
        <View style={styles.container}>
            {message ? <Text style={styles.messageText}>{message}</Text> : null}

            <FlingGestureHandler
                ref={flingRightRef}
                direction={Directions.RIGHT}
                simultaneousHandlers={panRef}
                onHandlerStateChange={onFlingRight}
            >
                <FlingGestureHandler
                    ref={flingLeftRef}
                    direction={Directions.LEFT}
                    simultaneousHandlers={panRef}
                    onHandlerStateChange={onFlingLeft}
                >
                    <PinchGestureHandler
                        ref={pinchRef}
                        onGestureEvent={onPinch}
                        onHandlerStateChange={onPinch}
                    >
                        <Animated.View>
                            <PanGestureHandler
                                ref={panRef}
                                simultaneousHandlers={[flingLeftRef, flingRightRef]}
                                onGestureEvent={onPan}
                                onHandlerStateChange={onPan}
                            >
                                <Animated.View>
                                    <LongPressGestureHandler
                                        minDurationMs={3000}
                                        onHandlerStateChange={onLongPress}
                                    >
                                        <Animated.View>
                                            <TapGestureHandler
                                                waitFor={doubleTapRef}
                                                onHandlerStateChange={onSingleTap}
                                            >
                                                <Animated.View>
                                                    <TapGestureHandler
                                                        ref={doubleTapRef}
                                                        numberOfTaps={2}
                                                        onHandlerStateChange={onDoubleTap}
                                                    >
                                                        <Animated.View
                                                            style={[
                                                                styles.clickableObject,
                                                                {
                                                                    transform: [
                                                                        { translateX },
                                                                        { translateY },
                                                                        { scale }
                                                                    ],
                                                                    opacity,
                                                                },
                                                            ]}
                                                        >
                                                            {points && (
                                                                <Animated.Text style={styles.pointsText}>
                                                                    {points}
                                                                </Animated.Text>
                                                            )}
                                                        </Animated.View>
                                                    </TapGestureHandler>
                                                </Animated.View>
                                            </TapGestureHandler>
                                        </Animated.View>
                                    </LongPressGestureHandler>
                                </Animated.View>
                            </PanGestureHandler>
                        </Animated.View>
                    </PinchGestureHandler>
                </FlingGestureHandler>
            </FlingGestureHandler>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30,
    },
    clickableObject: {
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: '#6200EE',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    pointsText: {
        color: '#fff',
        fontSize: 42,
        fontWeight: 'bold',
    },
    messageText: {
        position: 'absolute',
        top: -40,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#6200EE',
    },
});

export default ClickableObject;