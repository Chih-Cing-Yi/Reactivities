import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";

function App() {
  const [activities, setActivities] = useState<IActivity[]>([]);
  //檢視活動的值
  const [selectedActivity, setSelectedActivity] = useState<IActivity | undefined>(undefined);
  //編輯模式
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<IActivity[]>("http://localhost:5000/api/activities").then((response) => {
      setActivities(response.data);
    });
  }, []);

  //檢視活動明細
  function handeSelectedActivity(id: string) {
    setSelectedActivity(activities.find((x) => x.id === id));
  }

  function handeCancelSelectActivity() {
    setSelectedActivity(undefined);
  }
  //處理Form開啟
  function handleFormOpen(id?: string) {
    id ? handeSelectedActivity(id) : handeCancelSelectActivity();
    setEditMode(true);
  }
  //處理Form關閉
  function handleFormClose() {
    setEditMode(false);
  }
  //處理新增與修改
  function handleCreateOrEditActivity(activity: IActivity) {
    activity.id
      ? setActivities([...activities.filter((x) => x.id !== activity.id), activity])
      : setActivities([...activities, { ...activity, id: uuid() }]);
    setEditMode(false);
    setSelectedActivity(activity);
  }
  //刪除
  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter((x) => x.id !== id)]);
  }

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handeSelectedActivity}
          cancelSelectActivity={handeCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          creatOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
