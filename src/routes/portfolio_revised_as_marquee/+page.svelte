<script lang='ts'>

    import Nav from "../lib/nav-bar.svelte";
    import Footer from "../Footer.svelte";
    import Ticker from "../lib/TickerComponents/Ticker.svelte";
    
    let nav_contents = [
        {image: "https://images.unsplash.com/photo-1609697299491-69d2d5ed2c36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fGNhbGN1bGF0b3J8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60", 
        alt: "Calculator Tile", 
        title: "Calculator", 
        description: "A simple calculator. My first project completed in Svelte!",
        status: "Status: Completed 31/08/2022",
        to_do: "",
        href: "../lib/calculator"},

        {image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80", 
        alt: "Stopwatch Tile", 
        title: "Stopwatch", 
        description: "A simple stopwatch displaying minutes, seconds, and centiseconds.",
        status: "Status: Completed 12/09/2022",
        to_do: "",
        href: "../lib/stopwatch"},

        {image: "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", 
        alt: "Typing Trainer Tile", 
        title: "Typing Trainer", 
        description: "A game designed to help people learn to touch-type and improve typing speed.",
        status: "Status: Completed 17/09/2022",
        to_do: "",
        href: "../lib/typing_game"},
    
        {image: "https://svelte.dev/images/twitter-thumbnail.jpg", 
        alt: "Svelte Materials Tile", 
        title: "Svelte Materials", 
        description: "A collection of resources that I utilised to learn Svelte and frontend.", 
        status: "Status: Completed 17/09/2022",
        to_do: "",
        href: "../lib/svelte_materials"},

        {image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", 
        alt: "2048 Tile", 
        title: "2048 Game", 
        description: "A 2048 game copy.", 
        status: "Status: In Progress",
        to_do: "To-Do: add end-game condition.",
        href: "../lib/2048"},
    
        {image: "https://images.unsplash.com/photo-1670786146738-c9d7acdd7226?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80", 
        alt: "Portfolio Tile", 
        title: "More Projects Coming Soon!", 
        description: "Under construction, watch this space. 👀", 
        to_do: "",
        href: "https://www.youtube.com/watch?v=eBGIQ7ZuuiU"},
    ]
    import { onMount } from "svelte";
	import { element } from "svelte/internal";
    
    onMount(() => {
        window_width = window.innerWidth
        min = x - el.offsetWidth
    })
    
    $: console.log((x + 1000) / 30)
    
    let x = 1500
    const max = 1500
    let min: number
    let el: HTMLElement
    let left: any;
    
    let mousedown = false
    function drag(event: any) {
        console.log(left);
        if (mousedown) {
            x += event.movementX
            if (x < min) x = min
            if (x > max) x = max

        }
    }

    function update_left() {
        left = el.scrollLeft;
    }
    
    let window_width = 0;

    function scroll_horizontal(event) {
        event.preventDefault();

        el.scrollBy({
            left: event.deltaY < 0 ? -30 : 30,
        });
    }

    </script>
    <svelte:window bind:scrollX={left} on:mousemove={drag} on:progress={update_left} on:scroll={scroll_horizontal}/>
    
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Prompt">
    
    <div class="page">
        
        <Nav/>
        <body>
            <div bind:this={el} id="image-track" data-mouse-down-at="0" data-prev-percentage="0" on:scroll={update_left}>
                {#each nav_contents as nav}
                    <div class="image_wrapper">
                        <img class="image" src={ nav.image } alt={ nav.alt } draggable='false'
                        style="
                        object-position: {left / 9}% center;"/>
                        <div class="info_wrapper">
                            <div class="title">
                                { nav.title }
                            </div>
    
                            <div class="description">
                                { nav.description } <br/> { nav.status } <br/> { nav.to_do }
                            </div>
    
                            <a class="redirect" href={ nav.href } target="blank">
                                Visit
                            </a>
                        </div>
                    </div>
                {/each}
            </div>
        </body>
    
        <Footer/>
    </div>
    
<style lang='stylus'>
    
*
    user-select none
    font-family 'Prompt'

a
    text-decoration none

body
    width 100vw
    height 100%
    margin 0rem
    overflow-x hidden
    display flex
    align-items center
    justify-content center

.page
    display flex
    flex-direction column
    justify-content space-between
    height 100vh
    margin 0rem
    background #1d1d1d
    overflow-x hidden


#image-track > .image_wrapper
    width 40vmin
    height 56vmin
    position relative
    display flex
    align-items center
    justify-content center

.image_wrapper > .image
    width 40vmin
    height 56vmin
    object-fit none

#image-track
    display flex
    gap 4vmin
    position absolute
    top 50%
    transform translate(0%, -50%)
    overflow-x scroll
    width 98%
    scrollbar-width none
    height 80%
    align-items center

.info_wrapper
    color white
    position absolute
    padding 8px
    display none
    opacity 0
    transition visibility 0s, opacity 0.2s linear
    text-align center
    gap 1rem
    display flex
    align-items center
    justify-content center
    flex-direction column

.image:hover ~ .info_wrapper
.info_wrapper:hover
    opacity 100
    display flex
    

.redirect
    background #1a1a1a
    color white
    padding 4px 12px
    border-radius 16px
    display flex
    align-items center
    justify-content center
    text-align center
    &:hover
        cursor pointer
        background rgba(0, 0, 0, 0.5)

.image_wrapper:hover > .image
    filter blur(10px) brightness(50%)
    transition 0.2s ease-in

.image_wrapper:hover
    box-shadow 0 0 13px 0px rgba(255, 255, 255, 0.1)

.title
    font-weight 700
    font-size 1.5rem

@keyframes gradient
    0%
        background-position 0% 50%
    50%
        background-position 100% 50%
    100%
        background-position 0% 50%
    

@media (max-width 745px)
    #image-track
        flex-direction column
        width 100%
        max-width 100vw

    #image-track > .image_wrapper
        width 80vmin
        height 44vmin

    .image_wrapper > .image
        height 44vmin
        width 80vmin
</style>