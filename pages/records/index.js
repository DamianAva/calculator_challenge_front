import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Login.module.css'
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import axios from 'axios';

const inter = Inter({ subsets: ['latin'] })

export default function Records() {
  const [rows, setRows] = useState([]);
  const [issue, setIssue] = useState('');
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const { push } = useRouter();

  useEffect(() => {
    const getRecords = async () => {
      let token = await cookieStore.get('token')
      token = token ? token.value : null; 
  
      axios
        .get(`${process.env.BACKEND_URL}/users/records`, {
          params: { page, limit },
          headers: {
            'Authorization': token,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers':
              'Origin, X-Requested-With, Content-Type, Accept',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
          },
        }).then((res) => {
          setRows(res.data.records);
        }).catch((err) => {
          if (err.response && err.response.data) {
            setIssue(JSON.stringify(err.response.data))
          } else {
            setIssue('Error al intentar ingresar')
          }
        });
    };

    getRecords();
  }, [limit, page]);

  const exit = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    push('/login')
  };

  const pageDown = () => {
    if (page > 0) setPage(page-1);
  };

  const pageUp = () => {
    setPage(page+1);
  };

  const handleItems = (event) => {
    setLimit(event.target.value);
  };

  const deleteEntry = async (id) => {
    let token = await cookieStore.get('token')
    token = token ? token.value : null; 

    axios
      .delete(`${process.env.BACKEND_URL}/users/records/${id}`, {
        headers: {
          'Authorization': token,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers':
            'Origin, X-Requested-With, Content-Type, Accept',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
        },
      }).then((res) => {
        setPage(0);
      }).catch((err) => {
        if (err.response && err.response.data) {
          setIssue(JSON.stringify(err.response.data))
        } else {
          setIssue('Error al intentar eliminar')
        }
      });
  }

  return (
    <>
      <Head>
        <title>Records</title>
        <meta name="description" content="Descripcion" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <Grid container
          direction="column"
          justifyContent="center"
          alignItems="center"
          component={Paper}
          maxWidth="md"
          sx={{ p: 2 }}
          spacing={2}
        >
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" gutterBottom>
              Records
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">User Balance</TableCell>
                    <TableCell align="right">Result</TableCell>
                    <TableCell align="right">Eliminar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={`idRow${row.id}`}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.amount}</TableCell>
                      <TableCell align="right">{row.user_balance}</TableCell>
                      <TableCell align="right">{row.operation_response}</TableCell>
                      <TableCell align="right">
                        <Button variant="contained" onClick={() => deleteEntry(row.id)}>Eliminar</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={2} direction="row">
              <Button variant="contained" onClick={pageDown}>Atras</Button>
              <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel id="items-label">Items</InputLabel>
                <Select
                  labelId="items-label"
                  id="items"
                  value={limit}
                  onChange={handleItems}
                  autoWidth
                  label="Items per page"
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
              </FormControl>
              <Button variant="contained" onClick={pageUp}>Siguiente</Button>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              {issue}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={2} direction="row">
              <Button variant="contained" onClick={exit}>Salir</Button>
              <Button variant="contained" onClick={() => push('/')}>Calculadora</Button>
            </Stack>
          </Grid>
        </Grid>
      </main>
    </>
  )
}
