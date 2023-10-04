import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import auth from "../../firebase.config";
const SignUp = () => {
  const [signUpError, setSignUpError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, SetShowPassword] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;

    setSignUpError("");
    setSuccess("");
    const check = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    
    if (password.length < 6) {
      setSignUpError("password must be 6 characters or longer");
      return;
    } else if (!check.test(password)) {
      setSignUpError(
        "Password must have six characters, at least one letter and one number"
      );
      return;
    } else if (!accepted) {
      setSignUpError("please accept out terms and conditions ");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        setSuccess("User Created Successfully");
      })
      .catch((error) => {
        if(error.message == 'Firebase: Error (auth/email-already-in-use).'){
          setSignUpError('Email Already exists')
          return ;
        }
      });
  };
  return (
    <>
      <div className="mx-auto md:w-1/4">
        <h3 className="text-4xl mb-4 mt-3">Please sign up</h3>
        <form onSubmit={handleSignUp}>
          <input
            type="email"
            name="email"
            placeholder="email address"
            id=""
            className="mb-4 w-3/4 px-4 py-2"
            required
          />
          <br />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id=""
              className="mb-4 w-3/4 px-4 py-2 pr-10"
              placeholder="password"
              required
            />
            <span
              className="absolute top-3 left-80 cursor-pointer"
              onClick={() => SetShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <br />
          <div className="mb-2">
            <input type="checkbox" name="terms" id="terms" />
            <label htmlFor="terms" className="ml-2">
              Accept out <a href="">Terms</a> and <a href="">Conditions</a>
            </label>
          </div>
          <input
            type="submit"
            value="Sign-Up"
            className="btn btn-secondary mb-4 w-3/4"
          />
        </form>
        {signUpError && <p className="text-red-600">{signUpError}</p>}
        {success && <p className="text-green-700">{success}</p>}
      </div>
    </>
  );
};

export default SignUp;
