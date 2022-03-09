import './style.css'

document.querySelector('#app').innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`

window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
  } else {
    console.log('Текущий браузер не поддерживает service worker-ы');
  }
})

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(data => data.json())
  .then(data => {
    console.log(data)
    const text = data.map(toCard).join('\n')
    document.querySelector('#app').innerHTML += text
  })

const toCard = post => {
  return `
    <div class="card">
      <div class="card-title">
        ${post.title}
      </div>
    </div>
  `
}