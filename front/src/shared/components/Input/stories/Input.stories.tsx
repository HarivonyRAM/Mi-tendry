import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import Input from '../Input';
import { ThemeProvider } from '@mui/material';
import theme from './theme/theme';

const meta = {
  component: Input,
  title: 'Input',
  decorators: [
    (Story) => {
      const methods = useForm()
      return (
        <ThemeProvider theme={theme}>
          <FormProvider {...methods}>
            <Story />
          </FormProvider>
        </ThemeProvider>
      )
    },
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Surname',
  } 
}

export const FilledVariant: Story = {
  args: {
    label: 'Surname',
    variant: "standard"
  } 
}

export const controlled: Story = {
  args: {
      type: "email",
      name: "mail",
      label: "Controlled email",
      required: true
  }
}

export const Multiline: Story = {
  args: {
      label: "Write your comment",
      multiline: true,
      minRows: 3,
      maxRows: 5
  }
}

export const Placeholder: Story = {
  args: {
    placeholder: "Placeholder",
    required: true,
  } 
}

export const DoubleLabels: Story = {
  args: {
    label: "Inner label",
    externalLabel: "External label",
    onChange: e => { alert(e.target.value) }
  }
}

export const Password: Story = {
  args: {
    type: "password",
    name: 'password',
    label: 'Password',
    required: true,
  } 
}