import { rest } from 'msw'
import { expect } from '@storybook/jest'
import { Meta, StoryObj } from '@storybook/react'
import { within, userEvent, waitFor } from '@storybook/testing-library'

import { SignIn } from './SignIn'


export default {
  title: 'Pages/Sign in',
  component: SignIn,
  args: {
    children: 'Create account',
  },
  argTypes: {},
  parameters: {
    msw: {
      handlers: [
        rest.post('/login', (req, res, ctx) => {
          return res(ctx.json({
            message: 'Success!'
          }))
        })
      ]
    }
  }
} as Meta


export const Default: StoryObj = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const emailInput = canvas.getByPlaceholderText('gabriel@example.com')
    const passwordInput = canvas.getByPlaceholderText('*********')
    const submitButton = canvas.getByRole('button')

    userEvent.type(emailInput, 'gabriel-peruchi@hotmail.com')
    userEvent.type(passwordInput, '123456789')

    userEvent.click(submitButton)
    
    await waitFor(() => {
      const successMessage = canvas.getByText('Login realizado!')
      return expect(successMessage).toBeInTheDocument()
    })
  }
}
