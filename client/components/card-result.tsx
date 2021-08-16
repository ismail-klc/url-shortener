import Router from 'next/router'
import React, { useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import QRCode from 'qrcode.react';

function CardResult({
    longUrl, shortUrl, setShowResult
}: any) {
    const [isCopied, setIsCopied] = useState(false)
    const [text, setText] = useState('')

    const handleCopy = async () => {
        navigator.clipboard.writeText(shortUrl)
        setIsCopied(true)
        setText(await navigator.clipboard.readText())
    }

    const downloadQR = () => {
        const canvas = document.getElementById("123456");
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "qr-code.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <div>
            <Card className="col-md-4 offset-md-1 mt-5">
                {
                    isCopied &&
                    <Alert variant={'info'} onClose={() => setIsCopied(false)} dismissible>
                        <Alert.Link as="a" href={`${window.location.protocol}//${text}`}>{text}</Alert.Link> copied to clipboard
                    </Alert>
                }
                <Card.Header>Result</Card.Header>
                <Card.Body>
                    <Form >
                        <Form.Group className="mb-3" >
                            <Form.Label>Your Long Url</Form.Label>
                            <Form.Control
                                disabled
                                value={longUrl}
                                type="url" placeholder="Enter original url" />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Short Url</Form.Label>
                            <Form.Control
                                disabled
                                value={shortUrl}
                                type="text" placeholder="Short url" />
                        </Form.Group>
                        <div className="d-flex justify-content-around mb-2">
                            <Button
                                onClick={() => Router.push('/urls')}
                                variant="outline-success">
                                My Urls
                            </Button>
                            <a 
                            className="btn btn-outline-primary"
                            target="_blank"
                            href={`${window.location.protocol}//${shortUrl}`} >
                                <i className="fa fa-share"></i>
                            </a>
                            <Button
                                onClick={downloadQR}
                                variant="dark">
                                <i className="fa fa-qrcode"></i>
                            </Button>
                            <Button
                                onClick={handleCopy}
                                variant="secondary">
                                <i className="fa fa-copy px-2"></i>
                                Copy</Button>
                            <Button
                                onClick={() => setShowResult(false)}
                                variant="success">Shorten Another</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card >
            <QRCode
                style={{display: 'none'}}
                id="123456"
                value={shortUrl}
                size={290}
                level={"H"}
                includeMargin={true}
            />
        </div>
    )
}

export default CardResult
