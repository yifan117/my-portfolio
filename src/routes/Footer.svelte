<script lang='ts'>
import Border from "./lib/Border.svelte";

import Linkedin from "svelte-material-icons/Linkedin.svelte";
import Resume from "svelte-material-icons/FileAccount.svelte";
import Github from "svelte-material-icons/Github.svelte";

</script>

<Border padding="2px 0px 0px 0px" border_radius="0px">
    <div class="container">
        <div class="top">
            <div class="logo">
                [yifan]
            </div>
        </div>

        <div class="bottom">
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
            <a class="icon_wrapper" href="https://drive.google.com/file/d/1kdfccKUIHdXxzvFzR24ye90R7cVwHjKc/view?usp=sharing" target="blank">
                <div class="text">
                    Resume/CV
                </div>

                <div class="icon">
                    <Resume color="#D8D8E7"/>
                </div>
            </a>
        </div>
    </div>
</Border>
<style lang='stylus'>
.logo
    order 0
    display flex
    font-size 2em
    font-weight 700
    align-items center
    justify-content center

.container
    z-index 2
    background #1a1a1a
    width 100%
    display flex
    align-items center
    justify-content center
    gap 100px
    padding 8px
    width 100%

.bottom
    display flex
    align-items center
    justify-content space-between
    gap 40px

.text
    text-align center
    font-weight 600
    font-size 16px

.icon
    display flex
    align-items center
    justify-content center
    padding 2px
    font-size 50px

.top
    display flex
    align-items center
    justify-content center

a
    text-decoration none
    list-style none
    color #D8D8E7

.icon_wrapper
    cursor pointer
</style>