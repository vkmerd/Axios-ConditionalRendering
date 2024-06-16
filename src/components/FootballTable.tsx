import React from 'react';
import {
  TableContainer,
  TableRow,
  TableCell,
  Table,
  TableHead,
  TableBody,
} from '@mui/material';

interface FootballTableProps {
  data: any;
  tableRef: React.RefObject<HTMLTableElement>;
}

const FootballTable: React.FC<FootballTableProps> = ({ data, tableRef }) => {
const footballData = Array.isArray(data.data) ? data.data : [data];

  console.log('Football Table Data:', footballData); 

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

export default FootballTable;