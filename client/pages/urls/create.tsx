import Router from 'next/router'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import Errors from '../../components/errors'
import useRequest from '../../hooks/use-request'

function CreateUrl() {
    const [originalUrl, setOriginalUrl] = useState('')
    const [shortUrl, setShortUrl] = useState('')

    const { doRequest, errors } = useRequest({
        url: '/api/url/create',
        method: 'post',
        body: {
            originalUrl, shortUrl
        },
        onSuccess: () => Router.push('/')
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await doRequest();
    }

    return (
        <div>
            <Form onSubmit={handleSubmit} className="col-md-6 mx-auto mt-5">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Original Url</Form.Label>
                    <Form.Control
                    value={originalUrl} onChange={e => setOriginalUrl(e.target.value)}
                    type="url" placeholder="Enter original url" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Short Url (Optinal)</Form.Label>
                    <Form.Control
                    value={shortUrl} onChange={e => setShortUrl(e.target.value)}
                    type="text" placeholder="Short url" />
                </Form.Group>
                {
                    errors.length > 0 &&
                    "error"
                }
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default CreateUrl
