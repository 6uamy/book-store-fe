import { render, screen } from '@testing-library/react';
import Title from './Title';
import { BookStoreThemeProvider } from '../../context/themeContext';

describe('Title component test', () => {
    it('renders check', () => {
        render(
            <BookStoreThemeProvider>
                <Title size='large'>제목 테스트</Title>
            </BookStoreThemeProvider>
        );

        expect(screen.getByText('제목 테스트')).toBeInTheDocument();
    });

    it('size props 적용', () => {
        const {container} = render(
            <BookStoreThemeProvider>
                <Title size='medium'>제목 테스트</Title>
            </BookStoreThemeProvider>
        );

        expect(container.firstChild).toHaveStyle({
            fontSize: '1.5rem'
        }); 
    });

    it('color props 적용', () => {
        const {container} = render(
            <BookStoreThemeProvider>
                <Title size='medium' color='primary'>제목 테스트</Title>
            </BookStoreThemeProvider>
        );

        expect(container.firstChild).toHaveStyle({
            color: 'brown'
        }); 
    });
});
