import React from "react";

const PengajuanStatusBadge = ({ status }) => {
  const colorClasses = {
    proses: "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-300",
    ditolak: "bg-red-100 text-red-700 ring-1 ring-red-300",
    disetujui: "bg-green-100 text-green-700 ring-1 ring-green-300",
  };

  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-semibold capitalize rounded-full ${
        colorClasses[status] || "bg-gray-100 text-gray-700 ring-1 ring-gray-300"
      }`}
    >
      {status || "tidak diketahui"}
    </span>
  );
};

export default PengajuanStatusBadge;
