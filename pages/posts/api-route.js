import Layout from '../../components/layout';
import { siteTitle } from '../../components/layout';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getSortedPostsData } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function ApiDisplay() {
  const [text, setText] = useState('');

  useEffect(() => {
    const highlight = async () => {
      await Prism.highlightAll(); // <--- prepare Prism 
    };
    highlight(); 
    // Make the HTTP request to the Serverless Function
    axios.get('http://localhost:3000/api/hello')
      .then((response) => {
        // Once the data is fetched, set the 'text' state with the value of 'text' property from the response
        setText(response.data.text);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // The empty dependency array makes sure the effect runs only once on component mount

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h3>API Routes</h3>
        <p>API routes provide a solution to build your API with Next.js. By creating a function inside the pages/api directory known as a Serverless Function, Next.js allows you to create an API endpoint within your app.
        See below for the one we&apos;ll use to store a simple text string.</p>
        <pre><code className="language-jsx">{`
export default function handler(req, res) {
  res.status(200).json({ text: 'Hello' });
}
          `}</code></pre>
      </section>
      <div>
        <p>{text}</p>
      </div>
    </Layout>
  );
}

