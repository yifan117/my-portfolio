<script lang="ts">
        let headerContents = [
        { content: "Home", link: "../"},
        { content: "Portfolio", link: "../portfolio"},
        { content: "Hire", link: "../hire"},
        { content: "Contact", link: "../contact-me"}
    ];

        let toggleCount = 0;

    $: toggleCountd = toggleCount % 2;

    function toggleBurger() {
        toggleCount += 1;
    }
</script>
<div 
class="header">

<div class="logo-wrapper">

        <div class="logo">
            [yifan]
        </div>

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

<style>
        * {
        color: #D8D8E7;
        font-family: 'Prompt';
        box-sizing: border-box;
        text-size-adjust: auto;
    }     

    .logo {
        order: 0;
        display: flex;
        font-size: 3em;
        font-weight: 700;
        align-items: flex-start;
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
  
    .header-contents {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
    }
  
    .header ul {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: flex-end;
      gap: 100px;
    }

    .header .header-contents {
      display: flex;
      justify-content: flex-end;
    }

    .header .header-contents-active {
        display: flex;
        justify-content: flex-end;
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
          transition: 0.5s;
          border-right: 0px solid var(--clr);
          -webkit-text-stroke: 0.1px var(--clr);
      }
  
      ul li a:hover::before {
          width: 100%;
          filter: drop-shadow(0 0 25px var(--clr));
      }
  
    .header {
        top: 0rem;
        display: flex;
        position: sticky;
        transition: all 0.3s;
        align-items: center;
        width: 100%;
        padding: 10px 30px 10px 30px;
        align-self: stretch;
        justify-content: space-between;
        z-index: 999;
        transform: translate3d(0, 0, 1000px);
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
            z-index: 999;
        }

        .header-contents ul {
            width: 100%;
            flex-direction: column;
        }
        

        .header-contents li {
            text-align: center;
        }

        .header {
            display: flex;
            z-index: 999;

        }

        .header ul {
            flex-direction: column;
            align-items: center;
            flex-direction: center;
            display: flex;
            padding: 0px;
        }

        .header .header-contents {
            display: none;
            flex-direction: column;
            align-items: center;
        flex-direction: center;
    }

    .header ul {
        flex-direction: column;
        align-items: center;
        flex-direction: center;
        display: flex;
        padding: 0px;
    }

    .header .logo-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .header {
        flex-direction: column;
        gap: 30px;
    }

    .header .logo-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .header {
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

        
    .header .header-contents-active {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .logo-wrapper {
        z-index: 999;
    }
}
</style>