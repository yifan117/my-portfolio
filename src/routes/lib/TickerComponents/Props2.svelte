<script>
	import { onMount } from 'svelte';
	function isType(type) {
		return val => typeof val === type;
	}
	const isNumber = isType('number');
	const isString = isType('string');
	const isBool = isType('boolean');
	
	let props;
	onMount(() => {
		props = Object.entries($$props)
									.reduce((props, [ prop, val ]) => {
										props[prop] = Array.isArray(val) ? val[0] : val;
										return props;
									}, {});
	});
</script>
{#if props}
<details>
	<summary>Show props</summary>
	{#each Object.keys($$props) as prop}
	<fieldset>
		<legend>{prop}</legend>
		<label>
			{#if isString($$props[prop])}
			<input bind:value={props[prop]}>
			{/if}
			{#if isNumber($$props[prop])}
			<input bind:value={props[prop]} type="number">
			{/if}
			{#if isBool($$props[prop])}
			<input bind:checked={props[prop]} type="checkbox">
			{/if}
			{#if Array.isArray($$props[prop])}
				{#each $$props[prop][1] as value}
					{value}
					<input bind:group={props[prop]} {value} type="radio">
				{/each}
			{/if}
		</label>
	</fieldset>
	{/each}
</details>
<slot {props} />
{/if}