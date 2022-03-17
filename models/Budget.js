const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  spenditure: [
    {
      name: { type: String },
      amount: { type: Number },
      date: { type: Date },
    },
  ],
  budgetLimit: { type: Number },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Budget = mongoose.model('budget', BudgetSchema);
