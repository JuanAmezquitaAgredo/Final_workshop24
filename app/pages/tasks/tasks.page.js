import { navigateTo } from "../../Router";

export function TasksPage (){
    
    const content = `
    <form>
        <input type="text" placeholder="Titulo de tarea" id="title"/>
        <input type="text" placeholder="Descripción" id="description"/>
        <select name="priority">
            <option value="" disabled seleted>--seleciona algo--</option>
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
        </select>
        <input type="date" id="date"/>
        <input type="submit"/>
    </form>
    <div id="allTasks"><div>
    `;
    
    const logic = async () => {
        const taskscont = document.getElementById('allTasks');

        //de esta forma se puede hacer con await y el responsejson ya es un array de objetos con las tareas
        const alltasks = await fetch('http://localhost:3000/tasks')
        const responsejson = await alltasks.json();

        responsejson.forEach(task => {
            taskscont.innerHTML += `
            <p>${task.title}</p>
            <p>${task.date}</p>
            <button class="edit-btn" data-id="${task.id}">Editar</button>
            <button class="delete-btn" data-id="${task.id}">Eliminar</button>
            <button class="preview-btn" data-id="${task.id}">Vista previa</button>`;    
        });


        // Se ve la tarea indicada
        const previewBtns = document.getElementsByClassName('preview-btn');
        for (let previewbtn of previewBtns){
            previewbtn.addEventListener('click',()=>{
                navigateTo(`/tasks/preview?taskid=${previewbtn.getAttribute('data-id')}`)
            })
        }


        //Se edita la tarea
        const editBtns = document.getElementsByClassName('edit-btn');
        for (let editbtn of editBtns){
            editbtn.addEventListener('click',()=>{
                navigateTo(`/tasks/edit?taskid=${editbtn.getAttribute('data-id')}`)
            })
        }
        
        //Se elimina la tarea del db.json
        const deleteBtns = document.getElementsByClassName('delete-btn');
        for (let deletebtn of deleteBtns){
            deletebtn.addEventListener('click',()=>{

                fetch(`//localhost:3000/tasks/${deletebtn.getAttribute('data-id')}`,{
                    method: 'DELETE'  
                }).then(response => response.json())
                    .then(jsonObject => {
                        console.log(jsonObject);
                    })
            })
        }

        //Se crea la tarea y se inserta al db.js
        const $form = document.getElementsByTagName('form')[0];
        $form.addEventListener('submit', e => {
            e.preventDefault();

            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const select = document.querySelector('[name="priority"]').value;
            const date = document.getElementById('date').value;

            fetch('//localhost:3000/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    priority: select,
                    date: date,
                })
            }).then(response => response.json())
                .then(jsonObject => {
                    console.log(jsonObject);
                })
        })

       


    };

    return{content,logic};
}