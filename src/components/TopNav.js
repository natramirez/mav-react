import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
// import createBrowserHistory from 'history/createBrowserHistory';
import '../App.css';
import axios from 'axios';
import {
  getFromStorage,
  setInStorage,
} from '../client/app/utils/storage';

class TopNav extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.setClass = this.setClass.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    // this.history = createBrowserHistory();
  }
  getInitialState() {
    return {
      responsiveClass: false
    }
  }
  toggleClassBool() {
    this.setState({responsiveClass: this.state.responsiveClass ? false : true})
  }
  setClass() {
    return (this.state.responsiveClass ?' responsive':'');
  }
  onLogin() {
    this.props.history.push('/ingresar_cuenta');
  }
  // onLogIn() {
  //   const {
  //     logInEmail,
  //     logInPassword,
  //   } = this.state;

  //   this.setState({
  //     isLoading: true,
  //   });
  //   const logInReq = () => {
  //       try {
  //         return axios.post('/auth/account/login', {
  //           email: logInEmail,
  //           password: logInPassword,
  //         });
  //       } catch (error) {
  //         console.error(error);
  //         this.setState({
  //           logInError: "Error: An unknown error occurred.",
  //           isLoading: false,
  //        });
  //       }
  //   };
  //   const logIn = async () => {
  //       const reqPromise = await logInReq()
  //       .then(res => {
  //           if (res.data && res.data.success) {
  //               setInStorage('mav_app', { token: res.data.token });
  //               this.setState({
  //                   logInError: res.data.message,
  //                   isLoading: false,
  //                   logInPassword: '',
  //                   logInEmail: '',
  //                   token: res.data.token,
  //               });
  //           } else {
  //               this.setState({
  //                   logInError: res.data.message,
  //                   isLoading: false,
  //               });
  //           }
  //       })
  //       .catch(err => {
  //           console.log(err);
  //           this.setState({
  //               logInError: "Error: An unknown error occurred.",
  //               isLoading: false,
  //           });
  //       });
  //   };
  //   logIn();
  // }
  onLogout() {
    // this.setState({
    //     isLoading: true,
    // });
    // const obj = localStorage.getItem('token');
    const obj = getFromStorage('mav_app');
    console.log("obj: ", obj);
    if (obj && obj.token) {
        const { token } = obj;
        const logoutReq = () => {
            try {
                return axios.get('/auth/account/logout?token=' + token);
            } catch (error) {
                console.log(error);
                // add message somewhere: 'unable to log out'

                // this.setState({
                //     isLoading: false,
                //     logInError: '' // add logout err message?
                // });
            }
        }
        const logout = async () => {
            const logoutPromise = await logoutReq()
            .then(res => {
                if (res.data.success) {
                    setInStorage('mav_app', { token: '' })
                    this.setState(); 
                    // this.setState({
                    //     token: '',
                    //     isLoading: false,
                    //     logInError: ''
                    // });
                } else {
                  // console.log(error);
                // add message somewhere: 'unable to log out'
                    // this.setState({
                    //     isLoading: false,
                    //     logInError: ''
                    // });
                }
            })
            .catch(error => {
                console.log(error);
                // add message somewhere: 'unable to log out'
                // this.setState({
                //     isLoading: false,
                //     logInError: ''
                // });
            });
        }
        logout();
    }else {
      console.log("Error: onLogout when no token in localStorage.");
    } 
  }



  render() {
    const obj = getFromStorage('mav_app');
               // const obj = localStorage.getItem('token');
    var btn = <button onClick={this.onLogin}>Ingresar cuenta</button>;
    if (obj && obj.token) {
      console.log("token: " + obj.token);
      btn = <button onClick={this.onLogout}>Terminar sesión</button>;
    }
    return (
    <div className="top-nav">
        <ul className={"top-nav-list" + this.setClass()}>
            <li className='nav-tabs'>
              <NavLink exact to="/">Inicio</NavLink>
            </li>
            <li className='nav-tabs'>
              <NavLink to="/examen_completo">Examen completo</NavLink>
            </li>
            <li className='nav-tabs'>
              <NavLink to="/examen_express">Examen express</NavLink>
            </li>
            <li className='nav-tabs'>
              <NavLink to="/guia_de_manejo">Guía de manejo</NavLink>
            </li>
            <li className='nav-tabs'>
              {btn}
            </li>
            <li className='nav-icon' onClick={this.toggleClassBool.bind(this)}>
            &#9776;
            </li>
        </ul>
    </div>
    );
  }
}

export default withRouter(TopNav);
