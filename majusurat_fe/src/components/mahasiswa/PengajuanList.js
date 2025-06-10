import React from "react";
import { formatDate } from "../../utils/dateFormatter";
import PengajuanStatusBadge from "./PengajuanStatusBadge";

const PengajuanList = ({ data, onSelect }) => {
  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div
          key={item.id_pengajuan}
          className="p-4 bg-white rounded-lg shadow-card flex justify-between items-center"
        >
          <div>
            <h4 className="text-md font-semibold text-gray-800">
              {item.keperluan_surat}
            </h4>
            <p className="text-sm text-gray-500">
              {formatDate(item.tanggal_berangkat)} – {formatDate(item.tanggal_kembali)}
            </p>
            <PengajuanStatusBadge status={item.status} />
          </div>
          <button
            onClick={() => onSelect(item)}
            className="text-sm text-blue-600 hover:underline"
          >
            Lihat Detail
          </button>
        </div>
      ))}
    </div>
  );
};

export default PengajuanList;
