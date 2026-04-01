import prisma from "../config/db.js";

// CREATE RECORD
export const createRecord = async (data, userId) => {
  return await prisma.financialRecord.create({
    data: {
      ...data,
      date: data.date ? new Date(data.date) : undefined,
      createdBy: userId,
    },
  });
};

// GET RECORDS WITH FILTER + PAGINATION
export const getRecords = async (query, user) => {
  const { type, category, search, fromDate, toDate, page = 1, limit = 10 } = query;

  const filters = {
    isDeleted: false,
  };

  if (type) filters.type = type;
  if (category) filters.category = category;
  if (search) {
    filters.category = {
      contains: search,
      mode: "insensitive",
    };
  }
  if (fromDate || toDate) {
    filters.date = {};
    if (fromDate) filters.date.gte = new Date(fromDate);
    if (toDate) filters.date.lte = new Date(toDate);
  }

  const skip = (page - 1) * limit;

  const records = await prisma.financialRecord.findMany({
    where: filters,
    skip: Number(skip),
    take: Number(limit),
    orderBy: { date: "desc" },
  });

  return records;
};

// UPDATE RECORD
export const updateRecord = async (id, data) => {
  return await prisma.financialRecord.update({
    where: { id },
    data: {
    ...data,
    ...(data.date && { date: new Date(data.date) }), 
   },
  });
};

// DELETE RECORD (SOFT DELETE)
export const deleteRecord = async (id) => {
  return await prisma.financialRecord.update({
    where: { id },
    data: { isDeleted: true },
  });
};