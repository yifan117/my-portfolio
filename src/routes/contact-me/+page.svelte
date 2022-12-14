<script lang="ts">
    import Nav from "../lib/nav-bar.svelte";
    import Footer from "../Footer.svelte";
</script>

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Prompt">
    
<body>
    <Nav/>

    <div class="container">
        <div class="card">
            <h3>Sign Up To Hear About New Projects</h3>
            <form action="https://api.staticforms.xyz/submit" method="post">
                <input type="hidden" name="accessKey" value="1abfbd67-ce48-4632-9b7e-432d080c688a"> <!-- Required -->
            <div class="wrapper">
                <div class="inputBox">
                    <input type="text" name="email" required>
                    <span>Email</span>
                </div>

                <input type="hidden" name="redirectTo" value="https://www.yifan-lu.com"> <!-- Optional -->
                <input type="submit" value="Submit"/>
            </div>
            </form>
        </div>

        <div class="card">
            <h3>Message Me!</h3>
            <form action="https://api.staticforms.xyz/submit" method="post">
                <input type="hidden" name="accessKey" value="1abfbd67-ce48-4632-9b7e-432d080c688a"> <!-- Required -->

                <div class="wrapper">
                    <div class="inputBox">
                        <input type="text" name="name" required> <!-- Optional -->
                        <span>Name</span>
                    </div>
            <div class="inputBox">
                    <input type="text" name="email" required>
                    <span>Email</span>
                </div>
                <div class="inputBox">
                    <textarea name="message" placeholder="Enter your message here..."></textarea> <!-- Optional -->
            </div>


                <input type="hidden" name="redirectTo" value="https://www.yifan-lu.com"> <!-- Optional -->
                <input type="submit" value="Submit"/>

            </div>
            </form>
        </div>
    </div>

    <Footer/>
</body>

<style>

    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    body {
        display: flex;
        width: 100vw;
        margin: 0px;
        height: 100vh;
        flex-direction: column;
        align-items: center;
        background: #1D1D1D;
        overflow-x: hidden;
    }

    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #1D1D1D;
        gap: 50px;
}

    * {
        color: #D8D8E7;
        font-family: 'Prompt';
        box-sizing: border-box;
        text-size-adjust: auto;
    }        
    
    h3 {
        text-transform: uppercase;
        letter-spacing: 2px;
        -webkit-text-stroke: 1px #D8D8E7;
        text-align: center;
    }
    
    span {
        color: #D8D8E7;
    }
    
    .card {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 80px;
        flex-direction: column;
        width: 40%;
        height: 70%;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 16px;
        gap: 8px;
    }

    .inputBox {
        position: relative;
        min-width: 250px;
        margin-bottom: 8px;
        color: #D8D8E7;
    }
    
    .inputBox input, textarea {
        width: 100%;
        padding: 10px;
        outline: none;
        border: none;
        color: #D8D8E7;
        font-size: 1em;
        background: transparent;
        border-left: 2px solid #1D1D1D;
        border-bottom: 2px solid #1D1D1D;
        transition: 0.1s;
    }
    
    .inputBox input:focus, textarea:focus {
        border: 2px solid #1D1D1D;
        transition: 1s;
    }
    
    .inputBox input:valid~span,
    .inputBox input:focus~span {
        transform: translateX(160px) translateY(-18px);
        font-size: 0.8em;
        padding: 5px 10px;
        background: #1D1D1D;
        letter-spacing: 0.2em;
        color: #D8D8E7;
        border: 2px;
    }
    
    .inputBox input:valid,
    .inputBox input:focus {
        border: 2px solid #1D1D1D;
    }
    
    input[type=submit] {
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
    
    input[type=submit]:hover {
        background-color: #000;
        color: D8D8E7;
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
        color: #D8D8E7;
        text-transform: uppercase;
        transition: 0.5s;
        letter-spacing: 3px;
    }

    @media (max-width: 1000px) {

    .container {
        flex-direction: column;
    }
}
</style>