import { useEffect } from "react";
import { create } from "zustand";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";

// API URLs
const apiURL = "https://admin.aikenhealth.id/api/dear-diaries?populate=*";
const doctorURL = "https://admin.aikenhealth.id/api/physicotheraphies?populate=*";
const readingURL = "https://admin.aikenhealth.id/api/reading-corners?populate=*";
const questionURL = "https://admin.aikenhealth.id/api/form-questions?populate=*";
const moodURL = "https://admin.aikenhealth.id/api/moods?populate=*";
const usersURL = "https://admin.aikenhealth.id/api/users?populate=*";
const activityMoods =
  "https://admin.aikenhealth.id/api/activity-moods?populate=*";
const replyChatURL =
  "https://admin.aikenhealth.id/api/reply-chats?populate=*";

// Store for dear diaries
const useStore = create((set) => ({
  data: [],
  setData: (newData) => set({ data: newData }),
}));

// Custom hook to fetch dear diaries data
const useFetchData = () => {
  const authHeader = useAuthHeader();
  const setData = useStore((state) => state.setData);
  const data = useStore((state) => state.data);

  useEffect(() => {
    const fetchData = async () => {
      if (data.length === 0) {
        try {
          const res = await axios.get(apiURL, {
            headers: {
              Authorization: authHeader(),
            },
          });
          setData(res.data.data);
        } catch (error) {
          console.error("Error fetching dear diaries data:", error);
        }
      }
    };

    fetchData();
  }, [authHeader, setData, data]);
};

// Store for doctor data
const useStoreDoctor = create((set) => ({
  dataDoctor: [],
  setDataDoctor: (newData) => set({ dataDoctor: newData }),
}));

// Custom hook to fetch doctor data
const useFetchDataDoctor = () => {
  const authHeader = useAuthHeader();
  const setDataDoctor = useStoreDoctor((state) => state.setDataDoctor);
  const dataDoctor = useStoreDoctor((state) => state.dataDoctor);

  useEffect(() => {
    const fetchDataDoctor = async () => {
      if (dataDoctor.length === 0) {
        try {
          const res = await axios.get(doctorURL, {
            headers: {
              Authorization: authHeader(),
            },
          });
          setDataDoctor(res.data.data);
        } catch (error) {
          console.error("Error fetching doctor data:", error);
        }
      }
    };

    fetchDataDoctor();
  }, [authHeader, setDataDoctor, dataDoctor]);
};

// Store for reading corner data
const useStoreReading = create((set) => ({
  dataReading: [],
  setDataReading: (newData) => set({ dataReading: newData }),
}));

// Custom hook to fetch reading corner data
const useFetchDataReading = () => {
  const authHeader = useAuthHeader();
  const setDataReading = useStoreReading((state) => state.setDataReading);
  const dataReading = useStoreReading((state) => state.dataReading);

  useEffect(() => {
    const fetchDataReading = async () => {
      if (dataReading.length === 0) {
        try {
          const res = await axios.get(readingURL, {
            headers: {
              Authorization: authHeader(),
            },
          });
          setDataReading(res.data.data);
        } catch (error) {
          console.error("Error fetching reading corner data:", error);
        }
      }
    };

    fetchDataReading();
  }, [authHeader, setDataReading, dataReading]);
};

// Store for question data
const useStoreQuestion = create((set) => ({
  dataQuestion: [],
  setDataQuestion: (newData) => set({ dataQuestion: newData }),
}));

// Custom hook to fetch question data
const useFetchDataQuestion = () => {
  const authHeader = useAuthHeader();
  const setDataQuestion = useStoreQuestion((state) => state.setDataQuestion);
  const dataQuestion = useStoreQuestion((state) => state.dataQuestion);

  useEffect(() => {
    const fetchDataQuestion = async () => {
      if (dataQuestion.length === 0) {
        try {
          const res = await axios.get(questionURL, {
            headers: {
              Authorization: authHeader(),
            },
          });
          setDataQuestion(res.data.data);
        } catch (error) {
          console.error("Error fetching question data:", error);
        }
      }
    };

    fetchDataQuestion();
  }, [authHeader, setDataQuestion, dataQuestion]);
};

