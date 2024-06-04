export function TasksEditPage(){
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
        <input type="submit" value="Actualizar"/>
    </form>
    `;
    const logic = async () => {
        const searchpar = window.location.search;
        const paramtrans = new URLSearchParams(searchpar);
        const idtask = paramtrans.get('taskid');

        const fecthtaskid = await fetch(`http://localhost:3000/tasks/${idtask}`)
        const responsejson = await fecthtaskid.json();

        //obtener los values del form 
        const $title = document.getElementById('title');
        const $description = document.getElementById('description');
        const $priority = document.querySelector('[name="priority"]');
        const $date = document.getElementById('date');

        $title.value = responsejson.title;
        $description.value = responsejson.description;
        $priority.value = responsejson.priority;
        $date.value = responsejson.date;


        //Actualizar los datos del db.json

        const $form = document.getElementsByTagName('form')[0];
        $form.addEventListener('submit', e => {
            e.preventDefault();

            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const select = document.querySelector('[name="priority"]').value;
            const date = document.getElementById('date').value;

            fetch(`//localhost:3000/tasks/${idtask}`, {
                method: 'PUT',
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

    }

    return{content, logic};
}