import React, { FC, ReactElement } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// date-fns
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField } from '@mui/material';
import { IDateField } from './interfaces/IDateField';
// or for dayjs
import PropTypes from 'prop-types';

export const TaskDateField: FC<IDateField> = ({
  disabled = false,
  onChange = (date) => console.log(date),
  value = new Date(),
}): ReactElement => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Task Date"
        slotProps={{
          textField: {
            helperText: 'MM/DD/YYYY',
          },
        }}
        value={value}
        onChange={onChange}
        disabled={disabled}
        // renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

TaskDateField.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.instanceOf(Date),
};
