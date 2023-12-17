import { render } from '@testing-library/react'
import { Settlement } from '../../type'
import SettlementList from './SettlementList'

describe('SettlementList', () => {
  it('Snapshot test', () => {
    const settlements: Settlement[] = [
      { from: 'Bob', to: 'Alice', amount: 1000 },
    ]
    const { container } = render(<SettlementList settlements={settlements} />)
    expect(container).toMatchSnapshot()
  })
})
