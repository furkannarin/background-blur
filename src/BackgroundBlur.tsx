import React, { useState, useEffect, useRef } from 'react';
import {
    ImageBackground,
    AppState,
    Dimensions,
    StyleProp,
    ViewStyle,
    ImageStyle,
    ImageSourcePropType,
    ImageResizeMode,
    Animated
} from 'react-native';

type Props = {
    onBlurImage: ImageSourcePropType,
    blurImageStyle?: StyleProp<ImageStyle>,
    blurIntensity?: number,
    resizeMode?: ImageResizeMode,
    onBlur?: () => any,
    onFocus?: () => any,
    transitionWithAnimation?: boolean,
    animDuration?: number
}

export type SecureScreenProps = Props;

const { height, width } = Dimensions.get('screen');
const AnimatedBackground = Animated.createAnimatedComponent(ImageBackground);
const blurContainerStyle: StyleProp<ViewStyle> = { height, width, position: 'absolute', zIndex: 100, left: 0 };

const BackgroundBlur = (props: Props) => {
    const {
        onBlur,
        onFocus,
        onBlurImage,
        blurImageStyle = undefined,
        blurIntensity = 3,
        resizeMode = 'cover',
        transitionWithAnimation = true,
        animDuration = 500
    } = props;

    const [isVisible, setVisible] = useState(false);

    const AnimOpacityValRef = useRef(new Animated.Value(transitionWithAnimation ? 0 : 1)).current;

    useEffect(() => {
        const onBlurListener = AppState.addEventListener('blur', function() {
                setVisible(true);

                if (transitionWithAnimation) {
                    Animated.timing(AnimOpacityValRef, {
                        useNativeDriver: true,
                        duration: animDuration,
                        toValue: 1
                    }).start();
                }

                if (onBlur) onBlur();
            }
        );

        const onFocusListener = AppState.addEventListener('focus', function() {
                if (transitionWithAnimation) {
                    Animated.timing(AnimOpacityValRef, {
                        useNativeDriver: true,
                        duration: animDuration,
                        toValue: 0
                    }).start(() => {
                        setVisible(false);
                        AnimOpacityValRef.setValue(1);
                    });
                } else {
                    setVisible(false);
                }

                if (onFocus) onFocus();
            }
        );

        return () => {
            onBlurListener.remove();
            onFocusListener.remove();
        }
    }, []);

    if (!isVisible) return null;

    return (
        <AnimatedBackground
            resizeMode={resizeMode}
            source={onBlurImage}
            style={[blurContainerStyle, { opacity: AnimOpacityValRef }]}
            imageStyle={blurImageStyle}
            blurRadius={blurIntensity}
        />
    );
}

export default BackgroundBlur;
