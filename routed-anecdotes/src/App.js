import React from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, NavLink
} from 'react-router-dom'
import { Container, Table, Form, Button, Message, Menu, Grid, Image, Header } from 'semantic-ui-react'

const Navigation = () => {

  const active = {
    fontWeight: 'bold',
    color: 'green'
  }

  return (
    <Menu inverted>
      <Menu.Item>
        <NavLink exact activeStyle={active} to="/">anecdotes</NavLink> &nbsp;
    </Menu.Item>
      <Menu.Item>
        <NavLink exact activeStyle={active} to="/create">create new</NavLink> &nbsp;
    </Menu.Item>
      <Menu.Item>
        <NavLink exact activeStyle={active} to="/about">about</NavLink> &nbsp;
    </Menu.Item>
    </Menu>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped celled>
      <Table.Body>

        {anecdotes.map(anecdote => <Table.Row key={anecdote.id} ><Table.Cell><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></Table.Cell></Table.Row>)}

      </Table.Body>
    </Table>
  </div>
)

const About = () => (
  <Grid>
    <Grid.Row>
    <h2>About anecdote app</h2>
    </Grid.Row>
    <Grid.Row>
    <Grid.Column width={8}>

      <p>According to Wikipedia:</p>

      <em>An anecdote is a brief, revealing account of an individual person or an incident.
        Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
        such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

      <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </Grid.Column>
    <Grid.Column width={8}>
      <Image rounded size='medium' src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg" />
    </Grid.Column>
    </Grid.Row>
  </Grid>
)

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content} by {anecdote.author}</h2>
    <p>has {anecdote.votes} votes</p>
    <p>More info: <a href={anecdote.info}>{anecdote.info}</a></p>
  </div>
)

const Notification = ({ notification }) => {
  const style = {
    margin: '10px'
  }
  return (
    <div style={style}>
      {notification && <Message success compact> {notification} </Message>}
    </div>
  )
}


const Footer = () => {
  const style = {
    marginTop: '20px'
  }
  return (
    <div style={style}>
      Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
  )
}

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <h2>create a new anecdote</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>content</label>
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>author</label>
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>info</label>
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </Form.Field>
          <Button type='submit'>create</Button>
        </Form>
      </div>
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `${anecdote.content} added`
    })
    setTimeout(() => {
      this.setState({ notification: '' })
    }, 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)



  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <Container>
        <Header as='h1' textAlign='center'>Software anecdotes</Header>
        <Router>
          <div>
            <Navigation />
            <Notification notification={this.state.notification} />
            <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route exact path="/anecdotes/:id" render={({ match }) => <Anecdote anecdote={this.anecdoteById(match.params.id)} />} />
            <Route exact path="/create" render={({ history }) => <CreateNew history={history} addNew={this.addNew} />} />
            <Route exact path="/about" render={() => <About />} />
          </div>
        </Router>
        <Footer />
      </Container>
    )
  }
}

export default App;
