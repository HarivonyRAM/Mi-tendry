import type { Meta, StoryObj } from '@storybook/react';
import Select from "../Select";
import { FormProvider, useForm } from 'react-hook-form'; 
import { ThemeProvider } from '@mui/material';
import theme from './theme/theme';

const meta = {
    component: Select,
    title: "Select",
    tags: ['autodocs'],
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
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        label: "Title",
        options: [
            { value: "mr", label: "Mr" },
            { value: "mrs", label: "Mrs" },
        ],
    },
}

export const FilledVariant: Story = {
  args: {
      label: "Title",
      options: [
          { value: "mr", label: "Mr" },
          { value: "mrs", label: "Mrs" },
      ],
      variant: "filled"
  },
}

export const Controlled: Story = {
    args: {
        name: "title",
        label: "Controlled title",
        required: true,
        options: [
            { value: "mr", label: "Mr" },
            { value: "mrs", label: "Mrs" },
        ],
    },
}

export const Multiple: Story = {
  args: {
      label: "Title",
      required: true,
      options: [
          { value: "mr", label: "Mr" },
          { value: "mrs", label: "Mrs" },
          { value: "other", label: "Other" },
      ],
      multiple: true
  },
}

export const Placeholder: Story = {
    args: {
        placeholder: "Placeholder",
        required: true,
        options: [
          { value: "mr", label: "Mr" },
          { value: "mrs", label: "Mrs" },
        ],
    } 
}

export const DoubleLabels: Story = {
    args: {
        label: "Inner label",
        externalLabel: "External label",
        valueKey: "val",
        displayTextKey: "dis",
        options: [
          { val: "mr", dis: "Mr" },
          { val: "mrs", dis: "Mrs" },
        ],
    }
}