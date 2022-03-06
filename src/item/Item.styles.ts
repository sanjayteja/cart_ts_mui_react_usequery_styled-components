import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    border: 2px solid lightblue;
    border-radius: 20px;
    height: 100%;
    marginTop: 10px;
    button {
        border-radius: 0 0 20px 20px;
    }

    img {
        max-height: 250px;
        border-radius: 20px 20px 0 0;
        object-fit: cover;
    }

    div {
        font-family: Arial, Helvetica, sans-serif;
        padding: 1rem;
        height: 100%;
    }`;