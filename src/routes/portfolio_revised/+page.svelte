<script lang='ts'>
import { onMount } from "svelte";

onMount(() => {
    window_width = window.innerWidth
    min = x - el.offsetWidth
})

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
        <img class="image" src="https://images.unsplash.com/photo-1669150741320-465c5688f7f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" alt='test' draggable='false'/>
        <img class="image" src="https://images.unsplash.com/photo-1661098277720-9cf605e5fd30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" alt='test' draggable='false'/>
        <img class="image" src="https://images.unsplash.com/photo-1669935529412-05ff51a91af6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDl8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" alt='test' draggable='false'/>
        <img class="image" src="https://images.unsplash.com/photo-1669893933095-bef21b6ea42f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEzfDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt='test' draggable='false'/>
        <img class="image" src="https://images.unsplash.com/photo-1669762899828-7e0a14500eb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE4fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt='test' draggable='false'/>
        <img class="image" src="https://images.unsplash.com/photo-1669792245896-0253b9a55560?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDI0fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt='test' draggable='false'/>
    </div>
</body>

<style lang='stylus'>

body
    height 100vh
    width 100vw
    background-color black
    margin 0rem
    overflow hidden

#image-track > .image
    width 40vmin
    height 56vmin
    object-fit cover
    object-position center

#image-track
    display flex
    gap 4vmin
    position absolute
    left 50%
    top 50%
    transform translate(-100%, -50%)
</style> 