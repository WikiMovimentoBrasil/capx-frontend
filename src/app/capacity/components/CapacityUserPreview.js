import { useEffect, useState } from "react";

export default function CapacityUserPreview({ userId, fetchUserData }) {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetchUserData(userId, setUserData);
  }, []);
}