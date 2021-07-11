import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

const monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function Template({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  return (
    <Layout>
      <div className="blog-post">
        <h1>{frontmatter.title}</h1>
        <h2>
          {monthNames[frontmatter.month]} {frontmatter.day}, {frontmatter.year}
        </h2>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($file: String!) {
    markdownRemark(fileAbsolutePath: { eq: $file }) {
      html
      frontmatter {
        title
        year
        month
        day
        tags
        slug
      }
    }
  }
`;
