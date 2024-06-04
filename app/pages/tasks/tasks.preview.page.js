export function TasksPreviewPage(){
    const content = `
    <div id="preview-task"></div>
    `;

    const logic = async () => {
        const searchpar = window.location.search;
        const paramtrans = new URLSearchParams(searchpar);
        const idtask = paramtrans.get('taskid');

        const fecthtaskid = await fetch(`http://localhost:3000/tasks/${idtask}`)
        const responsejson = await fecthtaskid.json();

        //Agregar los datos de la atarea
        const previewtask = document.getElementById('preview-task');
        previewtask.innerHTML = `
        <div>Nombre de la tarea: <strong>${responsejson.title}</strong></div>
        <div>Descripción de la tarea: <strong>${responsejson.description}</strong></div>
        <div>Fecha de la tarea: <strong>${responsejson.date}</strong></div>
        <div>Prioridad de la tarea: <strong>${responsejson.priority}</strong></div>
        `
    };
    
    return{content, logic};
}