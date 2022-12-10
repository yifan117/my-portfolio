<script lang='ts'>

import Nav from "../lib/nav-bar.svelte";
import Footer from "../Footer.svelte";

let nav_contents = [
    {image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80", 
    alt: "Stopwatch Tile", 
    title: "Stopwatch", 
    description: "A simple stopwatch displaying minutes, seconds, and centiseconds.", 
    href: "../lib/stopwatch"},
    
    {image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", 
    alt: "2048 Tile", 
    title: "2048 Game", 
    description: "A 2048 game copy.<br/>To-Do: add end-game condition.", 
    href: "../lib/2048"},

    {image: "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", 
    alt: "Typing Trainer Tile", 
    title: "Typing Trainer", 
    description: "A game designed to help people learn to touch-type and improve typing speed.", 
    href: "../lib/typing_game"},

    {image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80", 
    alt: "Stopwatch tile", 
    title: "Stopwatch", 
    description: "A simple stopwatch displaying minutes, seconds, and centiseconds.", 
    href: "../lib/stopwatch"},

    {image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80", 
    alt: "Stopwatch tile", 
    title: "Stopwatch", 
    description: "A simple stopwatch displaying minutes, seconds, and centiseconds.", 
    href: "../lib/stopwatch"},
]
import { onMount } from "svelte";

onMount(() => {
    window_width = window.innerWidth
    min = x - el.offsetWidth
})

$: console.log((x + 1000) / 30)

let x = 1500
const max = 1500
let min: number

let mousedown = false
function drag(event: any) {
    if (mousedown) {
        x += event.movementX
        if (x < min) x = min
        if (x > max) x = max
    }
}

let el: HTMLElement

let window_width = 0
</script>
<svelte:window on:mouseup={() => mousedown = false} on:mousemove={drag} on:mousedown={() => mousedown = true}/>

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Prompt">

