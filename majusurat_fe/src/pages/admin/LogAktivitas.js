import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import Navbar from "../../components/Navbar";

const LogAktivitas = () => {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    try {
      const res = await api.get("/log-pengajuan");
      setLogs(res.data.data);
    } catch (err) {
      alert("Gagal mengambil log");
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">Log Aktivitas Admin</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700 border border-gray-200">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-3 border">Tanggal</th>
                  <th className="p-3 border">Admin</th>
                  <th className="p-3 border">Aksi</th>
                  <th className="p-3 border">Keperluan</th>
                  <th className="p-3 border">Alasan</th>
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center p-4 text-gray-400">
                      Belum ada log aktivitas.
                    </td>
                  </tr>
                ) : (
                  logs.map((log, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}
                    >
                      <td className="p-3 border">
                        {new Date(log.waktu_aksi).toLocaleString("id-ID")}
                      </td>
                      <td className="p-3 border">{log.user?.name}</td>
                      <td className="p-3 border font-semibold capitalize text-blue-600">
                        {log.aksi_admin}
                      </td>
                      <td className="p-3 border">{log.pengajuan?.keperluan_surat}</td>
                      <td className="p-3 border text-gray-600">
                        {log.alasan || "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
};

export default LogAktivitas;
