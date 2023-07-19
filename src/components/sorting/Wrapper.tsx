import styled from 'styled-components';

export const SortingWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
    gap: 2.5%;

    padding: 10vh 2.5rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        padding: 10vh 0.5rem;
    }
`;