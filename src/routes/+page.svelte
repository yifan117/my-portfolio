<script lang="ts">

    let headerContents = [
        { content: "Home"},
        { content: "Portfolio"},
        { content: "Hire Me"},
        { content: "Contact"}
    ];

</script>

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Prompt">

<div class="page">
    <div class="header">
        <div class="logo">
            Placeholder
        </div>

        <div class="header-contents">
            <ul>
                {#each headerContents as headerContent}
                <li><a href="#">{headerContent.content}</a></li>
                {/each}
            </ul>
        </div>
    </div>

    <div class="body-container">
        <div class="hi-container">
            <div class="hi">
                    <p class="hi-text">Hi, I'm</p>
                    <p class="hi-text-yifan" style="color: #2DA2E4">Yifan</p>
            </div>

            <div class="occupation">
                <p class="sub-text">Full-Stack Developer | Student</p>
            </div>
        </div>

        <div class="about-me">
            I’m a first year student at the <span style="color: #2DA2E4">University of Adelaide</span> studying a <span style="color: #2DA2E4">Bachelor of Computer Science (Advanced)</span> and am interested in both <br><span style="color: #2DA2E4">front-end and back-end</span> development opportunities to gain experience!
            <br><br>
            I have experience in <span style="color: #2DA2E4">Svelte</span>, Rust, <span style="color: #2DA2E4">HTML</span>, <span style="color: #2DA2E4">CSS</span>, <span style="color: #2DA2E4">JavaScript</span>, <span style="color: #2DA2E4">TypeScript</span>, and <span style="color: #2DA2E4">C++</span>.
        </div>
    </div>
</div>


<style>

    * {
        color: #D8D8E7;
        font-family: 'Prompt';
    }

    a, li, ul {
        text-decoration: none;
        list-style: none;
        display: flex;
    }
    .page {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100vh;
        background: #1D1D1D;
        gap: 200px;
    }

    .logo {
        display: flex;
        width: 100%;
        font-size: 40px;
        font-weight: 700;
    }

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 300px;
        align-self: stretch;
        padding: 10px 30px 10px 30px;
    }

    .header-contents {
        display: flex;
        width: 100%;
    }

    .hi-container {
        display: flex;
        flex-direction: column;
    }

    ul {
        width: 100%;
        justify-content: space-between;
        font-size: 28px;
        font-weight: 600;
    }

    .body-container {
        display: flex;
        align-items: center;
        gap: 500px;
        padding: 20px;
    }

    .about-me {
        font-weight: 600;
        font-size: 24px;
    }

    .hi-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .hi {
        display: flex;
        flex: none;
        order: 0;
        flex-grow: 0;
        width: 100%;
        gap: 30px;
    }

    .column-div {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: none;
    }

    .row-div {
        display: flex;
        width: 100%;
    }

    .hi-text, .hi-text-yifan {
        font-size: 88px;
        font-weight: 600;
    }

    p {
        margin-block-start: 0px;
        margin-block-end: 0px;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
    }

    .hi-text-yifan {
        display: flex;
        align-self: flex-end;
        width: 100%;
    }

    .hi-text {
        width: 30%;
    }

    .sub-text {
        opacity: 30%;
    }
</style>