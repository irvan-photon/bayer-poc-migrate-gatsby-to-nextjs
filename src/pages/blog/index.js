import Layout from '@/components/layout';
import Link from 'next/link';
import client from '@/lib/client';

import { gql } from "@apollo/client";

export const metadata = {
  title: 'My Blog Posts',
}

export const query = gql`
  query {
    allMdx(sort: { frontmatter: { date: DESC }}) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
          slug
        }
        id
        excerpt
      }
    }
  }
`

export default function Blog({ data }) {
  return (
    <Layout pageTitle={metadata.title}>
      {
        data.allMdx.nodes.map(node => (
          <article key={node.id}>
            <h2>
              <Link href={`/blog/${node.frontmatter.slug}`}>
                {node.frontmatter.title}
              </Link>
            </h2>
            <p>Posted: {node.frontmatter.date}</p>
            <p>{node.excerpt}</p>
          </article>
        ))
      }
    </Layout>
  )
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: query,
  });

  return {
    props: {
      data,
    }
  }
}