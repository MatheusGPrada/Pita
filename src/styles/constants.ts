import { DefaultTheme } from 'styled-components/native'

const m1 = 1
const SPACER = 4
const m8 = 2 * SPACER
const m12 = 3 * SPACER
const m16 = 4 * SPACER
const m20 = 5 * SPACER
const m24 = 6 * SPACER
const m28 = 7 * SPACER
const m32 = 8 * SPACER
const m36 = 9 * SPACER
const m40 = 10 * SPACER
const m48 = 12 * SPACER
const m60 = 15 * SPACER

const BORDER_STYLE_DEFAULT = (theme: DefaultTheme) => ({
    borderRadius: 4,
    borderWidth: 1,
    marginTop: theme.margins.m8,
})

const transparentModalOptions = {
    cardOverlayEnabled: true,
    cardStyle: { backgroundColor: 'transparent' },

    cardStyleInterpolator: ({ current: { progress } }) => ({
        cardStyle: {
            opacity: progress.interpolate({
                inputRange: [0, 0.5, 0.9, 1],
                outputRange: [0, 0.25, 0.7, 1],
            }),
        },

        overlayStyle: {
            opacity: progress.interpolate({
                extrapolate: 'clamp',
                inputRange: [0, 1],
                outputRange: [0, 0.5],
            }),
        },
    }),
    gestureEnabled: false,
    headerShown: false,
}

export { SPACER, m8, m1, m12, m16, m20, m24, m28, m32, m36, m40, m48, m60, BORDER_STYLE_DEFAULT, transparentModalOptions }
