import "./styles/GameOfLife.css";
import Grid from "./components/Grid";

const GameOfLife = () => {
    return (
        <div className="text-center py-4">
            <header className="header title text-uppercase">
                Game of Life
            </header>
            <Grid />
            <footer className="mt-3 pb-3">
                <div>
                    {"Built by "}
                    <a
                        rel="noreferrer"
                        target="_blank"
                        href="https://birkagal.com"
                    >
                        Gal Birka
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default GameOfLife;
