import './App.css';
import { Header, Login, Sidebar, Home, Newpost, TextComposer, Settings, NotFound } from './components';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute, PublicRoute } from './routes';
import BlogProvider from './contexts/BlogProvider/BlogProvider';
function App(){
  return(
    <Router future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
      <Routes>
        <Route element={<ProtectedRoute/>}>
          <Route path='/' element={<Header/>}>
            <Route path='/' element={<Sidebar/>}>
              <Route index element={<Home/>}/>
              <Route path='editor' element={<BlogProvider><Newpost/></BlogProvider>}/>
            </Route>
            <Route path='blog' element={<TextComposer/>}/>
            <Route path='settings' element={<Settings/>}/>
          </Route>
        </Route>
        <Route element={<PublicRoute/>}>
          <Route path='login' element={<Login/>}/>
        </Route>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;