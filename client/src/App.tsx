import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import CreateBlog from './pages/Create';
import ShowBlog from './pages/Show';
import NotFound from './pages/NotFound';
import Header from './components/Header';

const App: FC = () => {
  return (
    <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/create" element={<CreateBlog/>} />
          <Route path="/show/:id" element={<ShowBlog/>} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
    </Router>
  );
}

export default App;