import React from 'react';
import {
  TableContainer,
  TableRow,
  TableCell,
  Table,
  TableHead,
  TableBody,
} from '@mui/material';

type DummyTableProps = {
  data: any;
  tableRef: React.RefObject<HTMLTableElement>;
}

const DummyTable: React.FC<DummyTableProps> = ({ data, tableRef }) => {
  if (!data || !data.carts) {
    return <div>No data available</div>;
  }

  const dummyData = data.carts;
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

export default DummyTable;