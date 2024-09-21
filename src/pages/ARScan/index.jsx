import React from 'react'
import Layout from "../../Layouts";

const ARScan = () => {
  return (
    <Layout>
      <iframe
        src="https://lastalgiaapps.netlify.app/" // Ganti dengan URL web yang ingin Anda tampilkan
        width="100%" // Lebar iframe
        height="600px" // Tinggi iframe
        style={{ border: "none" }} // Menghilangkan border default
        title="Embedded Web Page" // Title untuk aksesibilitas
      />
    </Layout>
  );
}

export default ARScan