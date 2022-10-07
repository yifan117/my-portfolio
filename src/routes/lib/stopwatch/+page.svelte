<script lang='ts'>
    import Nav from '../nav-bar.svelte';
    import OtherStopwatchTandb from './OtherStopwatchTANDB.svelte';
    
    </script>
    
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Prompt">

    <title>Yifan's Stopwatch</title>
    
    <div class="body">
      <Nav/>
      <!-- <Textfield/>
      <Buttons/> -->
      <OtherStopwatchTandb/>
    </div>
    
    
    <style>
    
    
    * {
      font-family: 'Prompt';
    }
    
    .body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      height: 100vh;
      width: 100vw;
      background-color: #1D1D1D;    
    }

</style>