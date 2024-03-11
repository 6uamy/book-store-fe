import { styled } from 'styled-components';
import { FaRegCircle, FaCheckCircle } from 'react-icons/fa';

interface Props {
    isChecked: boolean;
    onCheck: () => void;
}

function CheckIconButton({ isChecked, onCheck }: Props) { 
    return (
        <CheckIconButtonStyle onClick={onCheck}>
            {
                isChecked ? <FaCheckCircle /> : <FaRegCircle />    
            }
        </CheckIconButtonStyle>
    );
}

const CheckIconButtonStyle = styled.button`
    background: none;
    border: 0;
    cusor: pointer;

    svg {
        width: 24px;
        height: 24px;
    }
`;

export default CheckIconButton;
