import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const DashboardAdmin = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-extrabold text-blue-800 mb-8 text-center">
            Selamat Datang, Admin!
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="bg-blue-100 hover:bg-blue-200 transition-all rounded-xl p-6 shadow-inner">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                <Link to="/admin/pengajuan" className="hover:underline">
                  Kelola Pengajuan Surat
                </Link>
              </h3>
              <p className="text-gray-700 text-sm">
                Lihat dan proses semua pengajuan surat dari mahasiswa.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-green-100 hover:bg-green-200 transition-all rounded-xl p-6 shadow-inner">
              <h3 className="text-xl font-semibold text-green-900 mb-2">
                <Link to="/admin/log" className="hover:underline">
                  Log Aktivitas Admin
                </Link>
              </h3>
              <p className="text-gray-700 text-sm">
                Pantau riwayat tindakan admin dalam sistem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardAdmin;
