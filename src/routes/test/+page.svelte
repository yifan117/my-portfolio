<script defer>
	
    import { onMount } from "svelte";
	import { add_classes } from "svelte/internal";

onMount (() => {
    const observer = new IntersectionObserver((sections) => {
        sections.forEach((section) => {
            console.log(section)
            if (section.isIntersecting) {
                section.target.classList.add('show');
            } else {
                section.target.classList.remove('show');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
});
</script>

<body>
    <section class="hidden">
        <h1>hi mum</h1>
        <p>this is my website</p>
    </section>

    <section class="hidden">
        <h1>hi asdasd</h1>
        <p>this is asdasd website</p>
    </section>

    <section class="hidden">
        <h1>hi aaaaaa</h1>
        <p>this asdasdasdasd asdasd website</p>
    </section>
</body>

<style>
body {
    background-color: #131316;
    color: #fff;
    padding: 0;
    margin: 0;
}

section {
    display: grid;
    place-items: center;
    align-content: center;
    min-height: 100vh;
}

.hidden {
    opacity: 0;
    transition: all 1s;
}

.show {
    opacity: 1;
}
</style>