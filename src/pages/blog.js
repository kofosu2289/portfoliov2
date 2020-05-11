import React from 'react';
import Link from 'gatsby-link';

import PageTitle from '../components/PageTitle/pageTitle';

export default ({ data }) => {
    const posts = data.allMarkdownRemark.edges.map(({node}) => 
        <Link key={node.fields.slug} to={node.fields.slug} className="link black">
            <h3 className="mb3 mt0 f4 f5-s w-100 w-70-ns bb-l">{unescape(node.frontmatter.title)}{" "} <span className="db tl fr-l gray nb bb-m bb-s">{node.frontmatter.date}</span></h3><p className="mb5">{node.excerpt}</p>
        </Link>);
    return (
    <div className="center mw8 mt4 pv4 ph3">
    <PageTitle title="blog" align="right" />
    {posts}
    </div>
)
}

export const query = graphql`
    query BlogQuery {
        allMarkdownRemark(
            filter: {
                fileAbsolutePath: {regex:"/blogs/.*\\.md$/"}
            }
          ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        date(formatString: "DD MMMM, YYYY")
                    }
                    fields {
                        slug
                    }
                    excerpt
                }
            }
        }
    }
`