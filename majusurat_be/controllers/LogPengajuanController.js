import * as LogPengajuanModel from "../models/LogPengajuanModel.js";
import User from "../models/UserModel.js";
import { getPengajuanById } from "../models/PengajuanSuratModel.js";

export const getLogPengajuans = async (req, res) => {
  try {
    const logs = await LogPengajuanModel.getAllLogPengajuan();

    const mergedLogs = await Promise.all(
      logs.map(async (log) => {
        const user = await User.findByPk(log.id_user);
        const pengajuan = await getPengajuanById(log.id_pengajuan);
        return {
          ...log,
          user: user ? { id: user.id_user, name: user.name, email: user.email } : null,
          pengajuan: pengajuan ? {
            id: pengajuan.id_pengajuan,
            keperluan_surat: pengajuan.keperluan_surat,
            status: pengajuan.status
          } : null
        };
      })
    );

    res.status(200).json({ status: "Success", data: mergedLogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Error", message: error.message });
  }
};

export const getLogPengajuanById = async (req, res) => {
  try {
    const log = await LogPengajuanModel.getLogPengajuanById(req.params.id);
    if (!log) return res.status(404).json({ message: "Log tidak ditemukan" });

    const user = await User.findByPk(log.id_user);
    const pengajuan = await getPengajuanById(log.id_pengajuan);

    res.status(200).json({
      ...log,
      user: user ? { id: user.id_user, name: user.name, email: user.email } : null,
      pengajuan: pengajuan ? {
        id: pengajuan.id_pengajuan,
        keperluan_surat: pengajuan.keperluan_surat,
        status: pengajuan.status
      } : null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const createLogPengajuan = async (req, res) => {
  try {
    const { id_pengajuan, id_user, aksi_admin, alasan } = req.body;

    if (!id_pengajuan || !id_user || !aksi_admin) {
      return res.status(400).json({ message: "Field wajib tidak boleh kosong" });
    }

    const newLog = await LogPengajuanModel.createLogPengajuan({
      id_pengajuan,
      id_user,
      aksi_admin,
      alasan
    });

    res.status(201).json({ status: "Success", message: "Log dibuat", data: newLog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteLogPengajuan = async (req, res) => {
  try {
    const deleted = await LogPengajuanModel.deleteLogPengajuan(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Log tidak ditemukan" });

    res.status(200).json({ status: "Success", message: "Log berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
