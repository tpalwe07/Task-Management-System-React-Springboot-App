import Dialog from '../../components/Dialog/Dialog';
import CustomForm from '../../components/Form/Form';
import type { Field, FormValues } from '../../components/Form/types';

const fields: Field[] = [
  {
    name: 'title',
    label: 'Task Title',
    type: 'text',
    validations: { required: { message: 'Task title is required' } },
    componentsOtherProps: { placeholder: 'Enter task title' },
    gridProps: { size: { xs: 12 } }
  },
  {
    name: 'description',
    label: 'Description',
    type: 'text',
    validations: { required: { message: 'Description is required' } },
    componentsOtherProps: { placeholder: 'Enter description', multiline: true, minRows: 3 },
    gridProps: { size: { xs: 12 } }
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { name: 'Pending', value: 'pending' },
      { name: 'In Progress', value: 'in-progress' },
      { name: 'Completed', value: 'completed' },
      { name: 'To Do', value: 'to-do' },
      { name: 'Cancelled', value: 'cancelled' },
      { name: 'Review', value: 'review' }
    ],
    validations: { required: { message: 'Status is required' } },
    gridProps: { size: { xs: 12 } }
  },
  {
    name: 'priority',
    label: 'Priority',
    type: 'select',
    options: [
      { name: 'Low', value: 1 },
      { name: 'Medium', value: 2 },
      { name: 'High', value: 3 },
      { name: 'Critical', value: 4 }
    ],
    validations: { required: { message: 'Priority is required' } },
    gridProps: { size: { xs: 12 } }
  }
];
const TaskModal = ({
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
      title={editMode ? 'Edit Task' : 'Create Task'}
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
TaskModal.displayName = 'TaskModal';

export default TaskModal;

