import { routes } from "./routes";

export function Router(){
   const path = window.location.pathname;
   
   const publicRoutes = routes.public.find(route => {
      return route.path === path
   });

   const privateRoutes = routes.private.find(route =>{
      return route.path == path
   })



   //Dirigirlo a tasks si ya se encuentra logeado se pone antes de todo para asegurar que pregunte esto primero

   if(path === '/login' || path === '/register'){
      if(localStorage.getItem('token')){
         navigateTo('/tasks')
         return
      }
   }


   //Dirigirlo a las rutas publicas
   if(publicRoutes){
      publicRoutes.page()
      return
   }


   //Dirigirlo a las rutas privadas solo si existe el token
   if(privateRoutes){
      if(!localStorage.getItem('token')){
         navigateTo('/login')
         return
      }
      privateRoutes.page()
      return
   }

   //Dirigirlo a Not Found si la ruta que quiere acceder no existe
   navigateTo('/not_found');

}

export function navigateTo (path){
   window.history.pushState({},"", window.location.origin + path);
   Router();
}