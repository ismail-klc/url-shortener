import { NextPage } from 'next'
import GoogleButton from '../../components/google-button'
import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import useRequest from '../../hooks/use-request'
import Router from 'next/router'
import Errors from '../../components/errors'
import { toast } from 'react-toastify'
import Head from 'next/head'

const Login: NextPage = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const { doRequest, errors } = useRequest({
        url: '/api/auth/signin',
        method: 'post',
        body: {
            email, password
        },
        onSuccess: () => {
            toast.success('Login success', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            Router.push('/')
        }
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await doRequest();
    }

    return (
        <>
        <Head>
            <title>Login</title>
        </Head>
        <Form onSubmit={handleSubmit} className="col-md-6 mx-auto mt-5">
            <Form.Group className="mb-3" >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    value={email} onChange={e => setEmail(e.target.value)}
                    type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Password</Form.Label>
                <Form.Control
                    value={password} onChange={e => setPassword(e.target.value)}
                    type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group>
                <GoogleButton />
            </Form.Group>
            {
                errors.length > 0 && <Errors msg={errors} />
            }
            <Form.Group>
                <Button className="mt-3" variant="primary" type="submit">
                    Submit
                </Button>
            </Form.Group>
        </Form>
        </>
    )
}

export default Login
