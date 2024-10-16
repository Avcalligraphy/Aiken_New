import React, { useEffect, useRef, useState } from "react";
import Layout from "../../Layouts";
import InputMood from "../../components/molecules/InputMood";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import SwiperCore from "swiper";
import MoodList from "../../lib/MoodList";
import { Navigation, Pagination } from "swiper/modules";
import FormAsses from "../../components/MoodAssesmentComponent/FormAsses";
import Input from "../../components/molecules/Input";
import Button from "../../components/molecules/Button";
import { useFetchDataQuestion, useStoreQuestion } from "../../lib/store";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";

SwiperCore.use([Navigation, Pagination]);

const MoodAssesment = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { data } = location.state || {}; // Data from state for editing

  const [selectedMood, setSelectedMood] = useState(
    data?.attributes?.title || "angry"
  );
  const [activeBranches, setActiveBranches] = useState(
    data?.attributes?.branchFeeling
      ? JSON.parse(data.attributes.branchFeeling)
      : {}
  );
  const [range, setRange] = useState(data?.attributes?.range || "50");
  const [note, setNote] = useState(data?.attributes?.note || "");
  const [formAnswers, setFormAnswers] = useState(
    data?.attributes?.question ? JSON.parse(data.attributes.question) : {}
  );
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [audioUrl, setAudioUrl] = useState(
    `https://admin.aikenhealth.id${data?.attributes?.voice?.data[0]?.attributes?.url}` ||
      ""
  ); // Set initial audio from existing data
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null); // To store the photo preview URL

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { dataQuestion } = useStoreQuestion();
  const navigate = useNavigate();
  const auth = useAuthUser();
  const authHeader = useAuthHeader();
  const chunks = useRef([]);
  const mediaRecorderRef = useRef(null); // Replaced with useRef
  useFetchDataQuestion();
  const [translatedData, setTranslatedData] = useState([]);
  const language = localStorage.getItem("language") || "en";

  useEffect(() => {
    // Load existing photo if available
    if (data?.attributes?.photo?.data?.attributes?.url) {
      setPhotoPreview(
        `https://admin.aikenhealth.id${data.attributes.photo.data.attributes.url}`
      );
    }
    if (data?.attributes?.voice?.data[0]?.attributes?.url) {
      setAudioUrl(
        `https://admin.aikenhealth.id${data?.attributes?.voice?.data[0]?.attributes?.url}`
      );
    }
  }, [data]);
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file); // Save the new photo file
      setPhotoPreview(URL.createObjectURL(file)); // Set new photo preview
    }
  };

  const handleSlideChange = (swiper) => {
    const activeMood = MoodList[swiper.activeIndex].name;
    setSelectedMood(activeMood);
  };

  const toggleBranchActive = (branch) => {
    setActiveBranches((prevState) => ({
      ...prevState,
      [branch]: !prevState[branch],
    }));
  };

  const handleInputChange = (key, value) => {
    setFormAnswers((prevAnswers) => ({
      ...prevAnswers,
      [key]: value,
    }));
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder; // Store in ref
      mediaRecorder.start();
      setIsRecording(true);

      mediaRecorder.ondataavailable = (e) => {
        chunks.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/wav" });
        setRecordedAudio(blob);
        const audioURL = window.URL.createObjectURL(blob);
        setAudioUrl(audioURL);
        chunks.current = [];
      };
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop(); // Stop the media recorder
      setIsRecording(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photo) {
      toast.error("Photo is required.");
      return;
    }

    if (!recordedAudio) {
      toast.error("Audio recording is required.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      if (recordedAudio) {
        formData.append("files", recordedAudio, "recorded-audio.wav");
      }
      if (photo) {
        formData.append("files", photo);
      }

      const uploadResponse = await axios.post(
        "https://admin.aikenhealth.id/api/upload",
        formData,
        {
          headers: {
            Authorization: authHeader(),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const fileIds = uploadResponse.data.map((file) => file.id);

      const moodData = {
        data: {
          title: selectedMood,
          branchFeeling: JSON.stringify(activeBranches),
          range: range,
          users_permissions_user: auth()?.id,
          note: note,
          question: JSON.stringify(formAnswers),
          voice: fileIds.length > 0 ? fileIds[0] : null,
          photo: fileIds.length > 1 ? fileIds[1] : null,
        },
      };

      let response;
      if (data?.id) {
        response = await axios.put(
          `https://admin.aikenhealth.id/api/moods/${data.id}`,
          moodData,
          {
            headers: {
              Authorization: authHeader(),
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        response = await axios.post(
          "https://admin.aikenhealth.id/api/moods",
          moodData,
          {
            headers: {
              Authorization: authHeader(),
              "Content-Type": "application/json",
            },
          }
        );
      }

      if (response.status === 200) {
        navigate("/");
      } else {
        console.error("Error submitting data:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectedMoodObject = MoodList.find(
    (item) => item.name === selectedMood
  );
  const questionMood = dataQuestion.filter(
    (item) => item.attributes.mood === selectedMood
  );

  // Fungsi untuk menerjemahkan teks
  const translateText = async (text) => {
    const response = await fetch(
      "https://deep-translate1.p.rapidapi.com/language/translate/v2",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-host": "deep-translate1.p.rapidapi.com",
          "x-rapidapi-key":
            "8275405090msh11c4edaf317ebc4p15fe72jsn2c42e223b715",
        },
        body: JSON.stringify({
          q: text,
          source: "id", // Asumsikan teks asli dalam bahasa Indonesia
          target: language, // Terjemahkan ke bahasa dari localStorage
        }),
      }
    );
    const result = await response.json();
    return result?.data?.translations?.translatedText;
  };

  useEffect(() => {
    const fetchTranslations = async () => {
      const translated = await Promise.all(
        questionMood.map(async (item) => {
          const translatedTitle = await translateText(item.attributes.question);
          return {
            ...item,
            question: translatedTitle, // Simpan hasil terjemahan langsung di title
          };
        })
      );
      setTranslatedData(translated);
    };

    if (questionMood.length > 0 && questionMood.length > 0) {
      fetchTranslations();
    }
  }, [questionMood]); // Tambahkan allMood sebagai dependensi

  return (
    <Layout>
      <Toaster position="top-center" reverseOrder={false} />
      <div
        className="min-h-screen"
        style={{ backgroundImage: "url(/ornaments/ornaments.png)" }}
      >
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={handleSlideChange}
          pagination={false}
        >
          {MoodList.map((item) => (
            <SwiperSlide key={item.name}>
              <div className="flex flex-col items-center">
                <img
                  src={`/icons/${item.name}.png`}
                  alt={item.name}
                  className="w-[180px] h-auto"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-center mt-[10px]">
          <h1 className="text-[32px] font-bold leading-[28px] text-center max-w-[259px]">
            {t("question.what_makes_you_feel")} {t(`emotions.${selectedMood}`)}?
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-[20px] mt-[22px] px-[15px]">
          {selectedMoodObject &&
            selectedMoodObject.branch.map((branch) => (
              <InputMood
                key={branch}
                title={t(
                  `moodList.${
                    selectedMoodObject.name
                  }.branches.${selectedMoodObject.branch.indexOf(branch)}`
                )}
                active={!!activeBranches[branch]}
                onClick={() => toggleBranchActive(branch)}
              />
            ))}
        </div>

        <div className="mt-[40px] px-[15px] pb-[200px]">
          <img alt="text-mood" src="/ornaments/textMoodIcon.png" />
          <h1 className="mt-[-22px] font-bold text-[20px]">{t("moodAsses")}</h1>
          <p className="font-medium text-[#949494] text-[14px]">
            {t("desclabelMoodRecorder")}
          </p>

          <div className="mt-[18px] gap-[30px] flex flex-col">
            <div className="bg-[#DCEDF9] border-[#9BADBA] rounded-[30px] border-[1px] w-full p-[20px]">
              <h1 className="font-semibold text-[20px] leading-[20px] mb-[10px]">
                {t("question.how_often_feel")} {t(`emotions.${selectedMood}`)}
              </h1>
              <input
                id="rangeInput"
                type="range"
                min="0"
                max="100"
                value={range}
                onChange={(e) => setRange(e.target.value)}
                className="w-full h-2 bg-[#ffff] rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border-[1px] border-gray-300"
              />
              <div className="flex justify-between text-[16px] text-black font-semibold mt-1">
                <span>0</span>
                <span>{range}</span>
              </div>
            </div>

            {[
              `${t("question.what_makes_you_feel")}  ${t(
                `emotions.${selectedMood}`
              )}  `,
              `${t("question.how_often_feel")}  ${t(
                `emotions.${selectedMood}`
              )}  `,
            ].map((question, index) => (
              <FormAsses
                key={index}
                title={question}
                active={index % 2 === 0}
                onInputChange={(value) => handleInputChange(question, value)}
                value={formAnswers[question] || ""}
              />
            ))}

            {translatedData?.map((item, index) =>
              item?.question ? (
                <FormAsses
                  key={item.id || index}
                  title={item.question}
                  active={index % 2 === 0}
                  onInputChange={(value) =>
                    handleInputChange(item.question, value)
                  }
                  value={formAnswers[item.question] || ""}
                />
              ) : null
            )}

            <Input
              title={t("short_note")}
              icon="notepad"
              placeholder={t("add_note_placeholder")}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <Input
              title={t("photo")}
              icon="camera"
              type="file"
              onChange={handlePhotoChange}
            />
            {photoPreview && <img src={photoPreview} alt="Photo Preview" />}

            <div className="flex flex-col gap-[10px]">
              <div className="flex flex-row gap-[14px] items-center">
                <i
                  className={`bx bxs-microphone text-[20px] text-[#240F41]`}
                ></i>
                <h1 className=" text-[#240F41] font-bold text-[16px]">
                  {t("record_audio")}
                </h1>
              </div>
              <div className="bg-gradient-to-b from-[#240F41] to-[#7A54B7] p-[1px] rounded-[24px] w-full h-fit shadow-md shadow-[#7A54B7]">
                <div className="h-fit bg-white rounded-[24px] px-[23px] py-[14px] flex flex-col items-end ">
                  {!isRecording && (
                    <i
                      onClick={startRecording}
                      className="bx bxs-microphone text-[20px] text-black"
                    ></i>
                  )}
                  {isRecording && (
                    <i
                      onClick={stopRecording}
                      className="bx bxs-microphone-off text-[20px] text-red-500"
                    ></i>
                  )}

                  {audioUrl && !isRecording && (
                    <div className="w-full flex flex-col items-end gap-[10px]">
                      <h2 className="text-[14px] text-black font-semibold">
                        {t("old_recording")}
                      </h2>
                      <audio controls>
                        <source src={audioUrl} type="audio/wav" />
                        Browser Anda tidak mendukung elemen audio.
                      </audio>
                    </div>
                  )}

                  {recordedAudio && !isRecording && (
                    <div className="w-full flex flex-col items-end gap-[10px]">
                      <h2 className="text-[14px] text-black font-semibold">
                        {t("new_recording")}
                      </h2>
                      <audio controls>
                        <source
                          src={URL.createObjectURL(recordedAudio)}
                          type="audio/wav"
                        />
                        Browser Anda tidak mendukung elemen audio.
                      </audio>
                      <i
                        onClick={() => {
                          setAudioUrl("");
                          setRecordedAudio(null);
                        }}
                        className="bx bxs-trash text-[20px] text-red-500"
                      ></i>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Button
              title={
                loading
                  ? t("loading")
                  : data?.id
                  ? t("update_data")
                  : t("save_data")
              }
              width="w-[171px]"
              onClick={handleSubmit}
              disabled={loading}
            />
            <p>{errorMessage}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MoodAssesment;
