import "./styles/GameOfLife.css";
import Grid from "./components/Grid";
import styled, { keyframes } from "styled-components";
import { pulse, fadeIn, bounceInUp } from "react-animations";

const pulseAnimation = keyframes`${pulse}`;
const PulseDiv = styled.div`
    animation: 3s ${pulseAnimation};
`;

const fadeInAnimation = keyframes`${fadeIn}`;
const FadeInDiv = styled.div`
    animation: 2s ${fadeInAnimation};
`;

const bounceInUpAnimation = keyframes`${bounceInUp}`;
const BounceInUpDiv = styled.div`
    animation: 3s ${bounceInUpAnimation};
`;

const Header = styled.header`
    font-size: 4vw !important;
    margin: 0 auto;
    max-width: 700px;
    margin-bottom: 1.5rem;
    color: #d4d4d4;
    font-size: 4rem;
    font-weight: 600;
    line-height: 1.125;
`;

const Link = styled.a`
    color: rgb(205, 205, 205);
    text-decoration: none;
    font-weight: bold;
`;

const GameOfLife = () => {
    return (
        <div className="text-center py-4">
            <PulseDiv>
                <Header className="title text-uppercase">Game of Life</Header>
            </PulseDiv>
            <FadeInDiv>
                <Grid />
            </FadeInDiv>
            <BounceInUpDiv>
                <footer className="mt-3 pb-3">
                    <div>
                        {"Built by "}
                        <Link
                            rel="noreferrer"
                            target="_blank"
                            href="https://birkagal.com"
                        >
                            Gal Birka
                        </Link>
                        {" | "}
                        <Link
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/birkagal/game-of-life"
                        >
                            Source
                        </Link>
                    </div>
                </footer>
            </BounceInUpDiv>
        </div>
    );
};

export default GameOfLife;
