import { HomePage } from "./pages/Home/home.page"
import { LoginPage } from "./pages/login/login.page"
import { NotFoundPage } from "./pages/not-found/not-found.page"
import { RegisterPage } from "./pages/register/register"
import { TasksEditPage } from "./pages/tasks/tasks.edit.page"
import { TasksPage } from "./pages/tasks/tasks.page"
import { TasksPreviewPage } from "./pages/tasks/tasks.preview.page"
import { UsersPage } from "./pages/users/users.page"

export const routes = {
    public: [
        {path: '/' , page: HomePage},
        {path: '/not-found', page: NotFoundPage},
        {path: '/register', page: RegisterPage},
        {path: '/login', page: LoginPage},
    ],
    private: [
        {path: '/tasks' , page: TasksPage},
        {path: '/tasks/edit' , page: TasksEditPage},
        {path: '/tasks/preview' , page: TasksPreviewPage},
        {path: '/users' , page: UsersPage},
    ]
}