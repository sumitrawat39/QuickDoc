import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctor.model.js";

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      fees,
      about,
      experience,
      address,
    } = req.body;

    const imageFile = req.file;

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      fees === undefined ||
      !about ||
      !experience ||
      !address
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing details" });
    }

    if (!imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Weak password" });
    }

    const exists = await doctorModel.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "Doctor already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      available: true,
      date: Date.now(),
    };

    await doctorModel.create(doctorData);

    res
      .status(201)
      .json({ success: true, message: "Doctor added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addDoctor };