<script lang="ts">

    let gameArr = [
        [0, 0, 0, 0],
        [0, 0, 2, 0],
        [2, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    let code;
    let score = 0;
    let scoreUpdate = 0;

    function updateScore() {
        score = 2*scoreUpdate;
    }

    function handleKeydown(event: any) {
        code = event.key;

        switch (code) {
            case "ArrowUp": {
                keyUp();
                break;
            }

            case "ArrowDown": {
                keyDown();
                break;
            }

            case "ArrowRight": {
                keyRight();
                break;
            }

            case "ArrowLeft": {
                keyLeft();
                break;
            }

            case "Enter": {
                resetGame();
                break;
            }

            default: {
                console.log("other");
                break;
            }
        }
    }
    
    function checkEmpty(row: number, col: number): boolean {
        if (gameArr[row][col] === 0) {
            return true;
        } else {
            return false;
        }
    }
    
    function randomFill() {
            
        let randRow: number;
        let randCol: number;

        let boolEmpty: boolean = false;

        while (boolEmpty === false) {
            randRow = Math.floor(Math.random() * 4);
            randCol = Math.floor(Math.random() * 4);

            if (checkEmpty(randRow, randCol) === true) {
                
                gameArr[randRow][randCol] = 2;
                boolEmpty = true; 

            }
        }
    }

    function check_loss() {
        console.log("placeholder");
    }

    function resetGame(): void {

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                gameArr[i][j] = 0;
            }
        }

        randomFill();
        randomFill();

        score = 0;
    }

    function move_up() {

        for (let a = 0; a < 4; a++) {

            let temp_array: number[] = new Array();

            for (let i = 0; i < 4; i++) {
                if (gameArr[i][a] != 0) {
                    temp_array.push(gameArr[i][a]);
                }
            }

            while (temp_array.length <= 3) {
                temp_array.push(0);        }

            for (let i = 0; i < 4; i++) {
                gameArr[i][a] = temp_array[i];
            }
        }
    }

    function merge_up() {

        for (let a = 0; a < 4; a++) {

            for (let i = 0; i < 3; i++) {
                if (gameArr[i][a] === gameArr[i+1][a]) {
                    scoreUpdate += gameArr[a][i];
                    gameArr[i][a] = gameArr[i][a] * 2;
                    gameArr[i+1][a] = 0; 
                }
            }
        }

    }

    function move_down() {

        for (let a = 0; a < 4; a++) {

            let temp_array: number[] = new Array();

            for (let i = 0; i < 4; i++) {
                if (gameArr[i][a] != 0) {
                    temp_array.push(gameArr[i][a]);
                }
            }

            while (temp_array.length <= 3) {
                temp_array.push(0);        }

                temp_array.reverse();

            for (let i = 0; i < 4; i++) {
                gameArr[i][a] = temp_array[i];
            }
        }
    }

    
    function merge_down() {
        
        for (let a = 0; a < 4; a++) {
            for (let i = 3; i > 0; i--) {
                if (gameArr[i][a] === gameArr[i-1][a]) {
                    scoreUpdate += gameArr[a][i];
                    gameArr[i][a] = gameArr[i][a] * 2;
                    gameArr[i-1][a] = 0; 
                }
            }
        }

    }

    function move_right() {

        for (let a = 0; a < 4; a++) {

            let temp_array: number[] = new Array();

            for (let i = 0; i < 4; i++) {
                if (gameArr[a][i] != 0) {
                    temp_array.push(gameArr[a][i]);
                }
            }

            while (temp_array.length <= 3) {
                temp_array.push(0);       
            }

            temp_array.reverse();

            for (let i = 0; i < 4; i++) {
                gameArr[a][i] = temp_array[i];
            }
        }
    }

    
    function merge_right() {
        for (let a = 0; a < 4; a++) {
            for (let i = 3; i > 0; i--) {
                if (gameArr[a][i] === gameArr[a][i-1]) {
                    scoreUpdate += gameArr[a][i];
                    gameArr[a][i] = gameArr[a][i] * 2;
                    gameArr[a][i-1] = 0; 
                }
            }
        }

    }

    function move_left() {

        for (let a = 0; a < 4; a++) {

            let temp_array: number[] = new Array();

            for (let i = 0; i < 4; i++) {
                if (gameArr[a][i] != 0) {
                    temp_array.push(gameArr[a][i]);
                }
            }

        while (temp_array.length <= 3) {
            temp_array.push(0);        
        }

            for (let i = 0; i < 4; i++) {
                gameArr[a][i] = temp_array[i];
            }
        }
    }

    function merge_left() {
        for (let a = 0; a < 4; a++) {
            for (let i = 0; i < 3; i++) {
                if (gameArr[a][i] === gameArr[a][i+1]) {
                    scoreUpdate += gameArr[a][i];
                    gameArr[a][i] = gameArr[a][i] * 2;
                    gameArr[a][i+1] = 0; 
                }
            }
        }

    }

    function keyLeft() {
        console.log("left");

        move_left();
        merge_left();
        move_left();
        randomFill();
        check_loss();
        updateScore();
    }

    function keyRight() {
        console.log("right");
        move_right();
        merge_right();
        move_right();
        randomFill();
        check_loss();
        updateScore();
    }

    function keyUp() {
        console.log("up");
        move_up();
        merge_up();
        move_up();
        randomFill();
        check_loss();
        updateScore();
    }

    function keyDown() {
        console.log("down");
        move_down();
        merge_down();
        move_down();
        randomFill();
        check_loss();
        updateScore();
    }

