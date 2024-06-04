export function HomePage(){
    const root = document.getElementById('root');
    const $mydiv = document.createElement('DIV')
    $mydiv.textContent = "Hola mundo desde HomePage"
    root.appendChild($mydiv)
}