<script lang='ts'>
    
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

    let resources = [
    
        {
            link: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model', 
            styling: 'background-image: linear-gradient( 135deg, #FEB692 10%, #EA5455 100%);', 
            name: 'Placeholder', 
            description: 'Lorem Ipsum'
        },
    
        {
            link: 'https://kit.svelte.dev/', 
            styling: 'background-image: linear-gradient( 135deg, #43CBFF 10%, #9708CC 100%);', 
            name: 'Placeholder', 
            description: 'Lorem Ipsum'
        },
    
        {
            link: 'https://kit.svelte.dev/', 
            styling: 'background-image: linear-gradient( 135deg, #81FFEF 10%, #F067B4 100%);', 
            name: 'Placeholder', 
            description: 'Lorem Ipsum'
        },
    
        {
            link: 'https://kit.svelte.dev/', 
            styling: 'background-image: linear-gradient( 135deg, #81FFEF 10%, #F067B4 100%);', 
            name: 'Placeholder', 
            description: 'Lorem Ipsum'
        },
    
        {
            link: 'https://kit.svelte.dev/', 
            styling: 'background-image: linear-gradient( 135deg, #81FFEF 10%, #F067B4 100%);', 
            name: 'Placeholder', 
            description: 'Lorem Ipsum'
        }
    
    ];
    
    let cardNum = 2;
    
    function alternate_card () {
        if (cardNum == 1) {
            cardNum = 2;
        } else {
            cardNum = 1;
        }
    
        return cardNum;
    }
    
    let descNum = 1;
    
    function alternate_desc() {
        if (descNum == 1) {
            descNum = 2;
        } else {
            descNum = 1;
        }
    
        return descNum;
    }
    
    </script>

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Prompt">
    
    <title>Our Projects</title>
    
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
                <li style="--clr:#D8D8E7"><a href="{headerContent.link}" data-text="{headerContent.content}">{headerContent.content}</a></li>
                {/each}
            </ul>
        </div>
    </div>

        <div class="cards-container">
            {#each resources as resource}
            <div class="card-wrapper">
                <a href="{resource.link}" target="_blank" class="card" style="order: {alternate_card()}">
                    <div class="card-background" style="{resource.styling}"></div>
                    <div class="card-content">
                        <p class="border">{resource.name}</p>
                    </div>
                </a>
                
                <div class="description-content" style="order: {alternate_desc()}">
                    <p>{resource.description}</p>
                </div>
            </div>
            {/each}
        </div>

        
    {#if stickToTop}
    <slot />
    {/if}

    </body>
    
    <style>

    * {
        color: #D8D8E7;
        font-family: 'Prompt';
        box-sizing: border-box;
        text-size-adjust: auto;
    }

        body {
            display: flex;
            flex-direction: column;
            align-items: center;
            background: #1D1D1D;
            margin-bottom: 0rem;
            position: absolute;
            left: 0;
            right: 0;
            padding: 0px 0px 50px 0px;
        }
    
        .cards-container {
            display: flex;
            flex-direction: column;
            height: 100%;
            gap: 20px;
            align-items: center;
            width: 100%;
        }
    
        .card-wrapper {
            flex: 1;
            display: flex;
            margin-top: auto;
            margin-bottom: auto;
            gap: 30px;
            width: 90%;
            max-height: 256px;
            
        }
    
        .card {
            position: relative;
            padding: 2%;
            background-size: contain;
            flex: 1.5;
            text-decoration: none;
        }
    
        .description-content {
            flex: 1;
            /* From https://css.glass */
            background: rgba(255, 255, 255, 0.15);
            border-radius: 16px;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(5.6px);
            -webkit-backdrop-filter: blur(5.6px);
            padding: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            max-width: 674px;
        }
    
        .description-content:hover {
            cursor: default;
        }
        .card-background {
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            border-radius: 24px;
            filter: brightness(0.75) saturate(1.2) contrast(0.85);
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            transform-origin: center;
            transition: .2s;
        }
        
        .card-wrapper:hover .card-background {
            transform: scale(1.05) translateZ(0);
        }
    
        .cards-container:hover>.card-wrapper:not(:hover) .card-background {
            filter: brightness(0.5) contrast(1.4) blur(30px);
        }
    
        .cards-container:hover>.card-wrapper:not(:hover) .description-content {
            filter: brightness(0.5) contrast(1.4) blur(30px);
        }
    
        .card-content {
            padding: 24px;
            position: relative;
            display: flex;
            max-height: 100%;
            max-width: 100%;
            align-items: center;
            justify-content: center;
            text-align: center;
            flex: 2;
        }
    
        p {
            color: #fff;
            font-size: 2vw;
            display: flex;
            text-transform: uppercase;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-shadow: 0 0 10px rgba(3, 3, 3, 1);
            text-align: center;
            
        }
    
        .description-content p {
            font-size: 1.2vw;
        }
    
        .border {
            border: 5px solid #fff;
            padding: 10px;
        }
    
        .cards-container:hover>.card-wrapper:not(:hover) p {
            opacity: 0;
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
    </style>