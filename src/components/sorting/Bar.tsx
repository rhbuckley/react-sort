import { Colors } from "../../sorting/algos/helpers/colors";

interface BaseBarProps {
    color: Colors;
    margin: number;
    transition?: number;
}

interface BarPropsValue extends BaseBarProps {
    value: number;
}

interface BarPropsPercent extends BaseBarProps {
    percent: number;
}

type BarProps = BarPropsPercent | BarPropsValue;

export const Bar: React.FC<BarProps> = ({ color, margin, transition = 0.5, ...rest }) => {
    const height = 'percent' in rest ? rest.percent + "%" : rest.value + "px";

    if (color === 'default')
        color = 'var(--color-primary)' as Colors;
    return <div style={{
        height,
        width: `100%`,
        backgroundColor: color,
        margin: `${margin}px`,
        transition: `height ease ${transition}s`
    }} />;
}