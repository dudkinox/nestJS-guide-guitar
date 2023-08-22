import mongoose from "mongoose";

export const ProvinceSchema = new mongoose.Schema({
  pv_id: { type: Number, required: true },
  pv_name_th: { type: String, required: true },
  pv_name_en: { type: String, required: true },
});

export const DistrictSchema = new mongoose.Schema({
  dt_id: { type: Number, required: true },
  code: { type: Number, required: true },
  dt_name_th: { type: String, required: true },
  dt_name_en: { type: String, required: true },
  pv_id: { type: Number, required: true },
});

export const SubDistrictSchema = new mongoose.Schema({
  sdt_id: { type: Number, required: true },
  code: { type: Number, required: true },
  sdt_name_th: { type: String, required: true },
  sdt_name_en: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  dt_id: { type: Number, required: true },
  zipcode: { type: Number, required: true },
});
