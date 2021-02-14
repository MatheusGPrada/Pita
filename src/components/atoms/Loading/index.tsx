import { Animated } from 'react-native';
import React, { useState } from 'react';
import { LoadingProps } from './typings';
import { getRotateAnimationStyle } from '../../../utils/animations';
import Icon from 'react-native-vector-icons/AntDesign';

Icon.loadFont();

export const Loading = ({ size = 32, isBlue = false }: LoadingProps) => {
    const [rotateAnimation] = useState(new Animated.Value(0));
    const color = isBlue ? 'blue' : 'white';
    return (
        <Animated.View style={getRotateAnimationStyle(rotateAnimation)}>
            <Icon name="loading1" size={size} color={color} />
        </Animated.View>
    );
};
