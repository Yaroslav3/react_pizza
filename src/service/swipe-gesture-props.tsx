import React, {useRef } from 'react';
import { Animated, PanResponder, GestureResponderEvent, PanResponderGestureState } from 'react-native';
import {DirectionSwipeEnum} from "../enums/direction-swipe.enum.tsx";

export interface SwipeGestureProps {
    gestureStyle?: any;
    children?: React.ReactNode;
    // @ts-ignore
    onSwipePerformed:({type, direction}) => void
    type: string
}

const SwipeGesture = (props: SwipeGestureProps) => {
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => true,
            onPanResponderRelease: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
                const x = gestureState.dx;
                const y = gestureState.dy;
                if (Math.abs(x) > Math.abs(y)) {
                    if (x >= 0) {
                        props.onSwipePerformed({ type: props.type, direction: DirectionSwipeEnum.RIGHT})
                    } else {
                        props.onSwipePerformed({ type: props.type, direction: DirectionSwipeEnum.LEFT})
                    }
                } else {
                    if (y >= 0) {
                        props.onSwipePerformed({ type: props.type, direction: DirectionSwipeEnum.DOWN})
                    } else {
                        props.onSwipePerformed({ type: props.type, direction: DirectionSwipeEnum.UP})
                    }
                }
            }
        })
    ).current;

    return (
        <Animated.View {...panResponder.panHandlers} style={props.gestureStyle}>
            {props.children}
        </Animated.View>
    );
};

export default SwipeGesture;
