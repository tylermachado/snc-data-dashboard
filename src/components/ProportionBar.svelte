<script>
	import * as d3 from 'd3';
  import { getContext } from 'svelte';

  const { data, xGet, yGet, zGet } = getContext('LayerCake');

  export let zDomain;
  export let zRange;

  $: stackedData = $data.reduce((acc, item) => {
    const cumulativeCount = acc.length > 0 ? acc[acc.length - 1].offset + acc[acc.length - 1].count : 0;
    acc.push({ ...item, offset: cumulativeCount });
    return acc;
  }, []);

  // // Create a scale for the x-axis based on the groups
  $: xScale = d3.scaleLinear()
    .domain([0, d3.sum($data, d => d.count)])
    .range([0, 100]); // Define `width` based on your chart size

  const colorScale = d3.scaleOrdinal()
    .domain(zDomain)
    .range(zRange); // Define `width` based on your chart size
</script>

<g class="bar-group">
  {#each stackedData as d, i}
    <rect
      class="group-rect"
      data-id={d.group}
      x={xScale(d.offset)}
      y={0}
      height={10}
      width={xScale(d.count)}
      fill={colorScale(d.group)}
    ></rect>
  {/each}
</g>

<style>
  text {
    font-size: 20%;
  }
</style>
