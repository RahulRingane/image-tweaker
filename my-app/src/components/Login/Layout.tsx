import { Link } from "react-router-dom";
import AuthGraphic from "../../assets/AuthGraphic";
import { JSX } from "react/jsx-runtime";
import { useCookies } from "react-cookie";

export default function Layout({ formUI }: { formUI: JSX.Element }) {

   const [{ token }, _, removeCookies] = useCookies(["token"]);
  function logOut() {
    removeCookies("token");
  }

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="w-[50%] h-screen hidden lg:flex justify-center items-center">
                <AuthGraphic />
            </div>
            {token && (
                <div className=" backdrop-blur-2xl absolute right-0 z-50 w-full lg:w-[50%] h-screen flex flex-col justify-center items-center text-2xl lg:text-3xl font-bold underline">
                    <Link to={"/dashboard"} className="flex justify-center">
                        <div className=" bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                            <div className="flex">
                                <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg></div>
                                <div>
                                    <p className="text-sm"> You are already logged in, go to dashboard</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <button onClick={logOut}>Logout</button>
                </div>
            )}
            <div className="w-full lg:w-[50%] h-screen flex flex-col justify-center items-center bg-gray-100">
                <div className="max-w-md w-full p-6">
                    <h1 className="text-3xl font-semibold mb-6 text-black text-center">
                        Log in
                    </h1>
                    <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
                        Join to Our Community with all time access and free{" "}
                    </h1>
                    {formUI}
                    <div className="mt-4 text-sm text-gray-600 text-center">
                        <p>
                            Already have an account?{" "}
                            <Link to="/register" className="text-black hover:underline">
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}