import React from "react";
import { formatDate } from "../../utils/dateFormatter";
import PengajuanStatusBadge from "../mahasiswa/PengajuanStatusBadge";

const PengajuanList = ({ data, onSelect }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow-md">
        <thead className="bg-gray-100 text-left text-sm text-gray-600">
          <tr>
            <th className="px-4 py-2">Nama</th>
            <th className="px-4 py-2">Keperluan</th>
            <th className="px-4 py-2">Tanggal</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {data.map((item) => (
            <tr key={item.id_pengajuan} className="border-t">
              <td className="px-4 py-2">{item.user?.name || "-"}</td>
              <td className="px-4 py-2">{item.keperluan_surat}</td>
              <td className="px-4 py-2">
                {formatDate(item.tanggal_berangkat)} - {formatDate(item.tanggal_kembali)}
              </td>
              <td className="px-4 py-2">
                <PengajuanStatusBadge status={item.status} />
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => onSelect(item)}
                  className="text-blue-600 hover:underline"
                >
                  Detail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PengajuanList;
