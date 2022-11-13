<!DOCTYPE html>
<html lang="en">

    <span class="Sphere"></span>

    <!-- Including the TagCloud.js script CDN in the document    -->
    <script src="https://cdn.jsdelivr.net/npm/TagCloud@2.2.0/dist/TagCloud.min.js"> </script>
    <script>
        const Texts = [
            'Computer Science Club', 
            'Competitive Programming Club', 
            'Fn Main() Tutoring'
        ];

        var tagCloud = TagCloud('.Sphere', Texts, {

            // Sphere radius in px
            radius: 230,

            // animation speed
            // slow, normal, fast
            maxSpeed: 'normal',
            initSpeed: 'fast',

            // Rolling direction [0 (top) , 90 (left), 135 (right-bottom)] 
            direction: 135,

            // interaction with mouse or not [Default true (decelerate to rolling init speed, and keep rolling with mouse).]
            keep: true

        });

        // Giving color to each text in sphere
        var color = '#FF5733 ';
        document.querySelector('.Sphere').style.color = color;
    </script>

</html>

<style>
    * {
        background: #1d1d1d;
    }
</style>