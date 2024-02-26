import { render, screen } from '@testing-library/react';
import Button from './Button';
import { BookStoreThemeProvider } from '../../context/themeContext';

describe('Button component test', () => {
    it('renders check', () => {
        render(
            <BookStoreThemeProvider>
                <Button size='large' scheme='primary'>버튼 테스트</Button>
            </BookStoreThemeProvider>
        );

        expect(screen.getByText('버튼 테스트')).toBeInTheDocument();
    });

    it('size props 적용', () => {
        const {container} = render(
            <BookStoreThemeProvider>
                <Button size='large' scheme='primary'>버튼 테스트</Button>
            </BookStoreThemeProvider>
        );

        expect(screen.getByRole('button')).toHaveStyle({
            fontSize: '1.5rem'
        }); 
    });

    it('cursor props 적용', () => {
        const {container} = render(
            <BookStoreThemeProvider>
                <Button size='large' scheme='normal' disabled={true}>버튼 테스트</Button>
            </BookStoreThemeProvider>
        );

        expect(screen.getByRole('button')).toHaveStyle({
            cursor: 'none'
        }); 
    });
});