import React, { useState } from 'react'
import buildClient from '../../helpers/build-client';
import { GetServerSideProps } from 'next'
import { Alert, Button, Table } from 'react-bootstrap';
import Head from 'next/head';

interface UrlEntity {
    id: string;
    shortUrl: string;
    originalUrl: string;
    expirationDate: Date;
}

function MyUrls({ data }: any) {
    const [isCopied, setIsCopied] = useState(false)
    const [text, setText] = useState('')

    const handleCopy = async (url: string) => {
        navigator.clipboard.writeText(`${window.location.host}/${url}`)
        setIsCopied(true)
        setText(await navigator.clipboard.readText())
    }

    return (
        <div className="col-9 mx-auto mt-5">
            <Head>
                <title>My Urls</title>
            </Head>
            <h6>Click Short Url to Copy to Clipboard</h6>
            {
                isCopied &&
                <Alert variant={'info'} onClose={() => setIsCopied(false)} dismissible>
                    <Alert.Link as="a" href={`${window.location.protocol}//${text}`}>{text}</Alert.Link> copied to clipboard
                </Alert>
            }
            <Table responsive striped bordered hover size="sm" >
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Short Url</th>
                        <th>Original Url</th>
                        <th>Expiration Date</th>
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
                                <td>{x.expirationDate}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div >
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const client = buildClient(context);

    try {
        const { data } = await client.get(`/api/url/my-urls`);

        return {
            props: {
                data
            }
        };

    } catch (error) {
        return {
            notFound: true,
        }
    }
}

export default MyUrls
