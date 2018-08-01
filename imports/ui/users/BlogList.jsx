import React, { Component } from 'react';
import { BlogCard } from '../components/ForboleComponents.jsx';
class BlogList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="blog-list">
            <BlogCard 
                cardImage="https://cdn-images-1.medium.com/max/1000/1*ojh3nGw8gjvvhRQKRIE8Fw.jpeg"
                category="Blockchain"
                title="A step-by-step guide to join Cosmos Hub testnet"
                name="Kwun Yeung"
                headline="Entrepreneur in Blockchain & Machine Learning"
                avatar="/img/faces/kwun-profile.jpg"
                date="Jun 29, 2018"
                likes={523}
                comments={78}
                shares={36}
            />
        </div>
    }
}

export default BlogList;