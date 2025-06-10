import pgDb from "../config/postgresql.js";

export const getAllPengajuan = async () => {
  const result = await pgDb.query("SELECT * FROM pengajuan_surat ORDER BY \"createdAt\" DESC");
  return result.rows;
};

export const getPengajuanById = async (id) => {
  const result = await pgDb.query("SELECT * FROM pengajuan_surat WHERE id_pengajuan = $1", [id]);
  return result.rows[0];
};

export const createPengajuan = async (data) => {
  const {
    id_user,
    keperluan_surat,
    instansi_tujuan,
    tanggal_berangkat,
    tanggal_kembali,
    dokumen_pendukung,
  } = data;

  const result = await pgDb.query(
    `INSERT INTO pengajuan_surat
     (id_user, keperluan_surat, instansi_tujuan, tanggal_berangkat, tanggal_kembali, dokumen_pendukung, status, "createdAt", "updatedAt")
     VALUES ($1, $2, $3, $4, $5, $6, 'proses', NOW(), NOW())
     RETURNING *`,
    [id_user, keperluan_surat, instansi_tujuan, tanggal_berangkat, tanggal_kembali, dokumen_pendukung]
  );

  return result.rows[0];
};
