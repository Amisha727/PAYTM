import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                username,
                firstName,
                lastName,
                password
            });
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (error) {
            console.error("Error during signup:", error);
            // Handle error, e.g., display a message to the user
        }
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign up"} />
                    <SubHeading label={"Enter your information to create an account"} />
                    <InputBox onChange={(e) => setFirstName(e.target.value)} placeholder="firstName" label={"First Name"} />
                    <InputBox onChange={(e) => setLastName(e.target.value)} placeholder="lastName" label={"Last Name"} />
                    <InputBox onChange={(e) => setUsername(e.target.value)} placeholder="email-id" label={"Email"} />
                    <InputBox onChange={(e) => setPassword(e.target.value)} placeholder="password" label={"Password"} />
                    <div className="pt-4">
                        <Button onClick={handleSignup} label={"Sign up"} />
                    </div>
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
                </div>
            </div>
        </div>
    );
};
