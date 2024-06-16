import React, { useState, useEffect, useRef } from 'react';
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
  Button,
} from '@mui/material';
import { footBallFetchData, dummyJsonApi } from './api/Api';
import {renderFootballData} from './components/Football';
import {renderDummyData} from './components/Football';

const ApiDataForm: React.FC = () => {
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
        } else if (selectedApi === 'dummy') {
          data = await dummyJsonApi();
        }
        setApiData(data);
      } catch (error) {
        console.error('Error:', error);
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

  const changeTableColor = () => {
    if (tableRef.current) {
      tableRef.current.style.backgroundColor = '#f0f0f0';
    }
  };

 


  const renderFootballData = () => {
    const footballData = Array.isArray(apiData?.data) ? apiData.data : [apiData];

    return (
      <TableContainer>
        <Table ref={tableRef}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Year</TableCell>
              <TableCell align="right">Winner</TableCell>
              <TableCell align="right">Runner-up</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {footballData.map((footBallApiData: any, index: number) => (
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
    if (!apiData || !apiData.carts) {
      return <div>No data available</div>;
    }

    const dummyData = apiData.carts;
    return (
      <TableContainer>
        <Table ref={tableRef}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Total Quantity</TableCell>
              <TableCell align="right">Discounted Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyData.map((cart: any, index: number) => (
              cart.products.map((product: any, productIndex: number) => (
                <TableRow key={`${index}-${productIndex}`}>
                  <TableCell component="th" scope="row">
                    {product.title}
                  </TableCell>
                  <TableCell align="right">{product.price}</TableCell>
                  <TableCell align="right">{product.quantity}</TableCell>
                  <TableCell align="right">{product.discountedTotal}</TableCell>
                </TableRow>
              ))
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

      <Button variant="contained" color="primary" onClick={changeTableColor}>
        Tablo Rengini Değiştir
      </Button>

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