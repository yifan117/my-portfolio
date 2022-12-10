<script lang="ts">

    import { onMount } from 'svelte';

    // Letters
    const sequence_length = 20;
    let letter_sequence: string = ""; //Show current letter for user to type with letter_sequence[letter_index]
    let letter_index: number = 0;

    // For display
    let input: string = "";
    $: input.length >= 2 ? input = input[1] : input = input;
    let difficulty: string = "easy";

    // Scoring
    let game_finished: boolean;
    $: score = 0; //Display this to user
    $: high_score = 0;
    $: score > high_score ? high_score = score : high_score = high_score; 
    $: accuracy = "N/A"; 

    /*TIMING STUFF*/ 
    let round_time: number = 3000;
    let time: number = 0; //Display this 
    let start_time: number = Date.now();
    let timer_state: number; 

    function start_timing() {
        start_time = Date.now();
        timer_state = window.setInterval(increment_timer, 50);
    }

    function increment_timer() {
        let current_time = Date.now() - start_time;
        time = Math.floor(current_time);
    }

    function stop_timing() {
        clearInterval(timer_state);
    }

    function reset_timer() {
        time = 0;
        stop_timing();
    }

    /* GAME FUNCTIONS */
    function new_game() {
        letter_index = 0; 
        score = 0;
        accuracy = "N/A";
        game_finished = false;
        generateLetters();
        reset_timer();
        start_timing();
    }

    function generateLetters() {
        let new_sequence: string = ''; 
        let possible_chars: string = 'abcdefghijklmnopqrstuvwxyz,';
        let chars_length = possible_chars.length;
        for (let i: number = 0; i < sequence_length; i++) {
            new_sequence += possible_chars.charAt(Math.floor(Math.random() * chars_length));
        }
        letter_sequence = new_sequence;
    }

    // Bind to on:keydown for input field
    function handle_input(event: KeyboardEvent): void { 
        stop_timing();
        update_score(event.key); 
        letter_index++;

        if ( letter_index > sequence_length-1) {
            update_accuracy(); 
            game_finished = true;
            return;
        }
        
        reset_timer();
        start_timing();
    }

    function handle_enter(event: KeyboardEvent) {
        if (event.code == "Enter") {
            new_game();
        }
    }

    function update_score(letter: string) {
        if (is_correct_letter(letter, letter_index) && time < round_time) {
            score += 10; 
        } else if (is_correct_letter(letter, letter_index) && time > round_time) {
            score += 5;
        }
    }

    function is_correct_letter(letter: string, letter_index: number): boolean {
        if (letter === letter_sequence[letter_index] ) {
            return true;
        }
        return false;
    }

    function update_accuracy() {
        let max_score = sequence_length * 10;
        accuracy = ((score/max_score) * 100).toFixed(2); 
    }

    function change_difficulty(new_difficulty: string) {
        difficulty = new_difficulty;

        if (difficulty === "easy") {
            round_time = 3000;
        } else if (difficulty === "medium") {
            round_time = 2000;
        } else if (difficulty === "hard") {
            round_time = 1000; 
        } else if (difficulty === "master") {
            round_time = 500;
        }
        new_game();
    }

    onMount(() => {
        new_game();
        start_timing();
    });

    let color: string;
    $: if (time >= round_time && !game_finished) {
        color = "#a53131";
    } else if (game_finished) {
        color = "#FFE4C4";
    } else {
        color = "linear-gradient(145deg, #7a7a7a, #909090)";
    }

</script>  

<svelte:window on:keydown={handle_enter}/>

