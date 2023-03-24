import { Box, Typography } from '@mui/material';
import React, { FC, ReactElement } from 'react';
import { ITaskDescription } from './interfaces/ITaskDerscription';
import PropTypes from 'prop-types';

export const TaskDescription: FC<ITaskDescription> = ({
  description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quis atque maxime nesciunt, voluptatatum in. Explicabo veritatis quisquam accusantium',
}): ReactElement => {
  return (
    <Box>
      <Typography>{description}</Typography>
    </Box>
  );
};

TaskDescription.propTypes = {
  description: PropTypes.string,
};
