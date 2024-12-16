import { Skeleton, Table, TableBody, TableCell, TableRow } from "@mui/material";

function LoadingTable() {
  return (
    <Table size="small">
      <TableBody>
        {Array.from({ length: 10 }).map((_, i) => (
          <TableRow key={`key${i}`}>
            <TableCell>
              <Skeleton />
            </TableCell>
            <TableCell>
              <Skeleton />
            </TableCell>
            <TableCell>
              <Skeleton />
            </TableCell>
            <TableCell>
              <Skeleton />
            </TableCell>
            <TableCell>
              <Skeleton />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default LoadingTable;
