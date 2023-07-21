import { NextPage } from "next"
import { Typography, Grid, Card, CardHeader, CardContent } from "@mui/material"
import { Layout } from "../components/layouts"
import { EntryList } from "../context/ui"


const HomePage: NextPage = () => {
  return (

    <Layout title="Home - OpenJira" >

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Pendientes" ></CardHeader>
            <CardContent>
              <EntryList />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="En Progreso" ></CardHeader>
            <CardContent>
              <EntryList />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Completadas" ></CardHeader>
            <CardContent>
              <EntryList />
            </CardContent>
          </Card>

        </Grid>
      </Grid>
    </Layout>

  )
}

export default HomePage