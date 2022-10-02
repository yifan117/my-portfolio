<script lang="ts">

    import sticky from '../lib/sticky.js';

    import Saos from "saos";

    let headerContents = [
        { content: "Home", link: "../+page.svelte"},
        { content: "Portfolio"},
        { content: "Hire Me"},
        { content: "Contact"}
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
                    <li><a href="{headerContent.link}">{headerContent.content}</a></li>
                    {/each}
                </ul>
            </div>
        </div>
    {#if stickToTop}
    <slot />
    {/if}

</body>
<style>
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

    p, h2, ul {
        margin-block-start: 0;
        margin-block-end: 0;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 0;
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