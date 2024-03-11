import { styled } from 'styled-components';
import Title from '../components/common/Title';
import CartItem from '../components/carts/CartItem';
import { useCart } from '../hooks/useCart';
import { useMemo, useState } from 'react';
import Empty from '../components/common/Empty';
import { FaShoppingCart } from 'react-icons/fa';
import CartSummary from '../components/carts/CartSummary';
import Button from '../components/common/Button';
import { useAlert } from '../hooks/useAlert';
import { OrderSheet } from '../models/order.model';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const { showAlert, showConfirm } = useAlert();
    const navigate = useNavigate();

    const { carts, isEmpty, deleteCartItem } = useCart();
    const [checkedItems, setCheckedItems] = useState<number[]>([]);

    const handleCheckItem = (id: number) => {
        if (checkedItems.includes(id)) {
            setCheckedItems(checkedItems.filter((item) => item !== id));
        } else {
            setCheckedItems([...checkedItems, id]);
        }
    };

    const handleItemDelete = (id: number) => {
        deleteCartItem(id);
    };

    const totalQuantity = useMemo(() => {
        return carts.reduce((acc, cart) => {
            if (checkedItems.includes(cart.id)) {
                return acc + cart.quantity;
            }
            return acc;
        }, 0);
    }, [carts, checkedItems]);

    const totalPrice = useMemo(() => {
        return carts.reduce((acc, cart) => {
            if (checkedItems.includes(cart.id)) {
                return acc + cart.price * cart.quantity;
            }
            return acc;
        }, 0);
    }, [carts, checkedItems]);

    const handleOrder = () => {
        if (checkedItems.length === 0) {
            showAlert('주문할 상품을 선택해주세요.');
            return;
        }

        const orderData: Omit<OrderSheet, 'delivery'> = {
            items: checkedItems,
            totalPrice,
            totalQuantity,
            firstBookTitle: carts[0].title,
        };

        showConfirm('주문하시겠습니까?', () => {
            navigate('/orders', { state: orderData });
        });
    };

    return (
        <>
            <Title size='large'>장바구니</Title>
            <CartStyle>
                {!isEmpty && (
                    <>
                        <div className='content'>
                            {carts.map((cart) => (
                                <CartItem
                                    key={cart.id}
                                    cart={cart}
                                    checkedItems={checkedItems}
                                    onCheck={handleCheckItem}
                                    onDelete={handleItemDelete}
                                />
                            ))}
                        </div>
                        <div className='summary'>
                            <CartSummary
                                totalQuantity={totalQuantity}
                                totalPrice={totalPrice}
                            />
                            <Button
                                size='large'
                                scheme='primary'
                                onClick={handleOrder}
                            >
                                주문하기
                            </Button>
                        </div>
                    </>
                )}
                {isEmpty && (
                    <Empty
                        title='장바구니가 비었습니다.'
                        icon={<FaShoppingCart />}
                    />
                )}
            </CartStyle>
        </>
    );
}

const CartStyle = styled.div`
    display: flex;
    gap: 24px;
    justify-content: space-between;
    padding: 24px 0 0 0;

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .summary {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }
`;

export default Cart;
