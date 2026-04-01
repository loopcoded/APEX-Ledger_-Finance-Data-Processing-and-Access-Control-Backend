import prisma from "../config/db.js";

// SUMMARY
export const getSummary = async () => {
  const records = await prisma.financialRecord.findMany({
    where: { isDeleted: false },
  });

  let totalIncome = 0;
  let totalExpense = 0;

  records.forEach((r) => {
    if (r.type === "INCOME") totalIncome += r.amount;
    else totalExpense += r.amount;
  });

  return {
    totalIncome,
    totalExpense,
    netBalance: totalIncome - totalExpense,
  };
};

// RECENT ACTIVITY
export const getRecent = async () => {
  return await prisma.financialRecord.findMany({
    where: { isDeleted: false },
    orderBy: { date: "desc" },
    take: 5,
  });
};

// CATEGORY-WISE TOTAL
export const getCategoryBreakdown = async () => {
  const records = await prisma.financialRecord.findMany({
    where: { isDeleted: false },
  });

  const categoryMap = {};

  records.forEach((r) => {
    if (!categoryMap[r.category]) categoryMap[r.category] = 0;
    categoryMap[r.category] += r.amount;
  });

  return categoryMap;
};

// TRENDS (MONTHLY / WEEKLY)
export const getTrends = async (groupBy) => {
  const records = await prisma.financialRecord.findMany({
    where: { isDeleted: false },
  });

  const trendMap = {};

  records.forEach((r) => {
    const date = new Date(r.date);

    let key;

    if (groupBy === "weekly") {
      const week = Math.ceil(date.getDate() / 7);
      key = `${date.getFullYear()}-W${week}`;
    } else {
      key = `${date.getFullYear()}-${date.getMonth() + 1}`;
    }

    if (!trendMap[key]) {
      trendMap[key] = { income: 0, expense: 0 };
    }

    if (r.type === "INCOME") trendMap[key].income += r.amount;
    else trendMap[key].expense += r.amount;
  });

  return trendMap;
};

// TOP CATEGORIES
export const getTopCategories = async () => {
  const records = await prisma.financialRecord.findMany({
    where: { isDeleted: false, type: "EXPENSE" },
  });

  const map = {};

  records.forEach((r) => {
    if (!map[r.category]) map[r.category] = 0;
    map[r.category] += r.amount;
  });

  const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);

  return sorted.slice(0, 5);
};