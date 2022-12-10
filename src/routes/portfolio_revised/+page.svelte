<script lang='ts'>
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

<body>
    <div bind:this={el} id="image-track" data-mouse-down-at="0" data-prev-percentage="0" style="left: {x + window_width}px;">
        <div class="image_wrapper">
            <img class="image" src="https://images.unsplash.com/photo-1669150741320-465c5688f7f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" alt='test' draggable='false'
            style="
            object-position: {((x + 1000) / 30) + 10}% center;"            />
            />
            <div class="info_wrapper">
                <div class="text">
                    Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                </div>

                <div class="redirect">
                    Test
                </div>
            </div>
        </div>

        <div class="image_wrapper">
            <img class="image" src="https://images.unsplash.com/photo-1661098277720-9cf605e5fd30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" alt='test' draggable='false'
            style="
            object-position: {((x + 1000) / 30) + 10}% center;"            />
            <div class="info_wrapper">
                <div class="text">
                    Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                </div>

                <div class="redirect">
                    Test
                </div>
            </div>
        </div>

        <div class="image_wrapper">
            <img class="image" src="https://images.unsplash.com/photo-1661098277720-9cf605e5fd30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" alt='test' draggable='false'
            style="
            object-position: {((x + 1000) / 30) + 10}% center;"            />
            <div class="info_wrapper">
                <div class="text">
                    Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                </div>

                <div class="redirect">
                    Test
                </div>
            </div>
        </div>

        <div class="image_wrapper">
            <img class="image" src="https://images.unsplash.com/photo-1661098277720-9cf605e5fd30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" alt='test' draggable='false'
            style="
            object-position: {((x + 1000) / 30) + 10}% center;"            />
            <div class="info_wrapper">
                <div class="text">
                    Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                </div>

                <div class="redirect">
                    Test
                </div>
            </div>
        </div>

        <div class="image_wrapper">
            <img class="image" src="https://images.unsplash.com/photo-1661098277720-9cf605e5fd30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" alt='test' draggable='false'
            style="
            object-position: {((x + 1000) / 30) + 10}% center;"            />
            <div class="info_wrapper">
                <div class="text">
                    Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                </div>

                <div class="redirect">
                    Test
                </div>
            </div>
        </div>
        
        <div class="image_wrapper">
            <img class="image" src="https://images.unsplash.com/photo-1661098277720-9cf605e5fd30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" alt='test' draggable='false'
            style="
            object-position: {((x + 1000) / 30) + 10}% center;"            />
            <div class="info_wrapper">
                <div class="text">
                    Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                </div>

                <div class="redirect">
                    Test
                </div>
            </div>
        </div>
    </div>
</body>

<style lang='stylus'>

*
    user-select none

body
    height 100vh
    width 100vw
    background-color black
    margin 0rem
    overflow-x scroll
    overflow-y hidden

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

.image_wrapper:hover > .image
    cursor pointer
    filter blur(5px)
    transition 0.3s ease-in
</style>