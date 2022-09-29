<script lang="ts">

    let headerContents = [
        { content: "Home"},
        { content: "Portfolio"},
        { content: "Hire Me"},
        { content: "Contact"}
    ];

    let skills = [
        { text: "Svelte | HTML + CSS", level: "80", color: "#FF5D5D"},
        { text: "JavaScript | TypeScript", level: "60", color: "#CC5CDE"},
        { text: "C++", level: "80", color: "#80C07A"},
        { text: "Rust", level: "20", color: "#D06E61"}
    ];

</script>

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Prompt">

<div class="page">
    <section>
        <div class="container">
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
    </section>

    <section>
        <div class="container" style="justify-content: center">
            <div class="skills-container">
                <h2>Skills</h2>
                <div class="level-container">
                    <div class="skill">
                        {#each skills as skill}
                        <p class="skill-text">{skill.text}</p>
                        <div class="skill-bar-container" style="width: 100%">
                            <div class="skill-bar" style="width: {skill.level}%; background: {skill.color}; flex-grow: 0; order: 0; align-items: flex-start"></div>
                            <div class="skill-bar-filler" style="background: rgba(216, 216, 231, 0.1); flex-grow: 1; order: 1; align-items: flex-end"></div>
                        </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>


<style>

    * {
        color: #D8D8E7;
        font-family: 'Prompt';
        box-sizing: border-box;
    }

    .container {
        gap: 220px;
        display: flex;
        flex-direction: column;
}
    section {
        display: grid;
        align-self: stretch;
        min-height: 100vh;
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
        background: #1D1D1D;
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
        max-height: 20%;
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

    p, h2 {
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

    .skills-container {
        display: flex;
        flex-direction: column;
        padding: 20px 30px 20px 30px;
        align-items: center;
        align-self: stretch;
    }

    .level-container {
        width: 100%;
        display: flex;
    }
    .skill {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 10px;
    }

    .skill-bar, .skill-bar-filler {
        height: 10px;
        border-radius: 20px;
    }

    h2 {
        width: 100%;
        display: flex;
        justify-content: center;
        font-size: 39px;
        font-weight: 600;
    }

    .skill-bar-container {
        display: flex;
    }
</style>