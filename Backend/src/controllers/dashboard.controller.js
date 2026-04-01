import {getSummary, getRecent, getCategoryBreakdown, getTrends, getTopCategories,} from "../services/dashboard.service.js";

export const summary = async (req, res) => {
  const data = await getSummary();
  res.json({ success: true, data });
};

export const recent = async (req, res) => {
  const data = await getRecent();
  res.json({ success: true, data });
};

export const category = async (req, res) => {
  const data = await getCategoryBreakdown();
  res.json({ success: true, data });
};

export const trends = async (req, res) => {
  const { groupBy = "monthly" } = req.query;
  const data = await getTrends(groupBy);
  res.json({ success: true, data });
};

export const topCategories = async (req, res) => {
  const data = await getTopCategories();
  res.json({ success: true, data });
};