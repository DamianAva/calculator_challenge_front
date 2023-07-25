import { useEffect, useState } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/navigation';
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import axios from 'axios';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [operandOne, setOperandOne] = useState('');
  const [operandTwo, setOperandTwo] = useState('');
  const [operator, setOperator] = useState('addition');
  const [results, setResults] = useState('');
  const [issue, setIssue] = useState('');
  const { push } = useRouter();

  const handleChange = (event) => {
    setOperator(event.target.value);
  };

  const handleOperandOne = event => {
    setOperandOne(event.target.value);
  };

  const handleOperandTwo = event => {
    setOperandTwo(event.target.value);
  };

  const operate = async () => {
    const operationData = {
      operandOne,
      operandTwo,
      operator
    }
    let token = await cookieStore.get('token')
    token = token ? token.value : null; 

    axios.post(`${process.env.BACKEND_URL}/operation`, operationData, {
      headers: {
        'Authorization': token,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
      },
    }).then((res) => {
      setResults(JSON.stringify(res.data.result))
    }).catch((err) => {
      if (err.response && err.response.data) {
        setIssue(JSON.stringify(err.response.data))
      } else {
        setIssue('Error al intentar operar')
      }
    })
  };

  const exit = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    push('/login')
  };

  return (
    <>
      <Head>
        <title>Calculadora</title>
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
          maxWidth="sm"
          sx={{ p: 2 }}
          spacing={2}
        >
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" gutterBottom>
              Calculadora
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField id="operand-one" label="Operador 1" type="number" variant="outlined" onChange={handleOperandOne} value={operandOne} />
          </Grid>
          <Grid item xs={12}>
            <TextField id="operand-two" label="Operador 2" type="number" variant="outlined" onChange={handleOperandTwo} value={operandTwo} />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="operator">Operacion</InputLabel>
              <Select
                labelId="operator"
                id="demo-simple-select"
                value={operator}
                label="Operacion"
                onChange={handleChange}
              >
                <MenuItem value={'addition'}>Addition</MenuItem>
                <MenuItem value={'subtraction'}>Subtraction</MenuItem>
                <MenuItem value={'multiplication'}>Multiplication</MenuItem>
                <MenuItem value={'division'}>Division</MenuItem>
                <MenuItem value={'square_root'}>Square root</MenuItem>
                <MenuItem value={'random_string'}>Random Strings</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={operate}>Calcular</Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="results"
              label="Resultado"
              multiline
              rows={4}
              value={results}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>
              {issue}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={2} direction="row">
              <Button variant="contained" onClick={exit}>Salir</Button>
              <Button variant="contained" onClick={() => push('/records')}>Records</Button>
            </Stack>
          </Grid>
        </Grid>
      </main>
    </>
  )
}
