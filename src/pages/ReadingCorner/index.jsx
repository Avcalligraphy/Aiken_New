import React, { useEffect, useState } from "react";
import Layout from "../../Layouts";
import { useLocation } from "react-router-dom";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { useTranslation } from "react-i18next";

const ReadingPage = () => {
  const location = useLocation();
  const { reading } = location.state || {}; // Ambil data reading dari state
  const [translatedTitle, setTranslatedTitle] = useState(null); // State untuk judul yang diterjemahkan
  const [translatedContent, setTranslatedContent] = useState(null); // State untuk konten terjemahan
  const language = localStorage.getItem("language") || "en"; // Ambil bahasa dari localStorage, default 'ar'
  const {t} = useTranslation()
  // Fungsi untuk mentranslate teks
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

  // Fungsi untuk menavigasi data dan menemukan bagian 'text' yang ingin diterjemahkan
  const translateBlocks = async (blocks) => {
    return Promise.all(
      blocks.map(async (block) => {
        if (block.type === "text") {
          // Jika block adalah text, terjemahkan teksnya
          const translatedText = await translateText(block.text);
          return {
            ...block,
            text: translatedText, // Ganti teks asli dengan teks yang sudah diterjemahkan
          };
        } else if (block.children) {
          // Jika block memiliki children, lakukan rekursi untuk mentranslate children
          const translatedChildren = await translateBlocks(block.children);
          return {
            ...block,
            children: translatedChildren,
          };
        }
        return block; // Kembalikan block asli jika tidak ada yang diterjemahkan
      })
    );
  };

  useEffect(() => {
    const fetchTranslations = async () => {
      if (reading?.attributes?.title) {
        // Terjemahkan judul
        const translatedTitle = await translateText(reading?.attributes?.title);
        setTranslatedTitle(translatedTitle); // Simpan judul yang sudah diterjemahkan
      }

      if (reading?.attributes?.desc) {
        // Terjemahkan konten
        const translated = await translateBlocks(reading.attributes.desc); // Terjemahkan konten
        setTranslatedContent(translated); // Simpan konten yang sudah diterjemahkan
      }
    };

    fetchTranslations();
  }, [reading, language]); // Rerun jika `reading` atau `language` berubah

  return (
    <Layout title="Reading Corner">
      <div
        className="px-[15px] min-h-screen flex flex-col "
        style={{
          backgroundImage: "url(/ornaments/ornaments.png)",
        }}
      >
        <h1 className="bg-gradient-to-r from-[#240F41]  to-[#7A54B7] inline-block text-transparent bg-clip-text font-bold text-[24px] mb-[15px] ">
          {reading?.attributes?.title || `${t("loading")}`}{" "}
          {/* Tampilkan judul yang diterjemahkan atau "Loading..." */}
        </h1>
        <div className="flex flex-row gap-[6px] items-center  mb-[20px]">
          <img
            src="/images/profile.jpg"
            className=" w-[29px] h-[29px] bg-cover rounded-full "
          />
          <div className="flex flex-col">
            <h1 className=" font-semibold text-[10px] ">
              {reading.attributes.writter}
            </h1>
            <p className=" text-[#757575] text-[8px] font-semibold ">
              {reading.attributes.publishedAt}
            </p>
          </div>
        </div>
        <img
          src={
            `https://admin.aikenhealth.id` +
            reading.attributes.photo.data.attributes.url
          }
          className="w-full h-[209px] bg-cover rounded-[20px] "
        />
        <div>
          <div className=" font-medium text-[14px] mt-[17px] mb-[200px] text-justify prose ">
            {translatedContent ? (
              <BlocksRenderer content={translatedContent} /> // Render konten yang sudah diterjemahkan
            ) : (
              <p> {t("loading")} </p> // Tampilkan loading jika konten belum diterjemahkan
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReadingPage;
