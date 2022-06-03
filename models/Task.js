import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"], //envia error si no se ingresa el titulo
      unique: true,
      trim: true,
      maxlength: [50, "Title must be less than 50 characters"], //envia error si el titulo es mayor a 50 caracteres
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: [200, "Description must be less than 200 characters"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Task || model("Task", TaskSchema);
