import React from "react";
import "./css/signup.css";

const SignUp = (props) => {
    return (
        <div>
            <h1>sign up</h1>
            <p className="signup">
                <form>
                    <label>
                        <input type="text" name="username" placeholder="username" />
                    </label>
                    <label>
                        <input type="text" name="password" placeholder="password" />
                    </label>
                    <input type="submit" value="Sign Up" />
                </form>
            </p>
        </div>
    );
}

export default SignUp;