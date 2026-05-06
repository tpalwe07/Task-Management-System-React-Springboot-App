import Title from '../../components/Title/Title';
import AddIcon from '@mui/icons-material/Add';
import TaskModal from './TaskModal';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import type { FormValues } from '../../components/Form/types';
import { createTask } from '../../services/task';
import Select from '../../components/Select/Select';
import { getProjects } from '../../services/project';
import type { Project } from '../../models/project.model';
import useToast from '../../hooks/useToast';

const TaskPage = () => {
  const { success, error } = useToast();
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState<Project[] | []>([]);
  const [projectId, setProjectId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await getProjects();
      setProjects(response || []);
    };
    fetchProjects();
  }, []);

  const handleSubmit = async (values: FormValues) => {
    if (!projectId) return;
    try {
      setSubmitting(true);
      await createTask(values, projectId);
      success('Task created successfully!');
      setOpen(false);
    } catch (e) {
      console.error('Error creating task:', e);
      error('Failed to create task. Please try again.');
      setSubmitting(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Title title='Tasks' />
      <Box sx={{ position: 'relative', minHeight: '60vh', bgcolor: 'background.default', p: 3 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          mb={1}
          alignItems='center'
          justifyContent='space-between'
        >
          <Stack direction={'row'} spacing={2} alignItems='center'>
            <Select
              formControlSx={{
                '&.MuiFormControl-root': {
                  width: '200px'
                }
              }}
              id='projects'
              label='Filter by Project'
              handleOnChange={(_name, value) => setProjectId(Number(value))}
              options={projects.map((project) => ({
                name: project.title ?? '',
                value: project.projectId ?? ''
              }))}
            />
          </Stack>

          <Button
            variant='outlined'
            color='primary'
            onClick={() => setOpen(true)}
            aria-label='create Task'
          >
            <AddIcon />
            <Typography marginRight={1}>Create Task</Typography>
          </Button>
        </Stack>
      </Box>
      <TaskModal
        open={open}
        handleClose={() => setOpen(false)}
        handleSubmit={handleSubmit}
        submitLoading={submitting}
        initialValues={{}}
      />
    </>
  );
};

TaskPage.displayName = 'TaskPage';
export default TaskPage;