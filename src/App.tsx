import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Button,
  SelectChangeEvent
} from '@mui/material';
import { footBallFetchData, dummyJsonApi } from './api/Api';
import FootballTable from './components/FootballTable';
import DummyTable from './components/DummyTable';

const App: React.FC = () => {
  const [selectedApi, setSelectedApi] = useState<string>('');
  const [apiData, setApiData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let data;
        if (selectedApi === 'football') {
          data = await footBallFetchData();
          console.log('Football verisi alındı:', data); // Hata ayıklama satırı
        } else if (selectedApi === 'dummy') {
          data = await dummyJsonApi();
          console.log('Dummy verisi alındı:', data); // Hata ayıklama satırı
        }
        setApiData(data);
      } catch (error) {
        console.error('Hata:', error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedApi) {
      fetchData();
    }
  }, [selectedApi]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedApi(event.target.value as string);
  };

  const changeTableColor = () => {
    if (tableRef.current) {
      tableRef.current.style.backgroundColor = '#f0f0f0';
    }
  };

  const renderData = () => {
    if (selectedApi === 'football' && apiData) {
      return <FootballTable data={apiData} tableRef={tableRef} />;
    } else if (selectedApi === 'dummy' && apiData) {
      return <DummyTable data={apiData} tableRef={tableRef} />;
    } else {
      return <div>No data available</div>;
    }
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

      <Button variant="contained" color="primary" onClick={changeTableColor}>
        Change Table Color
      </Button>

      {loading ? (
        <CircularProgress />
      ) : (
        <div>{renderData()}</div>
      )}
    </Container>
  );
};

export default App;