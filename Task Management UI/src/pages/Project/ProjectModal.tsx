import Dialog from '../../components/Dialog/Dialog';
import CustomForm from '../../components/Form/Form';
import type { Field, FormValues } from '../../components/Form/types';

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
    name: 'startDate',
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
const ProjectModal = ({
  open,
  handleClose,
  handleSubmit,
  submitLoading,
  initialValues,
  editMode = false,
  dataChanged = false,
  onFormChange
}: {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (values: FormValues) => void;
  submitLoading: boolean;
  initialValues: FormValues;
  editMode?: boolean;
  dataChanged?: boolean;
  onFormChange?: (values: FormValues) => void;
  // eslint-disable-next-line complexity
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='sm'
      fullWidth
      title={editMode ? 'Edit Project' : 'Create Project'}
    >
      <CustomForm
        disableSubmitButton={dataChanged}
        fields={fields}
        onSubmit={handleSubmit}
        initialValues={initialValues}
        resetValues={initialValues}
        applyButtonText={editMode ? 'Update' : 'Create'}
        resetButtonText='Clear'
        hideResetButton={false}
        formContainerStyles={{ padding: 0 }}
        isButtonLoading={submitLoading}
        onFormChange={onFormChange}
      />
    </Dialog>
  );
};
ProjectModal.displayName = 'ProjectModal';

export default ProjectModal;

