import { Animated, Easing, EasingFunction } from 'react-native'

interface AnimateProps {
    animation: Animated.Value | Animated.ValueXY
    toValue: number
    duration: number
    easing?: EasingFunction
    useNativeDriver?: boolean
}

export const getRotateAnimationStyle = (animation: Animated.Value, styles = {}) => {
    Animated.loop(
        Animated.timing(animation, {
            duration: 2000,
            easing: Easing.linear,
            toValue: 1,
            useNativeDriver: false,
        }),
    ).start()

    const spin = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    })

    return {
        transform: [{ rotate: spin }],
        ...styles,
    }
}

export const animate = ({ animation, duration, easing = Easing.ease, toValue, useNativeDriver = true }: AnimateProps) => {
    Animated.timing(animation, { duration, easing, toValue, useNativeDriver }).start()
}
