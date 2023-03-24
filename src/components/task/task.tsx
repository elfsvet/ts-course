import { Box } from '@mui/system';
import React, { FC, ReactElement } from 'react';
import { Priority } from '../createTaskForm/enums/Priority';
import { Status } from '../createTaskForm/enums/Status';
import { ITask } from './interfaces/ITask';
import { TaskDescription } from './_taskDescription';
import { TaskFooter } from './_taskFooter';
import { TaskHeader } from './_taskHeader';
import PropTypes from 'prop-types';
import { renderPriorityBorderColor } from './helpers/renderBorderColor';

export const Task: FC<ITask> = ({
  title = 'Test Title',
  date = new Date(),
  description = 'lorem',
  onClick = (e) => console.log(e),
  onStatusChange = (e) => console.log(e),
  id,
  priority = Priority.normal,
  status = Status.completed,
}): ReactElement => {
  return (
    <Box
      display="flex"
      width="100%"
      justifyContent="flex-start"
      flexDirection="column"
      mb={4}
      p={2}
      sx={{
        width: '100%',
        backgroundColor: 'backround.paper',
        borderRadius: '8px',
        border: '1px solid',
        borderColor: renderPriorityBorderColor(priority),
      }}
    >
      <TaskHeader title={title} date={date} />
      <TaskDescription description={description} />
      <TaskFooter id={id} onClick={onClick} onStatusChange={onStatusChange} status={status} />
    </Box>
  );
};

Task.propTypes = {
  title: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  description: PropTypes.string,
  onClick: PropTypes.func,
  onStatusChange: PropTypes.func,
  id: PropTypes.string.isRequired,
  priority: PropTypes.string,
  status: PropTypes.string,
};
