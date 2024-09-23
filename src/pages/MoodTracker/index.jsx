import React from "react";
import BoxTracker from "../../components/MoodTrackerComponent/BoxTracker";
import Layout from "../../Layouts";
import BoxActivitie from "../../components/MoodTrackerComponent/BoxActivitie";
import ScatterChart from "../../components/Chart";
import {
  useFetchDataActivityMoods,
  useFetchDataMood,
  useStoreActivityMoods,
  useStoreMood,
} from "../../lib/store";
import { useAuthUser } from "react-auth-kit";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import SwiperCore from "swiper";
import { Navigation, Pagination } from "swiper/modules";
SwiperCore.use([Navigation, Pagination]);

const MoodTracker = () => {
  const { dataMood } = useStoreMood();
  const { dataActivityMoods } = useStoreActivityMoods();
  useFetchDataActivityMoods();
  const auth = useAuthUser();
  useFetchDataMood();
  const filteredData = dataMood.filter(
    (item) =>
      item.attributes.users_permissions_user.data.attributes.username ===
      auth()?.username
  );

  const today = new Date();

  // Filter moods where publishedAt is today's date
  const filteredDataMood = dataMood?.filter((item) => {
    const publishedDate = new Date(item.attributes.publishedAt);

    // Compare only the date part (ignoring time) for both today and publishedDate
    return (
      item.attributes.users_permissions_user.data.attributes.username ===
        auth()?.username &&
      publishedDate.toLocaleDateString() === today.toLocaleDateString()
    );
  });

  const allMood =
    dataActivityMoods &&
    dataActivityMoods
      .filter(
        (item) =>
          filteredDataMood.length > 0 &&
          item.attributes.mood === filteredDataMood[0].attributes.title
      )
      .map((item) => ({
        title: item.attributes.title,
        image: item.attributes.image.data.attributes.url,
      }));

  return (
    <Layout>
      <div
        style={{
          backgroundImage: "url(/ornaments/ornaments.png)",
        }}
        className="min-h-screen px-[15px] pb-[200px]  "
      >
        <div className="mb-[30px]">
          <h1 className="font-semibold text-[18px]">Mood Tracker</h1>
          <ScatterChart filteredData={filteredData} />
        </div>
        <img alt="text-mood" src="/ornaments/textMoodIcon.png" className="" />
        <h1 className="mt-[-22px] font-bold text-[18px]">
          Activities designed for you{" "}
          <span className="text-purple-600">
            {filteredDataMood && filteredDataMood.length > 0
              ? filteredDataMood[0].attributes.title
              : "No mood recorded"}
          </span>
        </h1>
        <p className="font-medium text-[#949494] text-[13px] ">
          Personalised for your self
        </p>
        <div className="flex mt-5 ">
          <Swiper spaceBetween={100} slidesPerView={2} pagination={false}>
            {allMood && allMood.length > 0 ? (
              allMood.map((item, index) => (
                <SwiperSlide key={index}>
                  <BoxActivitie
                    title={item.title}
                    image={`https://admin.aikenhealth.id${item.image}`}
                  />
                </SwiperSlide>
              ))
            ) : (
              <p className="text-black font-semibold">Data not found</p>
            )}
          </Swiper>
        </div>
      </div>
    </Layout>
  );
};

export default MoodTracker;
