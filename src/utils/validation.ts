import { useState } from 'react';
import { isValidCpf } from '../../node_modules/@brazilian-utils/is-valid-cpf';
import { formatCPF } from '../../node_modules/@brazilian-utils/format-cpf';
import { i18n } from '../_translate/i18n';

const isEmpty = (str?: string) => !str || 0 === str.length;

export const getErrorText = (errorString?: string): string[] | undefined => (errorString ? [errorString] : undefined);

export const useCpfValidations = (initialCpf = '') => {
    const [cpf, setCpf] = useState<string>(initialCpf);
    const [cpfError, setCpfError] = useState<string>();
    const [error, setError] = useState<string>();

    const cpfOnBlur = () => {
        setCpfError(!isEmpty(cpf) && !isValidCpf(cpf) ? i18n.t('helpers.invalidCpf') : '');
    };

    const handleCpf = (value: string) => {
        setCpf(formatCPF(value));
        if (isEmpty(value)) {
            setCpfError('');
        }
    };

    return {
        cpf,
        cpfError,
        cpfOnBlur,
        error,
        handleCpf,
        setCpf,
        setCpfError,
        setError,
    };
};
