import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Tasks from './pages/Tasks'
import Users from './pages/Users'
import Infrastructure from './pages/Infrastructure'
import Docs from './pages/Docs'
import ApiConsole from './pages/ApiConsole'
import Login from './pages/Login'

function Protected({ children }: { children: React.ReactNode }) { return localStorage.getItem('projecthub_token') ? children : <Navigate to="/login" replace /> }
export default function App(){return <Routes><Route path="/login" element={<Login/>}/><Route element={<Protected><Layout/></Protected>}><Route index element={<Dashboard/>}/><Route path="projects" element={<Projects/>}/><Route path="projects/:id" element={<ProjectDetail/>}/><Route path="tasks" element={<Tasks/>}/><Route path="users" element={<Users/>}/><Route path="infrastructure" element={<Infrastructure/>}/><Route path="docs" element={<Docs/>}/><Route path="console" element={<ApiConsole/>}/></Route><Route path="*" element={<Navigate to="/" replace/>}/></Routes>}
