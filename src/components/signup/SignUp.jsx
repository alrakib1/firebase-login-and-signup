import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import  { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import auth from "../../firebase.config";
import { Helmet } from "react-helmet";
const SignUp = () => {
  const [signUpError, setSignUpError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, SetShowPassword] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
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

        // update profile
        updateProfile(user, {
          displayName: name,
          photoURL: "",
        })
          .then()
          .catch();

        // send verification email
        sendEmailVerification(user).then(() => {
          alert("please check your email and verify your account");
        });
      })
      .catch((error) => {
        if (error.message == "Firebase: Error (auth/email-already-in-use).") {
          setSignUpError("User Already exists");
          return;
        }
      });
  };
  return (
    <>
    <Helmet>
      <title>Sign-Up</title>
    </Helmet>
      <div className="mx-auto lg:w-1/4 w-3/4 relative container flex flex-col justify-center items-center mt-10 text-center ">
        <h3 className="text-4xl mb-4 mt-3 text-center">Please sign up</h3>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            id=""
            className="mb-4 w-full px-4 py-2 mx-auto"
            required
          />
          <br />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            id=""
            className="mb-4 w-full px-4 py-2 mx-auto"
            required
          />
          <br />
          <div className="">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id=""
              className="mb-4 w-full px-4 py-2 pr-10"
              placeholder="Password"
              required
            />
            <span
              className="absolute left-[210px] top-[190px] md:left-[380px] lg:left-[340px] cursor-pointer"
              onClick={() => SetShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <br />
          <div className="mb-2">
            <input type="checkbox" name="terms" id="terms" />
            <label htmlFor="terms" className="ml-2 mb-4">
              Accept our <a href="">Terms</a> and <a href="">Conditions</a>
            </label>
          </div>
          <input
            type="submit"
            value="Sign-Up"
            className="btn btn-secondary mb-4 w-full"
          />
        </form>
        {signUpError && <p className="text-red-600">{signUpError}</p>}
        {success && <p className="text-green-700">{success}</p>}
      </div>
    </>
  );
};

export default SignUp;
