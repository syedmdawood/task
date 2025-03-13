import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../Context/AppContext";
import axios from "axios";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("male");

  const { setToken } = useContext(AppContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(
          "http://localhost:4000/api/user/register",
          { name, email, password, address, dob, phone, gender }
        );
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Account created successfully");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(
          "http://localhost:4000/api/user/login",
          { email, password }
        );
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Logged in successfully");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //   useEffect(() => {
  //     if (token) {
  //       navigate("/");
  //     }
  //   }, [token]);

  return (
    <form
      className="min-h-[80vh] flex items-center mt-16"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-bold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>

        {state === "Sign Up" && (
          <div className="w-full">
            <div className="w-full">
              <p className="font-bold">Full Name</p>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="w-full">
              <p className="font-bold">Address</p>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
            </div>
            <div className="w-full">
              <p className="font-bold">Date Of Birth</p>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                type="date"
                onChange={(e) => setDob(e.target.value)}
                value={dob}
              />
            </div>
            <div className="w-full">
              <p className="font-bold">Phone Number</p>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
            </div>
            <div className="w-full">
              <p className="font-bold">Gender</p>

              <select
                name=""
                id=""
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                onChange={(e) => setGender(e.target.value)}
                value={gender}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
        )}

        <div className="w-full">
          <p className="font-bold">Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="w-full">
          <p className="font-bold">Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button
          className="bg-blue-700 text-white w-full py-2 rounded-md text-base"
          type="submit"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p className="font-bold">
            Alrady have an account?
            <span
              onClick={() => setState("Login")}
              className="text-primary cursor-pointer underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="font-bold">
            Create a new account?
            <span
              onClick={() => setState("Sign Up")}
              className="text-primary cursor-pointer underline"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
