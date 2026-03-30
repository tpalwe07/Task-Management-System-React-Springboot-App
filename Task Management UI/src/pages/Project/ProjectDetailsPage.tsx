import { useEffect, useMemo, useState } from 'react';
import { deleteProjectById, editProjectById, getProjectById } from '../../services/project';
import type { Project } from '../../models/project.model';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import Title from '../../components/Title/Title';
import { Box, Typography } from '@mui/material';
import useToast from '../../hooks/useToast';
import Button from '../../components/Button/Button';
import Dialog from '../../components/Dialog/Dialog';
import ProjectModal from './ProjectModal';
import type { FormValues } from '../../components/Form/types';
import AlertText from '../../components/AlertText/AlertText';

const orEmpty = (val: string | undefined): string => val ?? '';

const emptyValues = { title: '', startDate: '', description: '' };

const toFormValues = (p: Project | null) => {
  if (!p) return emptyValues;
  return {
    title: orEmpty(p.title),
    startDate: orEmpty(p.startDate),
    description: orEmpty(p.description)
  };
};

const ProjectDetailsPage = () => {
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [delLoading, setDelLoading] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>({});
  const { success, error } = useToast();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetchProjectDetails(Number(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const projectinitialValues = useMemo(() => toFormValues(project), [project]);

  // Disable Update button when nothing has changed from original values
  const isDataUnchanged = JSON.stringify(formValues) === JSON.stringify(projectinitialValues);

  const handleOpenEditModal = () => {
    setFormValues(projectinitialValues);
    setOpenEditModal(true);
  };

  const fetchProjectDetails = async (projectId: number) => {
    try {
      setLoading(true);
      const project = await getProjectById(projectId);
      setProject(project);
    } catch (err) {
      setLoading(false);
      error('Failed to fetch project details');
      console.error('Error fetching project details:', err);
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line complexity
  const handleDeleteProject = async () => {
    if (!project) return;
    try {
      setDelLoading(true);
      if (project.projectId !== undefined) {
        await deleteProjectById(project.projectId);
      } else {
        error('Project ID is undefined. Cannot delete project.');
      }
      success('Project deleted successfully!');
      setOpenDeleteModal(false);
      navigate('/projects');
    } catch (err) {
      error('Failed to delete project');
      console.error('Error deleting project:', err);
    } finally {
      setDelLoading(false);
    }
  };

  const handleEditProject = async (values: FormValues) => {
    // eslint-disable-next-line no-console
    console.log('Edit project values:', values);
    try {
      setSubmitLoading(true);
      await editProjectById(Number(id), values);
      success('Project updated successfully!');
      setOpenEditModal(false);
      fetchProjectDetails(Number(id));
    } catch (err) {
      error('Failed to edit project');
      console.error('Error editing project:', err);
    } finally {
      setSubmitLoading(false);
    }
  };

  const renderDeleteModal = () => {
    return (
      <Dialog
        loading={delLoading}
        dialogContentSx={{ display: 'none' }}
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onSubmit={handleDeleteProject}
        title='Are you sure you want to delete this project?'
      />
    );
  };

  return (
    <>
      {/* eslint-disable-next-line no-nested-ternary */}
      {loading ? (
        <Loader />
      ) : project ? (
        <>
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}
          >
            <Title title={project.title} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, gap: 2 }}>
            <Button
              variant='contained'
              color='primary'
              aria-label='Edit Project'
              onClick={handleOpenEditModal}
            >
              <Typography>Edit</Typography>
            </Button>
            <Button
              variant='outlined'
              color='primary'
              aria-label='Delete Project'
              onClick={() => setOpenDeleteModal(true)}
            >
              <Typography>Delete</Typography>
            </Button>
          </Box>
          <Box sx={{ display: 'inline-flex', gap: 2, mb: 2 }}>
            <Typography variant='body2' color='text.secondary'>
              Project ID: {project.projectId}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Start Date: {project.startDate}
            </Typography>
          </Box>
          <Typography>Description: {project.description}</Typography>
        </>
      ) : (
        <Box
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}
        >
          <AlertText severity='error' text='Project not found' />
        </Box>
      )}
      {renderDeleteModal()}
      <ProjectModal
        dataChanged={isDataUnchanged}
        onFormChange={setFormValues}
        open={openEditModal}
        handleClose={() => setOpenEditModal(false)}
        handleSubmit={handleEditProject}
        submitLoading={submitLoading}
        initialValues={projectinitialValues}
        editMode
      />
    </>
  );
};

ProjectDetailsPage.displayName = 'ProjectDetailsPage';

export default ProjectDetailsPage;
