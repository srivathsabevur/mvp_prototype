import { UploadOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const LogoUpload = ({ width = "w-full", height = "h-60" }) => {
  const [logo, setLogo] = useState(null);
  const [logoName, setLogoName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      setLogo(URL.createObjectURL(file));
      setLogoName(file.name);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removeLogo = () => {
    setLogo(null);
    setLogoName("");
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="w-full">
        <h3 className="text-lg font-semibold text-gray-900">Company Logo</h3>
        <p className="text-sm text-gray-500 mb-4">Upload your company logo</p>

        <div
          className={`relative border-2 border-dashed border-gray-300 rounded-md bg-white flex flex-col items-center justify-center text-center p-4 cursor-pointer transition-all ${width} ${height}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {logo ? (
            <>
              <img
                src={logo}
                alt="Uploaded logo"
                onClick={() => setIsModalOpen(true)}
                className="max-h-full max-w-full object-contain rounded-md cursor-zoom-in"
              />
              <p className="mt-2 text-sm text-gray-600">{logoName}</p>
              <button
                onClick={removeLogo}
                className="absolute top-2 right-2 text-sm text-red-500 hover:text-red-700 bg-white border border-red-300 px-2 py-0.5 rounded"
              >
                ✕
              </button>
            </>
          ) : (
            <>
              <UploadOutlined className="text-3xl text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Drop your logo here or</p>
              <label className="mt-2 inline-block bg-orange-100 text-[#FF9933] px-3 py-1.5 rounded-md text-sm font-medium cursor-pointer hover:bg-orange-200">
                Browse Files
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  hidden
                />
              </label>
            </>
          )}
        </div>
      </div>

      {/* Modal for preview */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg p-4 max-w-2xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Logo Preview
            </h2>
            <img
              src={logo}
              alt="Full preview"
              className="max-w-full max-h-[70vh] mx-auto object-contain rounded-md"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default LogoUpload;
