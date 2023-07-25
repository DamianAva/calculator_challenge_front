import * as React from 'react';
import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Login.module.css'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const inter = Inter({ subsets: ['latin'] })

export default function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <Container maxWidth="sm">
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Login
            </Typography>
            <TextField id="outlined-basic" label="Email" variant="outlined" />
            <TextField id="outlined-basic" label="Contraseña" variant="outlined" />
            <Button variant="contained">Entrar</Button>
          </Box>
        </Container>
      </main>
    </>
  )
}
