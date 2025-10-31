import { createBrowserRouter } from "react-router-dom";

const modules = import.meta.glob('../../pages/**/route.tsx', { eager: true })

const routes = Object.values(modules).map((mod: any) => mod.route)

export const router = createBrowserRouter(routes)