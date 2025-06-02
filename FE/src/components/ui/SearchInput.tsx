import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import type { IStory } from '../../types/story';
import { useNavigate } from 'react-router-dom';

interface Props {
  data: IStory[];
}

export default function SearchInput({ data }: Props) {
  const [value, setValue] = useState<IStory | null>(null);
  const navigate = useNavigate();
  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      options={data}
      getOptionLabel={(option) => option.title}
      renderOption={(props, option) => (
        <li  {...props}>{option.title}</li>
      )}
      componentsProps={{
        popupIndicator: {
          style: { display: 'none' }, // ẩn icon mũi tên
        },
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' && value) {
          navigate(`/manga/${value._id}`);
        }
      }}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Tìm truyện"   
           // ngăn chặn sự kiện click lan truyền
          slotProps={{
            input: {
              ...params.InputProps,
              type: 'search',
            },
          }} />
      )}
    />
  );
}
