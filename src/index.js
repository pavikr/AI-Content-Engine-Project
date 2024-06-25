import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './Routes/store';
// import Nav from './Pages/Navbar/nav'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
    <App />
    {/* <main className="main-content  mt-0"> */}
    {/* <Nav /> */}
    {/* <div className="page-header align-items-start min-vh-100"  style={{backgroundImage: "url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80')"}}>
      <span className="mask bg-gradient-dark opacity-6"></span>
      <div className="container my-auto">
        
      </div>
      <footer className="footer position-absolute bottom-2 py-2 w-100">
        <div className="container">
          <div className="row align-items-center justify-content-lg-between">
            <div className="col-12 col-md-6 my-auto"> */}
              {/* <div className="copyright text-center text-sm text-white text-lg-start">
                made with <i className="fa fa-heart" aria-hidden="true"></i> by
                <a href="https://www.creative-tim.com" className="font-weight-bold text-white" target="_blank">Creative Tim</a>
                for a better web.
              </div> */}
            {/* </div> */}
            {/* <div className="col-12 col-md-6">
              <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                <li className="nav-item">
                  <a href="https://www.creative-tim.com" className="nav-link text-white" target="_blank">Creative Tim</a>
                </li>
                <li className="nav-item">
                  <a href="https://www.creative-tim.com/presentation" className="nav-link text-white" target="_blank">About Us</a>
                </li>
                <li className="nav-item">
                  <a href="https://www.creative-tim.com/blog" className="nav-link text-white" target="_blank">Blog</a>
                </li>
                <li className="nav-item">
                  <a href="https://www.creative-tim.com/license" className="nav-link pe-0 text-white" target="_blank">License</a>
                </li>
              </ul>
            </div> */}
          {/* </div>
        </div>
      </footer>
    </div>
  </main> */}
     
    </React.StrictMode>
  </Provider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
