import { useState, useEffect } from "react";
import Link from "next/link";
import { Auth , Hub } from "aws-amplify";
import {
  addUsername,
  addGroup,
  addEmail,
  signout,
} from "@/redux/reducers/userSlice";
import { useSelector, useDispatch } from "react-redux";

const Nav = ({ children }) => {
  const dispatch = useDispatch();
  // console.log(Auth)
const [authChange , setAuthChange] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { cartProduct } = useSelector((state) => state.cart);
  const { username } = useSelector((state) => state.user);

  const length = cartProduct?.length;
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Books", href: "/books" },
    { label: "Authors", href: "/authors" },
    { label: "Cart", href: "/cart", cartAmount: length },
    { label: "Contact", href: "/contact" },
  ];
  async function signOut() {
    try {
      Auth.signOut().then(() => {
        dispatch(signout());
        localStorage.clear();
        setAuthChange(!authChange)
      });
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }


  const listener = (data) => {
    switch (data.payload.event) {
      case "signIn":
        console.log('sign in' , data.payload)
        setAuthChange(!authChange)
        break;
        case "signOut":
          console.log('sign in' , data.payload)
        setAuthChange(!authChange)
        break;
    }
  };

  Hub.listen("auth", listener);
  const storeAuth = async ()=>{
     const user = await  Auth.currentAuthenticatedUser();
    const apiResponse = user?.signInUserSession?.idToken?.payload
    const groups = apiResponse['cognito:groups'];
    const username = user.username;
    const email = apiResponse.email;
    if(groups){
      localStorage.setItem('aws-groups' , JSON.stringify(groups) )
      dispatch(addGroup(groups));
} 

          localStorage.setItem('aws-username' , JSON.stringify(username) )
          dispatch(addUsername(username));
          localStorage.setItem('aws-email' , JSON.stringify(email) )
          dispatch(addEmail(email));

}
  useEffect(() => {
    storeAuth()
    const groups = localStorage.getItem("aws-groups");
    const items = groups === "undefined" ? false : JSON.parse(groups);
    if (items) {
      dispatch(addGroup(items));
    }
    const items1 = JSON.parse(localStorage.getItem("aws-username"));
    const items2 = JSON.parse(localStorage.getItem("aws-email"));
    dispatch(addUsername(items1));
    dispatch(addEmail(items2));
  }, [authChange]);

  return (
    <>
      <nav className='bg-gray-900/75 fixed top-0 z-10 w-full backdrop-blur-md justify-between min-h-16 flex items-center '>
        <div className='px-4 w-full '>
          <div className='flex justify-between  w-full py-5   '>
            <div className='flex flex-col w-full justify-between  md:flex-row  '>
              <div className='flex  items-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6 text-white cursor-pointer md:hidden'
                  onClick={() => setMobileNavOpen(!mobileNavOpen)}
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 100 2h6a1 1 0 100-2H9z'
                    clipRule='evenodd'
                  />
                </svg>
                <Link href='/'>
                  <div className='ml-2 font-semibold text-white cursor-pointer'>
                    <h1>
                      Sujo <span className={"text-orange-600"}>Book Store</span>
                    </h1>
                  </div>
                </Link>
              </div>
              <div
                className={`${
                  mobileNavOpen ? "flex " : "hidden"
                } md:flex  flex-col md:flex-row md:items-center`}
              >
                {navLinks.map(({ label, href, cartAmount }) => (
                  <Link key={label} href={href}>
                    <div
                      onClick={() => setMobileNavOpen(false)}
                      className='cursor-pointer flex  items-center text-white hover:text-gray-300 py-2 md:py-0 md:px-4 border-b-2 md:border-b-0  border-gray-800 transition-all duration-300 ease-in-out'
                    >
                      {label}
                      {cartAmount > 0 ? (
                        <div className='ml-3 bg-white text-black w-10 font-bold h-10 rounded-full flex justify-center items-center '>
                          {cartAmount > 0 ? cartAmount : null}
                        </div>
                      ) : null}
                    </div>
                  </Link>
                ))}
              </div>
              {!username ? (
                <Link
                  className='bg-orange-500 px-3 py-2 rounded-xl flex items-center justify-center text-white text-bold'
                  href='/login'
                >
                  Sign In
                </Link>
              ) : (
                <button
                  className='bg-orange-500 px-3 py-2 rounded-xl flex items-center justify-center text-white text-bold'
                  onClick={signOut}
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      {children}
    </>
  );
};

export default Nav;
