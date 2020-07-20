import React, { Component } from 'react';
import axios from 'axios';
// import 'whatwg-fetch';
import {withRouter} from 'react-router-dom';
import {
  getFromStorage,
  setInStorage,
} from '../client/app/utils/storage';

class SignUpIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      logInError: '',
      logInEmail: '',
      logInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
    };

    // this.onTextboxChangeLogInEmail = this.onTextboxChangeLogInEmail.bind(this);
    // this.onTextboxChangeLogInPassword = this.onTextboxChangeLogInPassword.bind(this);
    // this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    // this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    
    // // this.onLogIn = this.onLogIn.bind(this);
    // // this.onSignUp = this.onSignUp.bind(this);
    // // this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage('mav_app');
    // const obj = localStorage.getItem('token');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
    //   fetch('/api/account/verify?token=' + token)

    //   axios.get('/auth/account/verify?token=' + token)
    //     .then(res => res.json())
    //     .then(json => {
    //       if (json.success) {
    //         this.setState({
    //           token,
    //           isLoading: false
    //         });
    //       } else {
    //         this.setState({
    //           isLoading: false,
    //         });
    //       }
    //     });
    // } else {
    //   this.setState({
    //     isLoading: false,
    //   });
    // }

    const verifyReq = () => {
        try {
            console.log("in verify try");
            return axios.get('/auth/account/verify?token=' + token);
        } catch (error) {
            console.log(error);
            this.setState({
                isLoading: false,
            }); //set verify error?
        }
    };
    const verify = async () => {
        const reqPromise = await verifyReq()
        .then(res => {
            if (res.data.success) {
                this.setState({
                    token,
                    isLoading: false
                });
            } else {
                this.setState({
                    isLoading: false,
                });
            }
        })
        .catch(error => {
            console.log(error);
            this.setState({
                isLoading: false,
            });
        });
    };
    verify(); 
  } else {
    this.setState({
        isLoading: false,
    });
  }
}

  onTextboxChangeLogInEmail = (event) => {
    this.setState({
      logInEmail: event.target.value,
    });
  }

  onTextboxChangeLogInPassword = (event) => {
    this.setState({
      logInPassword: event.target.value,
    });
  }

  onTextboxChangeSignUpEmail = (event) => {
    this.setState({
      signUpEmail: event.target.value,
    });
  }

  onTextboxChangeSignUpPassword = (event) => {
    this.setState({
      signUpPassword: event.target.value,
    });
  }

  onSignUp = () => {
    // Grab state
    const {
      signUpEmail,
      signUpPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    const signUpReq = () => {
        try {
          return axios.post('/auth/account/signup', {
            email: signUpEmail,
            password: signUpPassword,
          });
        } catch (error) {
          console.error(error);
          this.setState({
            logInError: "Error: An unknown error occurred.",
            isLoading: false,
          });
        }
    };
      
    const signUp = async () => {
        const reqPromise = await signUpReq()
        .then(res => {
            if (res.data.success) {
                this.setState({
                    signUpError: res.data.message,
                    isLoading: false,
                    signUpEmail: '',
                    signUpPassword: '',
                  });
            } else {
                // maybe call sign in function instead?
                this.setState({
                    signUpError: res.data.message,
                    isLoading: false,
                  });
            }
        })
        .catch(error => {
            console.log(error);
            this.setState({
                signUpError: "Error: An unknown error occurred.",
                isLoading: false,
              });
        });
    };

    signUp();
  }

  onLogIn = () => {
    const {
      logInEmail,
      logInPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });
    const logInReq = () => {
        try {
          return axios.post('/auth/account/login', {
            email: logInEmail,
            password: logInPassword,
          });
        } catch (error) {
          console.error(error);
          this.setState({
            logInError: "Error: An unknown error occurred.",
            isLoading: false,
         });
        }
    };
    const logIn = async () => {
        const reqPromise = await logInReq()
        .then(res => {
            if (res.data && res.data.success) {
                setInStorage('mav_app', { token: res.data.token });
                this.props.history.push('/');
                // this.setState({
                //     logInError: res.data.message,
                //     isLoading: false,
                //     logInPassword: '',
                //     logInEmail: '',
                //     token: res.data.token,
                // }); // figure out how to rerender parent component
            } else {
                this.setState({
                    logInError: res.data.message,
                    isLoading: false,
                });
            }
        })
        .catch(err => {
            console.log(err);
            this.setState({
                logInError: "Error: An unknown error occurred.",
                isLoading: false,
            });
        });
    };
    logIn();
  }

// logout() {
//     this.setState({
//         isLoading: true,
//     });
//     // const obj = localStorage.getItem('token');
//     const obj = getFromStorage('mav_app');

//     if (obj && obj.token) {
//         const { token } = obj;
//         const logoutReq = () => {
//             try {
//                 return axios.get('/auth/account/logout?token=' + token);
//             } catch (error) {
//                 console.log(error);
//                 this.setState({
//                     isLoading: false,
//                     logInError: '' // add logout err message?
//                 });
//             }
//         }
//         const logout = async () => {
//             const logoutPromise = await logoutReq()
//             .then(res => {
//                 if (res.data.success) {
//                     this.setState({
//                         token: '',
//                         isLoading: false,
//                         logInError: ''
//                     });
//                 } else {
//                     this.setState({
//                         isLoading: false,
//                         logInError: ''
//                     });
//                 }
//             })
//             .catch(error => {
//                 console.log(error);
//                 this.setState({
//                     isLoading: false,
//                     logInError: ''
//                 });
//             });
//         }
//         logout();
//     }
// }

  render() {
    const {
      isLoading,
      token,
      logInError,
      logInEmail,
      logInPassword,
      signUpEmail,
      signUpPassword,
      signUpError,
    } = this.state;

    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    if (!token) {
        // console.log("token null");
        // console.log("loginerr: ", logInError);
      return (
        <div>
          <div>
            {
              console.log(logInError)}{
              (logInError) ? (
                <p>{logInError}</p>
              ) : (null)
            }
            <p>Log In</p>
            <input
              type="email"
              placeholder="Email"
              value={logInEmail}
              onChange={this.onTextboxChangeLogInEmail}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={logInPassword}
              onChange={this.onTextboxChangeLogInPassword}
            />
            <br />
            <button onClick={this.onLogIn}>Log In</button>
          </div>
          <br />
          <br />
          <div>
            {
              (signUpError) ? (
                <p>{signUpError}</p>
              ) : (null)
            }
            <p>Sign Up</p>
            <input
              type="email"
              placeholder="Email"
              value={signUpEmail}
              onChange={this.onTextboxChangeSignUpEmail}
            /><br />
            <input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={this.onTextboxChangeSignUpPassword}
            /><br />
            <button onClick={this.onSignUp}>Sign Up</button>
          </div>

        </div>
      );
    }

    return (
      <div>
        <p>Account</p>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default withRouter(SignUpIn);