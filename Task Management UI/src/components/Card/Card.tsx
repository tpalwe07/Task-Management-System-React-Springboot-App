import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import type { Project } from '../../models/project.model';

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Card raised sx={{ maxWidth: 500, minWidth: 350 }}>
      <CardHeader title={project.title} />
      <CardContent>
        <Typography variant='body2'>{`Project ID: ${project.projectId}`}</Typography>
      </CardContent>
    </Card>
  );
};

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;

