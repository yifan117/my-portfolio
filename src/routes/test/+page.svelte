<script>
	let hue = 0
	
	setInterval(() => {
		hue ++
        hue = hue % 10
  }, 50);
	
</script>

{#if hue === 0}

<h1 style="color:white;background-color:hsl({hue}, 100%, 50%)">
	Hello RGB! {hue} 
</h1>

{/if}