import styled from "styled-components";

import { Section } from "./Section";
import { StyledButton } from "./Buttons";
import { SortingOrder, customOrder } from "../../sorting/customOrder";

const OrderButtonWrapper = styled(Section)`
    display: block;
`;

const SortingOrderTypes: { [key: string]: SortingOrder } = {
    Sorted: "sorted",
    "Reverse Sorted": "sorted-desc",
    Normal: "normal",
    // Too advanced... we don't need this. There are generally
    // not enough data values for this to be useful
    // "Normal Skewed Left": "normal-skew-left",
    // "Normal Skewed Right": "normal-skew-right",
    "Perfect Bell Curve": "perfect-bell-curve",
};

interface ButtonProps {
    setArr: (some: number[]) => any;
    arrSize: number;
}

/**
 * This is the base button for the array options.
 *
 * @param setArr - the state setter for the array
 * @param arrSize - the size of the array
 * @returns - button
 */
const OrderButtons: React.FC<ButtonProps> = ({ setArr, arrSize, ...rest }) => (
    <>
        {Object.entries(SortingOrderTypes).map(([name, order]) => (
            <StyledButton
                key={order}
                onClick={() => setArr(customOrder(order, arrSize))}
            >
                {name}
            </StyledButton>
        ))}
    </>
);

export { OrderButtons, OrderButtonWrapper };
