import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredientials } from "../../redux/features/auth/authSlice";
import Loader from "../../components/Loader";


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, {isloading}] = useLoginMutation()

    const {userInfo} = useSelector(state => state.auth)

    const {search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
            
        }
    }, [navigate, redirect, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
          const res = await login({ email, password }).unwrap();
          console.log(res);
          dispatch(setCredientials({ ...res }));
          navigate(redirect);
        } catch (error) {
          toast.error(error?.data?.message || error.message);
        }
      };

        return(
            <div>
            <section className="container ml-[20rem] flex flex-wrap bg-[#fafaf9] shadow-lg mb-[0rem] p-3"
            style={{ fontFamily: '"Nerko One",' }}>
                <div className="mr-[4rem]  ml-[20rem]">
                    <h1 className="text-2xl mt-[3rem] font-semibold mb-4">Sign In</h1>
                    <form onSubmit={submitHandler} className="container w-[40rem]">
                        <div className="my-[2rem]">
                            <label htmlFor="email"
                            className="block text-sm font-medium text-black">Email Address</label>

                            <input
                                type="email"
                                id="email"
                                className="mt-1 p-2 border rounded w-full"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="my-[2rem]">
                            <label htmlFor="password"
                            className="block text-sm font-medium text-black">Password</label>

                            <input
                                type="password"
                                id="password"
                                className="mt-1 p-2 border rounded w-full"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button disabled={isloading} type="submit" className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]">
                            {isloading ? 'Signing In...' : 'Sign In'}
                        </button>
                        {isloading && <Loader />}
                    </form>
                    <div className="mt-4 mb-[4rem]">
                        <p className="text-black">
                        New Customer?{" "}
                        <Link
                            to={redirect ? `/register?redirect=${redirect}` : "/register"}
                            className="text-pink-500 hover:underline"
                        >
                            Register
                        </Link>
                        </p>
                    </div>
            </div>
            
        </section>
    </div>
);
        
    
};

export default Login;