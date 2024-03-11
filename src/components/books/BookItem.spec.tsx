import React from 'react';
import { render, screen } from '@testing-library/react';
import BookItem from './BookItem';
import { BookStoreThemeProvider } from '../../context/themeContext';
import { formatNumber } from '../../utils/fomat';
import { Book } from '../../models/book.model';

const dummyBook: Book = {
    id: 1,
    title: 'Dummy Book',
    img: 5,
    category_id: 1,
    summary: 'Dummy Summary',
    author: 'Dummy Author',
    price: 10000,
    likes: 1,
    form: 'paperback',
    isbn: 'Dummy ISBN',
    detail: 'Dummy Detail',
    pages: 100,
    contents: 'Dummy Contents',
    pub_date: '2021-01-01',
};

describe('BookItem component test', () => {
    it('renders check', () => {
        render(
            <BookStoreThemeProvider>
                <BookItem book={dummyBook} />
            </BookStoreThemeProvider>
        );

        expect(screen.getByText(dummyBook.title)).toBeInTheDocument();
        expect(screen.getByText(dummyBook.summary)).toBeInTheDocument();
        expect(screen.getByText(dummyBook.author)).toBeInTheDocument();
        expect(screen.getByText(formatNumber(dummyBook.price) + '원')).toBeInTheDocument();
        expect(screen.getByText(dummyBook.likes)).toBeInTheDocument();
        expect(screen.getByAltText(dummyBook.title)).toHaveAttribute('src', `https://picsum.photos/id/${dummyBook.img}/600/600`);
    });
});
