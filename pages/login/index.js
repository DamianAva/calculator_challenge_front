import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Login.module.css'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';

const inter = Inter({ subsets: ['latin'] })

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [issue, setIssue] = useState('');
  const { push } = useRouter();

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePassChange = event => {
    setPassword(event.target.value);
  };

  const login = async () => {
    const loginData = {
      username: email,
      password: password,
    }

    axios.post('/users/login', loginData, {
      baseURL: process.env.BACKEND_URL,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
      },
    }).then((res) => {
      document.cookie = `token=${res.data.accessToken}`;
      push('/')
    }).catch((err) => {
      console.log(err)
      if (err.response && err.response.data) {
        setIssue(JSON.stringify(err.response.data))
      } else {
        setIssue('Error al intentar ingresar')
      }
    })
  }

  return (
    <>
      <Head>
        <title>Login</title>
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
              Login
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField id="email" label="Email" variant="outlined" value={email} onChange={handleEmailChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField id="password" label="Contraseña" variant="outlined" type="password" value={password} onChange={handlePassChange} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={login}>Entrar</Button>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              {issue}
            </Typography>
          </Grid>
        </Grid>
      </main>
    </>
  )
}
