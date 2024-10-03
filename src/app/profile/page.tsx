"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type UserData = {
    username: string,
    email: string,
    status: boolean
  }

  
const page = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/users/logout");
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        
        router.push("/login");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Error occurred while logging out.");
      console.log(error);
    }
  };

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/users/me");
        const data = await res.json();

        if (res.ok) {
          setUser(data.user);
        } else {
          toast.error("Failed to fetch user details.");
        }
      } catch (error) {
        toast.error("Error occurred while fetching user details.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getUserDetails();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>User not found.</p>;
  }

  return (
    <section>
      <div className="container px-5 py-24 mx-auto">
        <h2 className="text-3xl text-center">Your Profile</h2>
        <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
            alt="User Avatar"
            className="mx-auto mb-5"
            width={70}
          />
         
          <h2 className="text-xl font-semibold">
            {user.username}
          </h2>
          <p>{user.email}</p>
          <button className="btn btn-warning mt-5" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </section>
  );
};

export default page;
