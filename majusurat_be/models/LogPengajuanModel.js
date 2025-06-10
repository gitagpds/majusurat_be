import pgDb from "../config/postgresql.js";

export const getAllLogPengajuan = async () => {
  const result = await pgDb.query("SELECT * FROM log_pengajuan ORDER BY waktu_aksi DESC");
  return result.rows;
};

export const getLogPengajuanById = async (id) => {
  const result = await pgDb.query("SELECT * FROM log_pengajuan WHERE id_log = $1", [id]);
  return result.rows[0];
};

export const createLogPengajuan = async ({ id_pengajuan, id_user, aksi_admin, alasan }) => {
  const result = await pgDb.query(
    `INSERT INTO log_pengajuan (id_pengajuan, id_user, aksi_admin, alasan, waktu_aksi)
     VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
    [id_pengajuan, id_user, aksi_admin, alasan]
  );
  return result.rows[0];
};

export const deleteLogPengajuan = async (id) => {
  const result = await pgDb.query("DELETE FROM log_pengajuan WHERE id_log = $1 RETURNING *", [id]);
  return result.rows[0];
};
