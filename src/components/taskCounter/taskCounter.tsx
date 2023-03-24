import { Avatar, Box, Typography } from '@mui/material';

import React, { FC, ReactElement } from 'react';
import { Status } from '../createTaskForm/enums/Status';
import { emitCorrectBorderColor } from './helpers/emitCorrectBorderColor';
import { emitCorrectLabel } from './helpers/emitCorrectLabel';
import { ITaskCounter } from './interfaces/ITaskCounter';
import PropTypes from 'prop-types';

export const TaskCounter: FC<ITaskCounter> = ({ status = Status.completed, count = 0 }): ReactElement => {
  return (
    <>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Avatar
          sx={{
            backgroundColor: 'transparent',
            border: '5px solid',
            width: '96px',
            height: '96px',
            marginBottom: '16px',
            borderColor: emitCorrectBorderColor(status),
          }}
        >
          <Typography color="#ffffff" variant="h4">
            {count}
          </Typography>
        </Avatar>
        <Typography color="#ffffff" variant="h5" fontWeight="bold" fontSize="20px">
          {emitCorrectLabel(status)}
        </Typography>
      </Box>
    </>
  );
};

TaskCounter.propTypes = {
  status: PropTypes.oneOf([Status.todo, Status.inProgress, Status.completed]),
  count: PropTypes.number,
};
