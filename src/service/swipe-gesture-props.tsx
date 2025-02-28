import React, { useRef } from 'react';
import { Animated, PanResponder, GestureResponderEvent, PanResponderGestureState } from 'react-native';
import { DirectionSwipeEnum } from "../enums/direction-swipe.enum.tsx";

export interface ISwipeParam {
    type: string;
    direction: DirectionSwipeEnum,
    dx: number
}

export interface SwipeGestureProps {
    gestureStyle?: any;
    children?: React.ReactNode;
    onSwipePerformed: ({ type, direction, dx }: { type: string; direction: DirectionSwipeEnum, dx: number }) => void;
    type: string;
}

const SwipeGesture = (props: SwipeGestureProps) => {
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
                const { dx, dy } = gestureState;

                if (Math.abs(dx) > Math.abs(dy)) {
                    if (dx > 1) {
                        props.onSwipePerformed({ type: props.type, direction: DirectionSwipeEnum.RIGHT, dx });
                    } else if (dx < -1) {
                        props.onSwipePerformed({ type: props.type, direction: DirectionSwipeEnum.LEFT, dx });
                    }
                } else {
                    if (dy > 1) {
                        props.onSwipePerformed({ type: props.type, direction: DirectionSwipeEnum.DOWN, dx });
                    } else if (dy < -1) {
                        props.onSwipePerformed({ type: props.type, direction: DirectionSwipeEnum.UP, dx });
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
