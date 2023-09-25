import Header from "./Header";
import { SortingAlgo } from "./sorting";
import { useEffect, useState } from "react";
import { SortingWrapper } from "./components/sorting/Wrapper";
import { HeadingDiv, Subtitle, Title } from "./components/ui/Heading";
import { shuffleArray } from "./sorting/algos/helpers/shuffle";
import { AlgorithmLiteral, AlgorithmName } from "./sorting/algos/@index";
import { Section, SectionTitle } from "./components/ui/Section";
import { Dropdown } from "./components/ui/Dropdown";
import { Slider } from "./components/ui/Slider";
import { StyledButton } from "./components/ui/Buttons";
import { sort5Elements } from "./sorting/customOrder";
import { AppWrapper } from "./components/ui/AppWrapper";
import { OrderButtons, OrderButtonWrapper } from "./components/ui/OrderButtons";

const App = () => {
    // We are going to use a default state of a 25 element array, with elements 1 to 25
    // and then we are going to shuffle it! There is no use in working with a sorted array
    // as there would be nothing to visualize
    const [arrSize, setArrSize] = useState(25);
    const [arr, setArr] = useState(
        shuffleArray(Array.from({ length: arrSize }, (_, index) => index + 1))
    );

    const [delay, setDelay] = useState(100);

    // This is the function that we will be using to initialize the array. We don't want to have an empty
    // array
    const initArray = () =>
        setArr(
            shuffleArray(
                Array.from({ length: arrSize }, (_, index) => index + 1)
            )
        );
    useEffect(initArray, [arrSize]);

    // What sort does the user wish to visualize? By default, we will use selection sort
    const [sort, setSort] = useState<AlgorithmName>("selection");

    return (
        <AppWrapper>
            <Header />
            <SortingWrapper>
                {/* This is where we welcome the user and collect their settings */}
                <div>
                    <HeadingDiv>
                        <Title>Sorting Algorithms</Title>
                        <Subtitle>now playing... {sort} sort</Subtitle>
                    </HeadingDiv>

                    {/* Here, we are going to look for what sorting algorithm they want to visualize */}
                    <Section>
                        <SectionTitle>1. Choose an Algorithm</SectionTitle>
                        <Dropdown
                            options={AlgorithmLiteral}
                            selected={sort}
                            setSelected={setSort}
                        />
                    </Section>

                    {/* Here, we are going to see how fast they want to see the algorithm progress */}
                    {/* They will also have an opportunity to set the array size. */}
                    <Section>
                        <SectionTitle>2. Configure Options</SectionTitle>

                        <Slider
                            min={5}
                            max={300}
                            label={`N elements (${arrSize})`}
                            value={arrSize}
                            onChange={setArrSize}
                        />
                        <Slider
                            min={0.005}
                            max={750}
                            label={`Delay (${delay}ms)`}
                            value={delay}
                            onChange={setDelay}
                        />
                    </Section>

                    {/* Here, we are going to add a button to shuffle the array */}
                    <OrderButtonWrapper>
                        <SectionTitle>3. Array Options</SectionTitle>

                        <StyledButton onClick={initArray}>Shuffle</StyledButton>

                        {/* The customOrder buttons... */}
                        <OrderButtons setArr={setArr} arrSize={arrSize} />

                        {/* The custom sort5 button */}
                        <StyledButton
                            onClick={() => setArr((arr) => sort5Elements(arr))}
                            children="Sort 5 Elements"
                        />
                    </OrderButtonWrapper>
                </div>

                {/* Here is our Sorting Algorithm with the appropriate settings */}
                <SortingAlgo arr={arr} delay={delay} sort={sort} />
            </SortingWrapper>
        </AppWrapper>
    );
};

export default App;
