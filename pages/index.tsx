import { NextPage } from "next"
import { Typography, Grid, Card, CardHeader, CardContent } from "@mui/material"
import { Layout } from "../components/layouts"
import { EntryList } from "../context/ui"
import { NewEntry } from "../components/ui"


const HomePage: NextPage = () => {
  return (

    <Layout title="Home - OpenJira" >

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Pendientes" ></CardHeader>
            <CardContent>
              <NewEntry/>
              <EntryList status='pending' />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="En Progreso" ></CardHeader>
            <CardContent>
              <EntryList status='in-progress' />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Completadas" ></CardHeader>
            <CardContent>
              <EntryList status='finished' />
            </CardContent>
          </Card>

        </Grid>
      </Grid>
    </Layout>

  )
}

export default HomePage