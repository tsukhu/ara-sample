import { mountComponent, load, loadById } from 'hypernova-svelte'

import Example from './components/Example.svelte'
import Todos from './components/Todos.svelte'

const render = (name, { node, data }) => {
  if (name === 'ExampleSvelteCSR') {
    return mountComponent(Todos, node, data)
  }
}

document.addEventListener('NovaMount', ({ detail }) => {
  const { name, id } = detail

  const payload = loadById(name, id)

  if (payload) {
    render(name, payload)
  }
})

load('ExampleSvelteCSR').forEach(render.bind(null, 'ExampleSvelteCSR'))
