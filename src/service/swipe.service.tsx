import {DirectionSwipeEnum} from "../enums/direction-swipe.enum.tsx";

export const onSwipePerformed = (action: { type: string, direction: DirectionSwipeEnum }) => {
    switch (action.direction) {
        case DirectionSwipeEnum.LEFT: {
            console.log('left Swipe performed');
            break;
        }
        case DirectionSwipeEnum.RIGHT: {
            console.log('right Swipe performed');
            break;
        }
        case DirectionSwipeEnum.UP: {
            console.log('up Swipe performed');
            break;
        }
        case DirectionSwipeEnum.DOWN: {
            console.log('down Swipe performed');
            break;
        }
        default : {
            console.log('Undeteceted action');
        }
    }
}
