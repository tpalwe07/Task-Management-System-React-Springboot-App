import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Dialog from '../../components/Dialog/Dialog';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import CustomForm from '../../components/Form/Form';
import type { Field, FormValues } from '../../components/Form/types';
import dayjs from 'dayjs';

const fields: Field[] = [
  {
    name: 'name',
    label: 'Project Name',
    type: 'text',
    validations: { required: { message: 'Project name is required' } },
    componentsOtherProps: { placeholder: 'Enter project name' },
    gridProps: { size: { xs: 12 } }
  },
  {
    name: 'date',
    label: 'Start Date',
    type: 'datePicker',
    formatter: (value) => (value ? value.format('YYYY-MM-DD') : undefined),
    validations: { required: { message: 'Date is required' } },
    gridProps: { size: { xs: 12 } }
  },
  {
    name: 'description',
    label: 'Description',
    type: 'text',
    validations: { required: { message: 'Description is required' } },
    componentsOtherProps: { placeholder: 'Enter description', multiline: true, minRows: 3 },
    gridProps: { size: { xs: 12 } }
  }
];

const initialValues = { name: '', date: dayjs().format('YYYY-MM-DD'), description: '' };

const Project: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (values: FormValues) => {
    // eslint-disable-next-line no-console
    console.log('Form Values:', values);
    // Handle project creation logic here
    setOpen(false);
  };

  return (
    <Box sx={{ position: 'relative', minHeight: '60vh', bgcolor: 'background.default', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <IconButton color='primary' onClick={handleOpen} aria-label='Add Project' size='large'>
          <AddIcon />
        </IconButton>
      </Box>
      <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth title='Create Project'>
        <CustomForm
          fields={fields}
          onSubmit={handleSubmit}
          initialValues={initialValues}
          resetValues={initialValues}
          applyButtonText='Create'
          resetButtonText='Clear'
          hideResetButton={false}
          formContainerStyles={{ padding: 0 }}
        />
      </Dialog>
    </Box>
  );
};

Project.displayName = 'Project';
export default Project;
