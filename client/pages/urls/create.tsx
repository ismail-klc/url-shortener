import React, { useEffect, useState } from 'react'
import { Button, Form, Card } from 'react-bootstrap'
import CardResult from '../../components/card-result'
import Errors from '../../components/errors'
import withAuth from '../../hocs/withAuth'
import useRequest from '../../hooks/use-request'

function CreateUrl() {
    const [originalUrl, setOriginalUrl] = useState('')
    const [shortUrl, setShortUrl] = useState('')
    const [completed, setCompleted] = useState(false)
    const [showResult, setShowResult] = useState(false)

    const { doRequest, errors, data } = useRequest({
        url: '/api/url/create',
        method: 'post',
        body: {
            originalUrl, shortUrl
        },
        onSuccess: () => {
            setShowResult(true)
            setOriginalUrl('')
            setShortUrl('')
            setCompleted(false)
        }
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!shortUrl) {
            setShortUrl(null)
        }
        setCompleted(true)
    }

    useEffect(() => {
        if (completed) {
            doRequest();
        }
    }, [completed]);

    if (showResult) {
        return <CardResult 
        setShowResult={setShowResult}
        longUrl={data?.originalUrl} 
        shortUrl={`${window.location.host}/${data?.shortUrl}`} />
    } 

    return (
        <Card className="col-md-6 col-12 offset-md-1 mt-5">
            <Card.Header>Make Short Url</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit} >
                    <Form.Group className="mb-3" >
                        <Form.Label>Original Url</Form.Label>
                        <Form.Control
                            value={originalUrl} onChange={e => setOriginalUrl(e.target.value)}
                            type="text" placeholder="Enter original url" />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Short Url (Optinal)</Form.Label>
                        <Form.Control
                            value={shortUrl} onChange={e => setShortUrl(e.target.value)}
                            type="text" placeholder="Short url" />
                        <Form.Text className="text-muted">
                            Short url is optinal. Find a url between 6-9 characters not used before.
                        </Form.Text>
                    </Form.Group>
                    {
                        errors.length > 0 &&
                        <Errors msg={errors} />
                    }
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default withAuth(CreateUrl)
