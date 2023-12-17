import type { Meta, StoryObj } from '@storybook/react'
import { Settlement } from '../../type'
import SettlementList from './SettlementList'

const meta = {
  title: 'SettlementList',
  component: SettlementList,
} as Meta<typeof SettlementList>

export default meta

type Story = StoryObj<typeof SettlementList>
const settlements: Settlement[] = [
  { from: 'Bob', to: 'Alice', amount: 1000 },
  { from: 'Charlie', to: 'Alice', amount: 1000 },
]

export const Default: Story = {
  args: { settlements },
}
