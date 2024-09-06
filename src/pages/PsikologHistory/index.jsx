import React from 'react'
import Layout from '../../Layouts';
import BoxHistory from '../../components/molecules/BoxHistory';

const PsikologHistory = () => {
  return (
    <Layout>
      <div
        className="min-h-screen px-[15px] pb-[200px] "
        style={{
          backgroundImage: "url(/ornaments/ornaments.png)",
          // backgroundSize: "cover",
        }}
      >
        <div className='flex flex-col gap-[20px] ' > 
          <BoxHistory />
          <BoxHistory active={false} />
        </div>
      </div>
    </Layout>
  );
}

export default PsikologHistory