<div class="page">
    <Nav/>

    <!-- <body>
        <div bind:this={el} id="image-track" data-mouse-down-at="0" data-prev-percentage="0" style="left: {x + window_width}px;">
            {#each nav_contents as nav}
                <div class="image_wrapper">
                    <img class="image" src={ nav.image } alt={ nav.alt } draggable='false'
                    style="
                    object-position: {((x + 1000) / 30) + 10}% center;"            />
                    />
                    <div class="info_wrapper">
                        <div class="title">
                            { nav.title }
                        </div>

                        <div class="description">
                            { nav.description }
                        </div>

                        <div class="redirect" on:click={() => location.href = {nav.href}}>
                            Visit
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </body> -->
    

    <body>
        <div bind:this={el} id="image-track" data-mouse-down-at="0" data-prev-percentage="0" style="left: {x + window_width}px;">
            <div class="image_wrapper">
                <img class="image" src="https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" alt='test' draggable='false'
                style="
                object-position: {((x + 1000) / 30) + 10}% center;"/>
                <div class="info_wrapper">
                    <div class="title" style="color: #1A1A1A">
                        Stopwatch
                    </div>

                    <div class="description" style="color: #1A1A1A">
                        A simple stopwatch displaying minutes, seconds, and centiseconds.
                    </div>

                    <div class="redirect" on:click={() => location.href = '../lib/stopwatch'}>
                        Visit
                    </div>
                </div>
            </div>

            <div class="image_wrapper">
                <img class="image" src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt='test' draggable='false'
                style="
                object-position: {((x + 1000) / 30) + 10}% center;"/>
                <div class="info_wrapper">
                    <div class="title">
                        2048 Game
                    </div>

                    <div class="description">
                        A 2048 game copy.<br/>To-Do: add end-game condition.
                    </div>

                    <div class="redirect" on:click={() => location.href = '../lib/2048'}>
                        Visit
                    </div>
                </div>
            </div>

            <div class="image_wrapper">
                <img class="image" src="https://images.unsplash.com/photo-1595044426077-d36d9236d54a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt='test' draggable='false'
                style="
                object-position: {((x + 1000) / 30) + 10}% center;"/>
                <div class="info_wrapper">
                    <div class="title" style="color: #1A1A1A">
                        Typing Trainer
                    </div>

                    <div class="description" style="color: #1A1A1A">
                        A game designed to help people learn to touch-type and improve typing speed
                    </div>

                    <div class="redirect" on:click={() => location.href = '../lib/typing_game'}>
                        Visit
                    </div>
                </div>
            </div>

            <div class="image_wrapper">
                <img class="image" src="https://images.unsplash.com/photo-1609697299491-69d2d5ed2c36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fGNhbGN1bGF0b3J8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60" alt='test' draggable='false'
                style="
                object-position: {((x + 1000) / 30) + 10}% center;"/>
                <div class="info_wrapper">
                    <div class="title">
                        Calculator
                    </div>

                    <div class="description">
                        A simple calculator. My first project completed in Svelte!
                    </div>

                    <div class="redirect" on:click={() => location.href = '../lib/typing_game'}>
                        Visit
                    </div>
                </div>
            </div>

            <div class="image_wrapper">
                <img class="image" src="https://images.unsplash.com/photo-1661098277720-9cf605e5fd30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" alt='test' draggable='false'
                style="
                object-position: {((x + 1000) / 30) + 10}% center;"/>
                <div class="info_wrapper">
                    <div class="title">
                        Typing Trainer
                    </div>

                    <div class="description">
                        A simple game designed to help people learn to touch-type and improve typing speed
                    </div>

                    <div class="redirect" on:click={() => location.href = '../lib/typing_game'}>
                        Visit
                    </div>
                </div>
            </div>
            
            <div class="image_wrapper">
                <img class="image" src="https://images.unsplash.com/photo-1661098277720-9cf605e5fd30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" alt='test' draggable='false'
                style="
                object-position: {((x + 1000) / 30) + 10}% center;"   />
                <div class="info_wrapper">
                    <div class="title">
                        Typing Trainer
                    </div>

                    <div class="description">
                        A simple game designed to help people learn to touch-type and improve typing speed
                    </div>

                    <div class="redirect" on:click={() => location.href = '../lib/typing_game'}>
                        Visit
                    </div>
                </div>
            </div>
        </div>

    </body>
    <Footer/>
</div>

<style lang='stylus'>

*
    user-select none
    font-family 'Prompt'

body
    width 100vw
    background-color black
    margin 0rem
    overflow-x hidden

.page
    display flex
    flex-direction column
    justify-content space-between
    height 100vh
    background #1d1d1d

#image-track > .image_wrapper
    width 40vmin
    height 56vmin
    posiiton relative
    display flex
    align-items center
    justify-content center
    overflow hidden

.image_wrapper > .image
    width 40vmin
    height 56vmin
    object-fit none

#image-track
    display flex
    gap 4vmin
    position absolute
    left 50%
    top 50%
    transform translate(-100%, -50%)

.info_wrapper
    color white
    position absolute
    max-width 30vmin
    padding 4px
    display none
    opacity 0
    transition visibility 0s, opacity 0.2s linear
    text-align center
    gap 20px
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
    cursor pointer
    filter blur(10px)
    transition 0.3s ease-in

.image_wrapper:hover
    box-shadow 0 0 13px 0px rgba(255, 255, 255, 0.1)

.title
    font-weight 700
    font-size 22px

.info_wrapper
    // background radial-gradient(circle, rgba(44,43,48,1) 8%, rgba(192,192,209,1) 53%, rgba(79,88,93,1) 84%, rgba(6,12,13,1) 96%)
    // animation gradient 10s ease infinite
    // background-size 200% 380%
    // border-radius 16px
    // padding 8px

@keyframes gradient
    0%
        background-position 0% 50%
    50%
        background-position 100% 50%
    100%
        background-position 0% 50%

</style>