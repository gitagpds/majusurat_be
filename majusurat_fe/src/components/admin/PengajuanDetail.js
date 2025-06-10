import React from "react";
import { formatDate } from "../../utils/dateFormatter";
import PengajuanStatusBadge from "../mahasiswa/PengajuanStatusBadge";

const PengajuanDetail = ({ pengajuan, onClose }) => {
  if (!pengajuan) return null;

  return (
    <div className="bg-white shadow-md p-6 rounded-lg mt-4 space-y-3">
      <h2 className="text-lg font-semibold text-gray-800">Detail Pengajuan Mahasiswa</h2>
      <div>
        <p><span className="font-medium">Nama Mahasiswa:</span> {pengajuan.user?.name || "-"}</p>
        <p><span className="font-medium">Email:</span> {pengajuan.user?.email || "-"}</p>
        <p><span className="font-medium">Keperluan:</span> {pengajuan.keperluan_surat}</p>
        <p><span className="font-medium">Instansi Tujuan:</span> {pengajuan.instansi_tujuan}</p>
        <p><span className="font-medium">Tanggal:</span> {formatDate(pengajuan.tanggal_berangkat)} – {formatDate(pengajuan.tanggal_kembali)}</p>
        <p><span className="font-medium">Status:</span> <PengajuanStatusBadge status={pengajuan.status} /></p>
        {pengajuan.dokumen_pendukung && (
          <p>
            <a
              href={pengajuan.dokumen_pendukung}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              Lihat Dokumen Pendukung
            </a>
          </p>
        )}
      </div>
      <button onClick={onClose} className="btn-primary text-sm px-4 py-2">Tutup</button>
    </div>
  );
};

export default PengajuanDetail;
