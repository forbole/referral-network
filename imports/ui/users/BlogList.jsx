import React, { Component } from 'react';
import { BlogCard } from '../components/ForboleComponents.jsx';
class BlogList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="blog-list mansory">
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
            <BlogCard
                cardImage="https://cdn-images-1.medium.com/max/1000/1*dwNDlVkHVM4QJmgkcVJOJw.jpeg"
                category="Cosmos"
                title="Why we choose Cosmos over Ethereum"
                name="Kwun Yeung"
                headline="Entrepreneur in Blockchain & Machine Learning"
                avatar="/img/faces/kwun-profile.jpg"
                date="Apr 2, 2018"
                likes={276}
                comments={27}
                shares={42}
            />
        </div>
    }
}

export default BlogList;