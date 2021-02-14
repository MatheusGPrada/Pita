import { Animated, Easing } from 'react-native';

export const getRotateAnimationStyle = (animation: Animated.Value, styles = {}) => {
    Animated.loop(
        Animated.timing(animation, {
            duration: 2000,
            easing: Easing.linear,
            toValue: 1,
            useNativeDriver: false,
        }),
    ).start();

    const spin = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return {
        transform: [{ rotate: spin }],
        ...styles,
    };
};
