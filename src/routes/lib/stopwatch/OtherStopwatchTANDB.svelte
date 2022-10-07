<script lang="ts">

    let state = "Start";
    let begin = 0;
    let seconds = 0;
    let timerID: any;
    let minutes = 0;
    let ms = 0;
    let savedMs = 0;
    let startTime: any;
    let totalMs: any;
    let currentTime;
    
    function getTime() {
        currentTime = Math.floor(Date.now() - startTime);
        totalMs = Math.floor((currentTime)) + savedMs;
        seconds = Math.floor((totalMs / 1000) % 60);
        ms = Math.floor((totalMs / 10) % 100);
        minutes = Math.floor((totalMs / 60000) % 60);
    }
    
    function toggle () {
        if (state === "Start") {
            state = "Stop"
            begin = 1;
        } else if (state === "Stop") {
            state = "Start"
            begin = 2;
        }
    }
    
    function start () {
        if (begin === 1) {
            startTime = Date.now();
            timerID = setInterval(getTime, 1);
    
    
        } else if (begin === 2) {
            savedMs = totalMs; 
            clearInterval(timerID);
        }
    }
    
    function reset () {
        seconds = 0;
        ms = 0;
        minutes = 0;
        startTime = Date.now();
        savedMs = 0;
    }
    </script>

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Prompt">
    
    <div class="contents">
        <div class="textfield">
            <div class="timeUnit">
                <div class="counter">
                    {#if (minutes < 10)}
                        0{minutes}
                    {:else if (minutes >= 10)}
                        {minutes}
                    {/if}
                </div>
    
                <small>Minutes</small>
            </div>
    
            <div class="colon">
                :
            </div>
    
            <div class="timeUnit">
                <div class="counter">
                    {#if (seconds < 10)}
                        0{seconds}
    
                    {:else if (seconds >= 10)}
                        {seconds} 
                    {/if}
                </div>
    
                <small>Seconds</small>
            </div>
    
            <div class="colon">
                :
            </div>    
    
            <div class="timeUnit">
                <div class="counter">
                    {#if (ms < 10)}
                        0{ms}
    
                    {:else if ((ms >= 10))}
                        {ms}
                    {/if}
                </div>
    
                <small>Centiseconds</small>
            </div>
        </div>
    
        <div class="buttons">
            <button on:click={toggle} on:click={start}>
                {state}
            </button>
    
            <button on:click={reset}>
                Reset
            </button>
        </div>
    </div>
    
    
    <style>

        * {
            font-family: 'Prompt';
        }
    
    .colon {
        font-weight: 1000;
        font-size: 10rem;
        min-width: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }
    
    .contents {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        height: 100vh;
        width: 100vw;
        border-radius: 5px;
    }
    
    .textfield {
        height: 45vh;
        width: 100vw;
        display: flex;
        justify-content: space-around;
    }
    
    .counter {
        min-height: 230px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20rem;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    
    .timeUnit {
        min-height: 380px;
        min-width: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        font-weight: 1000;
        font-size: 15rem;
    }
    
    small {
        display: flex;
        font-size: 0.1em;
        min-height: 40px;
        align-items: center;
    }
    
    .buttons {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        min-width: 100vw;
        min-height: auto;
        border-radius: 5px;
    }
    
    button {
        background-color: #A9A9A9;
        border-radius: 50px;
        height: 13vh;
        width: 13vw;
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        font-size: 3rem;
        font-weight: 900;
        border: 10px;
    }
    
    button:hover {
        opacity: 50%;
        border-color: black;
        cursor: pointer;
    }
    </style>