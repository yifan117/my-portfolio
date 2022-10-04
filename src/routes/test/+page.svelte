<script lang='ts'>

    import BackToTop from "../lib/BackToTop.svelte";
import Nav from "../lib/nav-bar.svelte";

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

    let toggleCount = 0;

$: toggleCountd = toggleCount % 2;

function toggleBurger() {
    toggleCount += 1;
}
    
    </script>

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Prompt">
    
    <title>Our Projects</title>
    
    <body>
    
        <Nav/>

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

        <BackToTop/>
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
            min-height: 100vh;
            right: 0;
            padding: 0px 0px 50px 0px;
        }
    
        .cards-container {
            display: flex;
            flex-direction: column;
            height: 100%;
            gap: 40px;
            align-items: center;
            width: 90%;
        }
    
        .card-wrapper {
            flex: 1;
            display: flex;
            margin-top: auto;
            margin-bottom: auto;
            gap: 30px;
            width: 90%;
            max-height: 256px;
            width: 100%;
            
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
    
        .cards-container:has(.card-wrapper:hover) .card-wrapper:not(:hover) .card-background {
            filter: brightness(0.5) contrast(1.4) blur(30px);
        }
    
        .cards-container:has(.card-wrapper:hover) .card-wrapper:not(:hover) .description-content {
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
    
        .cards-container:has(.card-wrapper:hover) .card-wrapper:not(:hover) p {
            opacity: 0;
        }

    a {
        text-decoration: none;
        list-style: none;
        display: flex;
    }

    </style>
