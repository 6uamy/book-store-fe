import { render, screen } from '@testing-library/react';
import InputText from './InputText';
import { BookStoreThemeProvider } from '../../context/themeContext';
import React from 'react';

describe('Button component test', () => {
    it('renders check', () => {
        render(
            <BookStoreThemeProvider>
                <InputText placeholder='여기에 입력' />
            </BookStoreThemeProvider>
        );

        expect(screen.getByPlaceholderText('여기에 입력')).toBeInTheDocument();
    });

    it('forwerdRef 테스트', () => {
        const ref = React.createRef<HTMLInputElement>();
        render(
            <BookStoreThemeProvider>
                <InputText ref={ref} placeholder='여기에 입력' />
            </BookStoreThemeProvider>
        );

        expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
});