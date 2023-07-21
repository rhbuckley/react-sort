import { useState } from 'react';
import styled from 'styled-components';

interface DropdownProps {
    options: string[];
    selected: string;
    setSelected: (selected: any) => void;
}

const Wrapper = styled.div`
    position: relative;
    text-transform: capitalize;
    width: max-content;

    margin: 1rem;
`;

const MainElement = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    padding: 0.5rem 0.8rem;
    gap: 0.5rem;
    background-color: var(--color-primary);
    color: var(--color-secondary);
    font-family: 'Courier', 'Roboto Mono' ,monospace;
`;

const HiddenWrapper = styled.div`
    border-top: 1px solid var(--color-secondary);
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    background-color: var(--color-primary);
    z-index: 1;
`;

const HiddenElement = styled.div`
    padding: 0.5rem;
    cursor: pointer;
    font-family: 'Courier', 'Roboto Mono' ,monospace;
    color: var(--color-secondary);
`;

export const Dropdown: React.FC<DropdownProps> = ({ options, selected, setSelected }) => {

    // we want to know if the menu is visible (or not)
    const [isOpen, setIsOpen] = useState(false);

    // here we are going to render the selected option, along with a down arrow
    // when the user hovers on this, we will show the menu
    return (
        <Wrapper onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <MainElement>
                {selected} sort
            </MainElement>
            {isOpen && (
                <HiddenWrapper>
                    {options.filter(o => o !== selected).map(option => (
                        <HiddenElement 
                        key={option}
                        
                        onClick={() => {
                            setSelected(option);
                            setIsOpen(false);
                        }}
                        
                        >
                            {option} sort
                        </HiddenElement>
                    ))}
                </HiddenWrapper>
            )}
        </Wrapper>
    )
}