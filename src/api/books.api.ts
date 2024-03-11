import { Book, BookDetail } from '../models/book.model';
import { Pagination } from '../models/pagination.model';
import { httpClient } from './http';

interface FetchBooksParams {
    category_id?: number;
    new_book?: boolean;
    currentPage?: number;
    limit?: number;
}

interface FetchBooksResponse {
    books: Book[];
    pagination: Pagination;
}

export const fetchBooks = async (params: FetchBooksParams) => {
    try {
        const response = await httpClient.get<FetchBooksResponse>('/books', {
            params: params,
        });

        return response.data;
    } catch (error) {
        return {
            books: [],
            pagination: {
                totalCount: 0,
                currentPage: 1,
            },
        };
    }
};

export const fetchBook = async (id: string) => {
    const response = await httpClient.get<BookDetail>(`/books/${id}`);

    return response.data;
};

export const likeBook = async (id: number) => {
    const response = await httpClient.post(`/likes/${id}`);

    return response.data;
};

export const unlikeBook = async (id: number) => {
    const response = await httpClient.delete(`/likes/${id}`);

    return response.data;
};
