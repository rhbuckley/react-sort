import styled from "styled-components";

export const AppWrapper = styled.div`
    background-color: var(--color-secondary);
    min-height: 100vh;

    @media (min-width: 768px) {
        height: 100vh;
        overflow-y: clip;
    }
`;
