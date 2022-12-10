<script>
	export let direction = 'left', 
			duration = 30, 
			delay = 0, 
			loop = true, 
			pausing = true, 
			alternate = false, 
			behavior = 'auto';
</script>
<details>
	<summary>Show props</summary>
	<fieldset>
		<legend>direction</legend>
		<label>
			left:
			<input bind:group={direction} value="left" type="radio">
			right:
			<input bind:group={direction} value="right" type="radio">
			top:
			<input bind:group={direction} value="top" type="radio">
			bottom:
			<input bind:group={direction} value="bottom" type="radio">
		</label>
	</fieldset>
	<fieldset>
		<legend>duration</legend>
		<label>
			<input bind:value={duration} type="number">
		</label>
	</fieldset>
	<fieldset>
		<legend>delay</legend>
		<label>
			<input bind:value={delay} type="number">
		</label>
	</fieldset>
	<fieldset>
		<legend>loop</legend>
		<label>
			true/false:
			<input bind:checked={loop} type="checkbox">
			OR number:
			<input bind:value={loop} type="number">
		</label>
	</fieldset>
	<fieldset>
		<legend>pausing</legend>
		<label>
			true/false:
			<input bind:checked={pausing} type="checkbox">
		</label>
	</fieldset>
	<fieldset>
		<legend>alternate</legend>
		<label>
			true/false:
			<input bind:checked={alternate} type="checkbox">
		</label>
	</fieldset>
	<fieldset>
		<legend>behavior</legend>
		<label>
			auto:
			<input bind:group={behavior} value="auto" type="radio">
			always:
			<input bind:group={behavior} value="always" type="radio">
		</label>
	</fieldset>
</details>
<slot 
	{direction} 
	{duration} 
	{delay} 
	{loop}
	{pausing}
	{alternate} 
	{behavior}
/>