import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import type { FormValues } from '../../components/Form/types';
import dayjs from 'dayjs';
import type { Project } from '../../models/project.model';
import { createProject, getProjects } from '../../services/project';
import useToast from '../../hooks/useToast';
import ProjectCard from '../../components/Card/Card';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Loader from '../../components/Loader';
import { useNavigate } from 'react-router-dom';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import ProjectModal from './ProjectModal';
import AlertText from '../../components/AlertText/AlertText';

const initialValues = { name: '', startDate: dayjs().format('YYYY-MM-DD'), description: '' };

const ProjectPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [fetchingProjects, setFetchingProjects] = useState(false);
  const { success, error } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProjects = async () => {
    try {
      setFetchingProjects(true);
      const projects = await getProjects();
      setProjects(projects);
    } catch (err) {
      setFetchingProjects(false);
      error('Failed to fetch projects. Please try again.');
      console.error('Error fetching projects:', err);
    } finally {
      setFetchingProjects(false);
    }
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      setSubmitLoading(true);
      await createProject(values as Project);
      success('Project created successfully!');
      fetchProjects();
      setOpen(false);
    } catch (err) {
      setSubmitLoading(false);
      error('Failed to create project. Please try again.');
      console.error('Error creating project:', err);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleCardClick = (project: Project) => {
    navigate(`/projects/${project.projectId}`);
  };

  return (
    <>
      <Title title='Projects' />
      <Box sx={{ position: 'relative', minHeight: '60vh', bgcolor: 'background.default', p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            variant='outlined'
            color='primary'
            onClick={() => setOpen(true)}
            aria-label='Add Project'
          >
            <AddIcon />
            <Typography marginRight={1}>Add Project</Typography>
          </Button>
        </Box>
        <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
          {/* eslint-disable-next-line no-nested-ternary */}
          {fetchingProjects ? (
            <Loader />
          ) : projects.length === 0 ? (
            <AlertText severity='warning' text='No projects found.' />
          ) : (
            projects.map((project) => (
              <ProjectCard project={project} key={project.projectId} onClick={handleCardClick} />
            ))
          )}
        </Grid>
      </Box>
      <ProjectModal
        open={open}
        handleClose={() => setOpen(false)}
        handleSubmit={handleSubmit}
        submitLoading={submitLoading}
        initialValues={initialValues}
      />
    </>
  );
};

ProjectPage.displayName = 'ProjectPage';
export default ProjectPage;
