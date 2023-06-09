import React, { ChangeEvent, FC, ReactElement, useContext, useEffect } from 'react';
import { format } from 'date-fns';

import { Box, Grid, Alert, LinearProgress } from '@mui/material';
import { TaskCounter } from '../taskCounter/taskCounter';
import { Task } from '../task/task';
import { useQuery, useMutation } from '@tanstack/react-query';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ITaskApi } from './interfaces/ITaskApi';
import { Status } from '../createTaskForm/enums/Status';
import { IUpdateTask } from '../createTaskForm/interfaces/IUpdateTask';
import { countTasks } from './helpers/countTasks';
import { TaskStatusChangedContext } from '../../context';

export const TaskArea: FC = (): ReactElement => {
  const tasksUpdatedContext = useContext(TaskStatusChangedContext);

  const { error, isLoading, data, refetch } = useQuery(['tasks'], async () => {
    return await sendApiRequest<ITaskApi[]>('http://localhost:3200/tasks', 'GET');
  });

  //  update task mutation
  const updateTaskMutation = useMutation((data: IUpdateTask) =>
    sendApiRequest('http://localhost:3200/tasks', 'PUT', data),
  );

  useEffect(() => {
    refetch();
  }, [tasksUpdatedContext.updated]);

  useEffect(() => {
    if (updateTaskMutation.isSuccess) {
      tasksUpdatedContext.toggle();
    }
  }, [updateTaskMutation.isSuccess]);

  useEffect(() => {
    if (updateTaskMutation.isError) {
      tasksUpdatedContext.toggle();
    }
  }, [updateTaskMutation.isError]);

  const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    updateTaskMutation.mutate({
      id,
      status: e.target.checked ? Status.inProgress : Status.todo,
    });
  };

  const markCompleteHandler = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    updateTaskMutation.mutate({
      id,
      status: Status.completed,
    });
  };

  return (
    <Grid item md={8} px={4}>
      <Box mb={8} px={4}>
        <h2>Status Of Your Tasks As On {format(new Date(), 'PPPP')}</h2>
      </Box>
      <Grid container display={'flex'} justifyContent="center">
        <Grid
          item
          display={'flex'}
          flexDirection="row"
          justifyContent={'space-around'}
          alignItems="center"
          md={10}
          xs={12}
          mb={8}
        >
          {/* {!error && Array.isArray(data) && <TaskCounter count={countTasks()}/>} */}
          <TaskCounter status={Status.todo} count={data ? countTasks(data, Status.todo) : undefined} />
          <TaskCounter status={Status.inProgress} count={data ? countTasks(data, Status.inProgress) : undefined} />
          <TaskCounter status={Status.completed} count={data ? countTasks(data, Status.completed) : undefined} />
        </Grid>
        <Grid item display="flex" flexDirection="column" xs={10} md={8}>
          <>
            {error && <Alert severity="error">There was an error fetching your tasks</Alert>}

            {!error && Array.isArray(data) && data?.length === 0 && (
              <Alert severity="warning">You do not have any tasks created yet. Start by creating some tasks</Alert>
            )}

            {isLoading ? (
              <LinearProgress />
            ) : (
              Array.isArray(data) &&
              data.length > 0 &&
              data.map((task, index) => {
                return task.status === Status.todo || task.status === Status.inProgress ? (
                  <Task
                    key={index + task.priority}
                    id={task.id}
                    description={task.description}
                    date={new Date(task.date)}
                    title={task.title}
                    status={task.status}
                    priority={task.priority}
                    onClick={markCompleteHandler}
                    onStatusChange={onStatusChangeHandler}
                  />
                ) : (
                  false
                );
              })
            )}
          </>
        </Grid>
      </Grid>
    </Grid>
  );
};
