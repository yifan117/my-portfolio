<body>
    <div class="container">
        <div class="card">
            <h3>Sign Up For Our Weekly Newsletter</h3>
            <div class="inputBox">
                <input type="username" required>
                <span>Email</span>
            </div>

            <button>Enter</button>
        </div>

    </div>
</body>

<style>

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: #FAF9F6;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}        

h3 {
    text-transform: uppercase;
    letter-spacing: 2px;
    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.8);
    filter: drop-shadow(0 0 25px #FAF9F6);
}

span {
    color: #FAF9F6;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient( 94.3deg,  rgba(26,33,64,1) 10.9%, rgba(81,84,115,1) 87.1% );
    min-height: 100vh;
}

.card {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 500px;
    min-width: 700px;
    flex-direction: column;
    gap: 35px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5.6px);
    -webkit-backdrop-filter: blur(5.6px);

}

.inputBox {
    position: relative;
    min-width: 250px; 
    color: #FAF9F6;
}

.inputBox input {
    width: 100%;
    padding: 10px;
    outline: none;
    border: none;
    color: #000;
    font-size: 1em;
    background: transparent;
    border-left: 2px solid #000;
    border-bottom: 2px solid #000;
    transition: 0.1s;
}

.inputBox input:focus {
    border: 2px solid #000;
    transition: 1s;
}

.inputBox input:valid~span,
.inputBox input:focus~span {
    transform: translateX(160px) translateY(-18px);
    font-size: 0.8em;
    padding: 5px 10px;
    background: #000;
    letter-spacing: 0.2em;
    color: #FAF9F6;
    border: 2px;
}

.inputBox input:valid,
.inputBox input:focus {
    border: 2px solid #000;
}

button {
    height: 45px;
    width: 100px;
    border-radius: 5px;
    border: 2px solid #000;
    cursor: pointer;
    background-color: transparent;
    transition: 0.5s;
    text-transform: uppercase;
    font-size: 10px;
    letter-spacing: 2px;
    font-weight: 700
}

button:hover {
    background-color: #000;
    color: white;
}

.inputBox span {
    margin-top: 5px;
    position: absolute;
    left: 0;
    transform: translateY(-4px);
    margin-left: 10px;
    padding: 10px;
    pointer-events: none;
    font-size: 12px;
    color: #FAF9F6;
    text-transform: uppercase;
    transition: 0.5s;
    letter-spacing: 3px;
}

</style>