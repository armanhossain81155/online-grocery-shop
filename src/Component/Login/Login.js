import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './Login.css'
import GoogleButton from 'react-google-button'
import { useState } from 'react';
import firebase from 'firebase/app'
import "firebase/auth";
import firebaseConfig from './firebase.config'
import { useContext } from 'react';
import { UserContext } from '../../App';








if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    const [newUser, setNewUser] = useState(true);
    const [user, setUser] = useState({
      isSignedIn : false ,
      isFieldValid: true,
      name: '',
      password: '',
      email: '',
      confirmPassword: '',
      error: ''
     
  
  
    });

    const handleResponse = (res, redirect) => {
      setUser(res) ;
      setLoggedInUser(res);
      if(redirect){
        history.replace(from);
      }
    }
    var googleProvider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleSignIn = () => {
      firebase.auth()
      .signInWithPopup(googleProvider)
      .then( res => {
        const {email, displayName} = res.user
    const newUserInfo = {isSignedIn:true, 
    name: displayName,
    email: email

    }
    setUser(newUserInfo)
    setLoggedInUser(newUserInfo)
    
    history.replace(from);
       
        
       
      }).catch((error) => {
        
        var errorCode = error.code;
        var errorMessage = error.message;
        
        var email = error.email;
       
        var credential = error.credential;
        
      });
    }

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const history = useHistory();
    const location = useLocation();

    let { from } = location.state || { from: { pathname: "/destination" } };


  

    const handleBlur = (e) => {
      // console.log(e.target.name, e.target.value)
      let isFieldValid = true;
      if(e.target.name === 'email'){
        isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)
        
      }
      if(e.target.name === 'password'){
        
       
        isFieldValid = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8})$/.test(e.target.value)
              
   
      
      }
      if(e.target.name === 'confirmPassword'){
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        if(password !== confirmPassword){
          isFieldValid = false
          
          
          
        }
       

      }
      
      
      
      if(isFieldValid){
        const newUserInfo = { ...user}
        newUserInfo[e.target.name] = e.target.value;
        
        setUser(newUserInfo)
      }
    }

    const handleSubmit = (e) => {
        if(newUser && user.email && user.password){

          firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
          .then( res => {
            const newUserInfo = { ...user}
            
            setUser(newUserInfo)
            setNewUser(newUserInfo)
            setLoggedInUser(newUserInfo)
            history.replace(from)
            console.log(newUserInfo)
            
            
            
           
               
          })
            
         
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        
            console.log(errorMessage, errorCode)
          });

        }
        if(!newUser && user.email && user.password){
          firebase.auth().signInWithEmailAndPassword(user.email, user.password)
  .then( res => {
    const {email, displayName} = res.user
    const newUserInfo = {isSignedIn:true, 
    name: displayName,
    email: email

    }
    setUser(newUserInfo)
    setLoggedInUser(newUserInfo)
    
    history.replace(from);
  })
  .catch( error => {
    
    const errorMessage = error.message;
   
    console.log(errorMessage)
  });
        }

        e.preventDefault();
       
    }

const updateUserName = name => {
  const user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: name
   
  }).then(() => {
    
  }).catch((error) => {
 
  });  
}
 
    return (
        <div className="destination">
            {
              newUser ? <h3>Create an account</h3> : <h3>
                  Login your account
              </h3>
            }

            
            <form onSubmit={handleSubmit} >
            {
              newUser && <input name="name" onBlur={handleBlur}  placeholder="Type here name" required/>
            }
            <br />
            <input name="email"  onBlur={handleBlur}  placeholder="write your email" required />
            <br />
            <input name="password" type="password" id="password" onBlur={handleBlur}  placeholder="Password" required/>
            <br />
        
            {
              newUser && <input name="confirmPassword" id="confirmPassword" type="password" onBlur={handleBlur} placeholder="Confirm password" required/>
            }
            <br />
            
          {
            newUser ? <input className="createPassSubmit" type="submit" value="Create new account" />
            : <input className="createPassSubmit"  type="submit" value="Login" />
          }




            </form>
            {
              newUser ? <p onClick= {() => setNewUser(!newUser)} >
              Already have an account?
          <Link  className="createLogin">Login</Link>
          
            </p> :
              
              <p onClick= {() => setNewUser(!newUser)}>Don't have an account? 
              <Link   className="createLogin">Create an account</Link>
            </p>
            }
            or
            <br />
            <GoogleButton className="continue-google"
            onClick={handleGoogleSignIn} />

            
        </div>
    );
};

export default Login;