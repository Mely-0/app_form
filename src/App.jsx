import { useEffect } from "react";
import { useState } from "react";
import swal from 'sweetalert';
import validator from 'validator'
import "./App.css";
import { registerUser } from "./services/registerUser";

export function App() {

  const[email, setEmail]=useState("");
  const[name, setName]=useState("");
  const[age, setAge]=useState("");
  const[password, setPassword]=useState("");
  const[passwordCheck, setPasswordCheck]=useState("");
  const[input, setInput]=useState(false);
  const[marcado, setMarcado]=useState(false);
  const [formValidation, setFormValidation] = useState({
    email: undefined,
    name:undefined,
    age:undefined,
    password: undefined,
    passwordCheck: undefined,
    input:undefined,
  });

// useEffect(()=>{
//   if(validator.isEmail(email)){
//     setError("Valid Email")
//   }else{
//     setError("Enter Valid Email !")
//   }
//   if(email.length <3){
//     setError("email is required")
//   }
// })
// useEffect(()=>{
//   if(name.length <3){
//     setError1("name is required ")
//   }else{
//     setError1("")
//   }
// })
// useEffect(()=>{
//   if(age ==0 ){
//     setError2("Age is required ")
//   }else if(age <= 18){
//     setError2("you must be above 18 to register ")
//   }
//   else{
//     setError2("everything ok")
//   }
  
// })
// useEffect(()=>{
//   if(password.length == " "){
//     setError3("password is required")
//   } else if(password.length <5){
//     setError3("password is too short")
    
//   }else{
//     setError3("password valid")
//   }
// })
// useEffect(()=>{
// if(passwordCheck.length == ""){
//   setError4("passwordCheck is required")
// }
//   else if(passwordCheck == password){
//       setError4(" ")
//   } else{
//     setError4("passwords do not match")
      
//   }
// })

const handleEmailChange = (event) => {
  const value = event.target.value;

  setFormValidation({
    ...formValidation,
    email: validator.isEmail(value) ? "": "email is required",
    //email: value.length === 0 ? "email is required" : "",
  
  });

  setEmail(value);
};
console.log(formValidation);
const handleNameChange = (event) => {
  const value = event.target.value;

  setFormValidation({
    ...formValidation,
    name: value.length === 0 ? "name is required" : "",
  });

  setName(value);
};
  
const handleAgeChange = (event) => {
  const value = event.target.value;

  setFormValidation({
    ...formValidation,
    age: value <= 18  ? "you must be above 18 to register" : "",
  }
  
  );

  setAge(value);
};
  
const handlePasswordChange = (event) => {
  const value = event.target.value;
  if(value.length === 0){
    setFormValidation({
      ...formValidation,
      password:  "password is required"      
    });
  }else{
    if (value.length < 5) {
      setFormValidation({
        ...formValidation,
        password:  "password is too short"      
      });
    }else{
      setFormValidation({
        ...formValidation,
        password:  ""      
      });
    }
  }
  
  
  setPassword(value);
};


const handlePasswordCheckChange = (event) => {
  const value = event.target.value;
  
  setFormValidation({
    ...formValidation,
    passwordCheck: value !== password ? "passwords do not match" : "",
  });
  
  setPasswordCheck(value);
};

const handlemarcado =(e) => {
  if (input) {
    setInput(false)
    } else {
    setInput(true)
    }

    setFormValidation({
      ...formValidation,
      input: input == true ? "please read and accept the terms and conditions" : "",
    });
}
const isFormValid = Object.keys(formValidation).every(
  (key) => formValidation[key] === ""
);
const onSubmit= (e) =>{
e.preventDefault();
let data={
  email:email,
  name: name,
  age:age,
  password:password,
  passwordCheck:passwordCheck
}

  registerUser({email:email,name: name,age:age,password:password,passwordCheck:passwordCheck});
  // setEmail("");
  // setName("");
  // setAge("");
  // setPassword("");
  // setPasswordCheck("");
  // setInput(false)
} 

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            Email
            <input
            value={email} 
            type="email" 
            placeholder="email"
            onChange={handleEmailChange} />
          </label>
          {formValidation.email && (
            <span style={{ color: "red" }}>{formValidation.email}</span>
          )}
        </div>
        <div>
          <label>
            Name
            <input type="text"
            value={name}
            placeholder="Name"
            onChange={handleNameChange}/>
          </label>
          {formValidation.name && (
            <span style={{ color: "red" }}>{formValidation.name}</span>
          )}
        </div>
        <div>
          <label>
            Age
            <input type="number" 
            value={age}
            placeholder="Age"
            onChange={handleAgeChange} 
            />
          </label>
          {formValidation.age && (
            <span style={{ color: "red" }}>{formValidation.age}</span>
          )}
        </div>
        <div>
          <label>
            Password
            <input
            value={password}
            type="password" 
            placeholder="Password"
            name="password"
            onChange={handlePasswordChange} />
          </label>
          {formValidation.password && (
            <span style={{ color: "red" }}>{formValidation.password}</span>
          )}
        </div>
        <div>
          <label>
            Password check
            <input
            value={passwordCheck} 
            type="password"
            name="Passwordcheck"
            placeholder="Password check" 
            onChange={handlePasswordCheckChange}/>
          </label>
          {formValidation.passwordCheck && (
            <span style={{ color: "red" }}>{formValidation.passwordCheck}</span>
          )}
        </div>
        <div>
          <label>
            <input type="checkbox" 
            checked={input}
            onChange={handlemarcado} />
            Accept terms & conditions: Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Pellentesque pharetra, tortor ac placerat
            elementum, neque libero luctus mi, ut efficitur nisl mauris at nisl.
            Suspendisse non neque et neque facilisis convallis. Praesent erat
            magna, sollicitudin eu porttitor ut, tincidunt sit amet urna.
            Vestibulum congue neque metus.
          </label>
          {formValidation.input &&(
            <span style={{ color: "red" }}>{formValidation.input}</span>
          )}
        </div>

        <button disabled={!isFormValid} >Sign up</button>
      </form>
    </div>
  );
  }
