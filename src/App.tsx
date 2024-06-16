import React, { useState, useEffect } from 'react';
import {
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  TableContainer,
  TableRow,
  TableCell,
  Table,
  TableHead,
  TableBody,
} from '@mui/material';
import { footBallFetchData, dummyJsonApi } from './api/Api';

const ApiDataForm: React.FC = () => {
  const [selectedApi, setSelectedApi] = useState<string>('');
  const [apiData, setApiData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let data;
        if (selectedApi === 'football') {
          data = await footBallFetchData();
        } else if (selectedApi === 'dummy') {
          data = await dummyJsonApi();
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

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedApi(event.target.value as string);
  };

  const renderFootballData = () => {
    const footballData = Array.isArray(apiData.data) ? apiData.data : [apiData];

    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Year</TableCell>
              <TableCell align="right">Winner</TableCell>
              <TableCell align="right">Runner-up</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {footballData.map((footBallApiData, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {footBallApiData.name}
                </TableCell>
                <TableCell align="right">{footBallApiData.year}</TableCell>
                <TableCell align="right">{footBallApiData.winner}</TableCell>
                <TableCell align="right">{footBallApiData.runnerup}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderDummyData = () => {
    if (!apiData || !apiData.carts || !Array.isArray(apiData.carts[0].products)) {
      return <div>No data available</div>;
    }

    const dummyData = apiData.carts;
    console.log(dummyData);
    

    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Total Product</TableCell>
              <TableCell align="right">Discounted Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyData.map((dummyApiData, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {dummyApiData.title}
                </TableCell>
                <TableCell align="right">{dummyApiData.price}</TableCell>
                <TableCell align="right">{dummyApiData.total}</TableCell>
                <TableCell align="right">{dummyApiData.discountedTotal}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderData = () => {
    if (selectedApi === 'football' && apiData) {
      return renderFootballData();
    } else if (selectedApi === 'dummy' && apiData) {
      return renderDummyData();
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

      {loading ? (
        <CircularProgress />
      ) : (
        <div>{renderData()}</div>
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