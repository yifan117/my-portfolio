<script lang="ts">
    import { onMount } from "svelte";

    let entry;

    onMount (() => {

   
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            console.log(entry)
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            } else {
                entry.target.classList.remove("show");
            }
        });
    });
        
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

})

</script>

<body>
    <section>
        <h1>test1</h1>
        <p>asd</p>
    </section>

    <section class="hidden">
        <h1>test2</h1>
        <p>asd</p>
    </section>

    <section class="hidden">
        <h1>test3</h1>
        <p>asd</p>
    </section>
</body>

<style>

    section {
        min-height: 100vh;
        display: grid;
        place-items: center;
        align-content: center;
    }

    body {
        padding: 0;
        margin: 0;
        color: #fff;
        background: #1d1d1d;
    }

    .hidden {
        opacity: 0;
        transition: all 1s;
    }

    .show {
        opacity: 1;
    }
</style>