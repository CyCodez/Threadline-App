const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      maxlength: 150,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "account",
        "gallery",
        "client-access",
        "selection",
        "payments",
        "bookings",
        "subscription",
        "technical",
        "other",
      ],
      default: "other",
    },

    priority: {
      type: String,
      enum: ["low", "normal", "high", "urgent"],
      default: "normal",
    },

    status: {
      type: String,
      enum: [
        "open",
        "in-progress",
        "waiting-on-customer",
        "resolved",
        "closed",
      ],
      default: "open",
    },

    expectedResult: {
      type: String,
      trim: true,
      default: "",
    },

    actualResult: {
      type: String,
      trim: true,
      default: "",
    },

    stepsTaken: {
      type: String,
      trim: true,
      default: "",
    },

    resolvedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

ticketSchema.index({ customer: 1, createdAt: -1 });
ticketSchema.index({ assignedTo: 1, status: 1 });
ticketSchema.index({ status: 1, priority: 1 });

module.exports = mongoose.model("Ticket", ticketSchema);
