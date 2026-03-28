import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Dialog from '../../components/Dialog/Dialog';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import CustomForm from '../../components/Form/Form';
import type { Field, FormValues } from '../../components/Form/types';
import dayjs from 'dayjs';
import type { Project } from '../../models/project.model';
import { createProject } from '../../services/project';
import useToast from '../../hooks/useToast';
import ProjectCard from '../../components/Card/Card';
import Grid from '@mui/material/Grid';

const demoProjects: Project[] = [
  { title: 'Project 1', projectId: 1 },
  { title: 'Project 2', projectId: 2 },
  { title: 'Project 3', projectId: 3 },
  { title: 'Project 4', projectId: 4 },
  { title: 'Project 5', projectId: 5 },
  { title: 'Project 6', projectId: 6 },
  { title: 'Project 7', projectId: 7 },
  { title: 'Project 8', projectId: 8 },
  { title: 'Project 9', projectId: 9 },
  { title: 'Project 10', projectId: 10 },
  { title: 'Project 11', projectId: 11 },
  { title: 'Project 12', projectId: 12 },
  { title: 'Project 13', projectId: 13 },
  { title: 'Project 14', projectId: 14 },
  { title: 'Project 15', projectId: 15 },
  { title: 'Project 16', projectId: 16 },
  { title: 'Project 17', projectId: 17 },
  { title: 'Project 18', projectId: 18 },
  { title: 'Project 19', projectId: 19 },
  { title: 'Project 20', projectId: 20 },
  { title: 'Project 21', projectId: 21 },
  { title: 'Project 22', projectId: 22 },
  { title: 'Project 23', projectId: 23 },
  { title: 'Project 24', projectId: 24 }
];

const fields: Field[] = [
  {
    name: 'title',
    label: 'Project Title',
    type: 'text',
    validations: { required: { message: 'Project title is required' } },
    componentsOtherProps: { placeholder: 'Enter project title' },
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

const ProjectPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { success, error } = useToast();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (values: FormValues) => {
    const payload: Project = {
      title: values.title as string,
      description: values.description as string,
      startDate: values.date as string
    };
    try {
      await createProject(payload);
      success('Project created successfully!');
      setOpen(false);
    } catch (err) {
      error('Failed to create project. Please try again.');
      console.error('Error creating project:', err);
    }
  };

  return (
    <Box sx={{ position: 'relative', minHeight: '60vh', bgcolor: 'background.default', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <IconButton color='primary' onClick={handleOpen} aria-label='Add Project' size='large'>
          <AddIcon />
        </IconButton>
      </Box>
      <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
        {demoProjects.map((project) => (
          <ProjectCard project={project} key={project.projectId} />
        ))}
      </Grid>
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

ProjectPage.displayName = 'ProjectPage';
export default ProjectPage;
