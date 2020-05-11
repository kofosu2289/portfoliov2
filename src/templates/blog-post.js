import React from 'react';
import Link from 'gatsby-link';

import './blog-post.css';

export default ({ data }) => {
    const post = data.markdownRemark;
    return (
        <div className="center mw8 mt4 pv4 ph2-m">
            <h1 className="pb3 bb lh-title">{post.frontmatter.title}<span className="db dib-l fr-l gray f4-m f4-s">{post.frontmatter.date}</span></h1>
            <div className="fw1 lh-copy pb4 bb" dangerouslySetInnerHTML={{__html: post.html }} />
            <Link to="/blog" className="db mt4 f4 link">Blog Home</Link>
        </div>
    )
}

export const query = graphql`
    query BlogPostQuery($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } } ) {
            html
            frontmatter {
                title
                date(formatString: "DD MMMM, YYYY")
            }
        }
    }
`;