import type { Meta, StoryObj } from '@storybook/react';
import Button from '../Button';
import { ArrowBack } from '@mui/icons-material'
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme/theme';

const meta = {
    component: Button,
    title: "Button",
    tags: ['autodocs'],
    decorators: [
        (Story) => (
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Story />
          </ThemeProvider>
        )
      ]
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        children: "Submit",
    },
}

export const Contained: Story = {
    args: {
        variant: "contained",
        children: "Submit",
    },
}

export const OutlinedWithIcon: Story = {
    args: {
        variant: "outlined",
        children: "Submit",
        endIcon: <ArrowBack/>
    },
}

export const Loading1: Story = {
    args: {
        variant: "contained",
        children: "Submit",
        loading: true
    },
}

export const Loading2: Story = {
    args: {
        variant: "contained",
        children: "Submit",
        loading: true,
        loadingIndicator: "LOADING..."
    },
}

export const Loading3: Story = {
    args: {
        variant: "contained",
        children: "Submitting",
        loading: true,
        loadingPosition: "start"
    },
}

export const WithFeedback: Story = {
    args: {
        variant: "contained",
        children: "Submit",
        feedback: {
            severity: "success",
            message: "Successful",
            placement: "bottom"
        }
    },
}