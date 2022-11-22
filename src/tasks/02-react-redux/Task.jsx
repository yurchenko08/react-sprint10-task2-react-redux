import React, {Component} from "react";

import PostsList from "./PostsList";
import NewPostForm from "./NewPostForm";
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

// TODO Import the store, and use React-Redux's <Provider> inside <ReactReduxTask>

const markdown = `# Task Description
This is the same app as the UI Integration exercise.  The state tree stores a list of blog posts
and a list of authors.  Each post entry has an author ID associated.

There's two main components: \`<PostsList>\` and \`<NewPostForm>\`.  Both of them need access to the Redux store.  The
\`<PostsList>\` needs to display a list of posts with the right author details, and the \`<NewPostForm>\` needs to let
the application user select a post author and dispatch an action containing the new post title and the author ID.

However, last time we imported the store directly.  This time, you should use the React-Redux \`connect()\` function to
wrap each component so that it gets the data it needs as props.  You'll need to write \`mapState()\` functions that
extract the data, and write a \`mapDispatch()\` function or use the "object shorthand" for binding action creators so that
\`<NewPostsForm>\` can dispatch an action with the new post details.

You also need to import and use \`<Provider>\` in \`Task.jsx\` so that all the connected components in the component
tree have access to the Redux store automatically.`
export default class ReactReduxTask extends Component {
    render() {
        return (
            <div>
                <h3>React-Redux</h3>
                <PostsList />
                <NewPostForm />
                <ReactMarkdown plugins={[gfm]} children={markdown} />
            </div>
        )
    }
}
