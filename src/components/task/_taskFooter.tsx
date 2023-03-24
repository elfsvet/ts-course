import { Box, Button, FormControlLabel, FormGroup, Switch } from '@mui/material';
import React, { FC, ReactElement } from 'react';
import { ITaskFooter } from './interfaces/ITaskFooter';
import PropTypes from 'prop-types';
import { Status } from '../createTaskForm/enums/Status';

export const TaskFooter: FC<ITaskFooter> = ({
  id,
  status,
  onStatusChange = (e) => console.log(e),
  onClick = (e) => console.log(e),
}): ReactElement => {
  return (
    <Box display="flex" justifyContent="space-between" alignContent="center" mt={4}>
      <FormGroup>
        <FormControlLabel
          control={<Switch onChange={(e) => onStatusChange(e, id)} defaultChecked={status === Status.inProgress} />}
          label="In Progress"
        />
      </FormGroup>
      <Button
        variant="contained"
        color="success"
        size="small"
        onClick={(e) => onClick(e, id)}
        sx={{ color: '#ffffff' }}
      >
        Mark Complete
      </Button>
    </Box>
  );
};

TaskFooter.propTypes = {
  onStatusChange: PropTypes.func,
  onClick: PropTypes.func,
  id: PropTypes.string.isRequired,
  status: PropTypes.string,
};
