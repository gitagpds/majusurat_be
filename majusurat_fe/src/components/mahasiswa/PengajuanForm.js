import React, { useState } from "react";
import api from "../../utils/api";
import { getUserId } from "../../utils/auth";

const PengajuanForm = ({ onSuccess }) => {
  const id_user = getUserId();
  const [form, setForm] = useState({
    keperluan_surat: "",
    instansi_tujuan: "",
    tanggal_berangkat: "",
    tanggal_kembali: "",
    dokumen_pendukung: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id_user", id_user);
      formData.append("keperluan_surat", form.keperluan_surat);
      formData.append("instansi_tujuan", form.instansi_tujuan);
      formData.append("tanggal_berangkat", form.tanggal_berangkat);
      formData.append("tanggal_kembali", form.tanggal_kembali);
      if (form.dokumen_pendukung) {
        formData.append("dokumen_pendukung", form.dokumen_pendukung);
      }

      await api.post("/pengajuan-surat", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Pengajuan berhasil dikirim");
      onSuccess();
    } catch (err) {
      console.error("❌ ERROR:", err.response?.data || err.message);
      alert("Gagal mengirim pengajuan");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto space-y-5"
    >
      <input
        type="text"
        name="keperluan_surat"
        placeholder="Keperluan Surat"
        onChange={handleChange}
        className="input"
        required
      />
      <input
        type="text"
        name="instansi_tujuan"
        placeholder="Instansi Tujuan"
        onChange={handleChange}
        className="input"
        required
      />
      <input
        type="date"
        name="tanggal_berangkat"
        onChange={handleChange}
        className="input"
        required
      />
      <input
        type="date"
        name="tanggal_kembali"
        onChange={handleChange}
        className="input"
        required
      />
      <input
        type="file"
        name="dokumen_pendukung"
        onChange={handleChange}
        className="input"
      />
      <button type="submit" className="btn-primary w-full">
        Ajukan Surat
      </button>
    </form>
  );
};

export default PengajuanForm;
