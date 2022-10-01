<script lang="ts">
    
    import BackToTop from "./BackToTop.svelte";
	import { onMount } from "svelte";
    import sticky from './sticky.js';

    import IntersectionObserver from "svelte-intersection-observer";
  
    let element;
    let intersecting;
    let element2;
    let intersecting2;
    let element3;
    let intersecting3;
    let rootMargin;

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

        <header class:intersecting>
        </header>

        <div 
        class="header" 
        class:isStuck data-position={stickToTop ? 'top' : 'bottom'}
        use:sticky={{ stickToTop }}
        on:stuck={handleStuck}>

            <div class="logo">
                [yifan]
            </div>

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

        <BackToTop />
        
        <IntersectionObserver {element} bind:intersecting>
            <section bind:this={element}>
                {#if (intersecting === true)}                
                <div class="hi-container">
                    <div class="hi" style="align-self: flex-end;">
                        <div class="hi-text">Hi, I'm <span style="color: #2DA2E4">Yifan</span></div>

                        <div class="occupation">
                            Full-Stack Developer | Student
                        </div>
                    </div>
                </div>
                {:else}
                <div class="hi-container" style="opacity: 0; transition: all 3s; filter: blur(5px); transform: translateX(-100%);">
                    <div class="hi">
                        <div class="hi-text">Hi, I'm <span style="color: #2DA2E4">Yifan</span></div>

                        <div class="occupation">
                            Full-Stack Developer | Student
                        </div>
                    </div>
                </div>
                {/if}
            </section>
        </IntersectionObserver>

        <IntersectionObserver {element2} bind:intersecting2>
            <section bind:this={element2}>             <div class="about-me">
                    <div class="text">
                        I’m a first year student at the <span style="color: #2DA2E4">University of Adelaide</span> studying a <span style="color: #2DA2E4">Bachelor of Computer Science (Advanced)</span> and am interested in both <span style="color: #2DA2E4">front-end and back-end</span> development opportunities to gain experience!
                        <br><br>
                        I have experience in Svelte, Rust, HTML, CSS, JavaScript, TypeScript and C++.
                    </div>
            </div>
        </section>
    </IntersectionObserver>
            
        <IntersectionObserver {element3} bind:intersecting3>
        <section bind:this={element3}>
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
    </IntersectionObserver>

    {#if stickToTop}
    <slot />
    {/if}
</body>

<style>

    header {
        position: sticky;
        z-index: 100;
        opacity: 0;
        left: 0;
        width: 100%;
        top: 0;
        height: 1px;
        padding: 0;
    }

    * {
        color: #D8D8E7;
        font-family: 'Prompt';
        box-sizing: border-box;
        text-size-adjust: auto;
    }

    .whitespace {
        height: 20vh;
    }
    .container {
        gap: 220px;
        display: flex;
        flex-direction: column;
        align-items: center;
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

    ul {
        margin-block-start: 0;
        margin-block-end: 0;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 0;
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
        gap: 200px;
    }

    .header[data-position='top'] {
        top: 0rem;
        display: flex;
        flex-direction: column;
        position: sticky;
        font-size: 1.6em;
        transition: all 0.3s;
        align-items: center;
        padding: 100px;
        height: 100vh;
        align-self: stretch;
    }

    .header[data-position='bottom'] {
        bottom: 1rem;
    }

    .header.isStuck {
        background: rgba(55, 55, 55, 1);
        z-index: 1;
        font-size: 1em;
        flex-direction: row;
        height: 40%;
        justify-content: space-between;
        padding: 10px 30px 10px 30px;
    }

    .header-contents {
        display: flex;
    }

    ul {
        display: flex;
        order: 1;
        gap: 30px;
        justify-content: space-between;
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

    p, h2 {
        margin-block-start: 0px;
        margin-block-end: 0px;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
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
        position: absolute;
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

        .header-contents.active {
            display: flex;
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