import React from 'react';
import { ReactComponent as Icon } from '../../logo/logo.svg';
import styled from 'styled-components';

const Loading = () => {
    return (
        <Load>
            <Icon />
        </Load>
    )
}

const Load = styled.svg`
    position: fixed;
    width: 70px;
    height: 70px;
    top: 50%;
    left: 50%;
    z-index: 100;
    animation: icon-rotating 3s linear infinite;

    path {
        fill: #b73779;
    }

    @keyframes icon-rotating {
        from {
            transform: translate(-50%, -50%) rotate(0deg);
        }
      
        to {
            transform: translate(-50%, -50%) rotate(360deg);
        }
    }

`;

export default Loading;