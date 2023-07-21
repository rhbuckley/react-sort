import { SortingAlgo } from "./sorting";
import { useEffect, useRef, useState } from "react";
import { SortingWrapper } from "./components/sorting/Wrapper";
import { HeadingDiv, Subtitle, Title } from "./components/ui/Heading";
import { shuffleArray } from "./sorting/algos/helpers/shuffle";
import { AlgorithmLiteral, AlgorithmName } from "./sorting/algos/@index";
import Header from './Header';
import { Section, SectionTitle } from "./components/ui/Section";
import { Dropdown } from "./components/ui/Dropdown";
import { Slider } from "./components/ui/Slider";
import { StyledButton } from "./components/ui/Buttons";



const App = () => {
    // We are going to use a default state of a 25 element array, with elements 1 to 25
    // and then we are going to shuffle it! There is no use in working with a sorted array
    // as there would be nothing to visualize
    const [arrSize, setArrSize] = useState(25);
    const [arr, setArr] = useState(shuffleArray(Array.from({length: arrSize}, (_, index) => index + 1)))
    const [delay, setDelay] = useState(100);

    // This ref is needed to manage the state of the shuffle button. Basically, when you shuffle the
    // array, you should be able to press space to play, not to shuffle again. Not totally sure how to
    // correctly initialize this type of ref, but its okay.
    const shuffleBtn = useRef<HTMLButtonElement>(undefined as any);
    useEffect(() => shuffleBtn.current?.blur(), [arr]);

    // This is the function that we will be using to initialize the array. We don't want to have an empty
    // array
    const initArray = () => setArr(shuffleArray(Array.from({length: arrSize}, (_, index) => index + 1)));
    useEffect(initArray, [arrSize]);

    // What sort does the user wish to visualize? By default, we will use selection sort
    const [sort, setSort] = useState<AlgorithmName>('selection');

    return (
        <div style={{backgroundColor: "var(--color-secondary)", minHeight: "100vh"}}>
            <Header/>
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
                        <Dropdown options={AlgorithmLiteral} selected={sort} setSelected={setSort} />
                    </Section>

                    {/* Here, we are going to see how fast they want to see the algorithm progress */}
                    {/* They will also have an opportunity to set the array size. */}
                    <Section>
                        <SectionTitle>2. Configure Options</SectionTitle>

                        <Slider min={5} max={300} label={`N elements (${arrSize})`} value={arrSize} onChange={setArrSize}></Slider>
                        <Slider min={0.005} max={750} label={`Delay (${delay}ms)`} value={delay} onChange={setDelay}></Slider>
                    </Section>

                    {/* Here, we are going to add a button to shuffle the array */}
                    <Section>
                        <SectionTitle>3. Array Options</SectionTitle>

                        <StyledButton style={{marginTop: "1rem"}} onClick={initArray} ref={shuffleBtn}>Shuffle</StyledButton>
                        {/* Add buttons for normal sorted array */}
                        {/* Add button for reverse sorted array */}
                        {/* Add bytton for normal array */}
                        {/* add button for normal unimodal left  */}
                        {/* add button for normal unimodal skewed right */}
                        {/* add button for partially sorted array (e.g. press shuffle and then shuffle via 5) */}
                    </Section>
                </div>

                {/* Here is our Sorting Algorithm with the appropriate settings */}
                <SortingAlgo arr={arr} delay={delay} sort={sort} />
            </SortingWrapper>
        </div>
    )
}

export default App;