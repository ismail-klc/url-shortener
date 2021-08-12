import { NextPage } from 'next'
import GoogleButton from '../../components/google-button'
import { Form, Button } from 'react-bootstrap'

const Login: NextPage = () => {
    return (
        <Form className="col-md-6 mx-auto mt-5">
            <Form.Group className="mb-3" >
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group>
                <GoogleButton />
            </Form.Group>
            <Form.Group>
            <Button className="mt-3" variant="primary" type="submit">
                Submit
            </Button>
            </Form.Group>
        </Form>
    )
}

export default Login
