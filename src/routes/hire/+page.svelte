<script lang="ts">
    import Nav from "../lib/nav-bar.svelte";
    import Footer from "../Footer.svelte";
</script>

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Prompt">

<body>
    <Nav/>

    <div class="wrapper">
        <div class="text-container">
            <h1>What Am I Looking For?</h1>
            <p>I'm looking for opportunities as either a full-stack, front-end, or back-end software engineer. Since I am only in my first year of my Computer Science degree, I'm primarily focusing on internships and part-time jobs, but would love the opportunity for permanent offers once I graduate!</p>
            <p>To contact me about offers or if you have any questions, please click <a href="../contact-me">here</a></p>
        </div>
    </div>

    <Footer/>
        
</body>

<style>
        * {
        color: #D8D8E7;
        font-family: 'Prompt';
        box-sizing: border-box;
        text-size-adjust: auto;
    }

    body {
        background: #1D1D1D;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        min-height: 100vh;
    }

    h1 {
        text-transform: uppercase;
    }

    .text-container {
        width: 80%;
        text-align: center;
        font-weight: 600;
        font-size: 1.3em;
    }

    .wrapper {
        display: flex;
        align-self: stretch;
        align-items: center;
        justify-content: center;
        height: 70%;
    }

    a {
        text-decoration: none;
        color: #2DA2E4;
    }
</style>