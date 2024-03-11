import { useEffect, useState } from 'react';
import { BookDetail } from '../models/book.model';
import { fetchBook, likeBook, unlikeBook } from '../api/books.api';
import { useAuthStore } from '../store/authStore';
import { useAlert } from './useAlert';
import { addCart } from '../api/carts.api';

export const useBook = (id: string | undefined) => {
    const [book, setBook] = useState<BookDetail | null>(null);
    const { isLoggedIn } = useAuthStore();
    const [cartAdded, setCartAdded] = useState<boolean>(false);
    const showAlert = useAlert();

    const likeToggle = () => {
        if (!isLoggedIn) {
            showAlert('로그인이 필요한 서비스입니다.');
            return;
        }

        if (!book) return;

        if (book.liked) {
            // like > unlike
            unlikeBook(book.id).then(() => {
                setBook({
                    ...book,
                    liked: false,
                    likes: book.likes - 1,
                });
            });
        } else {
            // unlike > like
            likeBook(book.id).then(() => {
                setBook({
                    ...book,
                    liked: true,
                    likes: book.likes + 1,
                });
            });
        }
    };

    const addToCart = (quantity: number) => {
        if (!book) return;

        addCart({ book_id: book.id, quantity: quantity }).then(() => {
            setCartAdded(true);
            setTimeout(() => {
                setCartAdded(false);
            }, 3000);
        });
    };

    useEffect(() => {
        if (!id) return;

        fetchBook(id).then((book) => {
            setBook(book);
        });
    }, [id]);

    return { book, likeToggle, addToCart, cartAdded };
};
