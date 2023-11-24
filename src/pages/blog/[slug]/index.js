import Layout from '@/components/layout';
import Image from 'next/image';
import client from '@/lib/client';
import { gql } from "@apollo/client";

export const metadata = {
  title: 'My Blog Posts',
}

export const query = gql`
  query($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        hero_image_alt
        hero_image_credit_link
        hero_image_credit_text
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`

export default function BlogSlug({ data, children }) {
  return (
    <Layout pageTitle={data?.mdx?.frontmatter.title || ""}>
      <p>{data?.mdx.frontmatter.date || ""}</p>
      <div style={{width: '100%', height: 300, position: 'relative'}}>
        <Image
          alt={data?.mdx.frontmatter.hero_image_alt || ""}
          src={`http://localhost:8000${data.mdx.frontmatter.hero_image.childImageSharp.gatsbyImageData.images.fallback.src}`}
          layout='fill'
        />
      </div>
      <p>
        Photo Credit:{" "}
        <a href={data?.mdx.frontmatter.hero_image_credit_link || ""}>
          {data?.mdx.frontmatter.hero_image_credit_text || ""}
        </a>
      </p>
      {children}
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  const { data } = await client.query({
    query: query,
    variables: { slug }
  });

  return {
    props: {
      data,
    },
  };
}