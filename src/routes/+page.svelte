<script lang="ts">
    
    import BackToTop from "./lib/BackToTop.svelte";
    import sticky from './sticky.js';
    import Footer from "./Footer.svelte";
  
    import CubeAnimation from "./lib/cubeAnimation.svelte";
  
    import Saos from "saos";

    function handleObserver(x: CustomEvent<any>) {
    console.info(x.detail.observing);
  }
  
    let headerContents = [
        { content: "Home"},
        { content: "Portfolio", link: "./portfolio_revised_as_marquee"},
        { content: "Hire", link: "./hire"},
        { content: "Contact", link: "./contact-me"}
    ];
  
    let skills = [
        { text: "Svelte | HTML + CSS", level: "90", color: "#FF5D5D"},
        { text: "JavaScript | TypeScript", level: "90", color: "#CC5CDE"},
        { text: "C++", level: "95", color: "#80C07A"},
        { text: "Rust", level: "70", color: "#D06E61"}
    ];
  
    let stickToTop = true;
  
    let isStuck = false;
  
    function handleStuck(e) {
        isStuck = e.detail.isStuck;
    }

    let toggleCount = 0;

    $: toggleCountd = toggleCount % 2;

    function toggleBurger() {
        toggleCount += 1;
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

    
    <div class="logo-wrapper">

        {#if isStuck === false}
        <Saos
        animation={'vibrate-1 0.3s linear infinite both'}>
            <div class="logo">
                [yifan]
            </div>
        </Saos>
        {:else}
        <div class="logo">
            [yifan]
        </div>
        {/if}

        <button class="toggle-button" on:click={toggleBurger}>
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </button>

    </div>

    {#if (toggleCountd === 0)}
            <div class="header-contents">
                <ul>
                    {#each headerContents as headerContent}
                    <li style="--clr:#D8D8E7"><a href="{headerContent.link}" data-text="{headerContent.content}">{headerContent.content}</a></li>
                    {/each}
                </ul>
            </div>
            {:else}
            <div class="header-contents-active">
                <ul>
                    {#each headerContents as headerContent}
                    <li style="--clr:#D8D8E7"><a href="{headerContent.link}" data-text="{headerContent.content}">{headerContent.content}</a></li>
                    {/each}
                </ul>
            </div>
            {/if}
        </div>
        <BackToTop/>
  
        <section></section>
  
        <Saos
        animation={'focus-in-contract-bck 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'}>
        <div class="hi-container">
                    <div class="hi" style="align-self: flex-end;">
                        <div class="hi-text">Hi, I'm <span class="gradient-text">Yifan</span></div>
  
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
                        I’m a second year student at the <span class="gradient-text">University of Adelaide</span> studying a <span class="gradient-text">Bachelor of Computer Science</span> and am interested in both <span class="gradient-text">front-end and back-end</span> development opportunities to gain experience!
                        <br><br>
                        I have experience in Svelte, Rust, Python, HTML, CSS, JavaScript, TypeScript and C++.
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
  
        <!-- <section>
            <Saos
            animation={'focus-in-contract-bck 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'}>
                <h2>Community Engagement</h2>
            </Saos>
                <CommunitySphere/>
        </section> -->
  
    {#if stickToTop}
    <slot />
    {/if}

    <Footer/>
  
  </body>
  
  <style lang='stylus'>
  
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

.text {
    text-align: center;
    max-width: 70%;
}

.about-me {
    display: flex;
    align-items: center;
    justify-content: center;
}

section {
    display: grid;
    align-self: stretch;
    width: 100%;
}

a, li, ul {
    text-decoration: none;
    list-style: none;
    display: flex;
}

li {
    cursor: pointer;
}

body {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #1D1D1D;
    gap: 200px;
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
    transform: translate3d(0, 0, 1000px);
}

.header-contents {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
}

.header[data-position='top'] .header-contents {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
}

.header[data-position='top'] ul {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-around;
}

.header.isStuck ul {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: flex-end;
    gap: 100px;
}

.header.isStuck .header-contents {
    display: flex;
    justify-content: flex-end;
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

    ul li a {
        position: relative;
        text-decoration: none;
        line-height: 1em;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: transparent;
        -webkit-text-stroke: 1px rgba(216, 216, 231, 0.8);
    }

    ul li a::before {
        content: attr(data-text);
        position: absolute;
        color: #D8D8E7;
        line-height: 1em;
        width: 0;
        overflow: hidden;
        transition: 0.5s;
        border-right: 0px solid var(--clr);
        -webkit-text-stroke: 1px var(--clr);
    }

    ul li a:hover::before {
        width: 100%;
        filter: drop-shadow(0 0 25px var(--clr));
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
    padding: 0px;
    background: none;
    border: none;
}

.toggle-button .bar {
    height: 3px;
    width: 100%;
    background-color: #D8D8E7;
    border-radius: 10px;
}

@media (max-width: 1000px) {

    .header {
        flex-direction: column;
        align-items: flex-start;
    }

    .header[data-position='top'] .header-contents {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .toggle-button {
        cursor: pointer;
    }

    .header[data-position='top'] .logo {
        font-size: 1.4em;
    }

    .header[data-position='top'] .toggle-button {
        display: none;
    }

    .header[data-position='top'] .header-contents ul {
        width: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    

    .header[data-position='top'] .header-contents li {
        text-align: center;
        width: 100%;
        font-size: 0.6em;
        align-items: center;
        justify-content: center;
    }

    .header.isStuck .toggle-button {
        display: flex;
    }

    .header.isStuck .logo-wrapper {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
    }

    .header.isStuck {
        display: flex;
        flex-direction: column;
        gap: 30px;
    }

    .header.isStuck .header-contents {
        display: none;
    }

    .header-contents-active {
        display: flex;
        flex-direction: column;
        height: 20%;
    }

    .header-contents-active ul {
        flex-direction: column;
    }

}

@keyframes gradient {
	0% {
		background-position: 0% 50%;
    }
	50% {
		background-position: 100% 50%;
    }
	100% {
		background-position: 0% 50%;
    }
}

.gradient-text {
    background: linear-gradient(92.62deg, #9C98E2, #5F5FCC, #98D1F4, #00D3FF);
    -webkit-background-clip: text;
    background-size: 400% 400%;
    animation: gradient 5s ease infinite;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
}
  </style>