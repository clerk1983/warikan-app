import { Expense, Settlement } from "../type";
import { calculateSettlements } from "./settlements";

describe("calculateSettlements", () => {
  it("精算リストが算出される", () => {
    const expenses: Expense[] = [
      {
        groupName: "group1",
        expenseName: 'expense1',
        payer: "Alice",
        amount: 300,
      },
      {
        groupName: "group1",
        expenseName: 'expense2',
        payer: "Bob",
        amount: 100,
      },
    ]
    const groupMembers = ["Alice", "Bob", "Charlie"]
    const expectedSettlements: Settlement[] = [
      { from: "Bob", to: "Alice", amount: 34 },
      { from: "Charlie", to: "Alice", amount: 133 },
    ]
    const result = calculateSettlements(expenses, groupMembers)
    expect(result).toEqual(expectedSettlements)
  })

})
