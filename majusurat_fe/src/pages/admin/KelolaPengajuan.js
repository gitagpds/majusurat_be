import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import Navbar from "../../components/Navbar";
import PengajuanList from "../../components/admin/PengajuanList";
import PengajuanDetail from "../../components/admin/PengajuanDetail";

const KelolaPengajuan = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchData = async () => {
    try {
      const res = await api.get("/pengajuan-surat");
      setData(res.data.data);
    } catch (err) {
      alert("Gagal mengambil data");
    }
  };

  const updateStatus = async (status, alasan = "") => {
    try {
      await api.put(`/pengajuan-surat/${selected.id_pengajuan}`, { status });
      await api.post("/log-pengajuan", {
        id_user: selected.id_user,
        id_pengajuan: selected.id_pengajuan,
        aksi_admin: status,
        alasan,
      });
      setSelected(null);
      fetchData();
    } catch (err) {
      alert("Gagal memperbarui status");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">
            Kelola Pengajuan Surat Mahasiswa
          </h2>

          <PengajuanList data={data} onSelect={setSelected} />

          {selected && (
            <div className="mt-8 border-t pt-6">
              <PengajuanDetail
                pengajuan={selected}
                onClose={() => setSelected(null)}
              />

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => updateStatus("disetujui")}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
                >
                  Setujui
                </button>
                <button
                  onClick={() => {
                    const alasan = prompt("Masukkan alasan penolakan:");
                    if (alasan) updateStatus("ditolak", alasan);
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                >
                  Tolak
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default KelolaPengajuan;
