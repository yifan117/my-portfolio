<script lang="ts">
	import { onMount } from "svelte";
	import { element } from "svelte/internal";

    let gameArr = [
        [2, 2, 2, 2],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    // iterate through array, find non zeros
    // move all to start
    // merge 

    enum Code {
        ArrowUp = "ArrowUp",
        ArrowDown = "ArrowDown",
        ArrowLeft = "ArrowLeft",
        ArrowRight = "ArrowRight"
    }

    let code;

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

    function resetGame(): void {

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                gameArr[i][j] = 0;
            }
        }

        randomFill();
        randomFill();
    }

    function move() {

        let temp_array: number[] = new Array();

        for (let i = 0; i < 4; i++) {
            if (gameArr[0][i] != 0) {
                temp_array.push(gameArr[0][i]);
            }
        }

        while (temp_array.length <= 3) {
            temp_array.push(0);        }

        for (let i = 0; i < 4; i++) {
            gameArr[0][i] = temp_array[i];
        }
    }

    function move_reverse() {

        let temp_array: number[] = new Array();

        for (let i = 0; i < 4; i++) {
            if (gameArr[0][i] != 0) {
                temp_array.push(gameArr[0][i]);
            }
        }

        while (temp_array.length <= 3) {
            temp_array.push(0);       
        }

        temp_array.reverse();

        for (let i = 0; i < 4; i++) {
            gameArr[0][i] = temp_array[i];
        }
    }

    function merge() {
        for (let i = 0; i < 3; i++) {
            if (gameArr[0][i] === gameArr[0][i+1]) {
                gameArr[0][i] = gameArr[0][i] * 2;
                gameArr[0][i+1] = 0; 
            }
        }

        move();
    }

    function merge_reverse() {
        for (let i = 3; i > 0; i--) {
            if (gameArr[0][i] === gameArr[0][i-1]) {
                gameArr[0][i] = gameArr[0][i] * 2;
                gameArr[0][i-1] = 0; 
            }
        }

        move_reverse();
    }

    function keyLeft() {
        console.log("left");

        move();
        merge();
    }

    // START WITH MOVING TO LEFTMOST

    // if == and next to eachother, combine
    // move to leftmost
    // else 
    // move to leftmost
    function keyRight() {
        console.log("right");
        move_reverse();
        merge_reverse();
    }

    function keyUp() {
        console.log("up");
    }

    function keyDown() {
        console.log("down");
    }

</script>

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Prompt">
<svelte:window on:keydown={handleKeydown}/>

<div class="page">
    <div class="arrayContainer">
        <div class="array">
            {#each gameArr as element, i (element)}
                <div class="element">
                    {element}
                </div>
            {/each}
        </div>
    </div>

    <div class="newGame">
        <button on:click={resetGame}>New Game</button>
    </div>
</div>



<style>

* {
    font-family: 'Prompt';
}

:root {
    --font-color: #756f64;
    --empty-space: #948a80;
    --box-color: #bbada0;
    --two-color: #eddfc5;
    --four-color: #eddfc5;
    --eight-color: #f0af77;
}

.page {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    background: #1d1d1d;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 30px;
}

.arrayContainer {
    display: grid;
    align-items: center;
    justify-content: center;
    background-color: var(--box-color);
    max-width: 470px;
    aspect-ratio: 1;
    padding: 15px;
    border-radius: 5px;
}

.array {
    display: grid;
    grid-template-columns: 1fr;
    grid-area: 3px;
    grid-auto-rows: 100px;
    grid-auto-columns: 100px;
}

.element {
    display: grid;
    grid-template-columns: 1fr;
    grid-area: 3px;
    grid-auto-rows: 100px;
    grid-auto-columns: 100px;
}

</style>