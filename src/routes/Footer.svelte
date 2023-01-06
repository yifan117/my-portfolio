<script lang='ts'>
import Border from "./lib/Border.svelte";

import Linkedin from "svelte-material-icons/Linkedin.svelte";
import Resume from "svelte-material-icons/FileAccount.svelte";
import Github from "svelte-material-icons/Github.svelte";

</script>

<Border padding="2px 0px 0px 0px" border_radius="0px">
    <div class="container">
        <a class="icon_wrapper" href="https://www.github.com/yifan117" target="blank">
            <div class="text">
                GitHub
            </div>

            <div class="icon">
                <Github color="#D8D8E7"/>
            </div>
        </a>
        <a class="icon_wrapper" href="https://www.linkedin.com/in/yifan117" target="blank">
            <div class="text">
                LinkedIn
            </div>

            <div class="icon">
                <Linkedin color="#D8D8E7"/>
            </div>
        </a>
        <a class="icon_wrapper" href="https://drive.google.com/file/d/1pMttR6bV6nbDBZQItIRjaJXT9G8_vBJF/view?usp=sharing" target="blank">
            <div class="text">
                Resume
            </div>

            <div class="icon">
                <Resume color="#D8D8E7"/>
            </div>
        </a>
    </div>
</Border>
<style lang='stylus'>

.container
    z-index 2
    background #1a1a1a
    width 100%
    display flex
    align-items center
    justify-content space-around
    padding 8px

.text
    text-align center
    font-weight 600
    font-size 1rem
    text-size-adjust auto

.icon
    display flex
    align-items center
    justify-content center
    padding 2px
    font-size 2rem
    text-size-adjust auto

a
    text-decoration none
    list-style none
    color #D8D8E7

.icon_wrapper
    display flex
    flex-direction column
    align-items center
    justify-content center
    cursor pointer
    aspect-ratio 1
    padding 4px
    border-radius 4px

    &:hover
        background rgba(255, 255, 255, 0.1)
</style>