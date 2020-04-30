<script>
  import Scatterplot from './Scatterplot.svelte';
  import data from '../data.js';
  export let title;
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
  .chart {
    width: 100%;
    max-width: 640px;
    height: calc(100% - 4em);
    min-height: 280px;
    max-height: 480px;
    margin: 0 auto;
    font-family: 'Roboto', sans-serif;
    font-size: small;
  }
</style>

<div class="chart">
  <h2>{title}</h2>

  <Scatterplot points={data.a} />
  <Scatterplot points={data.b} />
  <Scatterplot points={data.c} />
  <Scatterplot points={data.d} />
</div>
