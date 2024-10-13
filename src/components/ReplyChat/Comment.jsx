import React, { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import { useFetchDataReplyChat, useStoreReplyChat } from "../../lib/store";
import { useTranslation } from "react-i18next";

const Comment = ({ onClick, written, id }) => {
  const [posting, setPosting] = useState(false);
  const [comment, setComment] = useState("");
  const { t } = useTranslation();
  const auth = useAuthUser();
  const authHeader = useAuthHeader();
  const { dataReplyChat } = useStoreReplyChat();
  const [translatedData, setTranslatedData] = useState([]);
  const language = localStorage.getItem("language");
  useFetchDataReplyChat();

  // Filter data reply berdasarkan dear_diary id
  
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
          source: "id", // Bahasa Indonesia
          target: language, // Bahasa Arab
        }),
      }
    );
    const result = await response.json();
    return result?.data?.translations?.translatedText;
  };

  useEffect(() => {
    const fetchTranslations = async () => {
      const filteredReplies = dataReplyChat?.filter(
          (item) => item.attributes.dear_diary.data.id === id
        );
      const translated = await Promise.all(
        filteredReplies.map(async (item) => {
         const translatedTitle = await translateText(item.attributes.reply);
         return {
           ...item,
           attributes: {
             ...item.attributes,
             content: translatedTitle, // Menyimpan terjemahan di sini
           },
         };
        })
      );
      setTranslatedData(translated);
    };

    if (dataReplyChat.length > 0) {
      fetchTranslations();
    }
  }, [dataReplyChat]);

  
  const handlePost = async (e) => {
    e.preventDefault();
    setPosting(true);

    const data = {
      reply: comment,
      users_permissions_user: auth()?.id,
      dear_diary: id,
    };

    try {
      const response = await fetch(
        "https://admin.aikenhealth.id/api/reply-chats",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader(),
          },
          body: JSON.stringify({ data }),
        }
      );

      if (response.ok) {
        console.log("Comment posted successfully");
        setComment("");
      } else {
        console.error("Failed to post comment");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setPosting(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url(/ornaments/ornaments.png)",
      }}
      className="max-sm:w-full fixed top-0 sm:right-0 duration-700 max-sm:right-0 sm:top-0 w-[30%] min-w-[350px] h-full z-50 bg-white shadow-2xl p-8 px-16 overflow-y-auto overflow-x-hidden pb-[200px]"
    >
      <div className="relative">
        <h1 className="text-xl font-medium">{t("comment")}</h1>
        <p className="text-lg mt-2 w-[70%] text-dark-grey">{written}</p>

        <div
          onClick={onClick}
          className="absolute top-0 right-0 flex justify-center items-center w-12 h-12 rounded-full bg-grey"
        >
          <button className="text-gray-400 hover:text-gray-600">
            <span className="text-xl">✖</span>
          </button>
        </div>
      </div>

      <form onSubmit={handlePost}>
        <textarea
          name="body"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={t("placeComment")}
          className="input-box my-2 placeholder:text-dark-grey resize-none h-[150px] overflow-auto focus:outline-none focus:ring-2 focus:ring-yellow-400"
        ></textarea>
        <button
          className={`${
            posting
              ? "bg-gradient-to-r from-yellow-500 to-orange-500"
              : "bg-gradient-to-r from-[#DEA841]  to-[#A34D39] shadow-md shadow-[#DEA841]"
          } text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300`}
          disabled={posting}
        >
          {posting ? `${t("posting")}...` : `${t("posting")}`}
        </button>
      </form>

      {/* Mapping replies yang telah difilter */}
      {translatedData?.map((item) => (
        <CommentCard
          key={item.id}
          name={item.attributes.users_permissions_user.data.attributes.username}
          date={item.attributes.publishedAt}
          content={item.attributes.content} // Ganti ini dengan content
        />
      ))}
    </div>
  );
};

export default Comment;
