import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateGroupForm from './CreateGroupForm'

const mockOnSubmit = jest.fn()
const user = userEvent.setup()

describe('CreateGroupForm', () => {
  beforeEach(() => {
    render(<CreateGroupForm onSubmit={mockOnSubmit} />)
  })
  it('フォームの内容がsubmitされる', async () => {
    await user.type(screen.getByLabelText('グループ名'), 'group1')
    await user.type(screen.getByLabelText('メンバー'), 'Alice, Bob')
    await user.click(screen.getByRole('button'))
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'group1',
      members: ['Alice', 'Bob'],
    })
    await waitFor(() => {
      expect(screen.queryByDisplayValue('goup1')).toBeNull()
      expect(screen.queryByDisplayValue('Alice, Bob')).toBeNull()
    })
  })
  it('初期状態でsubmitするとバリデーションエラーが発生する', async () => {
    await user.click(screen.getByRole('button'))
    expect(screen.getByText('グループ名は必須です')).toBeInTheDocument()
    expect(screen.getByText('メンバーは2人以上必要です')).toBeInTheDocument()
  })
})
