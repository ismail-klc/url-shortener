import React from 'react'
import { GetServerSideProps } from 'next'
import buildClient from '../helpers/build-client';

function GetUrl({ data } : any) {
    return (
        <div>
            { JSON.stringify(data) }
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) =>  {
    const client = buildClient(context);
    console.log(context.params?.url);
    

    try {
        const { data } = await client.get(`/api/url?url=${context.params?.url}`);
        const originalUrl = data.originalUrl;

        return {
            redirect: {
                destination: originalUrl,
                statusCode: 302
            }
         };

    } catch (error) {
        return {
            notFound: true,
        }
    }
}

export default GetUrl
