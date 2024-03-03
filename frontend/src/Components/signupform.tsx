import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignupType } from "@abisheknewar/medium-common"
import axios from "axios"


const SignupForm = ({type}: {type: "signup" | "signin"}) => {
  const navigate = useNavigate();
  
  const [postInput,setPostInput] = useState<SignupType>({
    name: "",
    email: "",
    password: ""
  })
  
  async function submit() {
    try{
      const response = await axios.post(`https://backend.newarabishek.workers.dev/api/v1/user/${type}`,postInput)
      localStorage.setItem("token",response.data.token)
      navigate("/blogs")
    }
    catch(e){
      alert("Invalid");
    }
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="max-w-lg">
      <div className="text-center mb-6 select-none">
      <h1 className="text-3xl font-bold dark:text-white">Create an Account</h1>
      <div className="text-[13px] font-light dark:text-white">{
        type === "signup"? 
        <div>
          Already have a account? 
        <Link className="underline" to="/signin"> Login</Link>
        </div>
        : <div>
          Don't have a account? <Link className="underline" to="/signup"> Signup</Link>
        </div>
      }</div>
      </div>
      <div className="mb-6 flex flex-col gap-3  ">
        {
          type === "signup"?  
          <label htmlFor="name">
          <h2 className=" dark:text-white font-semibold">Name</h2>
          <Input type="text" placeholder="Enter your Name" id="name" onChange={(e)=>{
            setPostInput({
              ...postInput,
              name: e.target.value
            })
          }} />
        </label>
          :null
        }
        <label htmlFor="Email">
          <h2 className="dark:text-white font-semibold">Email</h2>
          <Input type="email" placeholder="Enter your Name" id="Email" onChange={(e)=>{
            setPostInput({
              ...postInput,
              email: e.target.value
            })
          }} />
        </label>
        <label htmlFor="password">
          <h2 className="dark:text-white font-semibold">Password</h2>
          <Input type="password" placeholder="Enter your Name" id="password" onChange={(e)=>{
            setPostInput({
              ...postInput,
              password: e.target.value
            })
          }} />
        </label>
      </div>
      <button onClick={submit} className="w-full bg-black hover:bg-zinc-700 transition-all ease-linear duration-500 text-white dark:bg-white dark:text-white rounded-lg h-10 h"> {type==="signup"? "Sign Up" : "Sign In"}</button>
      </div>
    </div>
  )
}
interface Input{
  type: string,
  placeholder: string,
  id: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const Input = ({type,placeholder,id, onChange}:Input) => {
return (
  <div>
      <input className="border rounded-lg px-3 h-10 w-full" type= {type || "text"} placeholder={placeholder} id={id} onChange={onChange} />
  </div>
)
}

export default SignupForm