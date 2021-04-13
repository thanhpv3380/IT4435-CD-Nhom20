import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

const SearchBox = ({
  title = 'item',
  handleSearch,
  size = 'small',
  position = 'end',
  variant = 'outlined',
}) => {
  return (
    <TextField
      variant={variant}
      size={size}
      InputProps={{
        startAdornment: (
          <InputAdornment position={position}>
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      placeholder={`Search ${title}`}
      onChange={handleSearch}
    />
  );
};

export default SearchBox;
