import fs from 'fs'
import { Group } from '../type'
import { GroupRepository } from './groupRepository'

jest.mock('fs')

describe("GroupRepository", () => {
  const mockedFs = jest.mocked(fs)
  let repo: GroupRepository
  beforeEach(() => {
    mockedFs.existsSync.mockClear()
    mockedFs.readFileSync.mockClear()
    mockedFs.writeFileSync.mockClear()
    repo = new GroupRepository('groups.json')
  })
  describe("loadGroups", () => {
    it("グループ一覧が取得できる", () => {
      const groups: Group[] = [
        {
          name: 'group1',
          members: ['Alice', 'Bob'],
        },
        {
          name: 'group2',
          members: ['Charlie', 'Davide'],
        },
      ]
      const mockData = JSON.stringify(groups)
      mockedFs.existsSync.mockReturnValueOnce(true);
      mockedFs.readFileSync.mockReturnValueOnce(mockData)
      const result = repo.loadGroups()
      expect(result).toEqual(groups)
    })

    it("ファイルが存在しない場合は[]", () => {
      mockedFs.existsSync.mockReturnValueOnce(false)
      const result = repo.loadGroups()
      expect(result).toEqual([])
    })
  })

  describe("saveGroup", () => {
    it("グループが保存される", () => {
      const group: Group = {
        name: 'group1',
        members: ['Alice', 'Bob'],
      }
      mockedFs.existsSync.mockReturnValueOnce(true);
      mockedFs.readFileSync.mockReturnValueOnce(JSON.stringify([]))
      repo.saveGroup(group)
      expect(mockedFs.writeFileSync).toHaveBeenCalledWith("groups.json", JSON.stringify([group]))
    })
  })

})
