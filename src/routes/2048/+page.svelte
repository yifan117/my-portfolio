<script lang="ts">
	import { onMount } from "svelte";

    let gameArr = [
        [2, 2, 2, 2],
        [2, 0, 0, 0],
        [2, 2, 2, 2],
        [2, 0, 0, 0]
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
        check_loss();
        randomFill();

    }

    function keyRight() {
        console.log("right");
        move_right();
        merge_right();
        move_right();
        check_loss();
        randomFill();
    }

    function keyUp() {
        console.log("up");
        move_up();
        merge_up();
        move_up();
        check_loss();
        randomFill();
    }

    function keyDown() {
        console.log("down");
        move_down();
        merge_down();
        move_down();
        check_loss();
        randomFill();
    }

</script>

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Prompt">
<svelte:window on:keydown={handleKeydown}/>

<div class="page">
    <div class="arrayContainer">
        <div class="array">
            {#each Array(4) as ab, a}
                {#each Array(4) as _, i}
                    <div class="element">
                        {gameArr[i][a]}
                    </div>
                {/each}
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
    grid-template-columns: 100px 100px 100px 100px;
    grid-template-rows: 80px auto 80px; 
    column-gap: 10px;
    row-gap: 15px;
}

.element {
    display: flex;
    height: 100%;
    width: 100%;
}

</style>