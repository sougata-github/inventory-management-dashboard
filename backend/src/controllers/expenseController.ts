import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getExpensesByCategory = async (req: Request, res: Response) => {
  try {
    const expensseByCategorySummaryRaw =
      await prisma.expenseByCategory.findMany({
        orderBy: {
          date: "desc",
        },
      });

    const expenseByCategorySummary = expensseByCategorySummaryRaw.map(
      (item) => ({
        ...item,
        amount: item.amount.toString(),
      })
    );

    res.json(expenseByCategorySummary);
  } catch (error) {
    res.status(501).json({ message: "Error retreiving expenses." });
  }
};
