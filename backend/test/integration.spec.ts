import express from "express";
import fs from "fs";
import request from 'supertest';
import { createApp } from '../src/app';
import { Expense, Group } from "../src/type";

const GROUP_FILE_PATH = '../data/integration/groups.json'
const EXPENSE_FILE_PATH = '../data/integration/expenses.json'

const testGroups: Group[] = [
  { name: "group1", members: ['Alice', 'Bob', 'Charlie'] },
  { name: "group2", members: ['Davide', 'Elen'] },
]

const testExpenses: Expense[] = [
  { groupName: "group1", expenseName: "Launch", payer: "Alice", amount: 1000 }
]

describe("Integration test", () => {
  let app: express.Express;
  beforeEach(() => {
    fs.writeFileSync(GROUP_FILE_PATH, JSON.stringify(testGroups));
    fs.writeFileSync(EXPENSE_FILE_PATH, JSON.stringify(testExpenses));
    app = createApp(GROUP_FILE_PATH, EXPENSE_FILE_PATH)
  })
  describe("GET /groups", () => {
    it("すべてのグループが取得できる", async () => {
      const response = await request(app).get("/groups")
      expect(response.status).toBe(200)
      expect(response.body).toEqual(testGroups)
    })
  })
  describe("POST /groups", () => {
    it("グループが追加できる", async () => {
      const group: Group = { name: "group3", members: ["Fox", "Golf"] }
      const response = await request(app).post("/groups").send(group)
      expect(response.status).toBe(200)
      expect(response.text).toBe("グループの作成が成功しました")
    })
  })
})
