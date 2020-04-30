<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
.chart-container {
  display: block;
  font-family: 'Roboto', sans-serif;
  font-size: small;
}

.field {
  display: inline-flex;
}

.control {
  padding: 0.25rem;
}

.b-contain *,
.b-contain *::before,
.b-contain *::after {
  box-sizing: content-box !important;
}

.b-contain input {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.b-contain span {
  line-height: 0.51;
  font-size: 0.74rem;
  font-family: inherit;
}

.b-contain {
  display: table;
  position: relative;
  padding-left: 1.42rem;
  cursor: pointer;
  margin-bottom: 0.45rem;
}

.b-contain input[type='checkbox'] ~ .b-input {
  position: absolute;
  top: 0;
  left: 0;
  height: 0.94rem;
  width: 0.94rem;
  background: rgba(241, 245, 248, 1);
  transition: background 250ms;
  border: 1px solid rgba(184, 194, 204, 1);
  border-radius: 0.125rem;
}

.b-contain input[type='radio'] ~ .b-input {
  position: absolute;
  top: 0;
  left: 0;
  height: 0.94rem;
  width: 0.94rem;
  background: rgba(241, 245, 248, 1);
  transition: background 250ms;
  border: 1px solid rgba(184, 194, 204, 1);
  border-radius: 2rem;
}

.b-contain input[type='checkbox'] ~ .b-input::after {
  content: '';
  position: absolute;
  display: none;
  left: 0.28rem;
  top: 0rem;
  width: 0.25rem;
  height: 0.58rem;
  border: solid rgba(255, 255, 255, 1);
  border-width: 0 2px 2px 0;
  transition: background 250ms;
  transform: rotate(45deg);
}

.b-contain input[type='radio'] ~ .b-input::after {
  content: '';
  position: absolute;
  display: none;
  left: 0.25rem;
  top: 0.25rem;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 2rem;
  background: rgba(255, 255, 255, 1);
  transition: background 250ms;
}

.b-contain input:disabled ~ .b-input::after {
  border-color: rgba(135, 149, 161, 1);
}

.b-contain input:checked ~ .b-input::after {
  display: block;
}

.b-contain:hover input ~ .b-input,
.b-contain input:focus ~ .b-input {
  background: rgb(231, 238, 243);
}

.b-contain input:focus ~ .b-input {
  box-shadow: 0 0 0 2px rgba(52, 144, 220, 0.5);
}

.b-contain input:checked ~ .b-input {
  background: rgba(0, 130, 243, 1);
  border-color: rgba(0, 130, 243, 1);
}

.b-contain input[type='checkbox']:disabled ~ .b-input {
  background: rgba(241, 245, 248, 1);
  border-color: rgba(184, 194, 204, 1);
  opacity: 0.6;
  cursor: not-allowed;
}

.b-contain input[type='radio']:disabled ~ .b-input {
  background: rgba(241, 245, 248, 1);
  border-color: rgba(184, 194, 204, 1);
  opacity: 0.6;
  cursor: not-allowed;
}

.b-contain input[type='radio']:disabled ~ .b-input::after {
  background: rgba(135, 149, 161, 1);
}

.b-contain input:checked:focus ~ .b-input,
.b-contain:hover input:not([disabled]):checked ~ .b-input {
  background: rgba(13, 143, 255, 1);
  border-color: rgba(13, 143, 255, 1);
}

.b-contain .b-input::before {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 3rem;
  height: 3rem;
  margin-left: -0.85rem;
  margin-top: -0.85rem;
  background: rgba(0, 130, 243, 1);
  border-radius: 2rem;
  opacity: 0.6;
  z-index: 99999;
  transform: scale(0);
}

@keyframes b-ripple {
  0% {
    transform: scale(0);
  }

  20% {
    transform: scale(1);
  }

  100% {
    opacity: 0;
    transform: scale(1);
  }
}

@keyframes b-ripple-duplicate {
  0% {
    transform: scale(0);
  }

  30% {
    transform: scale(1);
  }

  60% {
    transform: scale(1);
  }

  100% {
    opacity: 0;
    transform: scale(1);
  }
}

.b-contain input + .b-input::before {
  animation: b-ripple 250ms ease-out;
}

.b-contain input:checked + .b-input::before {
  animation-name: b-ripple-duplicate;
}

.b-contain .b-input::before {
  visibility: hidden;
}

.b-contain input:focus + .b-input::before {
  visibility: visible;
}

.b-contain:first-child .b-input::before {
  visibility: hidden;
}
</style>

<template>
  <div class="chart-container">
    <div class="field is-grouped">
      <div class="control">
        <label class="b-contain">
          <span>2018 Sales</span>
          <input type="checkbox" :value="2018" v-model="selectedYears" />
          <div class="b-input"></div>
        </label>
      </div>
      <div class="control">
        <label class="b-contain">
          <span>2017 Sales</span>
          <input type="checkbox" :value="2017" v-model="selectedYears" />
          <div class="b-input"></div>
        </label>
      </div>
    </div>

    <line-chart
      :width="300"
      :height="200"
      :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May']"
      :datasets="displayedDatasets"
      :options="$options.options"
    ></line-chart>
  </div>
</template>

<script>
import numeral from 'numeral';
import LineChart from './LineChart';
const datasets = {
  2018: {
    label: '2018 Sales',
    borderColor: 'rgba(50, 115, 220, 0.5)',
    backgroundColor: 'rgba(50, 115, 220, 0.1)',
    data: [300, 700, 450, 750, 450],
  },
  2017: {
    label: '2017 Sales',
    borderColor: 'rgba(255, 56, 96, 0.5)',
    backgroundColor: 'rgba(255, 56, 96, 0.1)',
    data: [600, 550, 750, 250, 700],
  },
};
const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          callback: value => numeral(value).format('$0,0'),
        },
      },
    ],
  },
  tooltips: {
    mode: 'index',
    callbacks: {
      label(tooltipItem, data) {
        const label = data.datasets[tooltipItem.datasetIndex].label;
        const value = numeral(tooltipItem.yLabel).format('$0,0');
        return `${label}: ${value}`;
      },
    },
  },
};
export default {
  datasets,
  options,
  components: {
    LineChart,
  },
  data() {
    return {
      selectedYears: [2018, 2017],
    };
  },
  computed: {
    displayedDatasets() {
      console.log(this.selectedYears);
      return this.selectedYears.map(year => datasets[year]);
    },
  },
};
</script>