import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React, { FC, ReactElement } from 'react';
import { ITextField } from './interfaces/ITextField';

export const TaskDescriptionField: FC<ITextField> = ({
  onChange = (e) => {
    console.log(e);
  },
  disabled = false,
}): ReactElement => {
  return (
    <TextField
      id="description"
      name="description"
      label="Description"
      placeholder="Description"
      variant="outlined"
      size="small"
      multiline
      rows={4}
      fullWidth
      disabled={disabled}
      onChange={onChange}
    />
  );
};

TaskDescriptionField.propTypes = {
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};
