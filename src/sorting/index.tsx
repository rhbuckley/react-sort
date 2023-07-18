import { BackButton, NextButton, PauseButton, PlayButton } from "../components/ui/Buttons";
import { AlgorithmName, Algorithms, SortingStep } from './algos/@index';
import { useCallback, useEffect, useMemo, useState } from "react";
import { Bar } from "../components/sorting/Bar";
import styled from "styled-components";


interface SortingProps {
    arr: number[];
    delay: number;
    sort: AlgorithmName;
}

export const SortingAlgo = ({arr, delay, sort}: SortingProps) => {
    
    // The most relevant state is the state of the array that we are sorting, and
    // the implementation of the algorithm that we are using. We are going to use
    // a useMemo to create a new instance of the algorithm whenever the sort changes
    const algo = useMemo(() => new Algorithms[sort](arr.slice()), [sort, arr]);

    const [state, setState] = useState<SortingStep>(algo.getStep(0));
    const [start, setStart] = useState<boolean>(false);

    // These are the statistics that we are going to display to the user
    // ... they are not relevant to the algorithm, but they are relevant to the user
    const [timeComplexity, setTimeComplexity] = useState("");
    const [spaceComplexity, setSpaceComplexity] = useState("");

    // Here are the static functions that we will be using to render the algorithm
    // What if we update the array... we need to update the algorithm
    const renderFrame = (frame: number) => {
        // make sure the algorithm is not finished
        if (algo.isComplete()) return;

        // Update the current frame!
        algo.frame = frame;
        
        // We are going to get the next step of the algorithm... if the algorithm is finished,
        // then we will get undefined. If we get undefined, then we will return out of the function
        const currentStep = algo.getStep() ?? undefined;
            
        // Since we got undefined, we are going to make an early return and exit the function
        if (!currentStep) return;

        // We are not finished, so we will update the state with the next step of the algorithm
        // and then we will call refresh again with the new delay (if it has changed)
        setState(currentStep);
    }
    
    // Next & Previous Frame Alias Functions
    // Note, the typesafing here will be applied by the Sorting
    // Algorithm Class
    const playPause = () => setStart((playing) => !playing);
    
    // eslint-disable-next-line
    const renderNext = useCallback(() => renderFrame(algo.frame + 1), [algo]);

    // eslint-disable-next-line
    const renderPrev = useCallback(() => renderFrame(algo.frame - 1), [algo ]);

    // Let's initialize the keyboard listeners right now...
    // this will initialize the listeners on program load, and
    // destroy them whenever this component goes out of scope
    useEffect(() => {
        // handle key
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.code === "Space")  playPause();
            if (e.code === "ArrowLeft") renderPrev();
            if (e.code === "ArrowRight") renderNext();
        } 

        // add listeners -> keydown is only supported for arrow
        document.addEventListener("keydown", handleKeyPress);

        // deconstructor
        return () => document.removeEventListener("keydown", handleKeyPress);
    }, [renderPrev, renderNext])

    // This useEffect will watch the algorithm prop. If the algorithm
    // prop changes, we want to reset the state of this program
    useEffect(() => {
        // make sure we end the last algorithm 
        setStart(false);

        // reset the information about the algorithm
        setTimeComplexity(algo.timeComplex);
        setSpaceComplexity(algo.spaceComplex);
        setState(algo.getStep(0));

        // we can't forget to update... 
        renderNext();
        
    }, [algo, renderNext])
        
    // This useEffect will be watching the start / playing state of the array
    useEffect(() => {
        if (algo.isComplete() && start)  algo.frame = 0; 

        // We will assign the timeout to a variable so we can clear the timeout
        // if the component unmounts prior to the algorithm finishing the sort
        let timeout: NodeJS.Timeout;
        
        // This is the recursive refresh function that allows for us to have the steps of the 
        // algorithm displayed to the user. Now, we could have used a setInterval, but that would
        // not allow for us to have a dynamic delay. We want the user to be able to change the delay
        // and have the algorithm respond accordingly. So, we use a recursive setTimeout instead.
        const refresh = (time: number) => {
            timeout = setTimeout(() => {
                // make sure that we are not paused ... is the delay causing this refresh?
                if (!start) return;

                // update the state of the array
                // and show the visualization to the user
                renderNext();
                
                if (algo.isComplete() || !start) return setStart(false);

                // Just in case...
                clearTimeout(timeout);

                // remember, we aren't representing the delay in ms, but
                // we want it to be in ms... so we need to divide by 1000
                refresh(algo.currentDelay * (delay / 1000));
            }, time);
        };

        // start the recursion chain
        refresh(algo.currentDelay * (delay / 1000));

        // here's our deconstructor to make sure that the timeout is cleared. this is necessary to use
        // the same component to visualize different algorithms
        return () => clearTimeout(timeout);
    }, [start, delay, algo, renderNext]);

    // This is going to determine wheter or not we should have apply a transition to the height of a bar
    // on the array. 
    const calcTransition = useMemo(() => {
        if (arr.length > 100) return 0;
        if (delay < 0.5) return 0;
        return 0.5;
    }, [delay, arr]);

    return (
        <AlgoWrapper>

            <BarWrapper>
                {state?.data.map((obj, i) => 
                <Bar key={i} {...obj} margin={1} transition={calcTransition} />
                )}
            </BarWrapper>

            <StatWrapper>
                <Group>
                    <Stat>Time Complexity: {timeComplexity}</Stat>
                    <Stat>Space Complexity: {spaceComplexity}</Stat>
                </Group>

                <Group style={{alignItems: 'center'}}>
                    {/* Style */}
                    <Group style={{flexDirection: "row", zIndex: 10}}>
                        <BackButton onClick={renderPrev} />
                        {!start ? <PlayButton onClick={playPause} /> : <PauseButton onClick={playPause } />}
                        <NextButton onClick={renderNext} />
                    </Group>

                    {/* Frame Counter */}
                    <Stat>Frame: {algo.frame} / {algo.maxStep}</Stat>
                </Group>

                <Group>
                    <Stat>Array Accesses: {state.accesses}</Stat>
                    <Stat>Array Comparisons: {state.comparisons}</Stat>
                    <Stat>Array Swaps: {state.swaps === 0 ? "NA" : state.swaps}</Stat>
                </Group>

            </StatWrapper>

        </AlgoWrapper>
    )
}

const StatWrapper = styled.div`
    padding-top: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;

    user-select: none;
`;

const Group = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
`;

const Stat = styled.code`
    font-size: 0.8rem;
    font-weight: 200;
    padding-left: 0.2rem;
    opacity: 0.9;
`;

const AlgoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.2rem;
    color: white;
    
    /** Keep in mind, that the parent of this already has a 10vh padding, and then
     * there is more offset from the header. We are going to assign this value to the
     * wrapper, so that we can have the bars are centered in the middle of the screen
     */
    height: 80vh;
    width: 100%;
`;

const BarWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;

    width: 100%;
    height: 50%;
    align-items: flex-end;
`;