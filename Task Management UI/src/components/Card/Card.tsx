import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import type { Project } from '../../models/project.model';

const ProjectCard = ({ project, onClick }: { project: Project, onClick: (project: Project) => void }) => {
  
  return (
    <Card onClick={() => onClick(project)} raised sx={{ maxWidth: 500, minWidth: 350, transition: 'transform 0.3s', ':hover': { cursor: 'pointer', transform: 'scale(1.05)' } }}>
      <CardHeader title={project.title} />
      <CardContent>
        <Typography variant='body2'>{`Project ID: ${project.projectId}`}</Typography>
      </CardContent>
    </Card>
  );
};

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;

