import {useState} from "react";
import "./Login.css";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../firebase";
import { useNavigate } from "react-router-dom";

const Login = () =>{
    const [error,setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) =>{
        e.preventDefault();

        signInWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
            //Signed in
            const user = userCredential.user;
            navigate("/home");
        })
        .catch((error)=>{
            setError(true);
        });
    };
    return(
        <div className="login">
            <form onSubmit={handleLogin} className="loginForm">
                <input className="loginInput" type="email" placeholder="Email: " onChange={e=>setEmail(e.target.value)}/>
                <input className="loginInput" type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
                <button className="loginButton" type="submit">Login</button>
                {error && <span className="loginSpan">Wrong email or password</span>}
            </form>
        </div>
    )
}

export default Login;