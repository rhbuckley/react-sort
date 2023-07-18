import styled from "styled-components"

export const PlayButton = ({...props}: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" style={{cursor: 'pointer'}} fill="white" height={24} width={24} xmlns="http://www.w3.org/2000/svg"><path d="M19.376 12.41l-10.6 7.06c-.23.15-.55.09-.7-.14 -.06-.09-.09-.18-.09-.28V4.91c0-.28.22-.5.5-.5 .09 0 .19.02.27.08l10.59 7.06c.22.15.29.46.13.69 -.04.05-.09.1-.14.13Z"/></svg>
)

export const PauseButton = ({...props}: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" style={{cursor: 'pointer'}} fill="white" height={24} width={24} xmlns="http://www.w3.org/2000/svg"><path d="M6 5h2v14H6V5Zm10 0h2v14h-2V5Z"/></svg>
)

export const BackButton = ({...props}: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" style={{cursor: 'pointer'}} fill="white" height={24} width={24} xmlns="http://www.w3.org/2000/svg"><path d="M11.82 12l2.82 2.82 -1.42 1.41 -4.25-4.25 4.24-4.25 1.41 1.41 -2.83 2.82Z"/></svg>
)

export const NextButton = ({...props}: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" style={{cursor: 'pointer'}} fill="white" height={24} width={24} xmlns="http://www.w3.org/2000/svg"><path d="M12.17 12L9.34 9.17l1.41-1.42 4.24 4.24 -4.25 4.24 -1.42-1.42 2.82-2.83Z"/></svg>
)

export const StyledButton = styled.button`
    background-color: white;
    color: var(--color-secondary);

    font-family: 'Courier', 'Roboto Mono', monospace;
    font-size: 1rem;
    width: max-content;

    padding: 0.5rem 1rem;
    border: none;

    margin-left: 1rem;

    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: var(--color-primary);
        color: white;

        cursor: pointer;
        border: 1px solid white;
    }
`