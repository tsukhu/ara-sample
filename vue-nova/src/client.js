import { load, Vue, mountComponent, loadById } from 'hypernova-vue'
import MonthlySalesChart from './components/MonthlySalesChart.vue';

const render = (name, { node, data }) => {
  if (name === 'ExampleVue') {
    return mountComponent(Vue.extend(MonthlySalesChart), node, data)
  }
}

document.addEventListener('NovaMount', ({ detail }) => {
  const { name, id } = detail

  const payload = loadById(name, id)

  if (payload) {
    render(name, payload)
  }
})

load('ExampleVue').forEach(render.bind(null, 'ExampleVue'))
