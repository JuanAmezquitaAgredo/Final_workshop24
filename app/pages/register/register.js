import { navigateTo } from "../../Router";
import { encryptData } from "../../helpers/crypto";

export function RegisterPage(){
    const root = document.getElementById('root')
    root.innerHTML = `
    <form>
        <input type="text" placeholder="Juan"/>
        <input type="email" autocomplete="username"/>
        <input type="password" autocomplete="current-password"/>
        <button type="sumit">Crear Usuario</button>
    </form>`;

    //logic
    const $createuserform = document.getElementsByTagName('form')[0];
    $createuserform.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.querySelector('[type="text"]');
        const useremail = document.querySelector('[type="email"]');
        const userpassword = document.querySelector('[type="password"]');

        if(!username.value || !useremail.value || !userpassword.value){
            alert("Todos los campos son requeridos");
        }

        //Crear fetch
        const userCreated = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: username.value,
                email: useremail.value,
                password: encryptData(userpassword.value)
            })
        });

        if(!userCreated.ok){
            alert('error al crear el usuario');
            return
        }

        alert('Usuario creado correctamente');
        navigateTo('/login');

    })
}