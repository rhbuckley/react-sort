import styled from "styled-components";

interface SliderProps {
    min: number;
    max: number;
    value: number;
    onChange: (value: number) => void;
    label: string;
}

export const Slider: React.FC<SliderProps> = ({ min, max, value, onChange, label }) => {
    return (
        <Container>
            <Label htmlFor="slider">{label}</Label>
            <InputSlider
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e: any) => onChange(parseInt(e.target.value))}
            />
        </Container>
    )
}

const Label = styled.label`
    font-size: 1rem;
    font-family: 'Courier', 'Roboto Mono' ,monospace;
    font-weight: 200;
    margin-left: 1rem;
    margin-top: 1rem;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
`;

const InputSlider = styled.input`
    -webkit-appearance: none;
    width: 75%;
    height: 0.2rem;
    border-radius: 0.2rem;
    margin-left: 2rem;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 0.75rem;
        height: 0.75rem;
        margin-top: -4px;
        border-radius: 50%;
        background: white;
        cursor: pointer;
    }

    &::-moz-range-thumb {
    }

    &::-moz-range-track, 
    {
        background: white;
        height: 0.15rem;
        border-radius: 0.2rem;
    }

    &::-webkit-slider-runnable-track {
        background: white;
        height: 0.15rem;
        border-radius: 0.2rem;
    }
`;