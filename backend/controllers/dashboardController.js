const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { Types } = require("mongoose");

// GET /dashboard/
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id; // or req.user._id depending on your middleware
    const userObjectId = new Types.ObjectId(userId);

    // Total Income
    const totalIncomeAgg = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalIncome = totalIncomeAgg[0]?.total || 0;

    // Total Expense
    const totalExpenseAgg = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalExpenses = totalExpenseAgg[0]?.total || 0;

    // Total Balance
    const totalBalance = totalIncome - totalExpenses;

    // Get last 5 transactions for recentTransactions (both income & expenses)
    const lastIncome = await Income.find({ userId })
      .sort({ date: -1 })
      .limit(5);

    const lastExpenses = await Expense.find({ userId })
      .sort({ date: -1 })
      .limit(5);

    const recentTransactions = [
      ...lastIncome.map((i) => ({ ...i.toObject(), type: "income" })),
      ...lastExpenses.map((e) => ({ ...e.toObject(), type: "expense" })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date)) // most recent first
     .slice(0, 5);

    // Optional: last 30 days expenses & 60 days income
    const last30DaysExpenses = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    });

    const last60DaysIncome = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    });

    const sumLast30DaysExpenses = last30DaysExpenses.reduce(
      (sum, e) => sum + e.amount,
      0
    );

    const sumLast60DaysIncome = last60DaysIncome.reduce(
      (sum, i) => sum + i.amount,
      0
    );

    // Send response
    res.json({
      totalIncome,
      totalExpenses,
      totalBalance,
      last30DaysExpenses: {
        total: sumLast30DaysExpenses,
        transactions: last30DaysExpenses,
      },
      last60DaysIncome: {
        total: sumLast60DaysIncome,
        transactions: last60DaysIncome,
      },
      recentTransactions,
    });
  } catch (err) {
    console.error("Error fetching dashboard data:", err);
    res.status(500).json({ message: "Server error fetching dashboard data" });
  }
};