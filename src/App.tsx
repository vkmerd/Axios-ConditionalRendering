import React, { useState, useEffect } from 'react';
import { Container, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import { footBallFetchData, dummyJsonApi } from './api/Api';

const ApiDataForm: React.FC = () => {
  const [selectedApi, setSelectedApi] = useState<string>('');
  const [apiData, setApiData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedApi) {
        setLoading(true);
        let data = null;
        if (selectedApi === 'football') {
          data = await footBallFetchData();
        } else if (selectedApi === 'dummy') {
          data = await dummyJsonApi();
        }
        setApiData(data);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedApi]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedApi(event.target.value as string);
  };

  return (
    <Container>
      <FormControl fullWidth margin="normal">
        <InputLabel id="api-select-label">Select API</InputLabel>
        <Select
          labelId="api-select-label"
          id="api-select"
          value={selectedApi}
          onChange={handleChange}
        >
          <MenuItem value="football">Football API</MenuItem>
          <MenuItem value="dummy">Dummy API</MenuItem>
        </Select>
      </FormControl>

      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          {apiData && (
            <pre>{JSON.stringify(apiData, null, 2)}</pre>
          )}
        </div>
      )}
    </Container>
  );
};

const App: React.FC = () => {
  return (
    <div>
      <ApiDataForm />
    </div>
  );
};

export default App;