<div class="page">

    <div class="game">

        <div class="levelSelector">
            <button class="difficulty">
                Difficulty: {difficulty}
            </button>

            <div class="levels">
                <button class="diff" on:click={() => change_difficulty("easy")}>Easy</button>
                <button class="diff" on:click={() => change_difficulty("medium")}>Medium</button>
                <button class="diff" on:click={() => change_difficulty("hard")}>Hard</button>
                <button class="diff" on:click={() => change_difficulty("master")}>Master</button>
            </div>
        </div>

        <div class="gameWrapper">
            <div class="timer">
                {#if (game_finished == true)}
                Time Lapsed (ms): 0
                {:else}
                Time Lapsed (ms): {time}
                {/if}
            </div>

            <div class="center">
                <div class="gameWindow" style="background: {color}">
                    <div class="letter">
                        {#if (game_finished == true)}
                        end<small>Click 'New Game' Or Press 'Enter'</small>
                        {:else}
                        {letter_sequence[letter_index]}
                        {/if}
                    </div>
                </div>

                <button class="type1" on:click={() => new_game()}>New Game</button>

                <!-- svelte-ignore a11y-autofocus -->
                <input on:keydown={handle_input} bind:value={input} autofocus/>
            </div>
        </div>

        <div class="gameStats">
            <div class="stat">
                {#if (high_score == 0)}
                High Score: 0
                {:else}
                High Score: {high_score}
                {/if}
            </div>

            <div class="stat">
            Score: {score}
            </div>

            <div class="stat">
            Accuracy: {accuracy}
            </div>
        </div>

    </div>

</div>
<style>

* {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    box-sizing: border-box;
    font-size: 1.02em;
    font-weight: 500;
    text-transform: uppercase;
}

small {
    font-size: 0.2em;
}
.center {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
}
.game {
    display: flex;
    align-items: center;
    gap: 30px;
    justify-content: space-between;
    width: 100%;
}

.page {
    background-color: #878787;
    padding: 40px;  
    display: flex;
    flex-direction: column; 
    align-items: center;
    gap: 30px;
    min-height: 100vh;
}

.timer {
    border-radius: 75px;
    background: linear-gradient(145deg, #7a7a7a, #909090);
    box-shadow:  31px 31px 61px #656565,
                -31px -31px 61px #a9a9a9;
    
    min-width: 10vw;
    min-height: 4vw;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.levelSelector {
    border-radius: 75px;
    background: linear-gradient(145deg, #7a7a7a, #909090);
    box-shadow:  31px 31px 61px #656565,
                -31px -31px 61px #a9a9a9;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 13vw;
    transition: 1s;
}

.levels {
    display: none;
    position: relative;
    z-index: 1;
    border-radius: none;
    box-shadow: none;
    transition: 1s;

}

.levelSelector:hover .levels {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: none;
    box-shadow: none;
    transition: 1s;

}

.gameWindow {
    border-radius: 75px;
    box-shadow:  31px 31px 61px #656565,
                -31px -31px 61px #a9a9a9;

    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40vw;
    min-height: 40vh;
    font-size: 16em;
    font-weight: 700;
    transition: 3s;
}

.letter {
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    font-size: .3em;
}

.gameStats {
    border-radius: 75px;
    background: linear-gradient(145deg, #7a7a7a, #909090);
    box-shadow:  31px 31px 61px #656565,
                -31px -31px 61px #a9a9a9;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 100%;
}

.gameWrapper {
    gap: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.gameStats, .difficulty {
    min-width: 14vw;
    padding: 30px;
}
.type1, .difficulty {
    border-radius: 75px;
    background: linear-gradient(145deg, #7a7a7a, #909090);
    box-shadow:  31px 31px 61px #656565,
                -31px -31px 61px #a9a9a9;
    border: 0px;
    min-width: 10vw;
    min-height: 7vh;
    cursor: pointer;
    transition: 1s;
}

.type1 {
    padding: 20px;
}

.type1:hover, .difficulty:hover {
    border-radius: 75px;
    background: linear-gradient(145deg, #7a7a7a, #909090);
    box-shadow:  5px 5px 10px #656565,
                -5px -5px 10px #a9a9a9;
}

.difficulty {
    min-width: 16vw;
}

input {
    border-radius: 75px;
    background: linear-gradient(145deg, #7a7a7a, #909090);
    box-shadow:  31px 31px 61px #656565,
                -31px -31px 61px #a9a9a9;
                
    border: none;
    outline: none;    
    min-height: 7vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

input:active {
    border: none;
    outline: none;
}

.diff {
    border-radius: none;
    box-shadow: none;
    width: 100%;
    background: none;
    outline: none;
    border: none;
    padding: 20px;
}

.diff:hover {
    opacity: 30%;
    cursor: pointer;
}
</style>