</script>

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,800&display=swap">
<svelte:window on:keydown={handleKeydown}/>

<div class="page">
    <div class="gameContainer">

        <div class="headerContainer">
            <div class="headerTextContainer">
                <div class="gameName">
                    2048
                </div>

                <div class="subText">
                    Join the tiles, get to <b>2048!</b>
                </div>
            </div>

            <div class="functionsContainer">
                <div class="scoresContainer">
                    <div class="score">
                        <p class="word">SCORE</p>
                        <p>{score}</p>
                    </div>

                    <div class="score">
                        <p class="word">BEST</p>
                        <p>{score}</p>
                    </div>
                </div>

                <div class="newGame">
                    <button on:click={resetGame}>New Game</button>
                </div>
            </div>

        </div>

        <div class="arrayContainer">
            <div class="array">
                {#each Array(4) as ab, a}
                    {#each Array(4) as _, i}
                        {#if gameArr[a][i] == 2}
                            <div class="element" style="background-color: var(--two-bg); color: var(--two-font);">
                                {gameArr[a][i]}
                            </div>
                        {:else if gameArr[a][i] == 4}
                            <div class="element" style="background-color: var(--four-bg); color: var(--four-font);">
                                {gameArr[a][i]}
                            </div>
                        {:else if gameArr[a][i] == 8}
                            <div class="element" style="background-color: var(--eight-bg); color: var(--eight-font);">
                                {gameArr[a][i]}
                            </div>
                        {:else if gameArr[a][i] == 16}
                            <div class="element" style="background-color: var(--sixteen-bg); color: var(--sixteen-font);">
                                {gameArr[a][i]}
                            </div>
                        {:else if gameArr[a][i] == 32}
                            <div class="element" style="background-color: var(--thirtytwo-bg); color: var(--thirtytwo-font);">
                                {gameArr[a][i]}
                            </div>
                        {:else if gameArr[a][i] == 64}
                            <div class="element" style="background-color: var(--sixtyfour-bg); color: var(--sixtyfour-font);">
                                {gameArr[a][i]}
                            </div>
                        {:else if gameArr[a][i] == 128}
                            <div class="element" style="background-color: var(--onehundredtwentyeight-bg); color: var(--onehundredtwentyeight-font); box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.190476);">
                                {gameArr[a][i]}
                            </div>
                        {:else if gameArr[a][i] == 256}
                            <div class="element" style="background-color: var(--twohundredfiftysix-bg); color: var(--twohundredfiftysix-font); box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.8), inset 0 0 0 1px rgba(255, 255, 255, 0.190476);">
                                {gameArr[a][i]}
                            </div>
                        {:else if gameArr[a][i] == 512}
                            <div class="element" style="background-color: var(--fivehundredtwelve-bg); color: var(--fivehundredtwelve-font); box-shadow: 0 0 30px 10px rgba(243, 220, 80, 1), inset 0 0 0 1px rgba(255, 255, 255, 0.190476);">
                                {gameArr[a][i]}
                            </div>
                        {:else}
                            <div class="element" style="background-color: var(--empty-bg); color: var(--empty-font);">
                                {gameArr[a][i]}
                            </div>
                        {/if}
                    {/each}
                {/each}
            </div>
        </div>
    </div>
</div>



<style>

* {
    /* font-family: 'Prompt'; */
    font-family: "Open Sans", "Helvetica Neue", Arial, sans-serif;
    animation: appear 200ms ease 100ms;
    animation-fill-mode: backwards;
}

:root {
    --empty-font: rgba(249, 246, 242, 0);
    --two-font: #776e65;
    --four-font: #776e65;
    --eight-font: #f9f6f2;
    --sixteen-font: #f9f6f2;
    --thirtytwo-font: #f9f6f2;
    --sixtyfour-font: #f9f6f2;
    --onehundredtwentyeight-font: #f9f6f2;
    --twohundredfiftysix-font: #f9f6f2;
    --fivehundredtwelve-font: #f9f6f2;

    --empty-bg: rgba(238, 228, 218, 0.35);
    --two-bg: #eee4da;
    --four-bg: #eee1c9;
    --eight-bg: #f3b27a;
    --sixteen-bg: #f69664;
    --thirtytwo-bg: #f77c5f;
    --sixtyfour-bg: #f75f3b;
    --onehundredtwentyeight-bg: #edcc62;
    --twohundredfiftysix-bg: #edcc62;
    --fivehundredtwelve-bg: #edcc62;

    --box-color: #bbada0;
    --text-white: #f9f6f2;
    --game-brown: #8f7a66;
}

.page {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    background: #faf8ef;
    align-items: center;
    justify-content: center;
}

.arrayContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: var(--box-color);
    min-width: min-content;
    max-width: 470px;
    aspect-ratio: 1;
    padding: 15px;
    border-radius: 5px;
}

.array {
    display: grid;
    height: 470px;
    width: 470px;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr); 
    column-gap: 15px;
    row-gap: 15px;
}

.element {
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: var(--empty-space);
    font-size: 3em;
    font-weight: 800;
    transition: 100ms ease-in-out;
    transition-property: transform;
    border-radius: 5px;
}

button {
    margin: none;
    border: none;
    background: var(--game-brown);
    padding: 8px 14px 8px 14px;
    color: var(--text-white);
    font-size: 1em;
    border-radius: 5px;
    font-weight: 800;
    cursor: pointer;
}

.gameName {
    color: var(--game-brown);
    font-size: 4em;
    font-weight: 800;
}

.subText {
    color: var(--game-brown);
    font-size: 1.2em;
}

.headerContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.gameContainer {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.functionsContainer {
    display: flex;
    flex-direction: column;
    height: 50%;
    width: 50%;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.scoresContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 10px;
}

.score {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    height: 50%;
    color: var(--text-white);
    background: var(--box-color);
    flex-direction: column;
    border-radius: 5px;
    padding: 5px 0px 5px 0px;
}

p {
    padding: none;
    margin: 0px;
    font-weight: 800;
    font-size: 1.5em;
}

.word {
    opacity: 70%;
    font-size: 0.8em;
}

.newGText {
    display: flex;
    color: var(--game-brown);
}
</style>