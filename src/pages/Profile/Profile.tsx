import { Outlet } from "react-router-dom";

import ProfileHeader from "./components/ProfileHeader";
import ProfileTabs from "./components/ProfileTabs";
import Navbar from "@/layouts/Navbar/Navbar";

const Profile = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container">
        <div className="py-[50px] md:py-[50px] sm:py-[25px]">
          <ProfileHeader />
          <ProfileTabs activeCount={5} inactiveCount={6} />
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
