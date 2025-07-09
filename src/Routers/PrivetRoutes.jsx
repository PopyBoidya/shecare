import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import useAuthContext from "../Hooks/useAuthContext";

const PrivetRoutes = ({ children, allowedRoles = [] }) => {
  const { user } = useAuthContext();
  const location = useLocation();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const axios = useAxios();

  useEffect(() => {
    const fetchRole = async () => {
      if (!user?.email) return setLoading(false);

      try {
        const [admins, volunteers] = await Promise.all([
          axios.get("/admin-register"),
          axios.get("/volunteers"),
        ]);

        const isAdmin = admins.data.find((admin) => admin.email === user.email);
        const isVolunteer = volunteers.data.find((vol) => vol.email === user.email);

        if (isAdmin) setRole("admin");
        else if (isVolunteer) setRole("volunteer");
        else setRole("unknown");
      } catch (error) {
        console.error("Failed to fetch role:", error);
        setRole("unknown");
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [axios, user.email]);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivetRoutes;
