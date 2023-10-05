import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";

import { useRef, useState } from "react";
import auth from "../../firebase.config";
import { Link } from "react-router-dom";

const Login = () => {
  const [signUpError, setSignUpError] = useState("");
  const [success, setSuccess] = useState("");
  const emailRef = useRef(null);
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setSignUpError("");
    setSuccess("");

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        if(result.user.emailVerified){
          setSuccess("Login Successfully");
        }else{
          alert('please verify your email')
        }
      })
      .catch((error) => {
        if (error.message == "Firebase: Error (auth/email-already-in-use).") {
          setSignUpError("Email Already exists");
          return;
        }
      });
  };

  const handleForgetPassword =() =>{
    const email = emailRef.current.value;
    if(!email){
      console.log('please provide an email', emailRef.current.value);
      return;
    }else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
console.log('please write a valid email');
return;
    }
    // send validation email
    sendPasswordResetEmail(auth,email).then(result=>{
      alert('please check your email')
    }).catch(error=>{
      console.log(error)
    })
  }
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <form onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                ref={emailRef}
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            {signUpError && <p className="text-red-600">{signUpError}</p>}
            {success && <p className="text-green-700">{success}</p>}
            <p>New to our Website ? Please <Link to="/signup"><span className="text-blue-500">Sign-Up</span></Link> </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
