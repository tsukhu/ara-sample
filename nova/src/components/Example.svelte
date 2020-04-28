<script>
	import { onMount, onDestroy} from 'svelte';
	export let title;


  onMount(async () => {
	  if (typeof document !== "undefined") {
  		document.addEventListener("change-title", e => {
		console.log('EVENT',e);
		if (typeof e.detail !== "undefined") {
		title = e.detail;
		}
	})
	  }
	}); 

  onDestroy(() => { if (typeof document !== "undefined") { document.removeEventListener("change-title")}});

</script>

<div>
 <h1>Hello {title}</h1>
 <input type="text" bind:value={title}>
</div>
