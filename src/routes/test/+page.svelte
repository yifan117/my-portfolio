<script>
    import IntersectionObserver from "svelte-intersection-observer";
    let element;
    let intersecting;
    let element2;
    let intersecting2;


    let skills = [
        { text: "Svelte | HTML + CSS", level: "80", color: "#FF5D5D"},
        { text: "JavaScript | TypeScript", level: "60", color: "#CC5CDE"},
        { text: "C++", level: "80", color: "#80C07A"},
        { text: "Rust", level: "20", color: "#D06E61"}
    ];
  </script>
  
  <h2>Basic</h2>
  
  <div class="code-fence">
    <div class="headers">
        
        <header class:intersecting>
        {intersecting ? "Element is in view" : "Element is not in view"}
        </header>

        <header class:intersecting2>
            {intersecting2 ? "Element2 is in view" : "Element2 is not in view"}
        </header>
    </div>
  
    <section></section>

    <IntersectionObserver {element2} bind:intersecting2>
        <section bind:this={element2}>                <div class="hi-container">
        <section>
            <div class="about-me">
                    <div class="text">
                        I’m a first year student at the <span style="color: #2DA2E4">University of Adelaide</span> studying a <span style="color: #2DA2E4">Bachelor of Computer Science (Advanced)</span> and am interested in both <span style="color: #2DA2E4">front-end and back-end</span> development opportunities to gain experience!
                        <br><br>
                        I have experience in Svelte, Rust, HTML, CSS, JavaScript, TypeScript and C++.
                    </div>
            </div>
        </section>
    </IntersectionObserver>

    <IntersectionObserver {element} bind:intersecting>
    <section bind:this={element}>
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
  </div>

  <style>
    h2 {
      margin-bottom: 1rem;
    }
  
    .code-fence {
      overflow-y: scroll;
      height: 100vh;
      margin-bottom: 3rem;
    }
  
    header {
      position: sticky;
      z-index: 1;
      top: 0;
      width: 100%;
      left: 0;
      padding: 1rem;
      background-color: #e0f7f6;
    }

    .headers {
        display: flex;
        position: sticky;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
    }

    section {
        display: grid;
        align-self: stretch;
        min-height: 100vh;
        width: 100%;
    }
  
    header:before {
      content: "Scroll down.";
      display: block;
      color: #111;
    }
  
    :global(.code-fence header ~ div) {
      margin-top: calc(380px);
      height: 200px;
      padding: 1rem;
      background-color: #376462;
      color: #fff;
    }
  
    .code-fence header {
      font-weight: bold;
      color: #d54309;
    }
  
    .code-fence header.intersecting {
      color: #00a91c;
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
        justify-content: space-between;
        padding: 10px 30px 10px 30px;
        height: 40%;
        align-self: stretch;
    }

    .header[data-position='top'] {
        top: 0rem;
        display: flex;
        position: sticky;
        transition: all 0.3s;
        align-items: center;
        justify-content: space-between;
        padding: 10px 30px 10px 30px;
        height: 40%;
        align-self: stretch;
    }

    .header[data-position='bottom'] {
        bottom: 1rem;
    }

    .header.isStuck {
        background: rgba(55, 55, 55, 1);
        z-index: 1;
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
    
    
  </style>
