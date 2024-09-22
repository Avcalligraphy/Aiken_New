import React from "react";

const Term = ({ onAccept }) => {
  return (
    <div
      className="min-h-screen px-[15px] pb-[200px] "
      style={{
        backgroundImage: "url(/ornaments/ornaments.png)",
      }}
    >
      <div className="container mx-auto px-4 py-10">
        <div className="rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Terms and Conditions for Aiken
          </h1>
          <p className="text-gray-700 mb-4">
            Welcome to Aiken. By registering and using this application, you
            agree to the following terms and conditions. Please read them
            carefully before proceeding with registration or using any features
            of the app.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            1. Data Privacy and Usage
          </h2>
          <p className="text-gray-700 mb-4">
            By registering and submitting your personal data on Aiken, you agree
            that the information provided will be accessed and reviewed by our
            team of certified psychologists. This is done solely for the purpose
            of offering better mental health support and personalized services.
            Your data will be handled in accordance with our Privacy Policy, and
            we take all necessary measures to protect your personal information.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            2. AR Scan Feature
          </h2>
          <p className="text-gray-700 mb-4">
            The AR Scan feature is available only on pages that contain full
            images, as specified in the app. This feature is designed to enhance
            your experience through augmented reality, but it is not available
            on all pages within the app. Ensure that you are on a full-image
            page to access this feature.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            3. Changes to the Terms
          </h2>
          <p className="text-gray-700 mb-4">
            We reserve the right to modify these Terms and Conditions at any
            time. Any changes will be communicated to users through app
            notifications or updates, and continued use of the application
            implies acceptance of the updated terms.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            4. Limitation of Liability
          </h2>
          <p className="text-gray-700 mb-4">
            While we strive to offer reliable services, Aiken and its team of
            psychologists are not liable for any issues arising from the misuse
            of the app or any unforeseen circumstances. The application is
            intended to be a supportive tool and does not replace professional
            face-to-face counseling where necessary.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            5. Contact Us
          </h2>
          <p className="text-gray-700 mb-4">
            If you have any questions regarding these Terms and Conditions,
            please contact us at aikenbook.id@gmail.com.
          </p>

          <button
            onClick={onAccept} // Call onAccept when button is clicked
            className="py-[11px] w-[171px] rounded-[18px] bg-gradient-to-r from-[#DEA841] to-[#A34D39] shadow-md shadow-[#DEA841] text-white font-semibold text-[16px]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default Term;
