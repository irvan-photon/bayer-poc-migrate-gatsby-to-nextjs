import Layout from "@/components/layout";

export const metadata = {
  title: 'About Me',
}

export default function Home() {
  return (
    <Layout pageTitle={metadata.title}>
      <p>Hi there! I&apos;m the proud creator of this site, which I built with Gatsby.</p>
    </Layout>
  )
}
