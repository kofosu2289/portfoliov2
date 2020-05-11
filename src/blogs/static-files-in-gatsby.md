---
title: Serving Static Files in GatsbyJS
date: "2020-05-08"
---

I keep a close watch on my own GitHub account. I'm not worried about _security_, though. It's all about trying to get my commit graph as green as possible: to code something _every_ day.  

But on most days my commits are relatively few in number. I don't have much time to devote to my own personal projects these days, so on many days I'm lucky to implement a small feature or make a few tweaks to the styling of one project or another. Then again, you can always tell the days when I'm working through a major issue when a graph entry suddenly goes 
<span style="color: darkgreen"><strong>dark green</strong></span>
. This is generally an indication that I've run into some bug that is a harder nut to crack than my first estimation, and generally on the precipice of pushing content to the _public_ web.

Such was the case today: it was time for _this_ very site to go live. I'd built it out just as a modest prototype, but I wanted to see it on the web for real. So I wrote out the last little bit of react code, pushed to github, and from there deployed to netlify. And in a moment, there it was--but one small detail: all of the images were gone. I realized in short order that this was because my kludgey solution for serving static files on the Gatsby development server--just stash them in the handy `/public/static/` directory--was certainly not going to work for the output of `gatsby build`. Oh bother.

Well, no worries: I'm still earning my webpack stripes at this point, but I know enough to work out that I needed to point webpack to my static files. So I moved all of my images to an `assets` directory in the `src/` folder, included them in my js and css code as needed, and voila!

Well, mostly: the projects page was still all broken image links. The reason? I pull my project data, including the relative paths to the image files, programmatically from markdown files in a specific directory. Each of those files in turn has several frontmatter fields, which I query using the GatsbyJS GraphQL interface:

```
---
title: BarFoo'd
description: Something I spat out of my code editor
imageURL: '../assets/barfoo.jpg'
---
```
Now, it turns out that retrieving and using the value of the imageURL field is not as simple as pointing Webpack to the file with an image tag, which has `src={node.imageURL}` (e.g.). The reason is that Gatsby automatically surmises from the string that follows the ':' above that the `imageURL` field is a _file_. As a result my first (through fifth) attempts to grab the file with a relatively simply GraphQL query met with failure. I was trying to do something like this:
```
allMarkdownRemark {
            edges {
                node {
                    id
                    frontmatter {
                        imageURL
                    }
                }
            }
}
```
But this doesn't even get past the compiler: because `imageURL` is a file field, Gatsby's GraphQL interface requires a subfield. But what subfield? Being new to both Gatsby _and_ GraphQL in general, this was a blind alley. I hazarded a few guesses-- `relativePath`? `absolutePath`?-- but nothing seemed to work. I then tried a workaround: changing the field to a bona-fide string and injecting it into my JSX. But that too was a 'no-go': webpack may be brilliant, but it wasn't going to find and handle image files generated programmatically at runtime. Finally, at a loss, I began to contemplate moving all of my image storage offsite at Amazon S3 (probably not a terrible idea, but likely to complicate my workflow), when I finally lit upon the answer. Gatsby had me covered all along. Here's the query that worked:
```
allMarkdownRemark {
            edges {
                node {
                    id
                    frontmatter {
                        imageURL {
                            publicURL
                        }
                    }
                }
            }
}
```
With this, injecting `node.frontmatter.imageURL.publicURL` into the `src` attribute for my images did the trick (albeit verbosely: I might revisit my nomenclature now that I've figured out how to get it to work). And just like that, I got dynamically-rendered images on my markdown-driven [projects](/projects/) page.

And _that's_ how I spent my Friday.