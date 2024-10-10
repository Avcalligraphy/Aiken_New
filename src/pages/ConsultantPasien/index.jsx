import React, { useState } from 'react'
import Layout from '../../Layouts';
import BoxHistory from '../../components/molecules/BoxHistory';
import { NavLink, useLocation } from 'react-router-dom';
import BoxDiaryPasien from '../../components/Doctor/BoxDiaryPasien';
import { useFetchDataConsultant, useStoreConsultant } from '../../lib/store';

const ConsultantPasien = () => {
    const [show, setShow] = useState(false)
    const [selected, setSelected] = useState([])
    const location = useLocation();
    const { dataUser, namePasien } = location.state || {};
    const { data } = useStoreConsultant();
    useFetchDataConsultant();
    console.log(data)
    console.log(namePasien);
    const filteredData = data.filter(
      (item) =>
        item.attributes.users_permissions_user.data.attributes.username ===
        namePasien
    );

  return (
    <>
      {show ? (
        <BoxDiaryPasien onCLick={() => setShow(false)} dataUser={dataUser} selected={selected} />
      ) : (
        <Layout title="Public Diary">
          <div
            className="min-h-screen px-[15px] "
            style={{
              backgroundImage: "url(/ornaments/ornaments.png)",
              // backgroundSize: "cover",
            }}
          >
            <div className="flex flex-row justify-between items-center mb-[12px] ">
              <div>
                <img
                  alt="text-mood"
                  src="/ornaments/textMoodIcon.png"
                  className="mt-[35px]"
                />
                <h1 className=" mt-[-22px] font-bold text-[18px] ">
                  Pasien Consultation
                </h1>
              </div>
              <button
                onClick={() => setShow(true)}
                className={`py-[6px] w-[98px] rounded-[18px] bg-gradient-to-r from-[#DEA841]  to-[#A34D39] shadow-md shadow-[#DEA841] text-white font-semibold text-[12px] mt-[12px] `}
              >
                Add Note
              </button>
            </div>
            <div className="flex flex-col gap-[20px]">
              {filteredData && filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <BoxHistory
                    id={item.id}
                    onClick={() => {setSelected(item); setShow(true)}}
                    desc={item.attributes.desc}
                    date={item.attributes.publishedAt}
                    name={
                      item.attributes.users_permissions_user.data.attributes
                        .username
                    }
                  />
                ))
              ) : (
                <p>No entries found for the specified username.</p>
              )}
            </div>
          </div>
        </Layout>
      )}
    </>
  );
}

export default ConsultantPasien