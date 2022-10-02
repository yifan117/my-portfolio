<script lang="ts">
    
    import CommunitySphere from "./lib/CommunityEngagementSphere.svelte";
    import BackToTop from "./lib/BackToTop.svelte";
    import sticky from './sticky.js';

    import CubeAnimation from "./lib/cubeAnimation.svelte";

    import Saos from "saos";
  
    function handleObserver(x: CustomEvent<any>) {
    console.info(x.detail.observing);
  }

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

    let stickToTop = true;

    let isStuck = false;

    function handleStuck(e) {
        isStuck = e.detail.isStuck;
    }

</script>


<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Prompt">

<body>

    {#if !stickToTop}
    <slot />
    {/if}

        <div 
        class="header" 
        class:isStuck data-position={stickToTop ? 'top' : 'bottom'}
        use:sticky={{ stickToTop }}
        on:stuck={handleStuck}>

        <Saos
        animation={'vibrate-1 0.3s linear infinite both'}>
            <div class="logo">
                [yifan]
            </div>
        </Saos>

            <a href="#" class="toggle-button">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </a>

            <div class="header-contents">
                <ul>
                    {#each headerContents as headerContent}
                    <li><a href="#">{headerContent.content}</a></li>
                    {/each}
                </ul>
            </div>
        </div>

        <BackToTop/>

        <section></section>

        <Saos
        animation={'focus-in-contract-bck 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'}>
        <div class="hi-container">
                    <div class="hi" style="align-self: flex-end;">
                        <div class="hi-text">Hi, I'm <span style="color: #2DA2E4">Yifan</span></div>

                        <div class="occupation">
                            Full-Stack Developer | Student
                        </div>
                    </div>
                </div>

                <CubeAnimation/>
        </Saos>

        <Saos animation={'focus-in-contract-bck 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'}>           
            <section style="padding: 100px 0px 0px 0px">
                <div class="about-me">
                    <div class="text">
                        I’m a first year student at the <span style="color: #2DA2E4">University of Adelaide</span> studying a <span style="color: #2DA2E4">Bachelor of Computer Science (Advanced)</span> and am interested in both <span style="color: #2DA2E4">front-end and back-end</span> development opportunities to gain experience!
                        <br><br>
                        I have experience in Svelte, Rust, HTML, CSS, JavaScript, TypeScript and C++.
                    </div>
            </div>
        </section>
    </Saos>
            
        <section>
            <Saos animation={'swing-in-top-fwd 2s cubic-bezier(0.175, 0.885, 0.320, 1.275) both'}>           
                <div class="container" style="justify-content: center">
                    <div class="skills-container">
                        <h2>Skills</h2>
                        <div class="level-container">
                            <div class="skill">
                                {#each skills as skill}
                                    <Saos animation={'fade-in-left 1s cubic-bezier(0.390, 0.575, 0.565, 1.000) 0.1s both'}>           
                                        <p class="skill-text">{skill.text}</p>
                                        <div class="skill-bar-container" style="width: 100%;">
                                            <div class="skill-bar" style="width: {skill.level}%; background: {skill.color}; flex-grow: 0; order: 0; align-items: flex-start"></div>
                                            <div class="skill-bar-filler" style="background: rgba(216, 216, 231, 0.1); flex-grow: 1; order: 1; align-items: flex-end"></div>
                                        </div>
                                    </Saos>
                                {/each}
                            </div>
                        </div>
                    </div>
                </div>
            </Saos>
        </section>

        <section>
            <Saos
            animation={'focus-in-contract-bck 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'}>
                <h2>Community Engagement</h2>

            </Saos>

            <canvas>
                <CommunitySphere/>
            </canvas>
        </section>

    {#if stickToTop}
    <slot />
    {/if}

</body>

<style>

    .skill:nth-child(2) {
        transition-delay: 200ms;
    }

    .skill:nth-child(3) {
        transition-delay: 300ms;
    }

    .skill:nth-child(4) {
        transition-delay: 400ms;
    }

    @keyframes -global-fade-in-left {
        0% {
            -webkit-transform: translateX(-50px);
                    transform: translateX(-50px);
            opacity: 0;
        }
        100% {
            -webkit-transform: translateX(0);
                    transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes -global-scale-in-center {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(1);
            opacity: 1;
      }
    }

    @keyframes -global-focus-in-contract-bck {
        0% {
            letter-spacing: 1em;
            -webkit-transform: translateZ(300px);
                    transform: translateZ(300px);
            -webkit-filter: blur(12px);
                    filter: blur(12px);
            opacity: 0;
        }
        100% {
            -webkit-transform: translateZ(12px);
                    transform: translateZ(12px);
            -webkit-filter: blur(0);
                    filter: blur(0);
            opacity: 1;
        }
    }

    @keyframes -global-swing-in-top-fwd {
        0% {
            -webkit-transform: rotateX(-100deg);
                    transform: rotateX(-100deg);
            -webkit-transform-origin: top;
                    transform-origin: top;
            opacity: 0;
        }
        100% {
            -webkit-transform: rotateX(0deg);
                    transform: rotateX(0deg);
            -webkit-transform-origin: top;
                    transform-origin: top;
            opacity: 1;
        }
    }

    @keyframes -global-vibrate-1 {
        0% {
            -webkit-transform: translate(0);
                    transform: translate(0);
        }
        20% {
            -webkit-transform: translate(-2px, 2px);
                    transform: translate(-2px, 2px);
        }
        40% {
            -webkit-transform: translate(-2px, -2px);
                    transform: translate(-2px, -2px);
        }
        60% {
            -webkit-transform: translate(2px, 2px);
                    transform: translate(2px, 2px);
        }
        80% {
            -webkit-transform: translate(2px, -2px);
                    transform: translate(2px, -2px);
        }
        100% {
            -webkit-transform: translate(0);
                    transform: translate(0);
        }
    }

    * {
        color: #D8D8E7;
        font-family: 'Prompt';
        box-sizing: border-box;
        text-size-adjust: auto;
    }

    .container {
        gap: 220px;
        display: flex;
        flex-direction: column;
        align-items: center;
        align-self: stretch;
        width: 100%;
}

    section {
        display: grid;
        align-self: stretch;
        min-height: 100vh;
        width: 100%;
    }

    a, li, ul {
        text-decoration: none;
        list-style: none;
        display: flex;
    }

    body {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #1D1D1D;
        margin-bottom: 1rem;
    }

    .logo {
        order: 0;
        display: flex;
        font-size: 3em;
        font-weight: 700;
        align-items: flex-start;
    }

    .header {
        display: flex;
        position: sticky;
        transition: all 0.3s;
        align-items: center;
        align-self: stretch;
        width: 100%;
        gap: 200px;
        z-index: 999;
    }

    .header[data-position='top'] {
        top: 0rem;
        display: flex;
        flex-direction: column;
        position: sticky;
        font-size: 1.6em;
        transition: all 0.3s;
        align-items: center;
        width: 100%;
        padding: 100px;
        height: 100vh;
        align-self: stretch;
        z-index: 999;
    }

    .header[data-position='bottom'] {
        bottom: 1rem;
    }

    .header.isStuck {
        background: rgba(55, 55, 55, 1);
        z-index: 999;
        font-size: 1em;
        flex-direction: row;
        height: 40%;
        justify-content: space-between;
        padding: 10px 30px 10px 30px;
    }

    ul {
        display: flex;
        order: 1;
        gap: 30px;
        font-size: 1.8em;
        font-weight: 600;
        align-items: flex-end;
        justify-content: flex-start;
    }

    .about-me {
        display: flex;
        font-weight: 600;
        font-size: 1.5em;
        padding: 20px;
        align-items: center;
        text-align: center;

    }

    .occupation {
        display: flex;
        align-self: stretch;
        align-items: center;
        justify-content: center;
    }

    .hi {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .hi-container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 80%;
    }

    .hi-text {
        font-size: 6em;
        font-weight: 600;
        text-align: center;
    }

    p, h2, ul {
        margin-block-start: 0;
        margin-block-end: 0;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 0;
    }

    .occupation {
        opacity: 30%;
    }

    .skills-container {
        display: flex;
        flex-direction: column;
        padding: 20px 30px 20px 30px;
        align-items: center;
        align-self: stretch;
        width: 100%;
    }

    .level-container {
        width: 60%;
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
        display: flex;
        justify-content: center;
        font-size: 2.5em;
        font-weight: 600;
    }

    .skill-bar-container {
        display: flex;
    }

    .toggle-button {
        top: .75rem;
        right: 1rem;
        display: none;
        flex-direction: column;
        justify-content: space-between;
        width: 30px;
        height: 21px;
    }

    .toggle-button .bar {
        height: 3px;
        width: 100%;
        background-color: #D8D8E7;
        border-radius: 10px;
    }

    @media (max-width: 600px) {
        .toggle-button {
            display: flex;
        }

        .header-contents {
            width: 100%;
            display: none;
        }

        .header {
            flex-direction: column;
            align-items: flex-start;
        }

        .header-contents ul {
            width: 100%;
            flex-direction: column;
        }
        

        .header-contents li {
            text-align: center;
        }
    }
    
</style>