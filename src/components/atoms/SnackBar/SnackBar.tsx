import React, { FC, useState } from 'react'
import { Snackbar } from 'react-native-paper'
import { i18n } from '../../../../src/_translate/i18n'

export const SnackBar: FC = ({ message, onPress, backgroundColor, setVisible }: SnackBarProps) => (
    <Snackbar
        action={{
            label: i18n.t('labels.OK'),
            onPress: onPress ? onPress() : () => null,
        }}
        visible={true}
        style={{ backgroundColor: backgroundColor }}
        onDismiss={() => setVisible(false)}
    >
        {message}
    </Snackbar>
)