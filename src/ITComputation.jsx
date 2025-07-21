import React, { useEffect, useState } from "react";
import Notifications from "./Notifications";
import axios from "axios";

const ITComputation = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const username = localStorage.getItem("username"); // ✅ get saved email
      if (!username) return;

      try {
        const res = await axios.get("https://fbts.flamingohrms.com/api/method/fbts.api.flamingoApi.get_notifications", {
          params: { to_user: username },
        });
        setNotifications(res.data.message || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="p-8 text-xl">
      <h2 className="mb-4 font-semibold">IT Computation Page</h2>
      <Notifications notifications={notifications} />
    </div>
  );
};

export default ITComputation;