// Store for mood data
const useStoreMood = create((set) => ({
  dataMood: [],
  setDataMood: (newData) => set({ dataMood: newData }),
}));

// Custom hook to fetch mood data
const useFetchDataMood = () => {
  const authHeader = useAuthHeader();
  const setDataMood = useStoreMood((state) => state.setDataMood);
  const dataMood = useStoreMood((state) => state.dataMood);

  useEffect(() => {
    const fetchDataMood = async () => {
      if (dataMood.length === 0) {
        try {
          const res = await axios.get(moodURL, {
            headers: {
              Authorization: authHeader(),
            },
          });
          setDataMood(res.data.data);
        } catch (error) {
          console.error("Error fetching mood data:", error);
        }
      }
    };

    fetchDataMood();
  }, [authHeader, setDataMood, dataMood]);

  
};

// Store for mood data
const useStoreReplyChat = create((set) => ({
  dataReplyChat: [],
  setDataReplyChat: (newData) => set({ dataReplyChat: newData }),
}));

// Custom hook to fetch ReplyChat data
const useFetchDataReplyChat = () => {
  const authHeader = useAuthHeader();
  const setDataReplyChat = useStoreReplyChat((state) => state.setDataReplyChat);
  const dataReplyChat = useStoreReplyChat((state) => state.dataReplyChat);

  useEffect(() => {
    const fetchDataReplyChat = async () => {
      if (dataReplyChat.length === 0) {
        try {
          const res = await axios.get(replyChatURL, {
            headers: {
              Authorization: authHeader(),
            },
          });
          setDataReplyChat(res.data.data);
        } catch (error) {
          console.error("Error fetching ReplyChat data:", error);
        }
      }
    };

    fetchDataReplyChat();
  }, [authHeader, setDataReplyChat, dataReplyChat]);

  
};

const useStoreActivityMoods = create((set) => ({
  dataActivityMoods: [],
  setDataActivityMoods: (newData) => set({ dataActivityMoods: newData }),
}));

// Custom hook to fetch ActivityMoods data
const useFetchDataActivityMoods = () => {
  const authHeader = useAuthHeader();
  const setDataActivityMoods = useStoreActivityMoods((state) => state.setDataActivityMoods);
  const dataActivityMoods = useStoreActivityMoods((state) => state.dataActivityMoods);

  useEffect(() => {
    const fetchDataActivityMoods = async () => {
      if (dataActivityMoods.length === 0) {
        try {
          const res = await axios.get(activityMoods, {
            headers: {
              Authorization: authHeader(),
            },
          });
          setDataActivityMoods(res.data.data);
        } catch (error) {
          console.error("Error fetching ActivityMoods data:", error);
        }
      }
    };

    fetchDataActivityMoods();
  }, [authHeader, setDataActivityMoods, dataActivityMoods]);
};

const useStoreUsers = create((set) => ({
  dataUsers: [],
  setDataUsers: (newData) => set({ dataUsers: newData }),
}));

// Custom hook to fetch Users data
const useFetchDataUsers = () => {
  const authHeader = useAuthHeader();
  const setDataUsers = useStoreUsers(
    (state) => state.setDataUsers
  );
  const dataUsers = useStoreUsers(
    (state) => state.dataUsers
  );

  useEffect(() => {
    const fetchDataUsers = async () => {
      if (dataUsers.length === 0) {
        try {
          const res = await axios.get(usersURL, {
            headers: {
              Authorization: authHeader(),
            },
          });
          setDataUsers(res.data.data);
        } catch (error) {
          console.error("Error fetching Users data:", error);
        }
      }
    };

    fetchDataUsers();
  }, [authHeader, setDataUsers, dataUsers]);
};

export {
  useStore,
  useFetchData,
  useStoreDoctor,
  useFetchDataDoctor,
  useStoreReading,
  useFetchDataReading,
  useStoreQuestion,
  useFetchDataQuestion,
  useStoreMood,
  useFetchDataMood,
  useStoreReplyChat,
  useFetchDataReplyChat,
  useStoreActivityMoods,
  useFetchDataActivityMoods,
  useStoreUsers,
  useFetchDataUsers
};
