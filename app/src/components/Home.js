import React from "react"
import {Link} from "react-router-dom"
import { Button, Divider, Grid, Segment } from 'semantic-ui-react'


const Home = () => {
    return (
        <div className="margin">
      <Segment placeholder>
    <Grid columns={2} relaxed='very' stackable>

      <Grid.Column>
      <Link to="/UserLogin" > 
      <Button content='Diner' icon='food' size='big' />
      </Link>
      </Grid.Column>

      <Grid.Column>
      <Link to="/AdminLogin">
      <Button content='Operator' icon='briefcase' size='big' />
       </Link>
      </Grid.Column>
      
      </Grid>
<Divider vertical>Or</Divider>
      </Segment>
      </div>
    )
}

export default Home;