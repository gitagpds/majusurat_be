import React from "react";

const UploadDokumen = ({ onChange }) => {
  return (
    <input type="file" name="dokumen_pendukung" onChange={onChange} className="input" />
  );
};

export default UploadDokumen;
