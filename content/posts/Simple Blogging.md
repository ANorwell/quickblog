<p>QuickBlog is a dead simple and easy to use blogging tool. Anyone with a <a href="github.com">github</a> account can use it to start blogging within minutes. Once a post has been written (in markdown or HTML format), it will be automatically published to a github pages website.</p>
<h2 id="setting-up">Setting up</h2>
<p>First, sign up for a <a href="github.com">github</a> account if you don&#39;t already have one. Then, fork the <a href="https://github.com/anorwell/quickblog">quickblog repository</a> by clicking the fork button in the top right. </p>
<p>You have just created your blog! It will live at <a href="%3Cusername%3E.github.io/quickblog"><username>.github.io/quickblog</a> (but may not show up until you publish your first post).</p>
<h3 id="adding-content">Adding content</h3>
<p>To author a post, navigate to the <code>content/posts</code> directory in your quickblog project on github and click the add file button in the top right. Every post must contain a front-matter section with a title, date, and optional tags. Following that comes the content of the post, which can be either markdown or HTML. This is easiest to show with an example:</p>
<pre><code>---
title: My First Post
date: 2020-06-28
tags: easy, quickblog
---

This is my first post.

## This is a header
### This is a sub-header

More content goes here.</code></pre>
