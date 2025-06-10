import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import Navbar from "../../components/Navbar";
import PengajuanList from "../../components/mahasiswa/PengajuanList";
import PengajuanDetail from "../../components/mahasiswa/PengajuanDetail";

const PengajuanSaya = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchData = async () => {
    try {
      const res = await api.get("/pengajuan-surat");
      setData(res.data.data.filter((item) => item.user?.role === "mahasiswa"));
    } catch (err) {
      console.error(err);
      alert("Gagal mengambil data pengajuan");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">
            Riwayat Pengajuan Surat Tugas
          </h2>

          <div className="space-y-6">
            <PengajuanList data={data} onSelect={setSelected} />
            {selected && (
              <PengajuanDetail
                pengajuan={selected}
                onClose={() => setSelected(null)}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default PengajuanSaya;
