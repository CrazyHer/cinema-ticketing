import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './App.global.css';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { Provider } from 'mobx-react';
import stores from './mobxStore/index'; // 使用mobx状态管理
import Layout from './components/layout/layout';
import Login from './pages/login/Login';
import FilmDetail from './pages/user/filmDetail/FilmDetail';
import UserIndex from './pages/user/index/Index';
import UserOrders from './pages/user/orders/Orders';
import ProfileEdit from './pages/user/profileEdit/ProfileEdit';
// import Remark from './pages/user/remark/Remark';
import Ticketing from './pages/user/ticketing/Ticketing';
import Arrangements from './pages/admin/arrangements/Arrangements';
import CinemaEdit from './pages/admin/cinemaEdit/CinemaEdit';
import Films from './pages/admin/films/Films';
import Halls from './pages/admin/halls/Halls';
import AdminIndex from './pages/admin/index/Index';
import AdminOrders from './pages/admin/orders/Orders';
import Users from './pages/admin/users/Users';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Provider {...stores}>
        <Router>
          <Layout>
            <Switch>
              <Route path="/login" component={Login} />

              <Route path="/user" exact component={UserIndex} />
              <Route path="/user/filmdetail" component={FilmDetail} />
              <Route path="/user/orders" component={UserOrders} />
              <Route path="/user/profileedit" component={ProfileEdit} />
              {/* <Route path="/user/remark" component={Remark} /> */}
              <Route path="/user/ticketing" component={Ticketing} />

              <Route path="/admin" exact component={AdminIndex} />
              <Route path="/admin/arrangements" component={Arrangements} />
              <Route path="/admin/cinemaedit" component={CinemaEdit} />
              <Route path="/admin/films" component={Films} />
              <Route path="/admin/halls" component={Halls} />
              <Route path="/admin/orders" component={AdminOrders} />
              <Route path="/admin/users" component={Users} />

              <Redirect to="/login" />
            </Switch>
          </Layout>
        </Router>
      </Provider>
    </ConfigProvider>
  );
}

export default App;
