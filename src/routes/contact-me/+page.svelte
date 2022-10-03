<script lang="ts">
    import sticky from '../sticky.js';
    import Saos from "saos";

    let headerContents = [
        { content: "Home", link: "../"},
        { content: "Portfolio", link: "../portfolio"},
        { content: "Hire", link: "../hire"},
        { content: "Contact"}
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
    use:sticky={{ stickToTop }}>

    <div class="logo-wrapper">

        <Saos
        animation={'vibrate-1 0.3s linear infinite both'}>
            <div class="logo">
                [yifan]
            </div>
        </Saos>

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

    {#if stickToTop}
    <slot />
    {/if}
</body>

<style>

    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
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

    body {
        display: flex;
        position: absolute;
        left: 0px;
        right: 0px;
        top: 0px;
        bottom: 0px;
        flex-direction: column;
        align-items: center;
        background: #1D1D1D;
        margin-bottom: 1rem;
        align-self: stretch;
        gap: 50px;
    }

    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        align-self: stretch;
        width: 100%;
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
        padding: 150px;
        flex-direction: column;
        width: 40%;
        height: 70%;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 16px;
        gap: 10px;
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
        justify-content: space-between;
        gap: 200px;
        z-index: 999;
        transform: translate3d(0, 0, 1000px);
    }

    a, li, ul {
        text-decoration: none;
        list-style: none;
        display: flex;
    }
    
    li {
        cursor: pointer;
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
      justify-content: flex-end;
      gap: 100px;
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
          -webkit-text-stroke: 0.1px rgba(216, 216, 231, 0.8);
      }
  
      ul li a::before {
          content: attr(data-text);
          position: absolute;
          color: #D8D8E7;
          width: 0;
          overflow: hidden;
          transition: 1s;
          border-right: 0px solid var(--clr);
          -webkit-text-stroke: 0.1px var(--clr);
      }
  
      ul li a:hover::before {
          width: 100%;
          filter: drop-shadow(0 0 25px var(--clr));
      }
  
    .header[data-position='top'] {
        top: 0rem;
        display: flex;
        position: sticky;
        transition: all 0.3s;
        align-items: center;
        width: 100%;
        padding: 10px 30px 10px 30px;
        align-self: stretch;
        z-index: 999;
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

    @media (max-width: 1000px) {
        .toggle-button {
            display: flex;
        }

        .header-contents {
            width: 100%;
            display: none;
        }

        .header {
            align-items: flex-start;
        }

        .header-contents ul {
            width: 100%;
            flex-direction: column;
        }
        

        .header-contents li {
            text-align: center;
        }

        .container {
            flex-direction: column;
        }

        .header.isStuck {
            display: flex;
        }

        .header.isStuck ul {
            flex-direction: column;
            align-items: center;
            flex-direction: center;
            display: flex;
            padding: 0px;
        }

        .header[data-position='top'] .header-contents {
            display: none;
            flex-direction: column;
            align-items: center;
        flex-direction: center;
    }

    .header[data-position='top'] ul {
        flex-direction: column;
        align-items: center;
        flex-direction: center;
        display: flex;
        padding: 0px;
    }

    .header[data-position='top'] .logo-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .header[data-position='top'] {
        flex-direction: column;
        gap: 30px;
    }

    .header.isStuck .logo-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .header.isStuck {
        display: flex;
        flex-direction: column;
        z-index: 999;
    }

    .header-contents-active {
        display: flex;
        align-items: center;
        justify-content: center;
        align-content: center;
        padding: none;
        width: 100%;
    }
    ul {
        align-items: center;
        justify-content: center;
        width: 100%;
    }
    .header {
        z-index: 999;
    }

        .toggle-button {
            cursor: pointer;
        }

        
    .header[data-position='top'] .header-contents-active {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>