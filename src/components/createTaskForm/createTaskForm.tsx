import React, { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { Box, Typography, Stack, Button, LinearProgress, Alert, AlertTitle } from '@mui/material';
import { TaskTitleField } from './_taskTitleField';
import { TaskDescriptionField } from './_taskDescriptionField';
import { TaskDateField } from './_taskDateField';
import { TaskSelectField } from './_taskSelectField';
import { Status } from './enums/Status';
import { Priority } from './enums/Priority';
import { useMutation } from '@tanstack/react-query';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ICreateTask } from '../taskArea/interfaces/ICreateTask';
import { TaskStatusChangedContext } from '../../context';

export const CreateTaskForm: FC = (): ReactElement => {
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [date, setDate] = useState<Date | null>(new Date());
  const [status, setStatus] = useState<string>(Status.todo);
  const [priority, setPriority] = useState<string>(Priority.normal);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  const tasksUpdatedContext = useContext(TaskStatusChangedContext);

  const createTaskMutation = useMutation((data: ICreateTask) =>
    sendApiRequest('http://localhost:3200/tasks', 'POST', data),
  );

  const createTaskHandler = () => {
    if (!title || !date || !description) {
      return;
    }
    const task: ICreateTask = {
      title,
      description,
      date: date.toString(),
      status,
      priority,
    };

    createTaskMutation.mutate(task);
  };

  // manage SUCCESS side effects inside the application
  useEffect(() => {
    if (createTaskMutation.isSuccess) {
      setShowSuccess(true);
      tasksUpdatedContext.toggle();
    }

    const successTimeout = setTimeout(() => {
      setShowSuccess(false);
    }, 7000);

    return () => {
      clearTimeout(successTimeout);
    };
  }, [createTaskMutation.isSuccess]);

  // manage ERROR side effects inside the application
  useEffect(() => {
    if (createTaskMutation.isError) {
      setShowError(true);
      tasksUpdatedContext.toggle();
    }

    const errorTimeout = setTimeout(() => {
      setShowError(false);
    }, 7000);

    return () => {
      clearTimeout(errorTimeout);
    };
  }, [createTaskMutation.isError]);

  return (
    <Box display={'flex'} flexDirection="column" alignItems={'flex-start'} width="100%" px={4} my={6}>
      {/* alert box */}
      {showSuccess && (
        <Alert severity="success" sx={{ width: '100%', marginBottom: '16px' }}>
          <AlertTitle>Success</AlertTitle>
          The task has been created successfully
        </Alert>
      )}
      {showError && (
        <Alert severity="error" sx={{ width: '100%', marginBottom: '16px' }}>
          <AlertTitle>Error</AlertTitle>
          The task has not been saved
        </Alert>
      )}
      <Typography mb={2} component="h2" variant="h6">
        Create A Task
      </Typography>
      <Stack sx={{ width: '100%' }} spacing={2}>
        <TaskTitleField
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          disabled={createTaskMutation.isLoading}
        />
        <TaskDescriptionField
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          disabled={createTaskMutation.isLoading}
        />
        <TaskDateField
          value={date}
          onChange={(date) => {
            setDate(date);
          }}
          disabled={createTaskMutation.isLoading}
        />
        {/* status and priority */}
        <Stack direction={'row'} spacing={2}>
          <TaskSelectField
            label="Status"
            name="status"
            value={status}
            disabled={createTaskMutation.isLoading}
            onChange={(e) => {
              setStatus(e.target.value as string);
            }}
            items={[
              { value: Status.todo, label: Status.todo.toUpperCase() },
              { value: Status.inProgress, label: Status.inProgress.toUpperCase() },
            ]}
          />
          <TaskSelectField
            label="Priority"
            name="priority"
            value={priority}
            disabled={createTaskMutation.isLoading}
            onChange={(e) => {
              setPriority(e.target.value as string);
            }}
            items={[
              { value: Priority.low, label: Priority.low.toUpperCase() },
              { value: Priority.normal, label: Priority.normal.toUpperCase() },
              { value: Priority.high, label: Priority.high.toUpperCase() },
            ]}
          />
        </Stack>
        {/* progress bar */}
        {createTaskMutation.isLoading && <LinearProgress />}
        {/* button create a task */}
        <Button
          variant="contained"
          disabled={!title || !description || !date || !status || !priority || createTaskMutation.isLoading}
          size="large"
          fullWidth
          onClick={createTaskHandler}
        >
          Create a Task
        </Button>
      </Stack>
    </Box>
  );
};
