<script lang="ts">

    export let console: string = "";
    export let operation: string = "";
    
    let runningCalc: string = "";
    let total: number = 0;
    let calcs: string[] = [];
    let pos: number;
    
    function setValue(value: string) {
    
        console += value;
    
    };
    
    function clear() {
    
        console = "";
        total = 0;
        runningCalc = "";
        calcs = [];
    
    };
    
    function setOperation(op: string) {
    
        operation = op;
    
        if (operation == "+") {
    
            calcs.push(console);
    
            runningCalc += console + " " + operation + " ";
    
            calcs.push("+");
    
            console = "";
    
        } else if (operation == "pl") {
    
            console = "-" + console;
    
        } else if (operation == "-") {
    
            calcs.push(console);
    
            runningCalc += console + " " + operation + " ";
    
            calcs.push("-");
    
            console = "";
    
        } else if (operation == "*") {
    
            calcs.push(console);
    
            runningCalc += console + " × ";
    
            calcs.push("*");
    
            console = "";
    
        } else if (operation == "/") {
    
            calcs.push(console);
    
            runningCalc += console + " ÷ ";
    
            calcs.push("/");
    
            console = "";
    
        } else if (operation == "%") {
    
            calcs.push(console);
    
            runningCalc += console + " " + operation + " ";
    
            calcs.push("%");
    
            console = "";
    
        } else if (operation == "=") {
    
            calcs.push(console);
    
            runningCalc += console + " " + operation + " ";
    
            total = eval(calcs.join(""));
    
            console = total.toString();
    
        }
    }
    
    </script>

    <div class="page">
        <div class="textfield">
            <div class="runningcalc">
                {runningCalc}
            </div>
            <div class="total">
                {console}
            </div>
        </div>
        
        <div class="calcbody">
            <div class="row">
                <div class="operationTop" on:click={() => clear()}>C</div>
                <div class="operationTop" on:click={() => setOperation("pl")}>+/-</div> <!--Need to add this functionality-->
                <div class="operationTop" on:click={() => setOperation("%")}>%</div>
                <div class="operationSign" on:click={() => setOperation("/")}>÷</div>
            </div>
        
            <div class="row">
                <div class="digits" on:click={() => setValue("7")}>7</div>
                <div class="digits" on:click={() => setValue("8")}>8</div>
                <div class="digits" on:click={() => setValue("9")}>9</div>
                <div class="operationSign" on:click={() => setOperation("*")}>×</div>
            </div>
        
            <div class="row">
                <div class="digits" on:click={() => setValue("4")}>4</div>
                <div class="digits" on:click={() => setValue("5")}>5</div>
                <div class="digits" on:click={() => setValue("6")}>6</div>
                <div class="operationSign" on:click={() => setOperation("-")}>-</div>
            </div>
        
            <div class="row">
                <div class="digits" on:click={() => setValue("1")}>1</div>
                <div class="digits" on:click={() => setValue("2")}>2</div>
                <div class="digits" on:click={() => setValue("3")}>3</div>
                <div class="operationSign" on:click={() => setOperation("+")}>+</div>
            </div>
        
            <div class="row">
                <div class="zero" on:click={() => setValue("0")}>0</div>
                <div class="digits" on:click={() => setValue(".")}>.</div>
                <div class="operationSign" on:click={() => setOperation("=")}>=</div>
            </div>
        </div>    
    </div>

    <style>

    .page {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    
    .textfield {
        height: 70px;
        width: 228px;
        background-color: #000000;
        padding: 10px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
    
    .runningcalc {
    
        color: #ffffff;
        align-items: flex-end;
        display: flex;
        justify-content: flex-end;
        opacity: 30%;
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        height: 20px;
        animation-name: fadein;
        animation-duration: 10s;
        animation-iteration-count: infinite;
        animation-direction: alternate;
    }
    
    .total {
        padding: 6px;
        color: #ffffff;
        display: flex;
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 2.5em;
        justify-content: flex-end;
        align-items: center;
    }
    
    .row {
        gap: 8px;
        padding: 3px;
        display: flex;
    }
    
    .digits {
        width: 45px;
        height: 45px;
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        padding: 3px;
        text-align: center;
        background-color: #555555;
        display: flex;
        justify-content: center;
        flex-direction: column;
        border-radius: 40px;
        color: #ffffff;
    }
    
    .digits:hover {
        background-color: #ffffff;
        opacity: 55%;
        color: #000000;
        cursor: pointer;
    }
    
    .zero {
        width: 104px;
        height: 45px;
        border-radius: 40px;
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background-color: #555555;
        text-align: center;
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding: 3px;
        color: #ffffff;
    }
    
    .zero:hover {
        background-color: #ffffff;
        opacity: 55%;
        color: #000000;
        cursor: pointer;
    }
    
    .operationSign {
        width: 45px;
        height: 45px;
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        padding: 3px;
        text-align: center;
        background-color: #ec9006;
        display: flex;
        justify-content: center;
        flex-direction: column;
        border-radius: 40px;
        color: #ffffff;
    }
    
    .operationSign:hover {
        background-color: #f5c77e;
        opacity: 80%;
        color: #000000;
        cursor: pointer;
    }
    
    .operationTop {
        width: 45px;
        height: 45px;
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        padding: 3px;
        text-align: center;
        background-color: #A9A9A9;
        display: flex;
        justify-content: center;
        flex-direction: column;
        border-radius: 40px;
    }
    
    .operationTop:hover {
        background-color: #888888;
        opacity: 80%;
        color: #ffffff;
        cursor: pointer;
    }
    
    .calcbody {
        height: 287px;
        width: 228px;
        background-color: #000000;
        padding: 10px;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }
    
    </style>