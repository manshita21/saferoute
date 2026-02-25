import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/home.css";

export default function Home() {

const navigate = useNavigate();

return (
<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
className="home-container"
>

<div className="glass home-card">

<h1>SafeRoute 🛡</h1>
<p>AI Powered Night Travel Safety</p>

<div className="home-btns">

<button
className="btn-primary"
onClick={()=>navigate("/login")}
>
Login
</button>

<button
className="btn-secondary"
onClick={()=>navigate("/register")}
>
Register
</button>

</div>

</div>
</motion.div>
);
}
