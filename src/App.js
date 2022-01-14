import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CompanyHome, Customer, Employee, Home, Scrum, ScrumDetail, Team } from './pages';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/company/dashboard' element={<CompanyHome />}/>
            <Route path='/company/employee' element={<Employee />}/>
            <Route path='/company/customer' element={<Customer />}/>
            <Route path='/company/team' element={<Team />}/>
            <Route path='/company/scrum' element={<Scrum />}/>
            <Route path='/company/scrum/detail/:id' element={<ScrumDetail />}/>
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
