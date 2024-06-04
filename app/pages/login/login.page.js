import { navigateTo } from "../../Router";
import { decryptData } from "../../helpers/crypto";

export function LoginPage(){
    const root = document.getElementById('root');
    root.innerHTML = `
    <form>
        <input type="email" autocomplete="username"/>
        <input type="password" autocomplete="current-password"/>
        <button type="sumit">Crear Usuario</button>
    </form>`;

    //logic login

    const $createuserform = document.getElementsByTagName('form')[0];
    $createuserform.addEventListener('submit', async (e) => {
        e.preventDefault();

        const useremail = document.querySelector('[type="email"]');
        const userpassword = document.querySelector('[type="password"]');

        if(!useremail.value || !userpassword.value){
            alert("Todos los campos son requeridos");
        }

        //Crear fetch
        const userFecthed = await fetch('http://localhost:3000/users');

        if(!userFecthed.ok){
            alert('error al crear el usuario');
            return
        }

        const usersToJson = await userFecthed.json()
        const userfound = usersToJson.find(user => user.email === useremail.value)

        if(!userfound){
            alert('Usuario no encontrado')
            return
        }

        if(decryptData(userfound.password) !== userpassword.value){
            alert('La contraseña es incorrecta')
            return
        }

        const token = Math.random().toString(36).substring(2);
        localStorage.setItem('token', token);

        navigateTo('/tasks');


    })
}