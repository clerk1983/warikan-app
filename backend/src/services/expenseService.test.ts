import { ExpenseRepository } from '../repositories/expenseRepository';
import { Expense, Group } from "../type";
import { ExpenseService } from './expenseService';
import { GroupService } from './groupService';

describe("ExpenseService", () => {
  let mockGroupService: Partial<GroupService>;
  let mockExpenseRepository: Partial<ExpenseRepository>
  let expenseService: ExpenseService;

  const group: Group = { name: "group1", members: ["Alice", "Bob"] }
  const expense: Expense = { groupName: "group1", expenseName: "Launch", amount: 2000, payer: "Alice" }

  beforeEach(() => {
    mockGroupService = {
      getGroupByName: jest.fn(),
    }
    mockExpenseRepository = {
      loadExpenses: jest.fn(),
      saveExpense: jest.fn(),
    }
    expenseService = new ExpenseService(
      mockExpenseRepository as ExpenseRepository,
      mockGroupService as GroupService
    )
  })

  describe("addExpense", () => {
    it("支出が登録される", () => {
      (mockGroupService.getGroupByName as jest.Mock).mockReturnValueOnce(group)
      expenseService.addExpense(expense)
      expect(mockExpenseRepository.saveExpense).toHaveBeenCalledWith(expense)
    })
    it("グループが存在しない場合はエラー", () => {
      (mockGroupService.getGroupByName as jest.Mock).mockReturnValueOnce(null)
      expect(() => {
        expenseService.addExpense(expense)
      }).toThrowError()
    })
    it("支払い者がグループに存在しない場合はエラー", () => {
      (mockGroupService.getGroupByName as jest.Mock).mockReturnValueOnce(group)
      const nonMenberExpense: Expense = { ...expense, payer: "Davide" }
      expect(() => {
        expenseService.addExpense(nonMenberExpense)
      }).toThrowError()
    })
  })
})
