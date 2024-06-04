import { navigateTo } from "../Router";

export function NavarLayout (content, logic){
    const root = document.getElementById('root');
    root.innerHTML = `
    <nav>
        <ul>
            <li><a href="/tasks">Tareas</a></li>
            <li><a href="/users">Usuario</a></li>
            <li><a href="/">cerrar sesión</a></li>
        </ul>
    </nav>
    ${content}
    `;

    logic()

    const logout = document.querySelector('[href="/"]');
    logout.addEventListener('click', e => {
        e.preventDefault();
        localStorage.removeItem('token');
        navigateTo('/login');
    });
}