import React, { useEffect, useState } from 'react'
import buildClient from '../../helpers/build-client';
import { GetServerSideProps } from 'next'
import { Alert, Button, Table } from 'react-bootstrap';
import Head from 'next/head';
import withAuth from '../../hocs/withAuth';
import useRequest from '../../hooks/use-request';
import { toast } from 'react-toastify';
import Router from 'next/router';

interface UrlEntity {
    id: string;
    shortUrl: string;
    originalUrl: string;
    expirationDate: Date;
}

function MyUrls({ data, clicks }: any) {
    const [isCopied, setIsCopied] = useState(false)
    const [text, setText] = useState('')
    const [id, setId] = useState('')
    const { doRequest, errors } = useRequest({
        url: `/api/url/${id}`,
        method: 'delete',
        onSuccess: () => {
            toast.success('Url deleted successfully', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            Router.push('/urls')
        }
    })

    const handleCopy = async (url: string) => {
        navigator.clipboard.writeText(`${window.location.host}/${url}`)
        setIsCopied(true)
        setText(await navigator.clipboard.readText())
    }

    const handleDelete = async (id: string) => {
        setId(id)
    }

    useEffect(() => {
       if (id !== '') {
           doRequest()
       }
    }, [id])

    return (
        <div className="col-9 mx-auto mt-5">
            <Head>
                <title>My Urls</title>
            </Head>
            <h6>Click Short Url to Copy to Clipboard</h6>
            {
                isCopied &&
                <Alert variant={'info'} onClose={() => setIsCopied(false)} dismissible>
                    <Alert.Link as="a" target="_blank"
                        href={`${window.location.protocol}//${text}`}>{text}</Alert.Link> copied to clipboard
                </Alert>
            }
            <Table responsive striped bordered hover size="sm" >
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Short Url</th>
                        <th>Original Url</th>
                        <th>Clicked</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((x: UrlEntity, index: number) => (
                            <tr key={x.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <a
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleCopy(x.shortUrl)}>
                                        {x.shortUrl}
                                    </a> &nbsp; &nbsp;
                                </td>
                                <td>
                                    <a href={x.originalUrl} target="_blank">{x.originalUrl}</a>
                                </td>
                                <td>{clicks[x.shortUrl] || 0}</td>
                                <td>
                                    <Button
                                        onClick={() => handleDelete(x.id)}
                                        className="btn-sm" variant="outline-danger">
                                        <i className="fa fa-trash" />
                                    </Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const client = buildClient(context);

    try {
        const { data } = await client.get(`/api/url/my-urls`);
        const res = await client.get(`/api/clicks`);
        const clicks = res.data

        return {
            props: {
                data, clicks
            }
        };

    } catch (error) {
        return {
            notFound: true,
        }
    }
}

export default withAuth(MyUrls)
