import React, { useEffect } from "react";
import { database } from "../services/allApis";

function Database() {
  useEffect(() => {
    getDatabase();
  }, []);

  // Function to get all database data
  const getDatabase = async () => {
    const res = await database();
  };

  return <></>;
}

export default Database;
