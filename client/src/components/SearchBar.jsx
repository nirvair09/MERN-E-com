import React, { useState } from 'react';
import { Box, InputBase, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchContainer = styled('div')({
  background: '#fff',
  display: 'flex',
  alignItems: 'center',
  padding: '6px',
});

const StyledInputBase = styled(InputBase)({
  flex: 1,
});

const SearchIconWrap = styled(Box)({
  color: 'blue',
  marginLeft: '8px',
});

const SearchBar = ({ products, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  return (
    <div>
      <SearchContainer>
        <StyledInputBase
          placeholder="Search your Wish at E-Commerce Web"
          onChange={handleSearch}
          onKeyPress={handleKeyPress}
        />
        <SearchIconWrap>
          <SearchIcon />
        </SearchIconWrap>
      </SearchContainer>
    </div>
  );
};

export default SearchBar;
