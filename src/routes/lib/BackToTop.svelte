<script>

    export let showOnPx = 150;
    import ChevronUp from 'svelte-material-icons/ChevronUp.svelte';
    let hidden = true;
  
    function goTop() {
      document.body.scrollIntoView();
    }
  
    function scrollContainer() {
      return document.documentElement || document.body;
    }
  
    function handleOnScroll() {
      if (!scrollContainer()) {
        return;
      }
  
      if (scrollContainer().scrollTop > showOnPx) {
        hidden = false;
      } else {
        hidden = true;
      }
    }
  </script>
  
  <style>
    .back-to-top {
      opacity: 1;
      transition: opacity 0.5s, visibility 0.5s;
      position: fixed;
      border-radius: 1000px;
      display: flex;
      z-index: 99;
      right: 20px;
      font-size: 2em;
      user-select: none;
      bottom: 20px;
      color: #D8D8E7;
      background-color: #161616;
    }
  
    .back-to-top.hidden {
      opacity: 0;
      visibility: hidden;
    }
    
  </style>
  
  <svelte:window on:scroll={handleOnScroll} />
  
  <div class="back-to-top" on:click={goTop} class:hidden><ChevronUp size="50px"/></div>
  