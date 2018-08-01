import React, { Component } from 'react';
import { BlogCard } from '../components/ForboleComponents.jsx';
class BlogList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="blog-list">
            <BlogCard 
                cardImage="/img/examples/blog8.jpg"
                title="To Grow Your Business Start Focusing on Your Employees"
                name="Kwun Yeung"
                avatar="/img/faces/kwun-profile.jpg"
                time="5 min"
            />
        </div>
    }
}

export default BlogList;