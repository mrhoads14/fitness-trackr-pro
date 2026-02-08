import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { getActivity } from "../api/activities";
import { deleteActivity } from "../api/activities";


const ActivityInfo = () => {
  const { token } = useAuth();
  const { activityId } = useParams();
  const activityIdNum = Number(activityId);
  const [activity, setActivity] = useState({name: '', creatorName: '', description: ''});
  const [error, setError] = useState(null);

  const syncActivity = async (activityId) => {
    const activity = await getActivity(activityId);
    setActivity(activity);
  };

  const tryDelete = async () => {
    setError(null);
    try {
      await deleteActivity(token, activity.id);
      syncActivity();
    } catch (e) {
      setError(e.message);
    }
  };
  
  const navigate = useNavigate();
  const handleClick = async () => {
    await tryDelete();
    navigate("/activities");
  }
  
  useEffect(() => {
    syncActivity(activityIdNum);
  }, [])

  return (
    <>
      <h2>{activity.name}</h2>
      <h3>Creator: {activity.creatorName}</h3>
      <p>{activity.description}</p>
      {token && <button onClick={handleClick}>Delete</button>}
    </>
  )
}

export default ActivityInfo;
