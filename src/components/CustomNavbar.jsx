"use client"
import { UserContext } from "@/contexts/userContext";
import { logout } from "@/services/userServices";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useContext } from "react"
import { toast } from "react-toastify";

const CustomNavBar = () => {

  const {user} =  useContext(UserContext);
  const router = useRouter();
  // console.log(user);

  async function logoutUser() {
    try {
      const result = await logout()
      // console.log(result);
      if (result) {
        router.push('/login');
        toast("Logout")
      }
    } catch (error) {
      
    }
  }
  return (
    // justify-around
    <nav className="bg-blue-600 h-16 py-2 px-36 flex justify-between items-center">
      <div className="brand">
        <h1 className="text-2xl font-semibold">
          <a href="#">Work Manager</a>
        </h1>
      </div>

      <div>
        <ul className="flex space-x-3">
          <li>

            {/* page refresh  so we use link*/}
            {/* <a href="/">Home</a> */}

            <Link href={'/'}>Home</Link>
          </li>
          <li>
            {/* <a href="#">Add Task</a> */}
            <Link href={'/add-task'}>Add Task</Link>
          </li>
          <li>
            <Link href={'/show-task'}>Show Tasks</Link>
            {/*  <a href="#">Show Tasks</a> */}
          </li>


        </ul>
      </div>

      {
        user?.data?.success && (
          <>
            <div className="flex gap-6">
              <Link href="#">{user?.data?.message?.name}</Link>
              <Link href="#" onClick={() => logoutUser()}>Logout</Link>
            </div>
          </>
        )
      }
      {
        !user?.data?.success && (<>
          <div className="flex gap-6">
            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
          </div>
        </>)
      }
    </nav>
  )
}

export default CustomNavBar