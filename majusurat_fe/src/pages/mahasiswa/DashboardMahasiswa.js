import React from "react";
import Navbar from "../../components/Navbar";
import PengajuanForm from "../../components/mahasiswa/PengajuanForm";
import { useNavigate } from "react-router-dom";

const DashboardMahasiswa = () => {
  const navigate = useNavigate();

  const handleBerhasilAjukan = () => {
    navigate("/mahasiswa/pengajuan");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">
            Ajukan Surat Tugas Mahasiswa
          </h2>

          <PengajuanForm onSuccess={handleBerhasilAjukan} />
        </div>
      </main>
    </>
  );
};

export default DashboardMahasiswa;
