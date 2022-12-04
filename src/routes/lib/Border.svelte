<script lang="ts">

    export let border_radius = "100px"
    export let padding = "4px"
    export let selected = false
    export let index = "1"

    </script>
    
    <div class="shimmer_border" style="border-radius: { border_radius }; padding: { padding }; z-index: { index }" class:selected>
        <slot/>
    </div>
    
<style lang="stylus">
.shimmer_border
    display flex
    align-items center
    justify-content center
    border-radius 100px
    padding 1px
    background linear-gradient(-45deg, #181818, #777777, #000000, #777777, #000000, #181818)
    animation gradient 10s ease infinite
    background-size 400% 400%
    width 100%

.selected
    background white
    animation none

@keyframes gradient
    0%
        background-position 0% 50%
    50%
        background-position 100% 50%
    100%
        background-position 0% 50%
</style>