<script lang='ts'>
</script>

    <slot/>
    
<style lang='stylus' global>

body
    margin 0px

/* width */
::-webkit-scrollbar
    height 6px
    width 8px

/* Track */
::-webkit-scrollbar-track
    box-shadow inset 0 0 0.5px grey 
    border-radius 10px

/* Handle */
::-webkit-scrollbar-thumb
    background rgba(255, 255, 255, 0.15)
    border-radius 10px

/* Handle on hover */
::-webkit-scrollbar-thumb:hover
    background rgba(255, 255, 255, 0.05)
</style>