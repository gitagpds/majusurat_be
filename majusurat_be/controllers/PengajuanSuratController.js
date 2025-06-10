import * as PengajuanSurat from "../models/PengajuanSuratModel.js";
import User from "../models/UserModel.js";

// GET ALL PENGAJUAN SURAT
async function getPengajuanSurat(req, res) {
  try {
    const pengajuan = await PengajuanSurat.findAll({
      include: [{ model: User, attributes: ["id_user", "name", "email"] }],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      status: "Success",
      message: "Pengajuan Surat Retrieved",
      data: pengajuan,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// GET PENGAJUAN SURAT BY ID
async function getPengajuanSuratById(req, res) {
  try {
    const pengajuan = await PengajuanSurat.findOne({
      where: { id_pengajuan: req.params.id },
      include: [{ model: User, attributes: ["id_user", "name", "email"] }],
    });

    if (!pengajuan) {
      const error = new Error("Pengajuan Surat Not Found");
      error.statusCode = 400;
      throw error;
    }

    return res.status(200).json({
      status: "Success",
      message: "Pengajuan Surat Retrieved",
      data: pengajuan,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// CREATE PENGAJUAN SURAT
async function createPengajuanSurat(req, res) {
  try {
    console.log("🧪 req.body:", req.body);
    console.log("🧪 req.file:", req.file);

    const {
      id_user,
      keperluan_surat,
      instansi_tujuan,
      tanggal_berangkat,
      tanggal_kembali,
    } = req.body;

    const dokumen_pendukung = req.file?.filename || null;

    const newPengajuan = await PengajuanSurat.create({
      id_user,
      keperluan_surat,
      instansi_tujuan,
      tanggal_berangkat,
      tanggal_kembali,
      dokumen_pendukung,
      status: "proses",
    });

    return res.status(201).json({
      status: "Success",
      message: "Pengajuan Surat Created",
      data: newPengajuan,
    });
  } catch (error) {
    console.error("❌ SERVER ERROR:", error);
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}


// UPDATE PENGAJUAN SURAT
async function updatePengajuanSurat(req, res) {
  try {
    const { id } = req.params;

    const pengajuan = await PengajuanSurat.findOne({ where: { id_pengajuan: id } });

    if (!pengajuan) {
      const error = new Error("Pengajuan Surat Not Found");
      error.statusCode = 400;
      throw error;
    }

    const result = await PengajuanSurat.update(req.body, { where: { id_pengajuan: id } });

    if (result[0] === 0) {
      const error = new Error("No Data Changed");
      error.statusCode = 400;
      throw error;
    }

    return res.status(200).json({
      status: "Success",
      message: "Pengajuan Surat Updated",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// DELETE PENGAJUAN SURAT
async function deletePengajuanSurat(req, res) {
  try {
    const { id } = req.params;

    const pengajuan = await PengajuanSurat.findOne({ where: { id_pengajuan: id } });

    if (!pengajuan) {
      const error = new Error("Pengajuan Surat Not Found");
      error.statusCode = 400;
      throw error;
    }

    const result = await PengajuanSurat.destroy({ where: { id_pengajuan: id } });

    if (result === 0) {
      const error = new Error("No Data Changed");
      error.statusCode = 400;
      throw error;
    }

    return res.status(200).json({
      status: "Success",
      message: "Pengajuan Surat Deleted",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

export {
  getPengajuanSurat,
  getPengajuanSuratById,
  createPengajuanSurat,
  updatePengajuanSurat,
  deletePengajuanSurat,
};
